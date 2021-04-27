import React, { useState, useEffect } from 'react';
import LogoIcon from "./../../Images/logo2.png";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import './NavMenu.css';
import Button from 'reactstrap/lib/Button';

export function NavMenu() {

  const [user, setUser] = useState();
  
  useEffect(() => {
      setUser(JSON.parse(JSON.parse(localStorage.getItem("User"))))
  },[])

  return (
  <header>
    <div className="first-lay">
      <ul className="first-list">
          {/* <li>
            <UncontrolledDropdown inNavbar className="employeeLink">
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
            <a href ="/employer/login/" >
              <h6 className="employeeLink">
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
          <a href="#" className="link1">
            <h4 className="firstTitle">
              Знайти вакансії
            </h4>
          </a>
        </li>
        {
          !user ? (
            <li className="NavMenuList">
              <Button className="changeButton" color="secondary" href='/jobseeker/login/'>Увійти</Button>
            </li>
          )
          :
          (
            <li className="NavMenuList">
              <a href="/profile" className="link1">
                <h4 className="firstTitle">
                  {user.firstName}
                </h4>
              </a>
            </li>
          )
        }
      </ul>
    </div>
  </header>
  );
}