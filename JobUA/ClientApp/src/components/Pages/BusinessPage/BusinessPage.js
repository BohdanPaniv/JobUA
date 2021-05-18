import React, { useState, useEffect } from 'react';
import './BusinessPage.css';
import { useParams } from "react-router-dom";
import { TextField } from '@material-ui/core';
import NavMenu from '../../PageElements/NavMenu/NavMenu';
import Spinner from 'reactstrap/lib/Spinner';

function BusinessPage(props){
    const [person, setPerson] = useState();
    const [formData, setFormData] = useState();
    const pageId = useParams().id;

    useEffect(() => {
        if(pageId !== undefined){
            let xhr = new XMLHttpRequest();
            
            if(props.isResume){
                xhr.open("get","api/resume/GetResumeById/" + pageId, true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        const tempFormData = JSON.parse(xhr.responseText);
                        setFormData(tempFormData);
                    }
                };
                xhr.send();
            }
            else{
                xhr.open("get","api/vacancy/GetVacancyById/" + pageId, true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        const tempFormData = JSON.parse(xhr.responseText);
                        setFormData(tempFormData);
                    }
                };
                xhr.send();
            }

            console.log(xhr)
        }
    }, [pageId,props.isResume])

    useEffect(() => {
        let xhr = new XMLHttpRequest();

        if(props.isResume){
            xhr.open("get","api/usersResume/GetUserByResumeId/" + pageId, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                if (xhr.status === 200) {
                    const tempPerson = JSON.parse(xhr.responseText);
                    setPerson(tempPerson);
                }
            };
            xhr.send();
        }
        else{
            xhr.open("get","api/employerVacancy/GetEmployerByVacancyId/" + pageId, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                if (xhr.status === 200) {
                    const tempPerson = JSON.parse(xhr.responseText);
                    setPerson(tempPerson);
                }
            };
            xhr.send();
        }
    }, [props.isResume, pageId])
    
    return(
        <>
            {
                person !== undefined && formData !== undefined ?
                (
                    <>
                        {
                            props.isResume ?
                            (
                                <>
                                    <NavMenu isEmployerPage={true}/>
                                    <div className="mainContainer-FP">
                                        <div className="title-FP">
                                            <a href="/employer">
                                                Усі резюме
                                            </a>
                                        </div>
                                        <div className="contentContainer-FP">
                                            <h3>
                                                {formData.post}
                                            </h3>
                                            <div className="image-container">
                                                <img src={person?.image} alt="Error" className="resume-image"/>
                                            </div>
                                            <div className="contentGroup-FP">
                                                <p>
                                                    П.І.Б.: {person.firstName} {person.lastName} {person.byFather}
                                                </p>
                                            </div>
                                            <div className="contentGroup-FP">
                                                <p>
                                                    Зарпалата: {formData.salary} грн на місяць
                                                </p>
                                            </div>
                                            <div className="contentGroup-FP">
                                                <p>
                                                    Місце роботи: {formData.city}
                                                </p>
                                            </div>
                                            <div className="contentGroup-FP">
                                                <p>
                                                    Вид зайнятості: {formData.typeOfEmployment}
                                                </p>
                                            </div>
                                            <h3>
                                                Досвід роботи
                                            </h3>
                                            {
                                                formData.isWorkExperience ?
                                                (
                                                    <>
                                                        <div className="salartGroup-FP">
                                                            <p>Досвід роботи: є</p>
                                                        </div>
                                                        <div className="contentGroup-FP">
                                                            <p>
                                                                Назва компанії: {formData.companyName}
                                                            </p>
                                                        </div>
                                                        <div className="contentGroup-FP">
                                                            <p>
                                                                Місто: {formData.companyCity}
                                                            </p>
                                                        </div>
                                                        <div className="contentGroup-FP">
                                                            <p>
                                                                Посада: {formData.companyPost}
                                                            </p>
                                                        </div>
                                                        <div className="contentGroup-FP">
                                                            <p>
                                                                Період роботи з: {formData.periodOfWorkStart}
                                                            </p>
                                                        </div>
                                                        <div className="contentGroup-FP">
                                                            <p>
                                                                По: {formData.periodOfWorkEnd}
                                                            </p>
                                                        </div>
                                                        <div className="contentGroup-FP">
                                                            <p>
                                                                Досягнення: {formData.achievements}
                                                            </p>
                                                        </div>
                                                    </>
                                                )
                                                :
                                                (
                                                    <>
                                                        <div className="salartGroup-FP">
                                                            <p>Досвід роботи: не має</p>
                                                        </div>
                                                    </>
                                                )
                                            }
                                            <h3>
                                                Освіта
                                            </h3>
                                            <div className="contentGroup-FP">
                                                <p>
                                                    Освіта: {formData.educationalLevel}
                                                </p>
                                            </div>
                                            <div className="contentGroup-FP">
                                                <p>
                                                    Навчальни заклад: {formData.educationalInstitution}
                                                </p>
                                            </div>
                                            <div className="contentGroup-FP">
                                                <p>
                                                    Місто: {formData.educationCity}
                                                </p>
                                            </div>
                                            <div className="contentGroup-FP">
                                                <p>
                                                    Спеціальність: {formData.specialty}
                                                </p>
                                            </div>
                                            <div className="contentGroup-FP">
                                                <p>
                                                    Період навчання з: {formData.trainingPeriodStart}
                                                </p>
                                            </div>
                                            <div className="contentGroup-FP">
                                                <p>
                                                    По: {formData.trainingPeriodEnd}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                            :
                            (
                                <>
                                    <NavMenu isEmployerPage={false}/>
                                    <div className="mainContainer-FP">
                                        <div className="title-FP">
                                            <a href="/">
                                                Усі вакансії
                                            </a>
                                        </div>
                                        <div className="contentContainer-FP">
                                            <h3>
                                                {formData.post}
                                            </h3>
                                            <div className="contentGroup-FP">
                                                <p>
                                                    Зарпалата: {formData.salary} грн на місяць
                                                </p>
                                            </div>
                                            <div className="contentGroup-FP">
                                                <p>
                                                    Місце роботи: {formData.city}
                                                </p>
                                            </div>
                                            <div className="contentGroup-FP">
                                                <p>
                                                    Вид зайнятості: {formData.typeOfEmployment}
                                                </p>
                                            </div>
                                            <div className="contentGroup-FP">
                                                <p>
                                                    Кількість співробіників: {person.employeeCount}
                                                </p>
                                            </div>
                                            {
                                                formData.isWorkExperience ?
                                                (
                                                    <>
                                                        <div className="salartGroup-FP">
                                                            <p>Досвід роботи: {formData.workExperiencePeriog} р.</p>
                                                        </div>
                                                    </>
                                                )
                                                :
                                                (
                                                    <>
                                                        <div className="salartGroup-FP">
                                                            <p>Досвід роботи: не вимагається</p>
                                                        </div>
                                                    </>
                                                )
                                            }
                                            <div className="contentGroup-FP">
                                                <p>
                                                    Освіта: {formData.educationalLevel}
                                                </p>
                                            </div>
                                            <h3>
                                                Опис вакансії
                                            </h3>
                                            <div className="contentGroup-FP">
                                                <TextField readOnly value={formData.vacancyDescription} className="multiline" multiline/>
                                            </div>
                                            <h3>
                                                Опис компанії
                                            </h3>
                                            <div className="contentGroup-FP">
                                                <TextField readOnly value={person.description} className="multiline" multiline/>
                                            </div>
                                            <h3>
                                                Контактні дані
                                            </h3>
                                            <div className="contentGroup-FP">
                                                <p>
                                                    Пошта: {person.email}
                                                </p>
                                            </div>
                                            <div className="contentGroup-FP">
                                                <p>
                                                    Сайт: 
                                                    <a href={person.companyLink}>
                                                        {person.companyLink}
                                                    </a>
                                                </p>
                                            </div>
                                            <div className="contentGroup-FP">
                                                <p>
                                                    Номер: {person.phone}, {person.firstName}
                                                </p>
                                            </div>
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
    )
}

export default BusinessPage;