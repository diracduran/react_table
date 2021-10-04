import './App.css';
import React, { useState } from 'react';
import data from './workers.json'
import { nanoid } from 'nanoid'; //генератор id

function App() {

    const [workers, setWorkers] = useState(data); // data - работники
    const [addFormData, setAddFormData] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
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
          firstName: addFormData.firstName,
          middleName: addFormData.middleName,
          lastName: addFormData.lastName,
          phone: addFormData.phone,
          email: addFormData.email,
          workerdDays: addFormData.workerdDays,
          salaryPerDay: addFormData.salaryPerDay,
        };

        const newWorkers = [...workers, newWorker]; // новый массив работников с новым работником
        setWorkers(newWorkers);
        setAddFormData(addFormData);
    };

    // const totalSalary = ;

    return (
        <div className="app-container">
            <table>
                <thead>
                    <tr>
                    <th>Фамилия</th>
                    <th>Имя</th>
                    <th>Отчество</th>
                    <th>Телефон</th>
                    <th>Эл. почта</th>
                    <th>Кол-во отработан. дней</th>
                    <th>Зарплатная ставка на день</th>
                    <th>Зарплата</th>
                    </tr>
                </thead>
                <tbody>
                    {workers.map(worker => (
                        <tr key={worker.id}>
                            <td>{worker.firstName}</td>
                            <td>{worker.middleName}</td>
                            <td>{worker.lastName}</td>
                            <td>{worker.phone}</td>
                            <td>{worker.email}</td>
                            <td>{worker.workerdDays}</td>
                            <td>{worker.salaryPerDay}</td>
                            <td>{Number(worker.workerdDays) * Number(worker.salaryPerDay)}</td>
                        </tr>
                    ))} 
                    <tr>
                        <td colSpan="7" style={{textAlign: 'right'}}>Σ: </td>
                        <td>{workers.map((worker) => Number(worker.workerdDays) * Number(worker.salaryPerDay)).reduce((a, b) => a + b, 0)}</td>
                    </tr>
                </tbody>
            </table>
            <h2>Добавить работника</h2>
            <form onSubmit={handleAddFormSubmit}>
                <input
                type="text"
                name="firstName"
                placeholder="Имя"
                onChange={handleAddFormChange}
                />
                <input
                type="text"
                name="middleName"
                placeholder="Отчество"
                onChange={handleAddFormChange}
                />
                <input
                type="text"
                name="lastName"
                placeholder="Фамилия"
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
