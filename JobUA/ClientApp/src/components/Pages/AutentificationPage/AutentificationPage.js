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
    //const [errorList, setErrorList] = useState({});

    let firstNameField = useFormField("");
    let lastNameField = useFormField("");
    let email = useFormField("");
    let loginField = useFormField("");
    let passwordField = useFormField("");
    let passwordField2 = useFormField("");
    let companyName = useFormField("");
    let employeeCount = useFormField("");
    let companyLink = useFormField("");
    let description = useFormField("");
    let phone = useFormField("");
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

        //setErrorList(err);

        if (Object.keys(err).length === 0){

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

                        console.log("a")
                        xhr.open("post","api/employers", true);
                        xhr.setRequestHeader("Content-Type", "application/json");
    
                        xhr.onload = function () {
                            if (xhr.status === 200) {
                                let responsedEmployer = JSON.parse(xhr.responseText);
                                saveObjectToLocal(responsedEmployer, "Employer");
                                history.push("/employer");
                                window.location.reload();
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
                                saveObjectToLocal(responsedEmployer, "Employer");
                                history.push("/employer");
                                window.location.reload();
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
                                window.location.reload();
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
                                saveObjectToLocal(responsedUser,"User");
                                history.push("/");
                                window.location.reload();
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
                                            </div>
                                            <div className="form-group">
                                                <label>Логін:</label>
                                                <input type="text" {...loginField.bind}/>
                                            </div>
                                            <div className="form-group">
                                                <label>Пароль:</label>
                                                <input type="password" autoComplete="on" {...passwordField.bind}/>
                                            </div>
                                            <div className="form-group">
                                                <label>Пароль ще раз:</label>
                                                <input type="password" autoComplete="on" {...passwordField2.bind}/>
                                            </div>
                                            
                                            <h3 className="title-group">Інформація про компанію</h3>
                                            <div className="form-group">
                                                <label>Назва компанії:</label>
                                                <input type="text" {...companyName.bind}/>
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
                                            </div> 
                                            <div className="form-group">
                                                <label>Сайт вашої компанії:</label>
                                                <input type="text" {...companyLink.bind}/>
                                            </div>   
                                            <div className="form-group">
                                                <label>Опис компанії:</label>
                                                <input type="text" {...description.bind}/>
                                            </div>

                                            <h3 className="title-group">Контактна інформація</h3>
                                            <div className="form-group">
                                                <label>Прізвище:</label>
                                                <input type="text" {...lastNameField.bind}/>
                                            </div>
                                            <div className="form-group">
                                                <label>Ім'я:</label>
                                                <input type="text" {...firstNameField.bind}/>
                                            </div>
                                            <div className="form-group">
                                                <label>Телефон:</label>
                                                <input type="text" {...phone.bind}/>
                                            </div>                            
                                            
                                            <input type="submit" value="Зареєструватись" className="SubmitButton field" onClick={event => handleSubmit(event,"registration")}/>
                                            <p className="text-center"></p>
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
                                        <form>
                                            <input className="field" type="text" placeholder="Прізвище" {...lastNameField.bind}/>
                                            <input className="field" type="text" placeholder="Ім'я" {...firstNameField.bind}/>
                                            <input className="field" type="text" placeholder="Логін" {...loginField.bind}/>
                                            <input className="field" type="password" autoComplete="on" placeholder="Пароль" {...passwordField.bind}/>
                                            <input type="submit" value="Зареєструватись" className="SubmitButton field" onClick={event => handleSubmit(event,"registration")}/>
                                            <p className="text-center"></p>
                                        </form>
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
                                            <form>
                                                <input className="field" type="text" placeholder="Логін" {...loginField.bind}/>
                                                <input className="field" type="password" autoComplete="on" placeholder="Пароль" {...passwordField.bind}/>
                                                <input className="SubmitButton field" type="submit" value="Увійти" onClick={event => handleSubmit(event,"login")}/>
                                            </form>
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
                                        <form>
                                            <input className="field" type="text" placeholder="Логін" {...loginField.bind}/>
                                            <input className="field" type="password" autoComplete="on" placeholder="Пароль" {...passwordField.bind}/>
                                            <input className="SubmitButton field" type="submit" value="Увійти" onClick={event => handleSubmit(event,"login")}/>
                                        </form>
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