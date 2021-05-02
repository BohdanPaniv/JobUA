import React, { useEffect, useState} from 'react';
import './EditProfile.css';
import Spinner from 'reactstrap/lib/Spinner';
import saveUserToLocal from '../../saveUserToLocal/saveUserToLocal'
import { useHistory } from "react-router-dom";

function EditProfile(){

    const [user, setUser] = useState();
    const [firstName,setFirstName] = useState();
    const [lastName,setLastName] = useState();
    const [byFather,setByFather] = useState();
    const [email,setEmail] = useState();
    const [birthday,setBirthday] = useState();
    const [city,setCity] = useState();
    const [phone,setPhone] = useState();
    let history = useHistory();

    useEffect(() => {
        setUser(JSON.parse(JSON.parse(localStorage.getItem("User"))))
    },[])

    async function UpdateUser(){
        let xhr = new XMLHttpRequest();

        if(firstName !== undefined) user.firstName = firstName;
        if(lastName !== undefined) user.lastName = lastName;
        if(byFather !== undefined) user.byFather = byFather;
        if(email !== undefined) user.email = email;
        if(city !== undefined) user.city = city;
        if(phone !== undefined) user.phone = phone;
        if(birthday !== undefined) user.birthday = birthday;

        xhr.open("put","api/users/UpdateUser/", true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function () {
            if (xhr.status === 200) {
                saveUserToLocal(user);
                history.push("/myAccount");
                window.location.reload();
            }
        };
        
        xhr.send(JSON.stringify(user))
    }

    return(
        <>
            {
                user !== undefined ? (
                    <div className="mainContainer-EP">
                        <div className="title-EP">
                            <a href="/myAccount">
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
                                <a href="/myAccount">Скасувати</a>
                            </div>
                        </div>
                    </div>
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