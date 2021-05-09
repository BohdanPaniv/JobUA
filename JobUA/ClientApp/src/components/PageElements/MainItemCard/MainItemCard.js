import React, { useEffect, useState } from 'react';
import Button from 'reactstrap/lib/Button';
import './MainItemCard.css';
import Spinner from 'reactstrap/lib/Spinner';
import { useHistory } from "react-router-dom";

function MainItemCard(props){
    const [user, setUser] = useState();
    const [employer, setEmployer] = useState();
    const vacancy = props.vacancy;
    const resume = props.resume;
    let resumeLink = "resume/" + resume?.resumeId;
    let vacancyLink ="vacancy/" + vacancy?.vacancyId;

    useEffect(() => {
        if(vacancy !== undefined){
            let xhr = new XMLHttpRequest();
            xhr.open("get","api/employerVacancy/GetEmployerByVacancyId/" + vacancy.vacancyId, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                if (xhr.status === 200) {
                    const tempEmployer = JSON.parse(xhr.responseText);
                    setEmployer(tempEmployer);
                }
            };
            xhr.send();
        }

        if(resume !== undefined){
            let xhr = new XMLHttpRequest();
            xhr.open("get","api/usersResume/GetUserByResumeId/" + resume.resumeId, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                if (xhr.status === 200) {
                    const tempUser = JSON.parse(xhr.responseText);
                    setUser(tempUser);
                }
            };
            xhr.send();
        }
    },[])

    // useEffect(() => {
    //     console.log(resume)
    //     // let xhr = new XMLHttpRequest();
    //     // xhr.open("get","api/resume/GetResumeById/" + pageId, true);
    //     // xhr.setRequestHeader("Content-Type", "application/json");
    //     // xhr.onload = function () {
    //     //     if (xhr.status === 200) {
    //     //         const tempResume = JSON.parse(xhr.responseText);
    //     //         setCheckBox1(tempResume.typeOfEmployment.includes("повна зайнятість"));
    //     //         setCheckBox2(tempResume.typeOfEmployment.includes("неповна зайнятість"));
    //     //         setCheckBox3(tempResume.typeOfEmployment.includes("дистанційна робота"));
    //     //         setCheckBox(tempResume.isWorkExperience);
    //     //         setResume(tempResume);
    //     //     }
    //     // };
    //     // xhr.send();
    // },[resume])

    return(
        <>
            {
                resume !== undefined ?
                (
                    <>
                        {
                            user !== undefined ?
                            (
                                <div className="main-item-card">
                                    <a href={resumeLink} className="main-item-link">
                                        {
                                            resume.post
                                        }
                                    </a>
                                    <div className="main-button-container">
                                        <p>
                                            {user.firstName} {user.lastName}, Дн: {user.birthday}
                                            , {user.city}
                                        </p>
                                        <p>
                                            {resume.typeOfEmployment}, {resume.salary} грн.
                                        </p>
                                        <label className="main-labelItem">
                                            {
                                                resume.publicationDate
                                            }
                                        </label>
                                    </div>
                                </div>
                            )
                            :
                            (
                                <Spinner></Spinner>
                            )
                        }
                    </>
                )
                :
                (
                    <>
                    {
                        employer !== undefined ?(
                            <div className="main-item-card">
                                <a href={vacancyLink} className="main-item-link">
                                    {
                                        vacancy.post
                                    }
                                </a>
                                <div className="main-button-container">
                                    <p>
                                        {
                                            `${employer.companyName} - ${vacancy.city}`
                                        }
                                    </p>
                                    <p>
                                        {
                                            vacancy.typeOfEmployment
                                        }
                                        {
                                            vacancy.isWorkExperience &&
                                            (
                                                `. Досвід: ${vacancy.workExperiencePeriog} р.`
                                            )
                                        }
                                    </p>
                                    <label className="main-labelItem">
                                        {
                                            vacancy.publicationDate
                                        }
                                    </label>
                                </div>
                            </div>
                        )
                        :
                        (
                            <Spinner></Spinner>
                        )
                    }
                    </>
                )
            }
        </>
    )
}

export default MainItemCard;