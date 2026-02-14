import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import '../styles/Account.css';
import api from "../api";

const Account = () => {

  const courses = [
    { id: 'patriot', title: '#Будь_патриотом', color: '#ffa5a5'},
    { id: 'volonter', title: '#Будь_волонтером', color: '#6994dd'},
    { id: 'studsovet', title: '#Будь_Встудсовете', color: '#a4ffb8'}
  ];
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchSections = async () => {
      const response = await api.get("account/section/");
      setSections(response.data)
      // console.log({sections})
    };

    fetchSections();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="wrapper">
          <div className="account-container">
            <h1>Вы записаны на направления: </h1>
            <ul>
                { sections.map(course => 
                (
                    <li 
                        key={course.id}
                        className="account"
                    >
                        {course.section}
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
      <Footer />
    </div>
  );
};

export default Account;