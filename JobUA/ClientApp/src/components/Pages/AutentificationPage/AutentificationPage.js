import React, { useCallback} from 'react';
import './AutentificationPage.css';
import LogoIcon from "../../Images/logo2.png";
import EmployerIcon from "../../Images/employer_logo.png";
import { useHistory } from "react-router-dom";
import saveObjectToLocal from '../../saveObjectToLocal/saveObjectToLocal';

const useFormField = (initialValue) => {
    const [value, setValue] = React.useState(initialValue);

    const onChange = useCallback((e) => setValue(e.target.value), []);

    return{
        bind: {
            value,
            onChange
        },
        set: (line) => setValue(line),
        get: () => value
    };
};

function AutentificationPage(params){

    let history = useHistory();

    let firstNameField = useFormField("");
    let lastNameField = useFormField("");
    let email = useFormField("");
    let loginField = useFormField("");
    let passwordField = useFormField("");
    let companyName = useFormField("");
    let employeeCount = useFormField("");
    let companyLink = useFormField("");
    let description = useFormField("");
    let phone = useFormField("");

    function errorsValidator(error){
        let login = document.getElementById("login");
        login.innerText = null;
        let password = document.getElementById("password");
        password.innerText = null;

        if (!loginField.get().trim()){
            login.innerText = "Заповніть поле 'Логін'";
            error++;
        } 
        if (!passwordField.get().trim()){
            password.innerText = "Заповніть поле 'Пароль'";
            error++;
        }

        if(params.isRegistration){
            let firstNameElement = document.getElementById("firstNameElement");
            firstNameElement.innerText = null;
            let lastNameElement = document.getElementById("lastNameElement");
            lastNameElement.innerText = null;

            if(params.isEmployerPage === true){
                let emailElement = document.getElementById("emailElement");
                emailElement.innerText = null;
                let companyNameElement = document.getElementById("companyNameElement");
                companyNameElement.innerText = null;
                let employeeCountElement = document.getElementById("employeeCountElement");
                employeeCountElement.innerText = null;
                let companyLinkElement = document.getElementById("companyLinkElement");
                companyLinkElement.innerText = null;
                let descriptionElement = document.getElementById("descriptionElement");
                descriptionElement.innerText = null;
                let phoneElement = document.getElementById("phoneElement");
                phoneElement.innerText = null;

                if (!email.get().trim()){
                    emailElement.innerText = "Заповніть поле 'Пошта'";
                    error++;
                } 

                if (!companyName.get().trim()){
                    companyNameElement.innerText = "Заповніть поле 'Імя компанії'";
                    error++;
                }
                
                if (!employeeCount.get().trim()){
                    employeeCountElement.innerText = "Заповніть поле 'Кількість співробітників'";
                    error++;
                } 

                if (!companyLink.get().trim()){
                    companyLinkElement.innerText = "Заповніть поле 'Посилання'";
                    error++;
                }

                if (!description.get().trim()){
                    descriptionElement.innerText = "Заповніть поле 'Опис'";
                    error++;
                } 
                
                if (!phone.get().trim()){
                    phoneElement.innerText = "Заповніть поле 'Телефон'";
                    error++;
                }
            }

            if (!firstNameField.get().trim()){
                firstNameElement.innerText = "Заповніть поле 'Ім'я'";
                error++;
            } 

            if (!lastNameField.get().trim()){
                lastNameElement.innerText = "Заповніть поле 'Прізвище'";
                error++;
            }
        }

        return error;
    }


    function handleSubmit(event, line){
        let xhr = new XMLHttpRequest();
        let error = 0;
        error = errorsValidator(error);

        console.log(error)

        if (error === 0){
            
            if(params.isEmployerPage){
                let employer = ({
                    EmployerId:"",
                    FirstName: firstNameField.get(),
                    LastName: lastNameField.get(),
                    Email: email.get(),
                    Login: loginField.get(),   
                    Password: passwordField.get(),
                    CompanyName: companyName.get(),
                    EmployeeCount: employeeCount.get(),
                    CompanyLink: companyLink.get(),
                    Description: description.get(),
                    Phone: phone.get()
                });
    
                switch (line){
                    case "registration": {

                        xhr.open("post","api/employers", true);
                        xhr.setRequestHeader("Content-Type", "application/json");
    
                        xhr.onload = function () {
                            if (xhr.status === 200) {
                                let responsedEmployer = JSON.parse(xhr.responseText);
                                saveObjectToLocal(responsedEmployer, "Employer");
                                history.push("/employer");
                            }
                        };
    
                        xhr.send(JSON.stringify(employer));
                        console.log(xhr)
                        break;
                    }
                    case "login": {
                        xhr.open("get","api/employers/GetEmployerByLoginPassword/"+loginField.get()+","+passwordField.get(), true);
                        xhr.setRequestHeader("Content-Type", "application/json");
    
                        xhr.onload = function () {
                            if (xhr.status === 200) {
                                let responsedEmployer = JSON.parse(xhr.responseText);
                                console.log(responsedEmployer)
                                if(!responsedEmployer.employerId){
                                    let login = document.getElementById("login");
                                    login.innerText = "Логін або пароль не правильний!";
                                }
                                else{
                                    console.log(1)
                                    saveObjectToLocal(responsedEmployer,"Employer");
                                    history.push("/employer");
                                }
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
            else{
                let user = ({
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
                                let responsedUser = JSON.parse(xhr.responseText);
                                saveObjectToLocal(responsedUser,"User");
                                history.push("/");
                            }
                        };
    
                        xhr.send(JSON.stringify(user));
                        break;
                    }
                    case "login": {
                        xhr.open("get","api/users/GetUserByLoginPassword/"+loginField.get()+","+passwordField.get(), true);
                        xhr.setRequestHeader("Content-Type", "application/json");
    
                        xhr.onload = function () {
                            if (xhr.status === 200) {
                                let responsedUser = JSON.parse(xhr.responseText);
                                console.log(responsedUser)

                                if(!responsedUser.userId){
                                    console.log(1);
                                    let login = document.getElementById("login");
                                    login.innerText = "Логін або пароль не правильний!";
                                }
                                else{
                                    saveObjectToLocal(responsedUser,"User");
                                    history.push("/");
                                }
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
        }

        event.preventDefault();
    }

    return(
        <>
            {
                params.isRegistration ?
                (
                    // Employer Registration.
                    params.isEmployerPage === true ?(
                        <div className="allContent">
                            <header className="firstLay">
                                <a href="/employer">
                                    <img src={EmployerIcon} alt="UserIcon" className="loginIcon"/>
                                </a>
                            </header>
                            <div className="content">
                                <h2 className="titleLogin">Реєстрація роботодавця</h2>
                                <div className="card-container">
                                    <p>
                                        Зареєструйтеся, щоб розміщувати вакансії та отримати доступ до всіх послуг для роботодавців.
                                    </p>
                                    <div className="login-card2">
                                        <form className="form-card">
                                            <h3>Дані для входу</h3>
                                            <div className="form-group">
                                                <label>Ел. пошта:</label>
                                                <input type="email" {...email.bind}/>
                                                <label id="emailElement"></label>
                                            </div>
                                            <div className="form-group">
                                                <label>Логін:</label>
                                                <input type="text" {...loginField.bind}/>
                                                <label id="login"></label>
                                            </div>
                                            <div className="form-group">
                                                <label>Пароль:</label>
                                                <input type="password" autoComplete="on" {...passwordField.bind}/>
                                                <label id="password"></label>
                                            </div>
                                            
                                            <h3 className="title-group">Інформація про компанію</h3>
                                            <div className="form-group">
                                                <label>Назва компанії:</label>
                                                <input type="text" {...companyName.bind}/>
                                                <label id="companyNameElement"></label>
                                            </div>  
                                            <div className="form-group">
                                                <label>Кількість співробітників у компанії:</label>
                                                <select {...employeeCount.bind}>
                                                    <option value="<10">менше 10</option>
                                                    <option value="10-50">від 10 до 50</option>
                                                    <option value="50-250">від 50 до 250</option>
                                                    <option value="250-1000">від 250 до 1000</option>
                                                    <option value="1000>">більше 1000</option>
                                                    <option value="">не вказувати</option>
                                                </select>
                                                <label id="employeeCountElement"></label>
                                            </div>
                                            <div className="form-group">
                                                <label>Сайт вашої компанії:</label>
                                                <input type="text" {...companyLink.bind}/>
                                                <label id="companyLinkElement"></label>
                                            </div>
                                            <div className="form-group">
                                                <label>Опис компанії:</label>
                                                <input type="text" {...description.bind}/>
                                                <label id="descriptionElement"></label>
                                            </div>
                                            <h3 className="title-group">Контактна інформація</h3>
                                            <div className="form-group">
                                                <label>Прізвище:</label>
                                                <input type="text" {...lastNameField.bind}/>
                                                <label id="lastNameElement"></label>
                                            </div>
                                            <div className="form-group">
                                                <label>Ім'я:</label>
                                                <input type="text" {...firstNameField.bind}/>
                                                <label id="firstNameElement"></label>
                                            </div>
                                            <div className="form-group">
                                                <label>Телефон:</label>
                                                <input type="text" {...phone.bind}/>
                                                <label id="phoneElement"></label>
                                            </div>                            
                                            
                                            <input type="submit" value="Зареєструватись" className="SubmitButton field" onClick={event => handleSubmit(event,"registration")}/>
                                            <p className="text-center">
                                                <a className="registrationLink" href="/employer">Головна сторінка</a>
                                            </p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    :
                    (
                        // Jobseeker Registration.
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
                                        <input className="field" type="text" placeholder="Прізвище" {...lastNameField.bind}/>
                                        <label id="lastNameElement"></label>
                                        <input className="field" type="text" placeholder="Ім'я" {...firstNameField.bind}/>
                                        <label id="firstNameElement"></label>
                                        <input className="field" type="text" placeholder="Логін" {...loginField.bind}/>
                                        <label id="login"></label>
                                        <input className="field" type="password" autoComplete="on" placeholder="Пароль" {...passwordField.bind}/>
                                        <label id="password"></label>
                                        <input type="submit" value="Зареєструватись" className="SubmitButton field" onClick={event => handleSubmit(event,"registration")}/>
                                        <p className="text-center">
                                            <a className="registrationLink" href="/">Головна сторінка</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                )
                :
                (
                    // Employer Login.
                    params.isEmployerPage === true ?(
                            <div className="allContent">
                                <header className="firstLay">
                                    <a href="/employer">
                                        <img src={EmployerIcon} alt="UserIcon" className="loginIcon"/>
                                    </a>
                                </header>
                                <div className="content">
                                    <h2 className="titleLogin">Вхід</h2>
                                    <div className="card-container">
                                        <div className="login-card">
                                            {/* <form> */}
                                                <input className="field" type="text" placeholder="Логін" {...loginField.bind}/>
                                                <label id="login"></label>
                                                <input className="field" type="password" autoComplete="on" placeholder="Пароль" {...passwordField.bind}/>
                                                <label id="password"></label>
                                                <input className="SubmitButton field" type="submit" value="Увійти" onClick={event => handleSubmit(event,"login")}/>
                                            {/* </form> */}
                                            <p className="text-center">
                                                <span className="text-ask">Ще не з нами?</span>
                                                <a className="registrationLink" href="/employer/register/">Зареєструватись</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    )
                    :
                    (
                        // Jobseeker login.
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
                                        {/* <form> */}
                                            <input className="field" type="text" placeholder="Логін" {...loginField.bind}/>
                                            <label id="login"></label>
                                            <input className="field" type="password" autoComplete="on" placeholder="Пароль" {...passwordField.bind}/>
                                            <label id="password"></label>
                                            <input className="SubmitButton field" type="submit" value="Увійти" onClick={event => handleSubmit(event,"login")}/>
                                        {/* </form> */}
                                        <p className="text-center">
                                            <span className="text-ask">Ще не з нами?</span>
                                            <a className="registrationLink" href="/jobseeker/register/">Зареєструватись</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                )
            }
        </>
    );
}

export default AutentificationPage;