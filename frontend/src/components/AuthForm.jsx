import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../token";
import "../styles/AuthForm.css";


const AuthForm = ({ route, method }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const res = await api.post(route, { username, password });

            if (method === 'login') {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/chats");
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
            if (error.response) {
                if (error.response.status === 401) {
                    setError("Недействительные учетные данные");
                } else if (error.response.status === 400) {
                    setError("имя пользователя уже существует");
                } else {
                    setError("Что-то пошло не так. Попробуйте ещё раз.");
                }
            } else if (error.request) {
                setError("Ошибка сети. Проверьте подключение к интернету.");
            } else {
                setError("Что-то пошло не так. Попробуйте ещё раз.");
            }
        } finally {
            setLoading(false);
        }
    };

    
    return (
        <div className="auth-form-container">
            {loading && (
                <div className="loading-indicator">
                    {error ? <span className="error-message">{error}</span> : <div className="spinner"></div>}
                </div>
            )}
            {!loading && (
                <div className="auth-form-wrapper">
                    <form onSubmit={handleSubmit} className="auth-form">
                        {method === 'register' && (
                            <p className="info-text">Регистрация</p>
                        )}
                        {error && <div className="error-message">{error}</div>}
                        {success && <div className="success-message">{success}</div>}
                        <div className="form-group">
                            <label htmlFor="username">Имя пользователя:</label>
                            <input 
                                type="username" 
                                id="username" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Введите имя" 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Пароль:</label>
                            <input 
                                type="password" 
                                id="password" 
                                value={password}  
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Введите пароль"
                                required 
                            />
                        </div>

                        <button type="submit" className="form-button">
                            {method === 'register' ? 'Зарегистрироваться' : 'Авторизоваться'}
                        </button>
                        {method === 'login' && (
                            <p className="toggle-text">У вас нет учетной записи?
                            <span className="toggle-link" onClick={() => navigate("/register")}> Зарегистрироваться</span></p>
                        )}
                        {method === 'register' && (
                            <p className="toggle-text">У вас уже есть аккаунт?
                            <span className="toggle-link" onClick={() => navigate("/login")}> Авторизоваться</span></p>
                        )}
                        {method === 'login' && (
                            <p className="toggle-text">
                                Забыли пароль?
                                <span className="toggle-link" onClick={() => navigate("/password-reset")}> Сбросить пароль</span>
                            </p>
                        )}
                    </form>
                </div>
            )}
        </div>
    );
};

export default AuthForm;