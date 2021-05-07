import React, { useEffect, useState} from 'react';
import './EditProfile.css';
import Spinner from 'reactstrap/lib/Spinner';
import saveObjectToLocal from '../../saveObjectToLocal/saveObjectToLocal';
import { useHistory } from "react-router-dom";

function EditProfile(props){

    const [user, setUser] = useState();
    const [employer, setEmployer] = useState();

    const [firstName,setFirstName] = useState();
    const [lastName,setLastName] = useState();
    const [byFather,setByFather] = useState();
    const [email,setEmail] = useState();
    const [birthday,setBirthday] = useState();
    const [city,setCity] = useState();
    const [phone,setPhone] = useState();

    const [companyName, setCompanyName] = useState();
    const [employeeCount, setEmployeeCount] = useState();
    const [companyLink, setCompanyLink] = useState();
    const [description, setDescription] = useState();

    const [password1, setPassword1] = useState();
    const [password2, setPassword2] = useState();  
    let history = useHistory();

    useEffect(() => {
        setUser(JSON.parse(JSON.parse(localStorage.getItem("User"))))
        setEmployer(JSON.parse(JSON.parse(localStorage.getItem("Employer"))))
    },[])

    async function UpdateUser(){
        let xhr = new XMLHttpRequest();

        if(props.isEmployerPage){
            if(props.isChangePassword){
                if(password1 !== undefined) employer.password = password1;
            }
            else{
                if(firstName !== undefined) employer.firstName = firstName;
                if(lastName !== undefined) employer.lastName = lastName;
                if(email !== undefined) employer.email = email;
                if(phone !== undefined) employer.phone = phone;
                if(companyName !== undefined) employer.companyName = companyName;
                if(employeeCount !== undefined) employer.employeeCount = employeeCount;
                if(companyLink !== undefined) employer.companyLink = companyLink;
                if(description !== undefined) employer.description = description;
            }

            xhr.open("put","api/employers/UpdateEmployer/", true);
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onload = function () {
                if (xhr.status === 200) {
                    saveObjectToLocal(employer, "Employer");
                    history.push("/employer/myAccount");
                    window.location.reload();
                }
            };

            xhr.send(JSON.stringify(employer))
        }
        else{
            if(props.isChangePassword){
                if(password1 !== undefined) user.password = password1;
            }
            else{
                if(firstName !== undefined) user.firstName = firstName;
                if(lastName !== undefined) user.lastName = lastName;
                if(byFather !== undefined) user.byFather = byFather;
                if(email !== undefined) user.email = email;
                if(city !== undefined) user.city = city;
                if(phone !== undefined) user.phone = phone;
                if(birthday !== undefined) user.birthday = birthday;
            }
            
            xhr.open("put","api/users/UpdateUser/", true);
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onload = function () {
                if (xhr.status === 200) {
                    saveObjectToLocal(user, "User");
                    history.push("/jobseeker/myAccount");
                    window.location.reload();
                }
            };

            xhr.send(JSON.stringify(user))
        }

        console.log(xhr)
    }

    return(
        <>
            {
                user !== undefined && employer !== undefined ? (
                    <>
                    {
                        props.isEmployerPage ? 
                        (
                            <>
                                {
                                    props.isChangePassword ?
                                    (
                                        <div className="mainContainer-EP">
                                            <div className="title-EP">
                                                <a href="/employer/myAccount">
                                                    Власні дані
                                                </a>
                                                <h2 className="mainTitle-EP">
                                                    Пароль
                                                </h2>
                                            </div>
                                            <div className="contentContainer">
                                                <div className="contentGroup">
                                                    <label>Новий пароль:</label>
                                                    <input type="password" onChange={event => setPassword1(event.target.value)}/>
                                                </div>
                                                <div className="contentGroup">
                                                    <label>Новий пароль ще раз:</label>
                                                    <input type="password" onChange={event => setPassword2(event.target.value)}/>
                                                </div>
                                                <div className="lastGroup">
                                                    <input type="submit" value="Зберегти" className="SubmitButton-EP" onClick={UpdateUser} name="Зберегти"/>
                                                    <label>або</label>
                                                    <a href="/employer/myAccount">Скасувати</a>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                    :
                                    (
                                        <div className="mainContainer-EP">
                                            <div className="title-EP">
                                                <a href="/employer/myAccount">
                                                    Власні дані
                                                </a>
                                                <h2 className="mainTitle-EP">
                                                    Особисті дані
                                                </h2>
                                            </div>
                                            <div className="contentContainer">
                                                <div className="contentGroup">
                                                    <label>Прізвище:</label>
                                                    <input type="text" defaultValue={employer.lastName} onChange={event => setLastName(event.target.value)}/>
                                                </div>
                                                <div className="contentGroup">
                                                    <label>Ім'я:</label>
                                                    <input type="text" defaultValue={employer.firstName} onChange={event => setFirstName(event.target.value)}/>
                                                </div>
                                                <div className="contentGroup">
                                                <label>Мобільний телефон:</label>
                                                    {
                                                        employer.phone !== null ?(
                                                            <input type="text" defaultValue={employer.phone} onChange={event => setPhone(event.target.value)}/>
                                                        )
                                                        :
                                                        (
                                                            <input type="text" placeholder="+380" onChange={event => setPhone(event.target.value)}/>
                                                        )
                                                    }
                                                </div>
                                                <div className="contentGroup">
                                                    <label>Ел. пошта:</label>
                                                    <input type="email" defaultValue={employer.email} onChange={event => setEmail(event.target.value)}/>
                                                </div>
                                                <div className="contentGroup">
                                                    <label>Назва компанії:</label>
                                                    <input type="text" defaultValue={employer.companyName} onChange={event => setCompanyName(event.target.value)}/>
                                                </div>
                                                <div className="contentGroup">
                                                    <label>Кількість співробітників:</label>
                                                    <select defaultValue={employer.employeeCount} onChange={event => setEmployeeCount(event.target.value)}>
                                                        <option value="<10">менше 10</option>
                                                        <option value="10-50">від 10 до 50</option>
                                                        <option value="50-250">від 50 до 250</option>
                                                        <option value="250-1000">від 250 до 1000</option>
                                                        <option value="1000>">більше 1000</option>
                                                        <option value="">не вказувати</option>
                                                    </select>
                                                </div>
                                                <div className="contentGroup">
                                                    <label>Сайт:</label>
                                                    <input type="text" defaultValue={employer.companyLink} onChange={event => setCompanyLink(event.target.value)}/>
                                                </div>
                                                <div className="contentGroup">
                                                    <label>Опис компанії:</label>
                                                    <input type="text" defaultValue={employer.description} onChange={event => setDescription(event.target.value)}/>
                                                </div>
                                                <div className="lastGroup">
                                                    <input type="submit" value="Зберегти" className="SubmitButton-EP" onClick={UpdateUser} name="Зберегти"/>
                                                    <label>або</label>
                                                    <a href="/employer/myAccount">Скасувати</a>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </>
                        )
                        :
                        (
                            <>
                                {
                                    props.isChangePassword ? 
                                    (
                                        <div className="mainContainer-EP">
                                            <div className="title-EP">
                                                <a href="/jobseeker/myAccount">
                                                    Власні дані
                                                </a>
                                                <h2 className="mainTitle-EP">
                                                    Пароль
                                                </h2>
                                            </div>
                                            <div className="contentContainer">
                                                <div className="contentGroup">
                                                    <label>Новий пароль:</label>
                                                    <input type="password" onChange={event => setPassword1(event.target.value)}/>
                                                </div>
                                                <div className="contentGroup">
                                                    <label>Новий пароль ще раз:</label>
                                                    <input type="password" onChange={event => setPassword2(event.target.value)}/>
                                                </div>
                                                <div className="lastGroup">
                                                    <input type="submit" value="Зберегти" className="SubmitButton-EP" onClick={UpdateUser} name="Зберегти"/>
                                                    <label>або</label>
                                                    <a href="/jobseeker/myAccount">Скасувати</a>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                    :
                                    (
                                        <div className="mainContainer-EP">
                                            <div className="title-EP">
                                                <a href="/jobseeker/myAccount">
                                                    Власні дані
                                                </a>
                                                <h2 className="mainTitle-EP">
                                                    Особисті дані
                                                </h2>
                                            </div>
                                            <div className="contentContainer">
                                                <div className="contentGroup">
                                                    <label>Прізвище:</label>
                                                    <input type="text" defaultValue={user.lastName} onChange={event => setLastName(event.target.value)}/>
                                                </div>
                                                <div className="contentGroup">
                                                    <label>Ім'я:</label>
                                                    <input type="text" defaultValue={user.firstName} onChange={event => setFirstName(event.target.value)}/>
                                                </div>
                                                <div className="contentGroup">
                                                    <label>По батькові:</label>
                                                    <input type="text" defaultValue={user.byFather} onChange={event => setByFather(event.target.value)}/>
                                                </div>
                                                <div className="contentGroup">
                                                    <label>Дата народження:</label>
                                                    {
                                                        user.birthday !== null ? (
                                                            <input type="date" defaultValue={user.birthday} onChange={event => setBirthday(event.target.value)}/>
                                                        )
                                                        :
                                                        (
                                                            <input type="date" onChange={event => setBirthday(event.target.value)}/>
                                                        )
                                                    }
                                                </div>
                                                <div className="contentGroup">
                                                    <label>Місто проживання:</label>
                                                    <input type="text" defaultValue={user.city} onChange={event => setCity(event.target.value)}/>
                                                </div>
                                                <div className="contentGroup">
                                                <label>Мобільний телефон:</label>
                                                    {
                                                        user.phone !== null ?(
                                                            <input type="text" defaultValue={user.phone} onChange={event => setPhone(event.target.value)}/>
                                                        )
                                                        :
                                                        (
                                                            <input type="text" placeholder="+380" onChange={event => setPhone(event.target.value)}/>
                                                        )
                                                    }
                                                </div>
                                                <div className="contentGroup">
                                                    <label>Ел. пошта:</label>
                                                    <input type="email" defaultValue={user.email} onChange={event => setEmail(event.target.value)}/>
                                                </div>
                                                <div className="lastGroup">
                                                    <input type="submit" value="Зберегти" className="SubmitButton-EP" onClick={UpdateUser} name="Зберегти"/>
                                                    <label>або</label>
                                                    <a href="/jobseeker/myAccount">Скасувати</a>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </>
                        )
                    }
                    </>
                )
                :
                (
                    <Spinner></Spinner>
                )
            }
        </>
    );
}

export default EditProfile;