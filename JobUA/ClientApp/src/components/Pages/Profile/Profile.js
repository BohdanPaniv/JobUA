import React, { useEffect, useState } from 'react';
import './Profile.css';
import {Spinner} from "reactstrap";
import { AiOutlineFileText, AiOutlineUser } from 'react-icons/ai';
import { MdExitToApp } from "react-icons/md"
import NavMenu from '../../PageElements/NavMenu/NavMenu';

function Profile(props){

    const [user, setUser] = useState();
    const [employer, setEmployer] = useState();

    useEffect(() => {
        setUser(JSON.parse(JSON.parse(localStorage.getItem("User"))))
    },[])

    useEffect(() => {
        setEmployer(JSON.parse(JSON.parse(localStorage.getItem("Employer"))))
    },[])

    return(
        <>
            {
                user !== undefined && employer !== undefined ?
                (
                    <>
                    {
                        props.isEmployerPage ?
                        (
                            <>
                                <NavMenu isEmployerPage={props.isEmployerPage}/>
                                <div className="profileContainer">
                                    <h2 className="profileTitleText">
                                        Вітаємо, {employer.firstName}!
                                    </h2>
                                    <div className="cardResume">
                                        <a href="/employer" className="linkToResume">
                                            <ul className="containerResume">
                                                <li>
                                                    <AiOutlineFileText className="resumeIcon"/>
                                                </li>
                                                <li>
                                                    <ul className="containerText">
                                                <li>
                                                    <h4>Розмістіть вакансію</h4>
                                                </li>
                                                <li>
                                                    <p>
                                                        Шукачі зможуть знайти вас і обговорити умови.
                                                    </p>
                                                </li>
                                                    </ul> 
                                                </li>
                                            </ul>
                                        </a>
                                    </div>
                                    <ul className="profileInlineMenu">
                                        <li className="menuComponent">
                                            <a href="/employer" className="menuLink">
                                                <div className="iconContainer">
                                                    <AiOutlineFileText className="menuIcon"/>
                                                </div>
                                                <p className="textMenu">
                                                    Мої вакансії
                                                </p>
                                            </a>
                                        </li>
                                        <li className="menuComponent">
                                            <a href="/employer/myAccount" className="menuLink">
                                                <div className="iconContainer">
                                                    <AiOutlineUser className="menuIcon"/>
                                                </div>
                                                <p className="textMenu">
                                                    Власні дані
                                                </p>
                                            </a>
                                        </li>
                                        <li className="menuComponent">
                                            <a href="/employer" className="menuLink" onClick={() =>{localStorage.removeItem("Employer");}}>
                                                <div className="iconContainer">
                                                    <MdExitToApp className="menuIcon"/>
                                                </div>
                                                <p className="textMenu">
                                                    Вихід
                                                </p>
                                            </a>
                                        </li>
                                    </ul>
                                </div>  
                            </>
                        )
                        :
                        (
                            <>
                                <NavMenu isEmployerPage={props.isEmployerPage}/>
                                <div className="profileContainer">
                                    <h2 className="profileTitleText">
                                        Вітаємо, {user.firstName}!
                                    </h2>
                                    <div className="cardResume">
                                        <a href="/jobseeker/сreateResume/" className="linkToResume">
                                            <ul className="containerResume">
                                                <li>
                                                    <AiOutlineFileText className="resumeIcon"/>
                                                </li>
                                                <li>
                                                    <ul className="containerText">
                                                        <li>
                                                            <h4>Розмістіть резюме</h4>
                                                        </li>
                                                        <li>
                                                            <p>
                                                                Роботодавці зможуть знайти вас і запропонувати хорошу роботу.
                                                            </p>
                                                        </li>
                                                    </ul> 
                                                </li>
                                            </ul>
                                        </a>
                                    </div>

                                    <ul className="profileInlineMenu">
                                        <li className="menuComponent">
                                            <a href="/jobseeker/myResumes/" className="menuLink">
                                                <div className="iconContainer">
                                                    <AiOutlineFileText className="menuIcon"/>
                                                </div>
                                                <p className="textMenu">
                                                    Мої резюме
                                                </p>
                                            </a>
                                        </li>
                                        <li className="menuComponent">
                                            <a href="/jobseeker/myAccount" className="menuLink">
                                                <div className="iconContainer">
                                                    <AiOutlineUser className="menuIcon"/>
                                                </div>
                                                <p className="textMenu">
                                                    Власні дані
                                                </p>
                                            </a>
                                        </li>
                                        <li className="menuComponent">
                                            <a href="/" className="menuLink" onClick={() =>{localStorage.removeItem("User");}}>
                                                <div className="iconContainer">
                                                    <MdExitToApp className="menuIcon"/>
                                                </div>
                                                <p className="textMenu">
                                                    Вихід
                                                </p>
                                            </a>
                                        </li>
                                    </ul>
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

export default Profile;