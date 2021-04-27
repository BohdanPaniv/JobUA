import React from 'react';
import './AutentificationPage.css';
import LogoIcon from "./../../Images/logo2.png";
import {Button} from "reactstrap";
import { useHistory } from "react-router-dom";
import {Footer} from "../../PageElements/Footer/Footer";

const useFormField = (initialValue) => {
    const [value, setValue] = React.useState(initialValue);

    const onChange = React.useCallback((e) => setValue(e.target.value), []);

    return{
        bind: {
            value,
            onChange
        },
        set: (line) => setValue(line),
        get: () => value
    };
};


export function AutentificationPage(params){
    const [errorList, setErrorList] = React.useState({});

    let firstNameField = useFormField("");
    let lastNameField = useFormField("");
    let loginField = useFormField("");
    let passwordField = useFormField("");
    let history = useHistory();

    function errorsValidator(line){
        let errors = {};

        if (!loginField.get().trim()) errors["Login"] = true;
        if (!passwordField.get().trim()) errors["Password"] = true;

        if (line === "new"){
            if (!firstNameField.get().trim()) errors["FirstName"] = true;
            if (!lastNameField.get().trim()) errors["LastName"] = true;
        }

        return errors;
    }


    function handleSubmit(event, line){
        let xhr = new XMLHttpRequest();
        let err = errorsValidator(line);

        setErrorList(err);

        if (Object.keys(err).length === 0){

            let user = JSON.stringify({
                UserId:"",
                FirstName: firstNameField.get(),
                LastName: lastNameField.get(),
                Login: loginField.get(),
                Password: passwordField.get()});

            switch (line){
                case "registration": {
                    xhr.open("post","api/users", true);
                    xhr.setRequestHeader("Content-Type", "application/json");

                    xhr.onload = function () {
                        if (xhr.status === 200) {
                            let responsedUser = JSON.stringify(xhr.responseText);
                            saveUserToLocal(responsedUser);
                        }
                    };

                    xhr.send(user);
                    break;
                }
                case "login": {
                    xhr.open("get","api/users/"+loginField.get()+","+passwordField.get(), true);
                    xhr.setRequestHeader("Content-Type", "application/json");

                    xhr.onload = function () {
                        if (xhr.status === 200) {
                            let responsedUser = JSON.stringify(xhr.responseText);
                            saveUserToLocal(responsedUser);
                        }
                    };

                    xhr.send();
                    break;
                }
                default:{
                    break;
                }
            }
        }

        event.preventDefault();
    }

    function saveUserToLocal(user){
        let temp = JSON.parse(JSON.parse(user));

        if (temp.userId !== null){
            localStorage.setItem("User", user);
            history.push("/");
            window.location.reload();
        }
        else {
            let errors = {};
            errors["Login"] = true;
            errors["Password"] = true;
            setErrorList(errors);
        }
    }

    if(params.isRegistration){
        return(
            <div className="allContent">
                <header className="firstLay">
                    <a href="/">
                        <img src={LogoIcon} alt="UserIcon" className="loginIcon"/>
                    </a>
                </header>
                <div className="content">
                    <h2 className="titleLogin">Реєстрація</h2>
                    <div className="card-container">
                        <div className="login-card">
                            <form>
                                <input type="text" placeholder="Прізвище" {...lastNameField.bind}/>
                                <input type="text" placeholder="Ім'я" {...firstNameField.bind}/>
                                <input type="email" placeholder="Ел. пошта" {...loginField.bind}/>
                                <input type="password" placeholder="Пароль" {...passwordField.bind}/>
                                <Button className="SubmitButton" onClick={event => handleSubmit(event,"registration")}>Зареєструватись</Button>
                                <p className="text-center"></p>
                            </form>
                        </div>
                    </div>
                </div>
                {/* <Footer/> */}
            </div>
        );
    }
    else{
        return(
            <div className="allContent">
                <header className="firstLay">
                    <a href="/">
                        <img src={LogoIcon} alt="UserIcon" className="loginIcon"/>
                    </a>
                </header>
                <div className="content">
                    <h2 className="titleLogin">Вхід</h2>
                    <div className="card-container">
                        <div className="login-card">
                            <input type="email" placeholder="Ел. пошта" {...loginField.bind}/>
                            <input type="password" placeholder="Пароль" {...passwordField.bind}/>
                            <Button className="SubmitButton" onClick={event => handleSubmit(event,"login")}>Увійти</Button>
                            <p className="text-center">
                                <span className="text-ask">Ще не з нами?</span>
                                <a className="registrationLink" href="/jobseeker/register/">Зареєструватися</a>
                            </p>
                        </div>
                    </div>
                </div>
                {/* <Footer/> */}
            </div>
        );
    }
}