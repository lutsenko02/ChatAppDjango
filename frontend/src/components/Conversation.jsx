import React, { useEffect, useState, useRef } from "react";
import api from "../api";
import "../styles/Conversation.css";
import { ACCESS_TOKEN } from "../token";

const Conversation = ({ conversationId, currentUserId, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [typingUser, setTypingUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [socket, setSocket] = useState(null);
  const [chatPartner, setChatPartner] = useState(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    const fetchConversationData = async () => {
      if (!conversationId) {
        console.error("Неверный идентификатор беседы:", conversationId);
        return;
      }

      try {
        setLoading(true);
        const response = await api.get(`/conversations/${conversationId}/messages/`);
        const messages = response.data || [];
        setMessages(messages);

        if (messages.length > 0) {
          const participants = messages[0]?.participants || [];
          const chatPartner = participants.find((user) => user.id !== Number(currentUserId));

          if (chatPartner) {
            setChatPartner(chatPartner);
          } else {
            console.error("Не найден подходящий партнер по чату");
          }
        }
      } catch (error) {
        console.error("Ошибка при получении данных разговора:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversationData();
  }, [conversationId, currentUserId]);

  useEffect(() => {
    if (!conversationId) return;
    const token = localStorage.getItem(ACCESS_TOKEN);

    const websocket = new WebSocket(`ws://localhost:8000/ws/chat/${conversationId}/?token=${token}`);

    websocket.onopen = () => {
      console.log("Установлено соединение WebSocket");
    };

    websocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === "chat_message") {
          const { message, user, timestamp } = data;
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: user, content: message, timestamp },
          ]);
          setTypingUser(null);
        } else if (data.type === "typing") {
          console.log("Получено событие ввода:", data);
          const { user, receiver } = data;

          if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
          }

          // Показывать индикатор ввода только в том случае, если текущий пользователь является получателем.
          if (receiver === Number(currentUserId) && user.id !== Number(currentUserId)) {
            setTypingUser(user);
            // Установите новый тайм-аут и сохраните ссылку
            typingTimeoutRef.current = setTimeout(() => {
              setTypingUser(null);
              typingTimeoutRef.current = null;
            }, 2000);
          }
        } else if (data.type === "delete_message") {
          const { messageId } = data;
          // Удаляем сообщение из локального state
          setMessages((prevMessages) => prevMessages.filter(msg => msg.id !== messageId));
          
        } else if (data.type === "online_status") {
          if (data.status === "online") {
            setOnlineUsers((prev) => [...prev, ...data.online_users]);
          } else if (data.status === "offline") {
            setOnlineUsers((prev) =>
              prev.filter((user) => !data.online_users.some((u) => u.id === user.id))
            );
          }
        }
      } catch (error) {
        console.error("Ошибка анализа сообщения WebSocket:", error);
      }
    };

    websocket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    setSocket(websocket);

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      websocket.close();
    };
  }, []);

  const handleSendMessage = () => {
    if (!conversationId || !newMessage.trim()) {
      console.error("Невозможно отправить сообщение: неверный идентификатор беседы или пустое сообщение.");
      return;
    }

    if (socket?.readyState === WebSocket.OPEN) {
      const messagePayload = {
        type: "chat_message",
        message: newMessage,
        user: currentUserId,
      };

      socket.send(JSON.stringify(messagePayload));
      setNewMessage("");
    } else {
      console.error("WebSocket не открыт. Сообщение не отправлено.");
    }
  };

  const handleTyping = () => {
    if (!chatPartner || socket?.readyState !== WebSocket.OPEN) {
      console.error("Невозможно отправить событие ввода текста: нет партнера по чату или WebSocket не открыт.");
      return;
    }

    const receiverId = chatPartner.id; // Используйте chatPartner.id в качестве идентификатора получателя (receiverId)

    console.log(`Отправка события ввода для receiverId: ${receiverId}`);

    socket.send(
      JSON.stringify({
        type: "typing",
        user: {
          id: currentUserId,
          username: "you"
        },
        receiver: receiverId
      })
    );
    console.log("Отправка события ввода:", {
      user: { id: currentUserId, username: "You" },
      receiver: receiverId
    });
  };

  const debouncedHandleTyping = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    handleTyping();
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat("ru-RU", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(date);
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      const response = await api.delete(`/conversations/${conversationId}/messages/${Number(messageId)}/`);

      if (response.status === 204) {
        setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== Number(messageId)));

        // Отправляем событие по WebSocket
        if (socket?.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({
            type: "delete_message",
            messageId: messageId
          }));
        }
      }
    } catch (error) {
      console.error("Ошибка удаления сообщения:", error);
    }
  };
  

  return (
    <div className="conversation-container">
      <div className="container">
      <div className="conversation-header">
        <button className="back-button" onClick={onBack}>✖</button>
        <h3>{chatPartner ? `Чат с ${chatPartner.username}` : "Чат"}</h3>
        <div className="online-status">
          {onlineUsers.length > 0 ? (
            onlineUsers.map((user) => (
              <span key={user.id} className="online-user">
                {user.username} (online)
              </span>
            ))
          ) : (
            <span>Нет пользователей онлайн</span>
          )}
        </div>
      </div>

      <div className="messages-container">
        {loading ? (
          <p>Загрузка сообщений...</p>
        ) : (
          messages.map((message, index) => {
            const isSentByCurrentUser = message.sender?.id === Number(currentUserId);

            return (
              <div key={index} className={`message-wrapper ${isSentByCurrentUser ? "sent" : "received"}`}>
                {!isSentByCurrentUser && (
                  <span className="message-username">
                    {message.sender?.username || "Unknown"}
                  </span>
                )}
                <div className="message-bubble">
                  {message.content}
                  {isSentByCurrentUser && (
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteMessage(message.id)}
                    >
                    <svg width="15" height="18" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 0C7.35 0 6 1.35 6 3H3C1.35 3 0 4.35 0 6H21C21 4.35 19.65 3 18 3H15C15 1.35 13.65 0 12 0H9ZM3 9V23.43C3 23.76 3.24 24 3.57 24H17.46C17.79 24 18.03 23.76 18.03 23.43V9H15.03V19.5C15.03 20.34 14.37 21 13.53 21C12.69 21 12.03 20.34 12.03 19.5V9H9.03V19.5C9.03 20.34 8.37 21 7.53 21C6.69 21 6.03 20.34 6.03 19.5V9H3.03H3Z" fill="#F20000"/>
                    </svg>
                    </button>
                  )}
                </div>
                <div className="message-timestamp">{formatTimestamp(message.timestamp)}</div>
              </div>
            );
          })
        )}
      </div>

      {typingUser && (
        <div className="typing-indicator">
          {typingUser.username} печатает...
        </div>
      )}

      <div className="input-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value) 
            debouncedHandleTyping();
          }}
          onKeyDown={handleTyping}
          placeholder="Сообщение"
          className="message-input"
        />
        <button className="send-button" onClick={handleSendMessage}>
          отправить
        </button>
      </div>
      </div>
    </div>
  );
};

export default Conversation;