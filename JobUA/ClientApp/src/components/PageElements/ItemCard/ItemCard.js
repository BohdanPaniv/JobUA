import React from 'react';
import Button from 'reactstrap/lib/Button';
import './ItemCard.css';

function ItemCard(props){
    const resume = props.resume;
    let link = "/jobseeker/ResumePage/" + resume.resumeId;

    async function DeleteItem(){
        let xhr = new XMLHttpRequest();
        xhr.open("put","api/resume/DeleteResumeById/" + resume.resumeId, true);
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
                    <Button className="edit-button default-button">Редагувати</Button>
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