import React, { useCallback, useEffect, useState } from 'react';
import Spinner from 'reactstrap/lib/Spinner';
import NavMenu from '../../PageElements/NavMenu/NavMenu';
import ItemCardList from '../../PageElements/ItemCardList/ItemCardList';
import './MyItems.css';

function MyItems(props){

    const [user, setUser] = useState();
    const [employer, setEmployer] = useState();

    const [resumeList, setResumeList] = useState();
    const [vacancyList, setVacancyList] = useState();

    const getResumes = useCallback(() =>{
        if(user !== undefined){
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
    }, [user])

    const getVacancies = useCallback(() =>{
        if(employer !== undefined){
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
    }, [employer])

    useEffect(() =>{
        if(!resumeList){
            getResumes();
        }
    }, [resumeList, getResumes])

    useEffect(() =>{
        if(!vacancyList){
            getVacancies();
        }
    }, [vacancyList, getVacancies])

    useEffect(() => {
        setUser(JSON.parse(JSON.parse(localStorage.getItem("User"))));
        setEmployer(JSON.parse(JSON.parse(localStorage.getItem("Employer"))));
    },[])

    return(
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
                                        <ItemCardList list={resumeList} /*getResumes={getResumes}*/></ItemCardList>
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
                                        <ItemCardList list={vacancyList} /*getResumes={getResumes}*/></ItemCardList>
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

export default MyItems;