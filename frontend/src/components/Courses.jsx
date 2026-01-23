import { useState } from "react";
import "../styles/Courses.css";
import { Link } from "react-router-dom";

const Courses = () => {

  return (
    <div className="posrel">
        <div className="container">
            <div className="wrapper">
                <div className="courses-container">
                    <h2>Направления</h2>
                    <div className="courses-menu">
                        <img src="/src/assets/courses-img.png" alt="students" />
                        <ul className="courses-menu-links">
                            <li>        
                                <Link to='/#patriot'>
                                    #Будь_патриотом
                                </Link>
                            </li>
                            <li>
                                <Link to='/#volonter'>
                                    #Будь_волонтером
                                </Link>            
                            </li>
                            <li>
                                <Link to='/#studsovet'>
                                    #Будь_Встудсовете
                                </Link>            
                            </li>
                            <li>        
                                <Link to='/#creative'>
                                    #Будь_творческим
                                </Link>
                            </li>
                            <li>
                                <Link to='/#sport'>
                                    #Будь_спортивным
                                </Link>            
                            </li>
                            <li>
                                <Link to='/#studotr'>
                                    #Будь_Встудотрядах
                                </Link>            
                            </li>
                            <li>        
                                <Link to='/#profsouz'>
                                    #Будь_Впрофсоюзе
                                </Link>
                            </li>
                            <li>
                                <Link to='/#iniciative'>
                                    #Будь_инициативным
                                </Link>            
                            </li>
                            <li>
                                <Link to='/#media'>
                                    #Будь_Вмедиа
                                </Link>            
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div className="poloska third"><img src="/src/assets/poloska-courses.svg" alt="students" /></div>
    </div>
  );
};

export default Courses;