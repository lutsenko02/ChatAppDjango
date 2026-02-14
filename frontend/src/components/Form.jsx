import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import '../styles/Form.css';
import { useMaskito } from '@maskito/react';
import { maskitoPhoneOptionsGenerator } from '@maskito/phone';
import metadata from 'libphonenumber-js/metadata.min.json';

const Form = () => {
  const [username, setUsername] = useState("");
  const [date, setDate] = useState("");
  const [group, setGroup] = useState("");
  const [faculties, setFaculties] = useState([]);  // массив факультетов для списка
  const [selectedFaculty, setSelectedFaculty] = useState("");  // выбранный ID
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [interesting, setInteresting] = useState("");
  const [experience, setExperience] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [errorChecked, setErrorChecked] = useState('');

  const phoneMaskOptions = maskitoPhoneOptionsGenerator({
    countryIsoCode: 'RU',
    metadata: metadata,
    // Добавляем настройки форматирования
    prefix: '+7', // Префикс номера
    mask: '+7 (000) 000-00-00', // Явно указываем формат маски
    lazy: true, // Показывать маску сразу, даже когда поле пустое
  });

  const inputRef = useMaskito({ options: phoneMaskOptions });

  useEffect(() => {
    const fetchFaculties = async () => {
      const response = await api.get("/faculty/");
      setFaculties(response.data)
      console.log(response.data)
    };

    fetchFaculties();
  }, []);


    // const handleSubmit = async (event) => {
    //     event.preventDefault();

    //     if (!isChecked && method == "register") {
    //         setLoading(false);
    //         setErrorChecked('Вы должны принять условия!');
    //         return;
    //     }

    //     try {

    //         const res = await api.post(route, { username, password, email});

    //     } catch (error) {
    //         console.error(error);
    //         if (error.response) {
    //             if (error.response.status === 401) {
    //                 setError("Недействительные учетные данные");
    //             } else if (error.response.status === 400) {
    //                 setError("имя пользователя уже существует");
    //             } else {
    //                 setError("Что-то пошло не так. Попробуйте ещё раз.");
    //             }
    //         } else if (error.request) {
    //             setError("Ошибка сети. Проверьте подключение к интернету.");
    //         } else {
    //             setError("Что-то пошло не так. Попробуйте ещё раз.");
    //         }
    //     } finally {
    //         setLoading(false);
    //     }
    // };

  return (
    <>
    <div className="classes-box">
      <div className="container">
        <button className="close-button" >✖</button>
        <h2>#Будь в теме</h2>
        <form 
        // onSubmit={handleSubmit} 
        className="classes-form"
        >
          <div className="form-group">
              <label htmlFor="username">Ваше ФИО</label>
              <input 
                  type="username" 
                  id="username" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Иванов Иван Иванович" 
                  required 
              />
          </div>
          <div className="form-group">
              <label htmlFor="date">Дата рождения</label>
              <input 
                  type="date" 
                  id="date" 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)}
                  required 
              />
          </div>
          <div className="form-group">
              <label htmlFor="group">Ваша группа</label>
              <input 
                  type="group" 
                  id="group" 
                  value={group} 
                  onChange={(e) => setGroup(e.target.value)}
                  placeholder="ИСТ-112" 
                  required 
              />
          </div>
          <div className="form-group">
            <label htmlFor="faculty">Выберите ваш факультет</label>
            <select 
              onChange={(e) => setSelectedFaculty(e.target.value)} 
              value={selectedFaculty}
            >
              {faculties.map((faculty) => (
                <option key={faculty.id} value={faculty.id}>
                  {faculty.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
              <label htmlFor="phone">Номер телефона</label>
              <input 
                  type="tel" 
                  id="phone" 
                  ref={inputRef}
                  placeholder="+7 (___) ___-__-__"
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)}
                  required 
              />
          </div>
          <div className="form-group">
              <label htmlFor="email">Ваша почта</label>
              <input 
                  type="email" 
                  id="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ivanov@mail.ru" 
                  required 
              />
          </div>
          <div className="form-group">
              <label htmlFor="interesting">Почему это направление интересно?</label>
              <textarea  
                  type="interesting" 
                  id="interesting" 
                  value={interesting} 
                  onChange={(e) => setInteresting(e.target.value)}
                  placeholder="Напишите текст здесь" 
                  required 
              />
          </div>
          <div className="form-group">
              <label htmlFor="experience">Был ли какой-то опыт в данном направлении?</label>
              <textarea  
                  type="experience" 
                  id="experience" 
                  value={experience} 
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="Напишите текст здесь" 
                  required 
              />
          </div>
          <div className="policy">
              <input 
                  type="checkbox" 
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
              />
              <div className="policy-message">
                  <p>Согласен(а) с <span className="toggle-link" onClick={() => navigate("/privacy-policy")}>Политикой обработки персональных данных.</ span></p>
                  {errorChecked && <p style={{ color: 'red', fontWeight: "500" }}>{errorChecked}</p>}
              </div>
          </div>
        </form>
      </div>
    </div>
    </ >
  );
};

export default Form;