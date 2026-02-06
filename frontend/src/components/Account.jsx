import React from "react";
import '../styles/Account.css';

const Account = () => {

    const courses = [
        { id: 'patriot', title: '#Будь_патриотом', color: '#ffa5a5'},
        { id: 'volonter', title: '#Будь_волонтером', color: '#6994dd'},
        { id: 'studsovet', title: '#Будь_Встудсовете', color: '#a4ffb8'}
    ];

  return (
    <div>
      <div className="container">
        <div className="wrapper">
          <div className="account-container">
            <h1>Вы записаны на направления: </h1>
            <ul>
                { courses.map(course => (
                    <li 
                        key={course.id}
                        style={{ color: course.color }}
                        className="account"
                    >
                        {course.title}
                    </li>
                ))}
            </ul>
            <img className="account-img" src="/src/assets/lk-img.png" alt="" />
            <div className="account-info">
                Для получения подроборй информации или уточнения интересующих мометов вы можете обратиться в чат!
            </div>
          </div>
        </div>
      </div>
      <div className="poloska first"><img src="/src/assets/poloska-header.svg" alt="" /></div>      
    </div>

  );
};

export default Account;