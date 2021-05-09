import React from 'react';
import Button from 'reactstrap/lib/Button';
import './ItemCard.css';
import { useHistory } from "react-router-dom";

function ItemCard(props){
    const vacancy = props.vacancy;
    const resume = props.resume;
    let history = useHistory();
    let resumeLink = "/jobseeker/ResumePage/" + resume?.resumeId;
    let vacancyLink = "/employer/VacancyPage/" + vacancy?.vacancyId;

    async function DeleteItem(){
        let xhr = new XMLHttpRequest();
        
        if(resume !== undefined){
            xhr.open("put","api/usersresume/DeleteResumeById/" + resume.resumeId, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                if (xhr.status === 200) {
                    window.location.reload();
                }
            };
            xhr.send();
        }
        else{
            xhr.open("put","api/employerVacancy/DeleteVacancyById/" + vacancy.vacancyId, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                if (xhr.status === 200) {
                    window.location.reload();
                }
            };
            xhr.send();
        }
    }

    return(
        <>
            {
                resume !== undefined ?
                (
                    <div className="item-card">
                        <a href={resumeLink} className="item-link">
                            {
                                resume.post
                            }
                        </a>
                        <div className="button-container">
                            <Button className="edit-button default-button" onClick={() => { history.push(`/jobseeker/editResume/${resume.resumeId}`);}}>Редагувати</Button>
                            <Button className="delete-button default-button" onClick={() => DeleteItem()}>Видалити</Button>
                            <label className="labelItem">
                                {
                                    resume.publicationDate
                                }
                            </label>
                        </div>
                    </div>
                )
                :
                (
                    <div className="item-card">
                        <a href={vacancyLink} className="item-link">
                            {
                                vacancy.post
                            }
                        </a>
                        <div className="button-container">
                            <Button className="edit-button default-button" onClick={() => { history.push(`/employer/editVacancy/${vacancy.vacancyId}`);}}>Редагувати</Button>
                            <Button className="delete-button default-button" onClick={() => DeleteItem()}>Видалити</Button>
                            <label className="labelItem">
                                {
                                    vacancy.publicationDate
                                }
                            </label>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default ItemCard;