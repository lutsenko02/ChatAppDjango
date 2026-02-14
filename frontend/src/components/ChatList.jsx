import { useEffect, useState } from "react";
import api from "../api";
import {jwtDecode} from "jwt-decode";
import Conversation from "./Conversation";
import "../styles/ChatList.css";
import { ACCESS_TOKEN } from "../token";

const ChatList = () => {
  const [conversations, setConversations] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [activeConversation, setActiveConversation] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const initializeData = async () => {
      try {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
          const decodedToken = jwtDecode(token);
          setCurrentUserId(decodedToken.user_id);
        }

        const userResponse = await api.get("users/");
        setUsers(userResponse.data);

        const conversationResponse = await api.get("conversations/");
        setConversations(conversationResponse.data);
      } catch (error) {
        console.error("Ошибка инициализации данных:", error);
      }
    };

    initializeData();
  }, []);

  const handleStartConversation = async () => {
    if (selectedUser && currentUserId) {
      const participants = [selectedUser, currentUserId];
      try {
        const response = await api.post("conversations/", { participants });
        setConversations([...conversations, response.data]);
        setActiveConversation(response.data);
        setErrorMessage("");
      } catch (error) {
        if (error.response?.data?.error) {
          setErrorMessage(error.response.data.error);
        } else {
          setErrorMessage("Произошла непредвиденная ошибка. Попробуйте ещё раз.");
        }
      }
    }
  };

  const handleSelectConversation = (conversation) => {
    setActiveConversation(conversation);
  };

  const handleBackToChatList = () => {
    setActiveConversation(null);
  };

  return (
    <div className="chat-list-container">
      <div className={`chat-sidebar ${activeConversation ? "slide-out" : "slide-in"}`}>
          <header className="chat-header">
            <h1>Выберите беседу для просмотра</h1>
          <div className="container">
            <div className="user-selector">
              <select onChange={(e) => setSelectedUser(e.target.value)} value={selectedUser || ""}>
                <option value="" disabled>
                  Выберите пользователя для чата
                </option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
              </select>
              <button onClick={handleStartConversation}>Начать разговор</button>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
            </div>
          </header>
          <div className="container">
          <div className="conversation-list">
            <h2>Актуальные чаты</h2>
            {conversations.map((conversation) => {
              {console.log("participants:", conversation.participants)}
              {console.log("currentUserId:", currentUserId, typeof currentUserId)}

              return <div
                key={conversation.id}
                className="conversation-item"
                onClick={() => handleSelectConversation(conversation)}
              >
                <p>
                  {conversation.participants
                    .filter((user) => user.id !== Number(currentUserId))
                    .map((user) => user.username)
                    .join(", ")}
                </p>
              </div>
            })}
          </div>
        </div>
      </div>

      <div>
        {activeConversation ? (
          <Conversation
            conversationId={activeConversation.id}
            currentUserId={currentUserId}
            onBack={handleBackToChatList}
          />
        ) : (
          <div className="no-conversation-box">
            <p className="no-conversation-message">Выберите беседу для просмотра</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;