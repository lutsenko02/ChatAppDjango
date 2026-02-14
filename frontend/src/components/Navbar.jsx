import { useState } from "react";
import "../styles/Navbar.css";
import { useAuthentication } from "../auth";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, logout } = useAuthentication();
  const handleLogout = () => {
    logout();
    setMenuOpen(false); // Закрыть меню после выхода из системы
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  


  return (
    
    <nav className="navbar">
      <div className="navbar-container">
        <Link to='/'  className="navbar-logo">
          <img src="src/assets/logo-rsue.png" alt="логотип РИНХ" />
        </Link>
        {/* <div className="navbar-icon" onClick={toggleSidebar}> */}
          {isAuthenticated ? (<>
          <div className="nabar-lk-box">
            <div className="nabar-lk yellow">
              <Link to="/chats" className="button-link">
                Чат
              </Link>
            </div>
            <div className="nabar-lk">
              <Link to="/" onClick={handleLogout} className="button-link">
                Выйти
              </Link>
            </div>
          </div>
          </>) : (<>
          <ul className="navbar-menu">
            <li>   
              <a href='/#about'>О нас</a>     
            </li>
            <li>
              <a href='/#leads'>Руководство</a>          
            </li>
            <li>
              <a href='/#courses'>Направления</a>        
            </li>
          </ul>
          <div className="nabar-lk" onClick={toggleSidebar}>Личный кабинет</div>
          </>)}
          {/* ☰ */}
        {/* </div> */}
        {isSidebarOpen && (
          <div className="sidebar">
            <button className="close-btn" onClick={toggleSidebar}>
              ✖
            </button>
            <ul className="sidebar-menu">
              {isAuthenticated ? (
                <>
                  {/* <li>
                    <Link to="#" onClick={handleLogout} className="button-link">
                      Выход
                    </Link>
                  </li>
                  <li>
                    <Link to="/chats" className="button-link">
                      Чаты
                    </Link>
                  </li> */}
                </>
              ) : (
                <>
                  <li>
                    <a href="/login">Войти</a>
                  </li>
                  <li>
                    <a href="/register">Зарегистрироваться</a>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;