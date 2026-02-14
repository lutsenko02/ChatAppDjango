import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../auth";

function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuthentication();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated === null) return; // Дождитесь завершения проверки подлинности

        if (!isAuthenticated) {
            // Перенаправление на страницу входа, если пользователь не аутентифицирован
            navigate('/login');
        } else if (isAuthenticated && (window.location.pathname === '/login' || window.location.pathname === '/register')) {
            // Перенаправление в чаты, если пользователь аутентифицирован, но находится на странице входа/регистрации
            navigate('/account');
        }
    }, [isAuthenticated, navigate]);

    if (isAuthenticated === null) {
        // Показывать индикатор загрузки во время проверки статуса аутентификации
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        // Не отображать дочерние элементы, если пользователь не аутентифицирован
        return null;
    }

    // Отображать детей, если аутентификация выполнена
    return children;
}

export default ProtectedRoute;