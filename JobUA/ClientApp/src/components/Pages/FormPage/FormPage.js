import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import './FormPage.css';
import { useHistory } from "react-router-dom";
import NavMenu from '../../PageElements/NavMenu/NavMenu';
import Button from 'reactstrap/lib/Button';

function FormPage(props) {

    const [user, setUser] = useState();
    const [employer, setEmployer] = useState();
    const resumePageId = useParams().id;
    const [resume, setResume] = useState();

    useEffect(() => {
        setUser(JSON.parse(JSON.parse(localStorage.getItem("User"))));
        setEmployer(JSON.parse(JSON.parse(localStorage.getItem("Employer"))));
    }, [])

    useEffect(() => {
        if(resumePageId !== undefined){
            let xhr = new XMLHttpRequest();
            xhr.open("get","api/resume/GetResumeById/" + resumePageId, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                if (xhr.status === 200) {
                    setResume(JSON.parse(xhr.responseText))
                }
            };
            xhr.send();
            console.log(xhr)
        }
    }, [resumePageId])

    const [post, setPost] = useState("");
    const [city, setCity] = useState("");
    const [checkBox1, setCheckBox1] = useState(false);
    const [checkBox2, setCheckBox2] = useState(false);
    const [checkBox3, setCheckBox3] = useState(false);
    let typeOfEmployment = ""
    const [salary, setSalary] = useState();
    const [isWorkExperience, setIsWorkExperience] = useState(true);
    const [companyName, setCompanyName] = useState("");
    const [companyCity, setCompanyCity] = useState("");
    const [companyPost, setCompanyPost] = useState("");
    const [periodOfWorkStart, setPeriodOfWorkStart] = useState("");
    const [periodOfWorkEnd, setPeriodOfWorkEnd] = useState("");
    const [achievements, setAchievements] = useState("");
    const [educationalLevel, setEducationalLevel] = useState("");
    const [educationalInstitution, setEducationalInstitution] = useState("");
    const [educationCity, setEducationCity] = useState("");
    const [specialty, setSpecialty] = useState("");
    const [trainingPeriodStart, setTrainingPeriodStart] = useState("");
    const [trainingPeriodEnd, setTrainingPeriodEnd] = useState("");
    let history = useHistory();

    const [checkBox, setCheckBox] = useState(false);

    async function CreateResume() {
        let xhr = new XMLHttpRequest();

        if (checkBox1) {
            typeOfEmployment = "повна зайнятість, ";
            console.log(typeOfEmployment)
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

        let resume = ({
            ResumeId: "",
            Post: post,
            City: city,
            TypeOfEmployment: typeOfEmployment,
            Salary: salary,
            IsWorkExperience: isWorkExperience,
            CompanyName: companyName,
            CompanyCity: companyCity,
            CompanyPost: companyPost,
            PeriodOfWorkStart: periodOfWorkStart,
            PeriodOfWorkEnd: periodOfWorkEnd,
            Achievements: achievements,
            EducationalLevel: educationalLevel,
            EducationalInstitution: educationalInstitution,
            EducationCity: educationCity,
            Specialty: specialty,
            TrainingPeriodStart: trainingPeriodStart,
            TrainingPeriodEnd: trainingPeriodEnd,
            PublicationDate: new Date().toJSON().slice(0, 10).replace(/-/g, '-')
        });

        xhr.open("post", "api/usersResume/CreateUsersResume/" + user.userId, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function () {
            if (xhr.status === 200) {
                history.push("/jobseeker/myResumes/");
                window.location.reload();
            }
        };

        xhr.send(JSON.stringify(resume))
        console.log(xhr);
    }

    return (
        <>
            {
                props.isResumePage ?
                    (
                        <>
                            <NavMenu isEmployerPage={false}/>
                            {/* {
                                props.isEditPage ?
                                (

                                )
                            } */}
                            {
                                resume !== undefined ? 
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
                                                <Button className="default-button" onClick={() => { history.push(`editResume/${resume.ResumeId}`);}}>Редагувати</Button>
                                            </div>
                                        </div>
                                    </div>
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
                                                <input type="text" onChange={event => setPost(event.target.value)} />
                                            </div>
                                            <div className="contentGroup-FP">
                                                <p>Бажане місто роботи:</p>
                                                <input type="text" onChange={event => setCity(event.target.value)} />
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
                                                <input type="number" min="0" onChange={event => setSalary(event.target.value)} />
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
                                                    <input type="checkbox" id="experienceCheckbox" onClick={() => setCheckBox(!checkBox)} onChange={() => setIsWorkExperience(!isWorkExperience)} />
                                                    <label htmlFor="experienceCheckbox">У мене немає досвіду роботи</label>
                                                </div>
                                            </div>
                                            {
                                                !checkBox &&
                                                (
                                                    <>
                                                        <div className="contentGroup-FP">
                                                            <p>Назва компанії:</p>
                                                            <input type="text" onChange={event => setCompanyName(event.target.value)} />
                                                        </div>
                                                        <div className="contentGroup-FP">
                                                            <p>Місто:</p>
                                                            <input type="text" onChange={event => setCompanyCity(event.target.value)} />
                                                        </div>
                                                        <div className="contentGroup-FP">
                                                            <p>Посада:</p>
                                                            <input type="text" onChange={event => setCompanyPost(event.target.value)} />
                                                        </div>
                                                        <div className="contentGroup-FP">
                                                            <p>Період роботи з:</p>
                                                            <input type="date" onChange={event => setPeriodOfWorkStart(event.target.value)} />
                                                        </div>
                                                        <div className="contentGroup-FP">
                                                            <p>По:</p>
                                                            <input type="date" onChange={event => setPeriodOfWorkEnd(event.target.value)} />
                                                        </div>
                                                        <div className="contentGroup-FP">
                                                            <p>Досягнення:</p>
                                                            <input type="text" onChange={event => setAchievements(event.target.value)} />
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
                                                    <select onChange={event => setEducationalLevel(event.target.value)}>
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
                                                <input type="text" onChange={event => setEducationalInstitution(event.target.value)} />
                                            </div>
                                            <div className="contentGroup-FP">
                                                <p>Факультет, спеціальність:</p>
                                                <input type="text" onChange={event => setSpecialty(event.target.value)} />
                                            </div>
                                            <div className="contentGroup-FP">
                                                <p>Місто:</p>
                                                <input type="text" onChange={event => setEducationCity(event.target.value)} />
                                            </div>
                                            <div className="contentGroup-FP">
                                                <p>Період навчання з:</p>
                                                <input type="date" onChange={event => setTrainingPeriodStart(event.target.value)} />
                                            </div>
                                            <div className="contentGroup-FP">
                                                <p>По:</p>
                                                <input type="date" onChange={event => setTrainingPeriodEnd(event.target.value)} />
                                            </div>

                                            <div className="lastGroup-FP">
                                                <input type="submit" value="Зберегти резюме" className="SubmitButton-FP" name="Зберегти" onClick={() => CreateResume()} />
                                                <label>або</label>
                                                <a href="/jobseeker/profile">Скасувати</a>
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

                        </>
                    )
            }
        </>
    )
}

export default FormPage;