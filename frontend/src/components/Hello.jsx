import React from "react";
import '../styles/Hello.css';

const Hello = () => {

  return (
    <div>
      <div className="container">
        <div className="wrapper home-header-wrapper">
          <div className="home-header">
            <h1>Добро пожаловать в РИНХ</h1>
            <p>На этом портале вы можете познакоиться с институтом поближе и узнать какие активности вас тут ждут!</p>
          </div>
          <img className="home-img" src="/src/assets/home-img.png" alt="логотип РИНХ" />
        </div>
      </div>
      <div className="poloska first"><img src="/src/assets/poloska-header.svg" alt="" /></div>      
    </div>

  );
};

export default Hello;