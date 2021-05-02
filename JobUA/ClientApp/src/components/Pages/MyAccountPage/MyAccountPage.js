import React,{ useEffect, useState } from 'react';
import './MyAccountPage.css';
import {Spinner} from "reactstrap";
import {AiOutlineUserAdd} from 'react-icons/ai';
import ImageUpload from '../../ImageUpload/ImageUpload';
import Button from 'reactstrap/lib/Button';
import saveUserToLocal from '../../saveUserToLocal/saveUserToLocal'
import NavMenu from '../../PageElements/NavMenu/NavMenu';

function MyAccountPage(){

    const [user, setUser] = useState();
    const [image, setImage] = useState();
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        setUser(JSON.parse(JSON.parse(localStorage.getItem("User"))));
    },[])

    useEffect(() => {
        setImage(JSON.parse(JSON.parse(localStorage.getItem("User"))).image)
    },[])

    /*async function GetUser(){
        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();
            let id = JSON.parse(JSON.parse(localStorage.getItem("User"))).userId;

            console.log(id);
            xhr.open("get","api/users/GetUserById/" + id, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };
            xhr.send();
        });
    }*/

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
                saveUserToLocal(user);
                window.location.reload();
            }
        };
        
        xhr.send(JSON.stringify(user));
    }

    return(
        <>
            {
                user !== undefined ?
                (
                    <>
                        <NavMenu isEmployer={false}/>
                        <div className="accountContainer">
                            <a href="/profile" className="linkToProfile">
                                Власний розділ
                            </a>

                            <h2 className="AccountTitle">
                                Особисті дані
                            </h2>

                            <div className="cardAccountContainer">
                                <div className="columnContainer">
                                    <ul className="ul-horizontal">
                                        <li>
                                            П.І.Б.:
                                        </li>
                                        <li>
                                            {`${user.lastName} ${user.firstName}`}
                                        </li>
                                    </ul>
                                    <ul className="ul-horizontal">
                                        <li >
                                            Дата народження:
                                        </li>
                                        <li >
                                            {user.birthday}
                                        </li>
                                    </ul>
                                    <ul className="ul-horizontal">
                                        <li >
                                            Місто:
                                        </li>
                                        <li >
                                            {user.city}
                                        </li>
                                    </ul>
                                    <ul className="ul-horizontal">
                                        <li >
                                            Телефон:
                                        </li>
                                        <li >
                                            {user.phone}
                                        </li>
                                    </ul>
                                    <ul className="ul-horizontal">
                                        <li >
                                            Ел. пошта
                                        </li>
                                        <li >
                                            {user.email}
                                        </li>
                                    </ul>
                                </div>
                                <div className="columnContainer2">
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
                                                            Зберегти
                                                        </Button>
                                                    )
                                                }
                                                
                                                <Button className="functionButton" onClick={() => UpdateUser("DELETE")}>
                                                    Видалити
                                                </Button>
                                            </>
                                        )
                                    }
                                </div>

                                <a href="/editProfile" className="updateData">
                                    Редагувати
                                </a>
                            </div>
                        </div>
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