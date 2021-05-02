import React, { useEffect, useState } from 'react';
import './Profile.css';
import {Spinner} from "reactstrap";
import { AiOutlineFileText, AiOutlineUser } from 'react-icons/ai';
import { MdExitToApp } from "react-icons/md"
import NavMenu from '../../PageElements/NavMenu/NavMenu';

function Profile(){

    const [user, setUser] = useState();

    useEffect(() => {
        setUser(JSON.parse(JSON.parse(localStorage.getItem("User"))))
    },[])

    return(
        <>
            {
                user !== undefined ?
                (
                    <>
                        <NavMenu isEmployer={false}/>
                        <div className="profileContainer">
                            <h2 className="profileTitleText">
                                Вітаємо, {user.firstName}!
                            </h2>
                            <div className="cardResume">
                                <a href="/" className="linkToResume">
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
                                    <a href="/" className="menuLink">
                                        <div className="iconContainer">
                                            <AiOutlineFileText className="menuIcon"/>
                                        </div>
                                        <p className="textMenu">
                                            Мої резюме
                                        </p>
                                    </a>
                                </li>
                                <li className="menuComponent">
                                    <a href="/myAccount" className="menuLink">
                                        <div className="iconContainer">
                                            <AiOutlineUser className="menuIcon"/>
                                        </div>
                                        <p className="textMenu">
                                            Власні дані
                                        </p>
                                    </a>
                                </li>
                                <li className="menuComponent">
                                    <a href="/" className="menuLink" onClick={() =>{localStorage.clear();}}>
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
                        <Spinner/>
                    </>
                )
            }
        </>
    );
}

export default Profile;