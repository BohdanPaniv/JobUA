import React from 'react';
import NavMenu from '../../PageElements/NavMenu/NavMenu';
import './EmployerPage.css';

function EmployerPage(){

    //console.log(window.location.href)

    return(
        <>
            <NavMenu isEmployer={true}/>
            <p>
                EmployerPage
            </p>
        </>
    )
}

export default EmployerPage;