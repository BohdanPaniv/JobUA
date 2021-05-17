import React, { useEffect, useState } from 'react';
import Spinner from 'reactstrap/lib/Spinner';
import NavMenu from '../../PageElements/NavMenu/NavMenu';
import ItemCardList from '../../PageElements/ItemCardList/ItemCardList';
import './MyItems.css';

function MyItems(props){

    const [user, setUser] = useState();
    const [employer, setEmployer] = useState();
    const [title, setTitle] = useState("");

    const [resumeList, setResumeList] = useState();
    const [vacancyList, setVacancyList] = useState();

    useEffect(() => {
        if(!props.isMainPage){
            setUser(JSON.parse(JSON.parse(localStorage.getItem("User"))));
            setEmployer(JSON.parse(JSON.parse(localStorage.getItem("Employer"))));
        }
    },[props.isMainPage])

    useEffect(() =>{
        if(employer !== undefined && employer !== null){
            let xhr = new XMLHttpRequest();
            xhr.open("get","api/employervacancy/GetVacanciesByEmployerId/" + employer.employerId, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                if (xhr.status === 200) {
                    setVacancyList(JSON.parse(xhr.responseText))
                }
            };
            xhr.send();
        }
    },[employer])

    useEffect(() =>{
        if(user !== undefined && user !== null){
            let xhr = new XMLHttpRequest();
            xhr.open("get","api/usersResume/GetResumesByUserId/" + user.userId, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                if (xhr.status === 200) {
                    setResumeList(JSON.parse(xhr.responseText))
                }
            };
            xhr.send();
        }
    },[user])

    useEffect(() => {
        if(props.isResumePage){
            let xhr = new XMLHttpRequest();
        
            if(title !== ""){
                xhr.open("get","api/vacancy/GetVacanciesByTitle/" + title, true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        setVacancyList(JSON.parse(xhr.responseText))
                    }
                };
                xhr.send();
            }
            else{
                xhr.open("get","api/vacancy/GetVacancies/", true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        setVacancyList(JSON.parse(xhr.responseText))
                    }
                };
                xhr.send();
            }
        }
        else{
            let xhr = new XMLHttpRequest();
        
            if(title !== ""){
                xhr.open("get","api/resume/GetResumesByTitle/" + title, true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        setResumeList(JSON.parse(xhr.responseText))
                    }
                };
                xhr.send();
            }
            else{
                xhr.open("get","api/resume/GetResumes/", true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        setResumeList(JSON.parse(xhr.responseText))
                    }
                };
                xhr.send();
            }
        }
    }, [title, props.isResumePage])

    return(
        <>
            {
                props.isMainPage ?
                (
                    <>
                        {
                            props.isResumePage ?
                            (
                                <>
                                    <div className="cardContainer">
                                        <div className="searchTitle">
                                            <label>
                                                Пошук за посадою:
                                            </label>
                                            <input type="text" onChange={event => setTitle(event.target.value)}/>
                                        </div>
                                        <h3>
                                            Вакансії
                                        </h3>
                                        <ItemCardList list={vacancyList} isResumePage={true} isMainPage={true}></ItemCardList>
                                    </div>
                                </>
                            )
                            :
                            (
                                <>
                                    <div className="cardContainer">
                                        <div className="searchTitle">
                                            <label>
                                                Пошук за посадою:
                                            </label>
                                            <input type="text" onChange={event => setTitle(event.target.value)}/>
                                        </div>
                                        <h3>
                                            Резюме
                                        </h3>
                                        <ItemCardList list={resumeList} isResumePage={false} isMainPage={true}></ItemCardList>
                                    </div>
                                </>
                            )
                        }
                    </>
                )
                :
                (
                    <>
                        {
                            user !== undefined && employer !== undefined ?(
                                <>
                                    {
                                        props.isResumePage ?
                                        (
                                            <>
                                                <NavMenu isEmployerPage={false}/>
                                                <div className="cardContainer">
                                                    <a href="/jobseeker/profile" style={{color:'black'}}>
                                                        <h5>
                                                            Профіль
                                                        </h5>
                                                    </a>
                                                    <h2 className="title-container-resume">
                                                        Мої резюме
                                                    </h2>
                                                    <ItemCardList list={resumeList} isResumePage={true} isMainPage={false} /*getResumes={getResumes}*/></ItemCardList>
                                                </div>
                                            </>
                                        )
                                        :
                                        (
                                            <>
                                                <NavMenu isEmployerPage={true}/>
                                                <div className="cardContainer">
                                                    <a href="/employer/profile" style={{color:'black'}}>
                                                        <h5>
                                                            Профіль
                                                        </h5>
                                                    </a>
                                                    <h2 className="title-container-resume">
                                                        Мої вакансії
                                                    </h2>
                                                    <ItemCardList list={vacancyList} isResumePage={false} isMainPage={false} /*getResumes={getResumes}*/></ItemCardList>
                                                </div>
                                            </>
                                        )
                                    }
                                </>
                            )
                            :
                            (
                                <Spinner/>
                            )
                        }
                    </>
                )
            }
        </>
    )
}

export default MyItems;