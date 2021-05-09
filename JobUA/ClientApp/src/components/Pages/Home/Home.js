import React from 'react';
import './Home.css';
import NavMenu from '../../PageElements/NavMenu/NavMenu';
import MyItems from '../MyItems/MyItems';

function Home() {

    return (
        <>
            <NavMenu isEmployerPage={false}/>
            <MyItems isResumePage={true} isMainPage={true}/>
        </>
    );
}

export default Home;