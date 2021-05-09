import React, { useState, useEffect } from 'react';
import LogoIcon from "./../../Images/logo2.png";
import EmployerLogo from './../../Images/employer_logo.png'
import './NavMenu.css';
import Button from 'reactstrap/lib/Button';
import Spinner from 'reactstrap/lib/Spinner';

function NavMenu(props) {
  
  const [user, setUser] = useState();
  const [employer, setEmployer] = useState();
  
  useEffect(() => {
      setUser(JSON.parse(JSON.parse(localStorage.getItem("User"))))
  },[])

  useEffect(() => {
    setEmployer(JSON.parse(JSON.parse(localStorage.getItem("Employer"))))
  },[])

  function getButtonElement(){
    let buttonElement;

    if(props.isEmployerPage === true){
      employer === null
      ? buttonElement = <Button className="changeButton" color="secondary" href='/employer/login/'>Увійти</Button>
      : buttonElement = <a href="/employer/profile" className="link1">
                          <h4 className="firstTitle">
                            {employer.firstName}
                          </h4>
                        </a>
    }
    else{
      user === null
      ? buttonElement = <Button className="changeButton" color="secondary" href='/jobseeker/login/'>Увійти</Button>
      : buttonElement = <a href="/jobseeker/profile" className="link1">
                          <h4 className="firstTitle">
                            {user.firstName}
                          </h4>
                        </a>
    }

    return buttonElement;
  }

  //console.log(props.isEmployerPage)
  
  return (
    <>
      {
        user !== undefined && employer !== undefined ?(
          <>
          {
            props.isEmployerPage ?(
              <header className="allNavMenu">
                <div className="first-lay">
                  <ul className="first-list">
                      <li className="NavMenuList">
                        <a href ="/" >
                          <h6 className="routeLink">
                          Шукачу
                          </h6>
                        </a>
                      </li>
                  </ul>
                </div>
                <div className="second-lay">
                  <div>
                    <a href="/employer">
                      <img src={EmployerLogo} alt="EmployerIcon" className="logoIcon"></img>
                    </a>
                  </div>
                  <ul className="second-list">
                    <li className="NavMenuList">
                    </li>
                    <li className="NavMenuList">
                      {
                        getButtonElement()
                      }
                    </li>
                  </ul>
                </div>
              </header>
            )
            :
            (
              <header className="allNavMenu">
                <div className="first-lay">
                  <ul className="first-list">
                      <li className="NavMenuList">
                        <a href ="/employer" >
                          <h6 className="routeLink">
                            Роботодавцю
                          </h6>
                        </a>
                      </li>
                  </ul>
                </div>
              <div className="second-lay">
                <div>
                  <a href="/">
                    <img src={LogoIcon} alt="UserIcon" className="logoIcon"></img>
                  </a>
                </div>
                <ul className="second-list">
                  <li className="NavMenuList">
                    <a href="/vacansions" className="link1">
                      {/* <h4 className="firstTitle">
                        Знайти вакансії
                      </h4> */}
                    </a>
                  </li>
                  <li className="NavMenuList">
                    {
                      getButtonElement()
                    }
                  </li>
                </ul>
              </div>
            </header>
            )
          }
          </>
        )
        :
        (
          <Spinner></Spinner>
        )
      }
    </>
  );
}

export default NavMenu;