import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import './FormPage.css';
import { useHistory } from "react-router-dom";
import NavMenu from '../../PageElements/NavMenu/NavMenu';
import Button from 'reactstrap/lib/Button';
import { TextField } from '@material-ui/core';

function VacancyForm(props){

    const [employer, setEmployer] = useState();
    const [vacancy, setVacancy] = useState();
    const pageId = useParams().id;
    const [vacancy2, setVacancy2] = useState({
        vacancyId: "",
        post: "",
        city: "",
        typeOfEmployment: "",
        salary: "",
        isWorkExperience: true,
        workExperiencePeriog: "",
        educationalLevel: "",
        publicationDate: new Date().toJSON().slice(0, 10).replace(/-/g, '-'),
        vacancyDescription : ""
    });

    const [checkBox, setCheckBox] = useState(false);
    const [checkBox1, setCheckBox1] = useState(false);
    const [checkBox2, setCheckBox2] = useState(false);
    const [checkBox3, setCheckBox3] = useState(false);
    const [checkBox4, setCheckBox4] = useState(false);
    const [checkBox5, setCheckBox5] = useState(false);

    let typeOfEmployment = "";
    let history = useHistory();

    useEffect(() => {
        setEmployer(JSON.parse(JSON.parse(localStorage.getItem("Employer"))));
    }, [])

    useEffect(() => {
        if(pageId !== undefined){
            let xhr = new XMLHttpRequest();
            xhr.open("get","api/vacancy/GetVacancyById/" + pageId, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                if (xhr.status === 200) {
                    const tempVacancy = JSON.parse(xhr.responseText);
                    setCheckBox1(tempVacancy.typeOfEmployment.includes("повна зайнятість"));
                    setCheckBox2(tempVacancy.typeOfEmployment.includes("неповна зайнятість"));
                    setCheckBox3(tempVacancy.typeOfEmployment.includes("дистанційна робота"));
                    setCheckBox4(tempVacancy.typeOfEmployment.includes("готові взяти студента"));
                    setCheckBox5(tempVacancy.typeOfEmployment.includes("готові взяти людину з інвалідністю"));
                    setCheckBox(tempVacancy.isWorkExperience);
                    setVacancy(tempVacancy);
                }
            };
            xhr.send();
        }
    }, [pageId])

    async function CreateVacancy(type) {
        let xhr = new XMLHttpRequest();

        if (checkBox1) {
            typeOfEmployment = "повна зайнятість, ";
        }

        if (checkBox2) {
            typeOfEmployment += "неповна зайнятість, ";
        }

        if (checkBox3) {
            typeOfEmployment += "дистанційна робота, ";
        }

        if (checkBox4) {
            typeOfEmployment += "готові взяти студента, ";
        }

        if (checkBox4) {
            typeOfEmployment += "готові взяти людину з інвалідністю, ";
        }

        if (typeOfEmployment !== "") {
            typeOfEmployment = typeOfEmployment.slice(0, -2);
        }

        switch(type){
            case "create":
                vacancy2.typeOfEmployment = typeOfEmployment;

                console.log(vacancy2)
                xhr.open("post", "api/employerVacancy/CreateEmployerVacancy/" + employer.employerId, true);
                xhr.setRequestHeader("Content-Type", "application/json");
        
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        history.push("/employer/myVacancies");
                        window.location.reload();
                    }
                };
        
                xhr.send(JSON.stringify(vacancy2))
                console.log(xhr)
                break;
            case "update":
                vacancy.typeOfEmployment = typeOfEmployment;

                xhr.open("put", "api/vacancy/UpdateVacancy/", true);
                xhr.setRequestHeader("Content-Type", "application/json");
        
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        history.push("/employer/myVacancies/");
                        window.location.reload();
                    }
                };
        
                xhr.send(JSON.stringify(vacancy));
                console.log(xhr)
                break;
            default:
                break;
        }
    }

    console.log(vacancy)
    console.log(checkBox1)
    console.log(checkBox2)
    console.log(checkBox3)
    console.log(checkBox4)
    console.log(checkBox5)

    return (
        <>
            <NavMenu isEmployerPage={true}/>
            {
                vacancy !== undefined ? 
                (
                    <>
                        {
                            props.isEditPage ?
                            (
                                <>
                                    <div className="mainContainer-FP">
                                        <div className="title-FP">
                                            <a href="/employer/profile">
                                                Профіль
                                            </a>
                                            <h2 className="mainTitle-FP">
                                                Редагування вакансії
                                            </h2>
                                        </div>
                                        <div className="contentContainer-FP">
                                            <h3>
                                                Загальна інформація
                                            </h3>
                                            <div className="contentGroup-FP">
                                                <p>Посада, на якій шукач буде працювати:</p>
                                                <input type="text" defaultValue={vacancy.post} onChange={event => setVacancy({
                                                    ...vacancy,
                                                    post: event.target.value
                                                    })} />
                                            </div>
                                            <div className="contentGroup-FP">
                                                <p>Місце роботи:</p>
                                                <input type="text" defaultValue={vacancy.city} onChange={event => setVacancy({
                                                    ...vacancy,
                                                    city: event.target.value
                                                })} />
                                            </div>
                                            <div className="checkBoxGroup-FP">
                                                <p>Вид зайнятості:</p>
                                                <div className="checkBoxItem-FP">
                                                    <input type="checkbox" defaultChecked={checkBox1} id="checkbox1" value="повна зайнятість," onClick={() => setCheckBox1(!checkBox1)} />
                                                    <label htmlFor="checkbox1">повна зайнятість</label>
                                                </div>
                                                <div className="checkBoxItem-FP">
                                                    <input type="checkbox" defaultChecked={checkBox2} id="checkbox2" onClick={() => setCheckBox2(!checkBox2)} />
                                                    <label htmlFor="checkbox2">неповна зайнятість</label>
                                                </div>
                                                <div className="checkBoxItem-FP">
                                                    <input type="checkbox" defaultChecked={checkBox3} id="checkbox3" onClick={() => setCheckBox3(!checkBox3)} />
                                                    <label htmlFor="checkbox3">дистанційна робота</label>
                                                </div>
                                                <div className="checkBoxItem-FP">
                                                    <input type="checkbox" defaultChecked={checkBox4} id="checkbox4" onClick={() => setCheckBox4(!checkBox4)} />
                                                    <label htmlFor="checkbox4">готові взяти студента</label>
                                                </div>
                                                <div className="checkBoxItem-FP">
                                                    <input type="checkbox" defaultChecked={checkBox5} id="checkbox5" onClick={() => setCheckBox5(!checkBox5)} />
                                                    <label htmlFor="checkbox5">готові взяти людину з інвалідністю</label>
                                                </div>
                                            </div>
                                            <div className="salartGroup-FP">
                                                <p>Зарплата:</p>
                                                <input type="number" defaultValue={vacancy.salary} min="0" onChange={event => setVacancy({
                                                    ...vacancy,
                                                    salary: event.target.value
                                                })} />
                                                <label>
                                                    грн на місяць
                                                </label>
                                            </div>
                                            <div className="contentGroup-FP">
                                                <p>
                                                    Опис вакансії
                                                </p>
                                                <TextField className="multiline" defaultValue={vacancy.vacancyDescription} multiline onChange={event => setVacancy({
                                                    ...vacancy,
                                                    vacancyDescription: event.target.value
                                                })}/>
                                            </div>

                                            <h3>
                                                Досвід роботи
                                            </h3>
                                            <div className="checkBoxGroup-FP">
                                                <div className="checkBoxItem-FP">
                                                    <input type="checkbox" defaultChecked={vacancy.isWorkExperience} id="experienceCheckbox" onClick={() => setCheckBox(!checkBox)} onChange={() => setVacancy({
                                                        ...vacancy,
                                                        isWorkExperience: !checkBox
                                                    })} />
                                                    <label htmlFor="experienceCheckbox">Наявність досвіду роботи</label>
                                                </div>
                                            </div>
                                            {
                                                checkBox &&(
                                                    <>
                                                        <div className="salartGroup-FP">
                                                            <p>Від</p>
                                                            <input type="number" defaultValue={vacancy.workExperiencePeriog} min="1" max="30" /*onChange={event => setWorkExperiencePeriog(event.target.value)}*/ />
                                                            <label>
                                                                років
                                                            </label>
                                                        </div>
                                                    </>
                                                )
                                            }
                                            <h3>
                                                Освіта
                                            </h3>
                                            <div className="checkBoxGroup-FP">
                                                <div className="contentGroup-FP">
                                                    <p>Рівень освіти:</p>
                                                    {console.log(vacancy.educationalLevel)}
                                                    <select defaultValue={vacancy.educationalLevel} onChange={event => setVacancy({
                                                        ...vacancy,
                                                        educationalLevel: event.target.value
                                                    })}>
                                                        <option value="">не вказувати</option>
                                                        <option value="вища">вища</option>
                                                        <option value="незакінчена вища">незакінчена вища</option>
                                                        <option value="середня спеціальна">середня спеціальна</option>
                                                        <option value="середня">середня</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="lastGroup-FP">
                                                <input type="submit" value="Зберегти резюме" className="SubmitButton-FP" name="Зберегти" onClick={() => CreateVacancy("update")} />
                                                <label>або</label>
                                                <a href="/employer/profile">Скасувати</a>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                            :
                            (
                                <div className="mainContainer-FP">
                                    <div className="title-FP">
                                        <a href="/employer/myVacancies/">
                                            Мої вакансії
                                        </a>
                                    </div>
                                    <div className="contentContainer-FP">
                                        <h3>
                                            Загальна інформація
                                        </h3>
                                        <div className="contentGroup-FP">
                                        <p>
                                            Посада, на якій шукач буде працювати: {vacancy.post}
                                        </p>
                                        </div>
                                        <div className="contentGroup-FP">
                                            <p>
                                                Місце роботи: {vacancy.city}
                                            </p>
                                        </div>
                                        <div className="checkBoxGroup-FP">
                                            <p>Вид зайнятості: {vacancy.typeOfEmployment}</p>
                                        </div>
                                        <div className="salartGroup-FP">
                                            <p>Зарпалата: {vacancy.salary} грн на місяць</p>
                                        </div>
                                        <div className="contentGroup-FP">
                                            <p>
                                                Опис вакансії
                                            </p>
                                            <TextField readOnly className="multiline" multiline value={vacancy.vacancyDescription}/>
                                        </div>
                                        {
                                            vacancy.isWorkExperience ?
                                            (
                                                <>
                                                    <div className="salartGroup-FP">
                                                        <p>Досвід роботи: {vacancy.workExperiencePeriog} р.</p>
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
                                           
                                        <h3>
                                            Освіта
                                        </h3>
                                        <div className="checkBoxGroup-FP">
                                            <div className="contentGroup-FP">
                                                <p>Рівень освіти: {vacancy.educationalLevel}</p>
                                            </div>
                                        </div>

                                        <div className="lastGroup-FP">
                                            <Button className="default-button" onClick={() => { history.push(`/employer/editVacancy/${vacancy.vacancyId}`);}}>Редагувати</Button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </>
                )
                :
                (
                    <>
                        <div className="mainContainer-FP">
                            <div className="title-FP">
                                <a href="/employer/profile">
                                    Профіль
                                </a>
                                <h2 className="mainTitle-FP">
                                    Створення вакансії
                                </h2>
                            </div>
                            <div className="contentContainer-FP">
                                <h3>
                                    Загальна інформація
                                </h3>
                                <div className="contentGroup-FP">
                                    <p>Посада, на якій шукач буде працювати:</p>
                                    <input type="text" onChange={event => setVacancy2({
                                        ...vacancy2,
                                        post: event.target.value
                                        })} />
                                </div>
                                <div className="contentGroup-FP">
                                    <p>Місце роботи:</p>
                                    <input type="text" onChange={event => setVacancy2({
                                        ...vacancy2,
                                        city: event.target.value
                                    })} />
                                </div>
                                <div className="checkBoxGroup-FP">
                                    <p>Вид зайнятості:</p>
                                    <div className="checkBoxItem-FP">
                                        <input type="checkbox" id="checkbox1" value="повна зайнятість," onClick={() => setCheckBox1(!checkBox1)} />
                                        <label htmlFor="checkbox1">повна зайнятість</label>
                                    </div>
                                    <div className="checkBoxItem-FP">
                                        <input type="checkbox" id="checkbox2" onClick={() => setCheckBox2(!checkBox2)} />
                                        <label htmlFor="checkbox2">неповна зайнятість</label>
                                    </div>
                                    <div className="checkBoxItem-FP">
                                        <input type="checkbox" id="checkbox3" onClick={() => setCheckBox3(!checkBox3)} />
                                        <label htmlFor="checkbox3">дистанційна робота</label>
                                    </div>
                                    <div className="checkBoxItem-FP">
                                        <input type="checkbox" id="checkbox4" onClick={() => setCheckBox4(!checkBox4)} />
                                        <label htmlFor="checkbox4">готові взяти студента</label>
                                    </div>
                                    <div className="checkBoxItem-FP">
                                        <input type="checkbox" id="checkbox5" onClick={() => setCheckBox5(!checkBox5)} />
                                        <label htmlFor="checkbox5">готові взяти людину з інвалідністю</label>
                                    </div>
                                </div>
                                <div className="salartGroup-FP">
                                    <p>Зарплата:</p>
                                    <input type="number" min="0" onChange={event => setVacancy2({
                                        ...vacancy2,
                                        salary: event.target.value
                                    })} />
                                    <label>
                                        грн на місяць
                                    </label>
                                </div>
                                <div className="contentGroup-FP">
                                    <p>
                                        Опис вакансії
                                    </p>
                                    <TextField className="multiline" multiline onChange={event => setVacancy2({
                                        ...vacancy2,
                                        vacancyDescription: event.target.value
                                    })}/>
                                </div>

                                <h3>
                                    Досвід роботи
                                </h3>
                                <div className="checkBoxGroup-FP">
                                    <div className="checkBoxItem-FP">
                                        <input type="checkbox" id="experienceCheckbox" onClick={() => setCheckBox(!checkBox)} onChange={() => setVacancy2({
                                            ...vacancy2,
                                            isWorkExperience: !checkBox
                                        })} />
                                        <label htmlFor="experienceCheckbox">Наявність досвіду роботи</label>
                                    </div>
                                </div>
                                {
                                    checkBox &&(
                                        <>
                                            <div className="salartGroup-FP">
                                                <p>Від</p>
                                                <input type="number" min="1" max="30" onChange={event => setVacancy2({
                                                    ...vacancy2,
                                                    workExperiencePeriog: event.target.value
                                                })} />
                                                <label>
                                                    років
                                                </label>
                                            </div>
                                        </>
                                    )
                                }
                                <h3>
                                    Освіта
                                </h3>
                                <div className="checkBoxGroup-FP">
                                    <div className="contentGroup-FP">
                                        <p>Рівень освіти:</p>
                                        <select onChange={event => setVacancy2({
                                            ...vacancy2,
                                            educationalLevel: event.target.value
                                        })}>
                                            <option value="">не вказувати</option>
                                            <option value="вища">вища</option>
                                            <option value="незакінчена вища">незакінчена вища</option>
                                            <option value="середня спеціальна">середня спеціальна</option>
                                            <option value="середня">середня</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="lastGroup-FP">
                                    <input type="submit" value="Зберегти резюме" className="SubmitButton-FP" name="Зберегти" onClick={() => CreateVacancy("create")} />
                                    <label>або</label>
                                    <a href="/employer/profile">Скасувати</a>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }   
        </>
    )
}

export default VacancyForm;