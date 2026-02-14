// import { useState } from "react";
import "../styles/About.css";
import { Link } from "react-router-dom";

const About = () => {
    
  return (
    <div className="posrel">
        <div className="container">
            <div className="wrapper">
                <div className="about-container" id="about">
                    <h2>О нас</h2>
                    <h3>ИСТОРИЯ РГЭУ (РИНХ)</h3>
                    <div className="about-history-container">
                        <div className="about-history-first">
                            <h4>РФЭИ</h4>
                            <div className="history-first-grid">
                                <div className="history-grid-row1">
                                    <div className="item">В январе 1931 года секретариат краевого комитета ВКП(б) утвердил решение о реорганизации экономического факультета СевероКавказского государственного университета в Ростовский финансовоэкономический институт</div>
                                </div>
                                <div className="history-grid-row2">
                                    <div className="item">Постановлением Совета Народных Комиссаров СССР от 28 февраля 1933 г. за №330 РФЭИ был включен в список высших учебных заведений страны.</div>
                                    <div className="item">В РФЭИ не было факультетской системы. Институт осуществлял подготовку по двум специальностям: государственному бюджету и кредиту.</div>
                                </div>
                            </div>
                        </div>
                        <div className="history-line-box">
                            <img src="/src/assets/history-line1.svg" alt="" className="history-line" />
                        </div>
                        <div className="about-history-second">
                            <h4>РИНХ</h4>
                            <div className="history-second-grid">
                                <div className="history-grid-row1">
                                    <img src="/src/assets/pencil.svg" alt="" />
                                    <div className="item">13 октября 1964 г. приказом Министерства высшего и среднего специального образования РСФСР №718 РФЭИ был переименован в Ростовский институт народного хозяйства</div>
                                </div>
                                <div className="history-grid-row2">
                                    <div className="item">В 1971 г. приказом Минвуза РИНХ переводился в институт первой категории. За заслуги в подготовке квалифицированных специалистов и развитии научных исследований Указом Президиума Верховного Совета СССР от 15 октября 1981 г. Ростовский-на-Дону институт народного хозяйства был награжден орденом "Знак Почета".</div>
                                </div>
                            </div>
                        </div>
                        <div className="history-line-box">
                            <img src="/src/assets/history-line2.svg" alt="" className="history-line" />
                        </div>
                        <div className="about-history-third">
                            <h4>РГЭА</h4>
                            <div className="history-third-grid">
                                <div className="history-grid-row1">
                                    <div className="item">В 1994 году РИНХ успешно прошел государственную аттестацию и был преобразован в Государственную экономическую академию (РГЭА).</div>
                                    <div className="item">В академии началась подготовка специалистов на основе многоуровневой системы (бакалавр - магистр), получило развитие дистанционное обучение и экстернат.</div>
                                </div>
                                <div className="history-grid-row2">
                                    <div className="item">Примечательной особенностью деятельности академии в 90-е годы стало создание и укрепление широкой сети филиалов в Ростовской области, в Краснодарском и Ставропольском краях</div>
                                </div>
                            </div>
                        </div>
                        <div className="history-line-box">
                            <img src="/src/assets/history-line1.svg" alt="" className="history-line" />
                        </div>            
                        <div className="about-history-fourth">
                            <h4>РГЭУ(РИНХ)</h4>
                            <div className="history-fourth-grid">
                                <div className="history-grid-row1">
                                    <img src="/src/assets/img-rsue.png" alt="" />
                                    <div className="item fs-24">В 2000 году вуз прошел очередную государственную аттестацию, получил статус университета и наименование – Ростовский государственный экономический университет (РИНХ).</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="poloska second"><img src="/src/assets/poloska-about.svg" alt="" /></div>
    </div>
  );
};

export default About;