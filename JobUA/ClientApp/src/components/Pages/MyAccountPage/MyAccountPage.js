import React,{ useEffect, useState } from 'react';
import './MyAccountPage.css';
import {Spinner} from "reactstrap";
import {AiOutlineUserAdd} from 'react-icons/ai';
import ImageUpload from '../../ImageUpload/ImageUpload';
import Button from 'reactstrap/lib/Button';
import saveObjectToLocal from '../../saveObjectToLocal/saveObjectToLocal';
import NavMenu from '../../PageElements/NavMenu/NavMenu';

function MyAccountPage(props){

    const [user, setUser] = useState();
    const [employer, setEmployer] = useState();
    const [image, setImage] = useState();
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        setUser(JSON.parse(JSON.parse(localStorage.getItem("User"))));
        setImage(JSON.parse(JSON.parse(localStorage.getItem("User"))).image)
        setEmployer(JSON.parse(JSON.parse(localStorage.getItem("Employer"))))
    },[])

    async function UpdateUser(type){
        let xhr = new XMLHttpRequest();

        switch(type){
            case "DELETE":
                user.image = null;
                break;
            case "UPDATE":
                user.image = image;
                break;
            default:
                break;
        }

        xhr.open("put","api/users/UpdateUser/", true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function () {
            if (xhr.status === 200) {
                saveObjectToLocal(user,"User");
            }
        };
        
        xhr.send(JSON.stringify(user));
        setTimeout(() => {  window.location.reload(); }, 1000);
    }

    function GetPasswordView(type){
        let passwordLength = "";
        let passwordView = "";

        switch(type){
            case "employer":
                passwordLength = employer.password.length;
                break;
            case "user":
                passwordLength = user.password.length;
                break;
            default:
                break;
        }

        for(let i = 0; i < passwordLength; i++){
            passwordView +="*";
        }

        return passwordView;
    }

    return(
        <>
            {
                user !== undefined && employer !== undefined  ?
                (
                    <>
                        {
                            props.isEmployerPage ?(
                                <>
                                    <NavMenu isEmployerPage={true}/>
                                    <div className="accountContainer">
                                        <a href="/employer/profile" className="linkToProfile">
                                            ?????????????? ????????????
                                        </a>
                                        <h2 className="AccountTitle">
                                            ?????????????????? ????????????????????
                                        </h2>
                                        <div className="cardAccountContainer">
                                            <div className="columnContainer">
                                                <h3>
                                                    ?????????????????? ????????????????????
                                                </h3>
                                                <ul className="ul-horizontal">
                                                    <li>
                                                        ??.??.:
                                                    </li>
                                                    <li>
                                                        {`${employer.lastName} ${employer.firstName}`}
                                                    </li>
                                                </ul>
                                                <ul className="ul-horizontal">
                                                    <li >
                                                        ??????????????:
                                                    </li>
                                                    <li >
                                                        {employer.phone}
                                                    </li>
                                                </ul>
                                                <ul className="ul-horizontal">
                                                    <li >
                                                        ????. ??????????:
                                                    </li>
                                                    <li >
                                                        {employer.email}
                                                    </li>
                                                </ul>
                                            </div>

                                            
                                            <div className="columnContainer">
                                                <h3>
                                                    ???????????????????? ?????? ????????????????
                                                </h3>
                                                <ul className="ul-horizontal">
                                                    <li>
                                                        ?????????? ????????????????:
                                                    </li>
                                                    <li>
                                                        {employer.companyName}
                                                    </li>
                                                </ul>
                                                <ul className="ul-horizontal">
                                                    <li>
                                                        ?????????????????? ????????????????????????????:
                                                    </li>
                                                    <li>
                                                        {employer.employeeCount}
                                                    </li>
                                                </ul>
                                                <ul className="ul-horizontal">
                                                    <li>
                                                        ????????:
                                                    </li>
                                                    <li>
                                                        {employer.companyLink}
                                                    </li>
                                                </ul>
                                                <ul className="ul-horizontal">
                                                    <li >
                                                        ???????? ????????????????:
                                                    </li>
                                                    <li >
                                                        {employer.description}
                                                    </li>
                                                </ul>
                                            </div>

                                            <a href="/employer/editProfile/personal" className="updateData">
                                                ????????????????????
                                            </a>
                                        </div>
                                        <div className="cardAccountContainer">
                                            <h3>
                                                ????????????
                                            </h3>
                                            <p>
                                                {GetPasswordView("employer")}
                                            </p>
                                            <a href="/employer/editProfile/password" className="updateData">
                                                ????????????????????
                                            </a>
                                        </div>
                                    </div>
                                </>
                            )
                            :
                            (
                                <>
                                    <NavMenu isEmployerPage={false}/>
                                    <div className="accountContainer">
                                        <a href="/jobseeker/profile" className="linkToProfile">
                                            ?????????????? ????????????
                                        </a>

                                        <h2 className="AccountTitle">
                                            ???????????????? ????????
                                        </h2>

                                        <div className="cardAccountContainer">
                                            <div className="columnContainer">
                                                <h3>
                                                    ???????????????? ????????
                                                </h3>
                                                <ul className="ul-horizontal">
                                                    <li>
                                                        ??.??.:
                                                    </li>
                                                    <li>
                                                        {`${user.lastName} ${user.firstName}`}
                                                    </li>
                                                </ul>
                                                <ul className="ul-horizontal">
                                                    <li >
                                                        ???????? ????????????????????:
                                                    </li>
                                                    <li >
                                                        {user.birthday}
                                                    </li>
                                                </ul>
                                                <ul className="ul-horizontal">
                                                    <li >
                                                        ??????????:
                                                    </li>
                                                    <li >
                                                        {user.city}
                                                    </li>
                                                </ul>
                                                <ul className="ul-horizontal">
                                                    <li >
                                                        ??????????????:
                                                    </li>
                                                    <li >
                                                        {user.phone}
                                                    </li>
                                                </ul>
                                                <ul className="ul-horizontal">
                                                    <li >
                                                        ????. ??????????:
                                                    </li>
                                                    <li >
                                                        {user.email}
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="columnContainer2">
                                                <h3>
                                                    ????????
                                                </h3>
                                                <div className="userImageContainer"></div>
                                                    { 
                                                        image ?(
                                                            <>
                                                                <img src={image} className="userImage" alt="noFoundImage"/>
                                                            </>
                                                        )
                                                        :
                                                        (
                                                            <AiOutlineUserAdd className="userImage"/>
                                                        )
                                                    }
                                                <ImageUpload setImage={setImage} setIsChanged={setIsChanged}/>
                                                    {
                                                        image && (
                                                            <>
                                                                {
                                                                    isChanged === true &&(
                                                                        <Button className="functionButton" onClick={() => UpdateUser("UPDATE")}>
                                                                            ????????????????
                                                                        </Button>
                                                                    )
                                                                }
                                                                
                                                                <Button className="functionButton" onClick={() => UpdateUser("DELETE")}>
                                                                    ????????????????
                                                                </Button>
                                                            </>
                                                        )
                                                    }
                                            </div>

                                            <a href="/jobseeker/editProfile/personal" className="updateData">
                                                ????????????????????
                                            </a>
                                        </div>
                                        <div className="cardAccountContainer">
                                            <h3>
                                                ????????????
                                            </h3>
                                            <p>
                                                {GetPasswordView("user")}
                                            </p>
                                            <a href="/jobseeker/editProfile/password" className="updateData">
                                                ????????????????????
                                            </a>
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
    );
}

export default MyAccountPage;