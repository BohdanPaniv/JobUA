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
import MyResumesPage from './components/Pages/MyResumesPage/MyResumesPage';

export default class App extends Component {

  render () {

    return (
      <Router>
        <Switch>
            <Route exact path="/jobseeker/editResume/" component={() => <FormPage isResumePage={true} isEditPage={true}/>}/>
            <Route exact path="/jobseeker/ResumePage/:id" component={() => <FormPage isResumePage={true}/>}/>
            <Route exact path="/jobseeker/myResumes/" component={MyResumesPage}/>
            <Route exact path="/jobseeker/сreateResume/" component={() => <FormPage isResumePage={true}/>}/>
            <Route exact path="/employer/сreateVacancy/" component={() => <FormPage isResumePage={false}/>}/>
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