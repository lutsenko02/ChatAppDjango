import { useState, useEffect } from "react";
import "../styles/ActiveCourse.css";
import Form from "../components/Form";

const ActiveCourse = () => {
  // const [isOpen, setIsOpen] = useState(false);

  // 1. Состояние для хранения данных о разделах курса
  const [courseSections, setCourseSections] = useState([]);
  
  // 2. Состояние для отслеживания загрузки
  const [isLoading, setIsLoading] = useState(true);
  
  // 3. Функция для имитации получения данных с сервера
  const fetchCourseData = async () => {
    // Имитация задержки сети (в реальном проекте здесь будет fetch)
    await new Promise(resolve => setTimeout(resolve, 0));
    
    // Данные, которые пришли бы с сервера
    return [
      { id: 'patriot', 
        title: '#Будь_патриотом', 
        color: '#ffa5a5', 
        button_name: 'Присоединиться!' 
      },
      { id: 'volonter', 
        title: '#Будь_волонтером', 
        color: '#6994dd', 
        button_name: 'Стать волонтером!' 
      },
      { id: 'studsovet', 
        title: '#Будь_Встудсовете', 
        color: '#a4ffb8', 
        button_name: 'Войти в студсовет!' 
      },
      { id: 'creative', 
        title: '#Будь_творческим', 
        color: '#FFD6A5', 
        button_name: 'Проявить себя!' 
      },
      { id: 'sport', 
        title: '#Будь_спортивным', 
        color: '#CAFFBF', 
        button_name: 'Вступить в команду!' 
      },
      { id: 'studotr', 
        title: '#Будь_Встудотрядах', 
        color: '#9BF6FF', 
        button_name: 'Присоединиться к отряду!' 
      },
      { id: 'profsouz', 
        title: '#Будь_Впрофсоюзе', 
        color: '#FFC6FF', 
        button_name: 'Вступить в профсоюз!' 
      }, 
      { id: 'iniciative', 
        title: '#Будь_инициативным', 
        color: '#FFFFD8', 
        button_name: 'Предложить идею!' 
      },
      { id: 'media', 
        title: '#Будь_Вмедиа', 
        color: '#ebcaff', 
        button_name: 'Выйти в эфир!' 
      },
    ];
  };
  
  // 4. Хук useEffect для загрузки данных при монтировании компонента
  useEffect(() => {
    const loadCourseContent = async () => {
      try {
        setIsLoading(true);
        const sectionsData = await fetchCourseData();
        setCourseSections(sectionsData);
      } catch (error) {
        console.error("Ошибка загрузки курса:", error);
        // В случае ошибки можно показать заглушку
        setCourseSections([
          { id: 'error', title: 'Курс временно недоступен', color: '#000000' }
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Вызываем функцию загрузки
    loadCourseContent();
  }, []); // Пустой массив зависимостей = выполнится один раз при монтировании

  return (
    <div className="posrel">
      <div className="course-content">
        {isLoading ? 
        (
          <div className="content-loading">
            <h3>Материалы направлений загружаются...</h3>
          </div>
        ) : (
          courseSections.map(section => (
            <section 
              key={section.id} 
              id={section.id} 
              className="course-section"
            >
              <div 
                className="course-section-container"
                style={{ backgroundColor: section.color }}
              >
                {/* <div className="container">
                  <div className="wrapper"> */}
                    <div className="course-section-img">
                      <img src={(`/src/assets/${section.id}.png`)} alt="" />
                    </div>
                  {/* </div>
                </div> */}
                <h3 className="course-title-name">
                  {section.title}
                </h3>
              </div>


                  <div 
                    className="course-open-form"
                    style={{ backgroundColor: section.color }}
                  >
                    {section.button_name}
                  </div>

            </section>
          ))
        )}
          <Form
            // onClose={handleBackToChatList}
          />
      </div>
    </div>
  );
};

export default ActiveCourse;