import React, { useEffect, useState } from 'react';
import './Profile.css';
import {Spinner} from "reactstrap";

export function Profile(){

    const [user, setUser] = useState();

    useEffect(() => {
        setUser(JSON.parse(JSON.parse(localStorage.getItem("User"))))
    },[])

    return(
        <>
            {
                user !== undefined ?
                (
                    <div>
                        <h1>Вітаємо, {user.firstName}!</h1>
                    </div>
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