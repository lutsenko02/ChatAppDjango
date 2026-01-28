import { useState } from "react";
import "../styles/Courses.css";
import { Link } from "react-router-dom";

// Данные для якорных ссылок
const COURSE_SECTIONS = [
  { id: 'patriot', title: '#Будь_патриотом', color: '#ffa5a5' }, // Пастельно-розовый
  { id: 'volonter', title: '#Будь_волонтером', color: '#6994dd' }, // Пастельно-голубой
  { id: 'studsovet', title: '#Будь_Встудсовете', color: '#a4ffb8' }, // Пастельно-фиолетовый
  { id: 'creative', title: '#Будь_творческим', color: '#FFD6A5' }, // Пастельно-оранжевый
  { id: 'sport', title: '#Будь_спортивным', color: '#CAFFBF' }, // Пастельно-зеленый
  { id: 'studotr', title: '#Будь_Встудотрядах', color: '#9BF6FF' }, // Пастельно-бирюзовый
  { id: 'profsouz', title: '#Будь_Впрофсоюзе', color: '#FFC6FF' }, // Пастельно-фуксия
  { id: 'iniciative', title: '#Будь_инициативным', color: '#FFFFD8' }, // Пастельно-желтый
  { id: 'media', title: '#Будь_Вмедиа', color: '#ebcaff' }, // Пастельно-лиловый
];

const Courses = () => {
  // Если нужно будет динамически загружать данные с сервера
  // const [courseSections, setCourseSections] = useState(COURSE_SECTIONS);

  return (
    <div className="posrel">
      <div className="container">
        <div className="wrapper">
          <div className="courses-container" id="courses">
            <h2>Направления</h2>
            <div className="courses-menu">
              <img src="/src/assets/courses-img.png" alt="students" />
              <ul className="courses-menu-links">
                {COURSE_SECTIONS.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} style={{ color: section.color }}>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="poloska third">
        <img src="/src/assets/poloska-courses.svg" alt="students" />
      </div>
    </div>
  );
};

export default Courses;