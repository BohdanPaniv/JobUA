import React, { useState, useEffect } from 'react';
import './BusinessPage.css';
import { useParams } from "react-router-dom";
import { TextField } from '@material-ui/core';
import Button from 'reactstrap/lib/Button';
import NavMenu from '../../PageElements/NavMenu/NavMenu';
import Spinner from 'reactstrap/lib/Spinner';

function BusinessPage(props){
    const [person, setPerson] = useState();
    const [formData, setFormData] = useState();
    const pageId = useParams().id;

    useEffect(() => {
        if(pageId !== undefined){
            let xhr = new XMLHttpRequest();
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
    }, [pageId])

    useEffect(() => {
        if(props.isResume){

        }
        else{
            let xhr = new XMLHttpRequest();
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
    }, [])

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
    
                                            {/* <div className="lastGroup-FP">
                                                <Button className="default-button" >Редагувати</Button>
                                            </div> */}
                                            {/*onClick={() => { history.push(`/employer/editVacancy/${vacancy.vacancyId}`);}} */}
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