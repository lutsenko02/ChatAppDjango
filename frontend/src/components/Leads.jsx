// import { useState } from "react";
import "../styles/Leads.css";
import { Link } from "react-router-dom";

const Leads = () => {

  return (
    <div className="posrel">
        <div className="container">
            <div className="wrapper">
                <div className="leads-container" id="leads">
                    <h2>Руководство</h2>
                    <div className="leads-main-container">
                        <div className="leads-main-left">
                            <div className="leads-main-item">
                                <div className="leads-main-item-box">
                                    <img src="/src/assets/rector.png" alt="rector" />
                                    <div className="leads-main-descr">
                                        <div className="leads-main-descr-name"><span>Ректор</span> - Макаренко Елена Николаевна</div>
                                        <div className="leads-main-descr-contacts">
                                            <div className="tg">
                                                <img src="/src/assets/tg.svg" alt="tg" />
                                                <img src="/src/assets/tg-rector.svg" alt="tg" />
                                            </div>
                                            <div className="vk">
                                                <img src="/src/assets/vk.svg" alt="vk" />
                                                <img src="/src/assets/vk-rector.svg" alt="vk" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="leads-main-item">
                                <div className="leads-main-item-box">
                                    <img src="/src/assets/president.png" alt="president" />
                                    <div className="leads-main-descr">
                                        <div className="leads-main-descr-name"><span>Президент</span> - Альбеков Адам Умарович</div>
                                        <div className="leads-main-descr-contacts">
                                            <div className="tg">
                                                <img src="/src/assets/tg.svg" alt="tg" />
                                                <img src="/src/assets/tg-rector.svg" alt="tg" />
                                            </div>
                                            <div className="vk">
                                                <img src="/src/assets/vk.svg" alt="vk" />
                                                <img src="/src/assets/vk-rector.svg" alt="vk" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="leads-main-right"><img src="/src/assets/globus.svg" alt="" /></div>
                    </div>
                </div>
            </div>
        </div>
        <div className="yellow-box">
            <div className="container">
                <div className="wrapper">
                    <div className="leads-helpers-container">
                        <div className="item">
                            <div className="descr">Проректор по учебной работе</div>
                            <img src="/src/assets/prorector.png" alt="" />
                            <div className="name">Кислая Ирина Александровна</div>
                        </div>
                        <div className="item">
                            <div className="descr">Проректор по научной работе и инновациям</div>
                            <img src="/src/assets/prorector2.png" alt="" />
                            <div className="name">Вовченко Наталья Геннадьевна</div>
                        </div>
                        <div className="item">
                            <div className="descr">Проректор по развитию образовательных программ и цифровой трансформации</div>
                            <img src="/src/assets/prorector3.png" alt="" />
                            <div className="name">Радченко Юрий Владимирович</div>
                        </div>
                        <div className="item">
                            <div className="descr">Проректор по административно -хозяйственной работе</div>
                            <img src="/src/assets/prorector4.png" alt="" />
                            <div className="name">Никитина Наталья Борисовна</div>
                        </div>
                        <div className="item">
                            <div className="descr">Проректор по воспитательной работе и молодежной политике</div>
                            <img src="/src/assets/prorector5.png" alt="" />
                            <div className="name">Лященко Никита Иванович</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Leads;