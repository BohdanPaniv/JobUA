import React, { useCallback, useEffect, useState } from 'react';
import Spinner from 'reactstrap/lib/Spinner';
import NavMenu from '../../PageElements/NavMenu/NavMenu';
import ItemCardList from '../../PageElements/ItemCardList/ItemCardList';
import './MyResumesPage.css';

function MyResumesPage(){

    const [resumeList, setResumeList] = useState();
    const [user, setUser] = useState();

    const getResumes = useCallback(() =>{
        if(user !== undefined){
            let xhr = new XMLHttpRequest();
            xhr.open("get","api/usersResume/GetResumesByUserId/" + user.userId, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                if (xhr.status === 200) {
                    setResumeList(JSON.parse(xhr.responseText))
                }
            };
            xhr.send();
        }
    }, [user])

    useEffect(() =>{
        if(!resumeList){
            getResumes();
        }
    }, [resumeList, getResumes])

    useEffect(() => {
        setUser(JSON.parse(JSON.parse(localStorage.getItem("User"))))
    },[])

    // console.log(user)
    // console.log(resumeList)

    return(
        <>
            {
                user !== undefined ?(
                    <>
                        <NavMenu isEmployerPage={false}/>
                        <div className="cardContainer">
                            <a href="/jobseeker/profile" style={{color:'black'}}>
                                <h5>
                                    Профіль
                                </h5>
                            </a>
                            <h2 className="title-container-resume">
                                Мої резюме
                            </h2>
                            <ItemCardList resumeList={resumeList} /*9getResumes={getResumes}*/></ItemCardList>
                        </div>
                    </>
                )
                :
                (
                    <Spinner/>
                )
            }
        </>
    )
}

export default MyResumesPage;