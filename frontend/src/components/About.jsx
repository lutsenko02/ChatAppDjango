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
                                    <div className="item">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute </div>
                                </div>
                                <div className="history-grid-row2">
                                    <div className="item">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute </div>
                                    <div className="item">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute </div>
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
                                    <div className="item">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute </div>
                                </div>
                                <div className="history-grid-row2">
                                    <div className="item">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute </div>
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
                                    <div className="item">ut labore et doloread minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute </div>
                                    <div className="item">elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute </div>
                                </div>
                                <div className="history-grid-row2">
                                    <div className="item">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute </div>
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
                                    <div className="item">elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute </div>
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