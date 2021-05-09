import React from 'react';
import Button from 'reactstrap/lib/Button';
import './ItemCard.css';
import { useHistory } from "react-router-dom";

function ItemCard(props){
    const resume = props.resume;
    let history = useHistory();
    let link = "/jobseeker/ResumePage/" + resume.resumeId;

    async function DeleteItem(){
        let xhr = new XMLHttpRequest();
        xhr.open("put","api/usersresume/DeleteResumeById/" + resume.resumeId, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {
            if (xhr.status === 200) {
                window.location.reload();
            }
        };
        xhr.send();
    }

    console.log(resume);

    return(
        <>
            <div className="item-card">
                <a href={link} className="item-link">
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
        </>
    )
}

export default ItemCard;