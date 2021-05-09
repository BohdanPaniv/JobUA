import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import AutentificationPage from './components/Pages/AutentificationPage/AutentificationPage';
import Home from './components/Pages/Home/Home';
import Profile from './components/Pages/Profile/Profile';
import MyAccountPage from './components/Pages/MyAccountPage/MyAccountPage';
import EmployerPage from './components/Pages/EmployerPage/EmployerPage';
import EditProfile from './components/Pages/EditProfile/EditProfile';
import FormPage from './components/Pages/FormPage/FormPage';
import MyItems from './components/Pages/MyItems/MyItems';
import VacancyForm from './components/Pages/FormPage/VacancyForm';

export default class App extends Component {

  render () {

    return (
      <Router>
        <Switch>
            <Route exact path="/jobseeker/myResumes/" component={() => <MyItems isResumePage={true}/>}/>
            <Route exact path="/employer/myVacancies/" component={() => <MyItems isResumePage={false}/>}/>
            <Route exact path="/jobseeker/editResume/:id" component={() => <FormPage isEditPage={true}/>}/>
            <Route exact path="/employer/editVacancy/:id" component={() => <VacancyForm isEditPage={true}/>}/>
            <Route exact path="/jobseeker/ResumePage/:id" component={() => <FormPage isEditPage={false}/>}/>
            <Route exact path="/employer/VacancyPage/:id" component={() => <VacancyForm isEditPage={false}/>}/>
            <Route exact path="/jobseeker/сreateResume/" component={() => <FormPage isEditPage={false}/>}/>
            <Route exact path="/employer/сreateVacancy/" component={() => <VacancyForm isEditPage={false}/>}/>
            <Route exact path="/employer/editProfile/personal" component={() => <EditProfile isChangePassword={false} isEmployerPage={true}/>}/>
            <Route exact path="/employer/editProfile/password" component={() => <EditProfile isChangePassword={true} isEmployerPage={true}/>}/>
            <Route exact path="/jobseeker/editProfile/personal" component={() => <EditProfile isChangePassword={false} isEmployerPage={false}/>}/>
            <Route exact path="/jobseeker/editProfile/password" component={() => <EditProfile isChangePassword={true} isEmployerPage={false}/>}/>
            <Route exact path="/employer/login/" component={() => <AutentificationPage isRegistration={false} isEmployerPage={true}/>}/>
            <Route exact path="/jobseeker/login/" component={() => <AutentificationPage isRegistration={false} isEmployerPage={false}/>}/>
            <Route exact path="/employer/register/" component={() => <AutentificationPage isRegistration={true} isEmployerPage={true}/>}/>
            <Route exact path="/jobseeker/register/" component={() => <AutentificationPage isRegistration={true} isEmployerPage={false}/>}/>
            <Route exact path="/jobseeker/myAccount" component={() => <MyAccountPage isEmployerPage={false}/>}/>
            <Route exact path="/employer/myAccount" component={() => <MyAccountPage isEmployerPage={true}/>}/>
            <Route exact path="/jobseeker/profile" component={() => <Profile isEmployerPage={false}/>} />
            <Route exact path="/employer/profile" component={() => <Profile isEmployerPage={true}/>} />
            <Route exact path="/employer" component={EmployerPage} />
            <Route exact path="/" component={Home}/>
        </Switch>
      </Router>
    );
  }
}