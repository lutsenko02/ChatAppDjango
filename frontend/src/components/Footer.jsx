import React from "react";
import '../styles/Footer.css';

const Footer = () => {

  return (
    <div className="posrel footer-background">
        <div className="poloska footer"><img src="/src/assets/poloska-footer.svg" alt="" /></div>  
        <div className="container">
            <div className="wrapper">
                <div className="footer-container">
                    <div className="footer-left">
                        <div className="footer-links">
                            <a href="https://vk.ru/rsue.rinh" className="footer-social"><img src="/src/assets/vk.svg" alt="" /></a>
                            <a href="https://ok.ru/group/60991174279312" className="footer-social"><img src="/src/assets/ok.svg" alt="" /></a>
                            <a href="https://t.me/rsue_rinh" className="footer-social"><img src="/src/assets/tg.svg" alt="" /></a>
                            <a href="https://rutube.ru/channel/25905156/" className="footer-social"><img src="/src/assets/ru.svg" alt="" /></a>
                            <a href="https://max.ru/rsue_rinh" className="footer-social"><img src="/src/assets/max.svg" alt="" /></a>
                        </div>
                        <p className="footer-rools">
                            © Ростовский государственный экономический университет (РИНХ).<br />Все авторские права защищены. 2025
                        </p>
                    </div>
                    <div className="footer-right">
                        <div className="footer-contacts">
                            <div className="footer-contact-name">
                                Приемная комиссия
                            </div>
                            <a href="" className="footer-contact-tel">+7 (863) 237-02-60</a>
                        </div>
                        <div className="footer-contacts">
                            <div className="footer-contact-name">
                                Медиацентр
                            </div>
                            <a href="" className="footer-contact-tel">+7 (863) 261-38-39</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>  
  );
};

export default Footer;