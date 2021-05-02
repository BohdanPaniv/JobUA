import React from 'react';
import NavMenu from '../../PageElements/NavMenu/NavMenu';

function EmployerPage(){

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