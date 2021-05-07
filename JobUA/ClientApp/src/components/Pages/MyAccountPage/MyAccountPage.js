import React,{ useEffect, useState } from 'react';
import './MyAccountPage.css';
import {Spinner} from "reactstrap";
import {AiOutlineUserAdd} from 'react-icons/ai';
import ImageUpload from '../../ImageUpload/ImageUpload';
import Button from 'reactstrap/lib/Button';
import saveObjectToLocal from '../../saveObjectToLocal/saveObjectToLocal';
import NavMenu from '../../PageElements/NavMenu/NavMenu';

function MyAccountPage(props){

    const [user, setUser] = useState();
    const [employer, setEmployer] = useState();
    const [image, setImage] = useState();
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        setUser(JSON.parse(JSON.parse(localStorage.getItem("User"))));
        setImage(JSON.parse(JSON.parse(localStorage.getItem("User"))).image)
        setEmployer(JSON.parse(JSON.parse(localStorage.getItem("Employer"))))
    },[])

    // async function GetUser(){
    //     return new Promise(function (resolve, reject) {
    //         let xhr = new XMLHttpRequest();
    //         let id = JSON.parse(JSON.parse(localStorage.getItem("User"))).userId;

    //         console.log(id);
    //         xhr.open("get","api/users/GetUserById/" + id, true);
    //         xhr.setRequestHeader("Content-Type", "application/json");
    //         xhr.onload = function () {
    //             if (this.status >= 200 && this.status < 300) {
    //                 resolve(JSON.parse(xhr.responseText));
    //             } else {
    //                 reject({
    //                     status: this.status,
    //                     statusText: xhr.statusText
    //                 });
    //             }
    //         };
    //         xhr.onerror = function () {
    //             reject({
    //                 status: this.status,
    //                 statusText: xhr.statusText
    //             });
    //         };
    //         xhr.send();
    //     });
    // }

    async function UpdateUser(type){
        let xhr = new XMLHttpRequest();

        switch(type){
            case "DELETE":
                user.image = null;
                break;
            case "UPDATE":
                user.image = image;
                break;
            default:
                break;
        }

        xhr.open("put","api/users/UpdateUser/", true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function () {
            if (xhr.status === 200) {
                saveObjectToLocal(user,"User");
                window.location.reload();
            }
        };
        
        xhr.send(JSON.stringify(user));
    }

    function GetPasswordView(type){
        let passwordLength = "";
        let passwordView = "";

        switch(type){
            case "employer":
                passwordLength = employer.password.length;
                break;
            case "user":
                passwordLength = user.password.length;
                break;
            default:
                break;
        }

        for(let i = 0; i < passwordLength; i++){
            passwordView +="*";
        }

        return passwordView;
    }

    return(
        <>
            {
                user !== undefined && employer !== undefined  ?
                (
                    <>
                        {
                            props.isEmployerPage ?(
                                <>
                                    <NavMenu isEmployerPage={true}/>
                                    <div className="accountContainer">
                                        <a href="/employer/profile" className="linkToProfile">
                                            Власний розділ
                                        </a>
                                        <h2 className="AccountTitle">
                                            Контактна інформація
                                        </h2>
                                        <div className="cardAccountContainer">
                                            <div className="columnContainer">
                                                <h3>
                                                    Контактна інформація
                                                </h3>
                                                <ul className="ul-horizontal">
                                                    <li>
                                                        П.І.:
                                                    </li>
                                                    <li>
                                                        {`${employer.lastName} ${employer.firstName}`}
                                                    </li>
                                                </ul>
                                                <ul className="ul-horizontal">
                                                    <li >
                                                        Телефон:
                                                    </li>
                                                    <li >
                                                        {employer.phone}
                                                    </li>
                                                </ul>
                                                <ul className="ul-horizontal">
                                                    <li >
                                                        Ел. пошта:
                                                    </li>
                                                    <li >
                                                        {employer.email}
                                                    </li>
                                                </ul>
                                            </div>

                                            
                                            <div className="columnContainer">
                                                <h3>
                                                    Інформація про компанію
                                                </h3>
                                                <ul className="ul-horizontal">
                                                    <li>
                                                        Назва компанії:
                                                    </li>
                                                    <li>
                                                        {employer.companyName}
                                                    </li>
                                                </ul>
                                                <ul className="ul-horizontal">
                                                    <li>
                                                        Кількість співробітників:
                                                    </li>
                                                    <li>
                                                        {employer.employeeCount}
                                                    </li>
                                                </ul>
                                                <ul className="ul-horizontal">
                                                    <li>
                                                        Сайт:
                                                    </li>
                                                    <li>
                                                        {employer.companyLink}
                                                    </li>
                                                </ul>
                                                <ul className="ul-horizontal">
                                                    <li >
                                                        Опис компанії:
                                                    </li>
                                                    <li >
                                                        {employer.description}
                                                    </li>
                                                </ul>
                                            </div>

                                            <a href="/employer/editProfile/personal" className="updateData">
                                                Редагувати
                                            </a>
                                        </div>
                                        <div className="cardAccountContainer">
                                            <h3>
                                                Пароль
                                            </h3>
                                            <p>
                                                {GetPasswordView("employer")}
                                            </p>
                                            <a href="/employer/editProfile/password" className="updateData">
                                                Редагувати
                                            </a>
                                        </div>
                                    </div>
                                </>
                            )
                            :
                            (
                                <>
                                    <NavMenu isEmployerPage={false}/>
                                    <div className="accountContainer">
                                        <a href="/jobseeker/profile" className="linkToProfile">
                                            Власний розділ
                                        </a>

                                        <h2 className="AccountTitle">
                                            Особисті дані
                                        </h2>

                                        <div className="cardAccountContainer">
                                            <div className="columnContainer">
                                                <h3>
                                                    Особисті дані
                                                </h3>
                                                <ul className="ul-horizontal">
                                                    <li>
                                                        П.І.:
                                                    </li>
                                                    <li>
                                                        {`${user.lastName} ${user.firstName}`}
                                                    </li>
                                                </ul>
                                                <ul className="ul-horizontal">
                                                    <li >
                                                        Дата народження:
                                                    </li>
                                                    <li >
                                                        {user.birthday}
                                                    </li>
                                                </ul>
                                                <ul className="ul-horizontal">
                                                    <li >
                                                        Місто:
                                                    </li>
                                                    <li >
                                                        {user.city}
                                                    </li>
                                                </ul>
                                                <ul className="ul-horizontal">
                                                    <li >
                                                        Телефон:
                                                    </li>
                                                    <li >
                                                        {user.phone}
                                                    </li>
                                                </ul>
                                                <ul className="ul-horizontal">
                                                    <li >
                                                        Ел. пошта:
                                                    </li>
                                                    <li >
                                                        {user.email}
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="columnContainer2">
                                                <h3>
                                                    Фото
                                                </h3>
                                                <div className="userImageContainer"></div>
                                                    { 
                                                        image ?(
                                                            <>
                                                                <img src={image} className="userImage" alt="noFoundImage"/>
                                                            </>
                                                        )
                                                        :
                                                        (
                                                            <AiOutlineUserAdd className="userImage"/>
                                                        )
                                                    }
                                                <ImageUpload setImage={setImage} setIsChanged={setIsChanged}/>
                                                    {
                                                        image && (
                                                            <>
                                                                {
                                                                    isChanged === true &&(
                                                                        <Button className="functionButton" onClick={() => UpdateUser("UPDATE")}>
                                                                            Зберегти
                                                                        </Button>
                                                                    )
                                                                }
                                                                
                                                                <Button className="functionButton" onClick={() => UpdateUser("DELETE")}>
                                                                    Видалити
                                                                </Button>
                                                            </>
                                                        )
                                                    }
                                            </div>

                                            <a href="/jobseeker/editProfile/personal" className="updateData">
                                                Редагувати
                                            </a>
                                        </div>
                                        <div className="cardAccountContainer">
                                            <h3>
                                                Пароль
                                            </h3>
                                            <p>
                                                {GetPasswordView("user")}
                                            </p>
                                            <a href="/jobseeker/editProfile/password" className="updateData">
                                                Редагувати
                                            </a>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    </>
                )
                :
                (
                    <>
                        <Spinner/>
                    </>
                )
            }
        </>
    );
}

export default MyAccountPage;