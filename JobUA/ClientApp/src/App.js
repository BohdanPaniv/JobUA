import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import EdiProfile from './components/Pages/EditProfile/EditProfile';
import AutentificationPage from './components/Pages/AutentificationPage/AutentificationPage';
import Home from './components/Pages/Home/Home';
import Profile from './components/Pages/Profile/Profile';
import MyAccountPage from './components/Pages/MyAccountPage/MyAccountPage';
import EmployerPage from './components/Pages/EmployerPage/EmployerPage';

export default class App extends Component {

  render () {

    return (
      <Router>
        <Switch>
            <Route exact path="/editProfile" component={EdiProfile}/>
            <Route exact path="/employer/login/" component={() => <AutentificationPage isRegistration={false} />}/>
            <Route exact path="/jobseeker/login/" component={() => <AutentificationPage isRegistration={false} />}/>
            <Route exact path="/employer/register/" component={() => <AutentificationPage isRegistration={true} />}/>
            <Route exact path="/jobseeker/register/" component={() => <AutentificationPage isRegistration={true} />}/>
            <Route exact path="/employer" component={EmployerPage} />
            <Route exact path="/myAccount" component={MyAccountPage}/>
            <Route exact path="/" component={Home} />
            <Route exact path="/profile" component={Profile} />
        </Switch>
      </Router>
    );
  }
}