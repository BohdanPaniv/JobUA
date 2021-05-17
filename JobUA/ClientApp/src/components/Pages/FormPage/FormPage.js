import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import './FormPage.css';
import { useHistory } from "react-router-dom";
import NavMenu from '../../PageElements/NavMenu/NavMenu';
import Button from 'reactstrap/lib/Button';

function FormPage(props) {

    const [user, setUser] = useState();
    const pageId = useParams().id;
    const [resume, setResume] = useState();
    const [resume2, setResume2] = useState({
        resumeId: "",
        post: "",
        city: "",
        typeOfEmployment: "",
        salary: "",
        isWorkExperience: true,
        companyName: "",
        companyCity: "",
        companyPost: "",
        periodOfWorkStart: "",
        periodOfWorkEnd: "",
        achievements: "",
        educationalLevel: "",
        educationalInstitution: "",
        educationCity: "",
        specialty: "",
        trainingPeriodStart: "",
        trainingPeriodEnd: "",
        publicationDate: new Date().toJSON().slice(0, 10).replace(/-/g, '-')
    });

    const [checkBox, setCheckBox] = useState(false);
    const [checkBox1, setCheckBox1] = useState(false);
    const [checkBox2, setCheckBox2] = useState(false);
    const [checkBox3, setCheckBox3] = useState(false);

    let typeOfEmployment = "";
    let history = useHistory();

    useEffect(() => {
        setUser(JSON.parse(JSON.parse(localStorage.getItem("User"))));
    }, [])

    console.log(pageId)


    useEffect(() => {
        if(pageId !== undefined){
            let xhr = new XMLHttpRequest();
            xhr.open("get","api/resume/GetResumeById/" + pageId, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                if (xhr.status === 200) {
                    const tempResume = JSON.parse(xhr.responseText);
                    setCheckBox1(tempResume.typeOfEmployment.includes("повна зайнятість"));
                    setCheckBox2(tempResume.typeOfEmployment.includes("неповна зайнятість"));
                    setCheckBox3(tempResume.typeOfEmployment.includes("дистанційна робота"));
                    setCheckBox(tempResume.isWorkExperience);
                    setResume(tempResume);
                }
            };
            xhr.send();
        }
    }, [pageId])

    async function CreateResume(type) {
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

        if (typeOfEmployment !== "") {
            typeOfEmployment = typeOfEmployment.slice(0, -2);
        }

        switch(type){
            case "create":
                resume2.typeOfEmployment = typeOfEmployment;
        
                xhr.open("post", "api/usersResume/CreateUsersResume/" + user.userId, true);
                xhr.setRequestHeader("Content-Type", "application/json");
        
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        history.push("/jobseeker/myResumes/");
                    }
                };
        
                xhr.send(JSON.stringify(resume2))
                break;
            case "update":
                resume.typeOfEmployment = typeOfEmployment;

                xhr.open("put", "api/resume/UpdateResume/", true);
                xhr.setRequestHeader("Content-Type", "application/json");
        
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        history.push("/jobseeker/myResumes/");
                    }
                };
        
                xhr.send(JSON.stringify(resume));
                break;
            default:
                break;
        }
    }

    return (
        <>
            <NavMenu isEmployerPage={false}/>
            {
                resume !== undefined ? 
                (
                    <>
                        {
                            props.isEditPage ?
                            (
                                <div className="mainContainer-FP">
                                    <div className="title-FP">
                                        <a href="/jobseeker/myResumes/">
                                            Мої резюме
                                        </a>
                                        <h2 className="mainTitle-FP">
                                            Редагування резюме
                                        </h2>
                                    </div>
                                    <div className="contentContainer-FP">
                                        <h3>
                                            Загальна інформація
                                        </h3>
                                        <div className="contentGroup-FP">
                                            <p>Посада, на якій ви хочете працювати:</p>
                                            <input type="text" defaultValue={resume.post} onChange={event => setResume({
                                                ...resume,
                                                post: event.target.value
                                            })} />
                                        </div>
                                        <div className="contentGroup-FP">
                                            <p>Бажане місто роботи:</p>
                                            <input type="text" defaultValue={resume.city} onChange={event => setResume({
                                                ...resume,
                                                city: event.target.value
                                            })} />
                                        </div>
                                        <div className="checkBoxGroup-FP">
                                            <p>Вид зайнятості:</p>
                                            <div className="checkBoxItem-FP">
                                                <input type="checkbox" id="checkbox1" defaultChecked={checkBox1} onClick={() => setCheckBox1(!checkBox1)} />
                                                <label htmlFor="checkbox1">повна зайнятість</label>
                                            </div>
                                            <div className="checkBoxItem-FP">
                                                <input type="checkbox" id="checkbox2" defaultChecked={checkBox2} onClick={() => setCheckBox2(!checkBox2)} />
                                                <label htmlFor="checkbox2">неповна зайнятість</label>
                                            </div>
                                            <div className="checkBoxItem-FP">
                                                <input type="checkbox" id="checkbox3" defaultChecked={checkBox3} onClick={() => setCheckBox3(!checkBox3)} />
                                                <label htmlFor="checkbox3">дистанційна робота</label>
                                            </div>
                                        </div>
                                        <div className="salartGroup-FP">
                                            <p>Зарплата:</p>
                                            <input type="number" min="0" defaultValue={resume.salary} onChange={event => setResume({
                                                ...resume,
                                                salary: event.target.value
                                            })} />
                                            <label>
                                                грн на місяць
                                            </label>
                                        </div>

                                        <h3>
                                            Досвід роботи
                                        </h3>
                                        <div className="checkBoxGroup-FP">
                                            <p>
                                                Додайте останнє місце роботи. Інші можна буде додати, коли завершите створення резюме
                                            </p>
                                            <div className="checkBoxItem-FP">
                                                <input type="checkbox" id="experienceCheckbox" defaultChecked={!resume.isWorkExperience} onClick={() => setCheckBox(!checkBox)} onChange={() => setResume({
                                                ...resume,
                                                isWorkExperience: !resume.isWorkExperience
                                                })} />
                                                <label htmlFor="experienceCheckbox">У мене немає досвіду роботи</label>
                                            </div>
                                        </div>
                                        {
                                            checkBox &&
                                            (
                                                <>
                                                    <div className="contentGroup-FP">
                                                        <p>Назва компанії:</p>
                                                        <input type="text" defaultValue={resume.companyName} onChange={event => setResume({
                                                            ...resume,
                                                            companyName: event.target.value
                                                        })} />
                                                    </div>
                                                    <div className="contentGroup-FP">
                                                        <p>Місто:</p>
                                                        <input type="text" defaultValue={resume.companyCity} onChange={event => setResume({
                                                            ...resume,
                                                            companyCity: event.target.value
                                                        })} />
                                                    </div>
                                                    <div className="contentGroup-FP">
                                                        <p>Посада:</p>
                                                        <input type="text" defaultValue={resume.companyPost} onChange={event => setResume({
                                                            ...resume,
                                                            companyPost: event.target.value
                                                        })} />
                                                    </div>
                                                    <div className="contentGroup-FP">
                                                        <p>Період роботи з:</p>
                                                        <input type="date" defaultValue={resume.periodOfWorkStart} onChange={event => setResume({
                                                            ...resume,
                                                            periodOfWorkStart: event.target.value
                                                        })} />
                                                    </div>
                                                    <div className="contentGroup-FP">
                                                        <p>По:</p>
                                                        <input type="date" defaultValue={resume.periodOfWorkEnd} onChange={event => setResume({
                                                            ...resume,
                                                            periodOfWorkEnd: event.target.value
                                                        })} />
                                                    </div>
                                                    <div className="contentGroup-FP">
                                                        <p>Досягнення:</p>
                                                        <input type="text" defaultValue={resume.achievements} onChange={event => setResume({
                                                            ...resume,
                                                            achievements: event.target.value
                                                        })} />
                                                    </div>
                                                </>
                                            )
                                        }
                                        <h3>
                                            Освіта
                                        </h3>
                                        <div className="checkBoxGroup-FP">
                                            <p>
                                                Додайте ваш найвищий рівень освіти. Інші можна буде додати, коли завершите створення резюме.
                                            </p>
                                            <div className="contentGroup-FP">
                                                <p>Рівень освіти:</p>
                                                <select defaultValue={resume.educationalLevel} onChange={event => setResume({
                                                            ...resume,
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
                                        <div className="contentGroup-FP">
                                            <p>Навчальний заклад:</p>
                                            <input type="text" defaultValue={resume.educationalInstitution} onChange={event => setResume({
                                                            ...resume,
                                                            educationalInstitution: event.target.value
                                                        })} />
                                        </div>
                                        <div className="contentGroup-FP">
                                            <p>Факультет, спеціальність:</p>
                                            <input type="text" defaultValue={resume.specialty} onChange={event => setResume({
                                                            ...resume,
                                                            specialty: event.target.value
                                                        })} />
                                        </div>
                                        <div className="contentGroup-FP">
                                            <p>Місто:</p>
                                            <input type="text" defaultValue={resume.educationCity} onChange={event => setResume({
                                                            ...resume,
                                                            educationCity: event.target.value
                                                        })} />
                                        </div>
                                        <div className="contentGroup-FP">
                                            <p>Період навчання з:</p>
                                            <input type="date" defaultValue={resume.trainingPeriodStart} onChange={event => setResume({
                                                            ...resume,
                                                            trainingPeriodStart: event.target.value
                                                        })} />
                                        </div>
                                        <div className="contentGroup-FP">
                                            <p>По:</p>
                                            <input type="date" defaultValue={resume.trainingPeriodEnd} onChange={event => setResume({
                                                            ...resume,
                                                            trainingPeriodEnd: event.target.value
                                                        })} />
                                        </div>

                                        <div className="lastGroup-FP">
                                            <input type="submit" value="Зберегти резюме" className="SubmitButton-FP" onClick={() => CreateResume("update")} />
                                            <label>або</label>
                                            <a href="/jobseeker/myResumes">Скасувати</a>
                                        </div>
                                    </div>
                                </div>
                            )
                            :
                            (
                                <div className="mainContainer-FP">
                                    <div className="title-FP">
                                        <a href="/jobseeker/myResumes/">
                                            Мої резюме
                                        </a>
                                    </div>
                                    <div className="contentContainer-FP">
                                        <h3>
                                            Загальна інформація
                                        </h3>
                                        <div className="contentGroup-FP">
                                            <p>Посада: {resume.post}</p>
                                        </div>
                                        <div className="contentGroup-FP">
                                            <p>Бажане місто роботи: {resume.city}</p>
                                        </div>
                                        <div className="checkBoxGroup-FP">
                                            <p>Вид зайнятості: {resume.typeOfEmployment}</p>
                                        </div>
                                        <div className="salartGroup-FP">
                                            <p>Зарпалата: {resume.salary} грн.</p>
                                        </div>
                                            {
                                                resume.isWorkExperience ?(
                                                    <>
                                                        <h3>
                                                            Досвід роботи
                                                        </h3>
                                                        <div className="contentGroup-FP">
                                                            <p>
                                                                Досвід роботи: є
                                                            </p>
                                                        </div>
                                                        <div className="contentGroup-FP">
                                                            <p>Назва компанії: {resume.companyName}</p>
                                                        </div>
                                                        <div className="contentGroup-FP">
                                                            <p>Місто: {resume.companyCity}</p>
                                                        </div>
                                                        <div className="contentGroup-FP">
                                                            <p>Посада: {resume.companyPost}</p>
                                                        </div>
                                                        <div className="contentGroup-FP">
                                                            <p>Період роботи з: {resume.periodOfWorkStart}</p>
                                                        </div>
                                                        <div className="contentGroup-FP">
                                                            <p>По: {resume.periodOfWorkEnd}</p>
                                                        </div>
                                                        <div className="contentGroup-FP">
                                                            <p>Досягнення: {resume.achievements}</p>
                                                        </div>
                                                    </>
                                                )
                                                :
                                                (
                                                    <>
                                                        <h3>
                                                            Досвід роботи
                                                        </h3>
                                                        <div className="contentGroup-FP">
                                                            <p>
                                                                Досвід роботи: немає
                                                            </p>
                                                        </div>
                                                    </>
                                                )
                                            }
                                        <h3>
                                            Освіта
                                        </h3>
                                        <div className="checkBoxGroup-FP">
                                            <div className="contentGroup-FP">
                                                <p>Рівень освіти: {resume.educationalLevel}</p>
                                            </div>
                                        </div>
                                        <div className="contentGroup-FP">
                                            <p>Навчальний заклад: {resume.educationalInstitution}</p>
                                        </div>
                                        <div className="contentGroup-FP">
                                            <p>Факультет, спеціальність: {resume.specialty}</p>
                                        </div>
                                        <div className="contentGroup-FP">
                                            <p>Місто: {resume.educationCity}</p>
                                        </div>
                                        <div className="contentGroup-FP">
                                            <p>Період навчання з: {resume.trainingPeriodStart}</p>
                                        </div>
                                        <div className="contentGroup-FP">
                                            <p>По: {resume.trainingPeriodEnd}</p>
                                        </div>

                                        <div className="lastGroup-FP">
                                            <Button className="default-button" onClick={() => { history.push(`/jobseeker/editResume/${resume.resumeId}`);}}>Редагувати</Button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </>
                )
                :
                (
                    <div className="mainContainer-FP">
                        <div className="title-FP">
                            <a href="/jobseeker/profile">
                                Профіль
                            </a>
                            <h2 className="mainTitle-FP">
                                Створення резюме
                            </h2>
                        </div>
                        <div className="contentContainer-FP">
                            <h3>
                                Загальна інформація
                            </h3>
                            <div className="contentGroup-FP">
                                <p>Посада, на якій ви хочете працювати:</p>
                                <input type="text" onChange={event => setResume2({
                                    ...resume2,
                                    post: event.target.value
                                    })} />
                            </div>
                            <div className="contentGroup-FP">
                                <p>Бажане місто роботи:</p>
                                <input type="text" onChange={event => setResume2({
                                    ...resume2,
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
                            </div>
                            <div className="salartGroup-FP">
                                <p>Зарпалата:</p>
                                <input type="number" min="0" onChange={event => setResume2({
                                    ...resume2,
                                    salary: event.target.value
                                })} />
                                <label>
                                    грн на місяць
                                </label>
                            </div>

                            <h3>
                                Досвід роботи
                            </h3>
                            <div className="checkBoxGroup-FP">
                                <p>
                                    Додайте останнє місце роботи. Інші можна буде додати, коли завершите створення резюме
                                </p>
                                <div className="checkBoxItem-FP">
                                    <input type="checkbox" id="experienceCheckbox" onClick={() => setCheckBox(!checkBox)} onChange={() => setResume2({
                                        ...resume2,
                                        isWorkExperience: !resume2.isWorkExperience
                                    })} />
                                    <label htmlFor="experienceCheckbox">У мене немає досвіду роботи</label>
                                </div>
                            </div>
                            {
                                !checkBox &&
                                (
                                    <>
                                        <div className="contentGroup-FP">
                                            <p>Назва компанії:</p>
                                            <input type="text" onChange={event => setResume2({
                                                ...resume2,
                                                companyName: event.target.value
                                            })} />
                                        </div>
                                        <div className="contentGroup-FP">
                                            <p>Місто:</p>
                                            <input type="text" onChange={event => setResume2({
                                                ...resume2,
                                                companyCity: event.target.value
                                            })} />
                                        </div>
                                        <div className="contentGroup-FP">
                                            <p>Посада:</p>
                                            <input type="text" onChange={event => setResume2({
                                                ...resume2,
                                                companyPost: event.target.value
                                            })} />
                                        </div>
                                        <div className="contentGroup-FP">
                                            <p>Період роботи з:</p>
                                            <input type="date" onChange={event => setResume2({
                                                ...resume2,
                                                periodOfWorkStart: event.target.value
                                            })} />
                                        </div>
                                        <div className="contentGroup-FP">
                                            <p>По:</p>
                                            <input type="date" onChange={event => setResume2({
                                                ...resume2,
                                                periodOfWorkEnd: event.target.value
                                            })} />
                                        </div>
                                        <div className="contentGroup-FP">
                                            <p>Досягнення:</p>
                                            <input type="text" onChange={event => setResume2({
                                                ...resume2,
                                                achievements: event.target.value
                                            })} />
                                        </div>
                                    </>
                                )
                            }
                            <h3>
                                Освіта
                            </h3>
                            <div className="checkBoxGroup-FP">
                                <p>
                                    Додайте ваш найвищий рівень освіти. Інші можна буде додати, коли завершите створення резюме.
                                </p>
                                <div className="contentGroup-FP">
                                    <p>Рівень освіти:</p>
                                    <select onChange={event => setResume2({
                                        ...resume2,
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
                            <div className="contentGroup-FP">
                                <p>Навчальний заклад:</p>
                                <input type="text" onChange={event => setResume2({
                                    ...resume2,
                                    educationalInstitution: event.target.value
                                })} />
                            </div>
                            <div className="contentGroup-FP">
                                <p>Факультет, спеціальність:</p>
                                <input type="text" onChange={event => setResume2({
                                    ...resume2,
                                    specialty: event.target.value
                                })} />
                            </div>
                            <div className="contentGroup-FP">
                                <p>Місто:</p>
                                <input type="text" onChange={event => setResume2({
                                    ...resume2,
                                    educationCity: event.target.value
                                })} />
                            </div>
                            <div className="contentGroup-FP">
                                <p>Період навчання з:</p>
                                <input type="date" onChange={event => setResume2({
                                    ...resume2,
                                    trainingPeriodStart: event.target.value
                                })} />
                            </div>
                            <div className="contentGroup-FP">
                                <p>По:</p>
                                <input type="date" onChange={event => setResume2({
                                    ...resume2,
                                    trainingPeriodEnd: event.target.value
                                })} />
                            </div>

                            <div className="lastGroup-FP">
                                <input type="submit" value="Зберегти резюме" className="SubmitButton-FP" name="Зберегти" onClick={() => CreateResume("create")} />
                                <label>або</label>
                                <a href="/jobseeker/profile">Скасувати</a>
                            </div>
                        </div>
                    </div>
                )
            }
                
        </>
    )
}

export default FormPage;