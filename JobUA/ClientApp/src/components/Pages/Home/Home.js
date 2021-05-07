import React from 'react';
import './Home.css';
import NavMenu from '../../PageElements/NavMenu/NavMenu';

function Home() {

    return (
        <>
            <NavMenu isEmployerPage={false}/>
            <div className="Home">
                <p>Home2</p>
                <button>dsdsds</button>
            </div>
        </>
    );
}

export default Home;

