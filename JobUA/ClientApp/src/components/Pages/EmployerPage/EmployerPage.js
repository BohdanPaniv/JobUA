import React from 'react';
import NavMenu from '../../PageElements/NavMenu/NavMenu';
import './EmployerPage.css';
import MyItems from '../MyItems/MyItems';

function EmployerPage(){

    return(
        <>
            <NavMenu isEmployerPage={true}/>
            <MyItems isResumePage={false} isMainPage={true}/>
        </>
    )
}

export default EmployerPage;