import React, { useState, useEffect } from 'react';
import LogoIcon from "./../../Images/logo2.png";
import EmployerLogo from './../../Images/employer_logo.png'
import './NavMenu.css';
import Button from 'reactstrap/lib/Button';
import Spinner from 'reactstrap/lib/Spinner';

function NavMenu(props) {

  const employerHref = "https://localhost:5001/employer";
  const [isEmployerPage, setIsEmployerPage] = useState();
  const [user, setUser] = useState();
  const[employer, setEmployer] = useState();
  //const[buttonElement, setButtonElement] = useState();
  
  useEffect(() => {
      setUser(JSON.parse(JSON.parse(localStorage.getItem("User"))))
  },[])

  useEffect(() => {
    setEmployer(JSON.parse(JSON.parse(localStorage.getItem("Employer"))))
  },[])

  useEffect(() => {
    setIsEmployerPage(window.location.href.toString() === employerHref)
  },[])

  function getButtonElement(){
    let buttonElement;

    if(isEmployerPage === true){
      employer === null
      ? buttonElement = <Button className="changeButton" color="secondary" href='/employer/login/'>Увійти</Button>
      : buttonElement = <a href="/profile" className="link1">
                          <h4 className="firstTitle">
                            {employer.firstName}
                          </h4>
                        </a>
    }
    else{
      user === null
      ? buttonElement = <Button className="changeButton" color="secondary" href='/jobseeker/login/'>Увійти</Button>
      : buttonElement = <a href="/profile" className="link1">
                          <h4 className="firstTitle">
                            {user.firstName}
                          </h4>
                        </a>
    }

    console.log(buttonElement)
    return buttonElement;
  }

  return (
    <>
      {
        user !== undefined && employer !== undefined ?(
          <header>
            <div className="first-lay">
              <ul className="first-list">
                  {/* <li>
                    <UncontrolledDropdown inNavbar className="routeLink">
                      <DropdownToggle nav caret>
                        <div>
                            <h6>Українська</h6>
                        </div>
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem>
                          Українська
                        </DropdownItem>
                        <DropdownItem>
                          Англійська
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </li> */}
                  <li className="NavMenuList">
                    {
                      props.isEmployer === false ?(
                        <a href ="/employer" >
                          <h6 className="routeLink">
                          Роботодавцю
                          </h6>
                        </a>
                      )
                      :
                      (
                        <a href ="/" >
                          <h6 className="routeLink">
                          Шукачу
                          </h6>
                        </a>
                      )
                    }
                  </li>
              </ul>
            </div>
            <div className="second-lay">
              <div>
                {
                  props.isEmployer === false?
                  (
                    <a href="/">
                      <img src={LogoIcon} alt="UserIcon" className="logoIcon"></img>
                    </a>
                  )
                  :
                  (
                    <a href="/employer">
                      <img src={EmployerLogo} alt="EmployerIcon" className="logoIcon"></img>
                    </a>
                  )
                }
              </div>
              <ul className="second-list">
                <li className="NavMenuList">
                  {
                    !isEmployerPage &&(
                      <a href="/vacansions" className="link1">
                        <h4 className="firstTitle">
                          Знайти вакансії
                        </h4>
                      </a>
                    )
                  }
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
          <Spinner></Spinner>
        )
      }
    </>
  );
}

export default NavMenu;