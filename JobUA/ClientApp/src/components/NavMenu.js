import React, { useState } from 'react';
import LogoIcon from "./Images/logo2.png"
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  Breadcrumb, 
  BreadcrumbItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import Button from 'reactstrap/lib/Button';

export function NavMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
  <header>
    <div className="first-lay">
      <ul className="first-list">
          <li>
            <UncontrolledDropdown inNavbar>
              <DropdownToggle nav caret>
                <div className="title">
                    Українська
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
          </li>
        <li>
          <NavLink href="/employer">
              <div className="title">
                  Роботодавцю
              </div>
          </NavLink>
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
        <li>
          <a href="#" className="link1">
            <h4>
              Знайти вакансії
            </h4>
          </a>
        </li>
        <li>
          <Button color="secondary">Увійти</Button>
        </li>
      </ul>
    </div>
      {/* <NavbarBrand tag={Link} to="/">
        <img src={LogoIcon} alt="UserIcon" className="logoIcon"></img>
      </NavbarBrand> */}
      {/* <NavbarToggler onClick={toggle}/> */}
      
      {/* <ul className="second-list">
        <li>
          <a>Знайти вакансії</a>
        </li>
        <li>
          <button>Увійти</button>
        </li>
      </ul> */}
      {/* <ul>
        <li href="#" className="">
          <div className="title">
            Знайти вакансії
          </div>
        </li>
      </ul> */}
      {/* <div className="options">
        <Breadcrumb>
          <BreadcrumbItem><a href="#">Home</a></BreadcrumbItem>
          <BreadcrumbItem><a href="#">Library</a></BreadcrumbItem>
          <BreadcrumbItem active>Data</BreadcrumbItem>
        </Breadcrumb>
      </div> */}
  </header>
  );

 /*return (
    <header>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
        <Container>
          <NavbarBrand tag={Link} to="/">
            <img src={LogoIcon} alt="UserIcon" className="logoIcon"></img>
          </NavbarBrand>
          <NavbarToggler onClick={toggle}/>
          <Collapse isOpen={isOpen} navbar className="navbar-nav">
            <Nav className="">
              <NavItem>
                <UncontrolledDropdown inNavbar>
                  <DropdownToggle nav caret>
                    <div className="title">
                        Українська
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
              </NavItem>
              <NavItem>
                <NavLink href="/employer">
                    <div className="title">
                        Роботодавцю
                    </div>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
        <div className="options">
          <Breadcrumb>
            <BreadcrumbItem><a href="#">Home</a></BreadcrumbItem>
            <BreadcrumbItem><a href="#">Library</a></BreadcrumbItem>
            <BreadcrumbItem active>Data</BreadcrumbItem>
          </Breadcrumb>
        </div>
      </Navbar>
    </header>
    );*/
}
/*export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/">JobUA</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}*/
