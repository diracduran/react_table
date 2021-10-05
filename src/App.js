import './App.css';
import React, { useState } from 'react';
import data from './workers.json'
import { nanoid } from 'nanoid'; //генератор id

function App() {

    const [workers, setWorkers] = useState(data); // data - работники
    const [addFormData, setAddFormData] = useState({
        fullName: "",
        birthdate: "",
        phone: "",
        email: "",
        workerdDays: "",
        salaryPerDay: "",
    });

    const handleAddFormChange = (event) => {  // добавление данных в инпуты
        event.preventDefault();
    
        const fieldName = event.target.getAttribute("name"); //-> в какой инпут вносятся данные
        const fieldValue = event.target.value; //-> какие данные
    
        const newFormData = { ...addFormData }; // копия существующих данных (addFormData)...
        newFormData[fieldName] = fieldValue; // ...и их обновление
    
        setAddFormData(newFormData);
    };

    const handleAddFormSubmit = (event) => { // добавление данных инпутов в таблицу
        event.preventDefault();
    
        const newWorker = {
          id: nanoid(),
          fullName: addFormData.fullName,
          birthdate: addFormData.birthdate,
          phone: addFormData.phone,
          email: addFormData.email,
          workerdDays: addFormData.workerdDays,
          salaryPerDay: addFormData.salaryPerDay,
        };

        const newWorkers = [...workers, newWorker]; // новый массив работников с новым работником
        setWorkers(newWorkers);
        setAddFormData(addFormData);
    };

    return (
        <div className="app-container">
            <table>
                <thead>
                    <tr>
                    <th>ФИО</th>
                    <th>Телефон</th>
                    <th>Дата рождения</th>
                    <th>Эл. почта</th>
                    <th>Кол-во отработан. дней</th>
                    <th>Зарплатная ставка на день</th>
                    <th>Зарплата</th>
                    </tr>
                </thead>
                <tbody>
                    {workers.map(worker => (
                        <tr key={worker.id}>
                            <td>{worker.fullName}</td>
                            <td>{worker.phone}</td>
                            <td>{worker.birthdate}</td>
                            <td>{worker.email}</td>
                            <td>{worker.workerdDays}</td>
                            <td>{worker.salaryPerDay}</td>
                            <td>{Number(worker.workerdDays) * Number(worker.salaryPerDay)}</td>
                        </tr>
                    ))} 
                    <tr>
                        <td colSpan="6" style={{textAlign: 'right'}}>Σ: </td>
                        <td>{workers.map((worker) => Number(worker.workerdDays) * Number(worker.salaryPerDay)).reduce((a, b) => a + b, 0)}</td>
                    </tr>
                </tbody>
            </table>
            <h2>Добавить работника</h2>
            <form onSubmit={handleAddFormSubmit}>
            <input
                type="text"
                name="fullName"
                placeholder="ФИО"
                onChange={handleAddFormChange}
                />
                <input
                type="text"
                name="birthdate"
                placeholder="Дата рождения"
                onChange={handleAddFormChange}
                />
                <input
                type="text"
                name="phone"
                placeholder="Телефон"
                onChange={handleAddFormChange}
                />
                <input
                type="email"
                name="email"
                placeholder="Эл. почта"
                onChange={handleAddFormChange}
                />
                <input
                type="text"
                name="workerdDays"
                placeholder="Кол-во отраб. дней"
                onChange={handleAddFormChange}
                />
                <input
                type="text"
                name="salaryPerDay"
                placeholder="Зарплатн. ставка на день"
                onChange={handleAddFormChange}
                />
                <button type="submit">Добавить</button>
            </form>
        </div>
    );
}

export default App;
