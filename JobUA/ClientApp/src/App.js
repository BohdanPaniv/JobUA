import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout } from './components/Layouts/Layout';
import './App.css';
import { AutentificationPage } from './components/Pages/AutentificationPage/AutentificationPage';
import {Home} from './components/Pages/Home/Home';
import {EmployeerLoginPage} from './components/Pages/EmployeerLoginPage/EmployeerLoginPage';
import {Profile} from './components/Pages/Profile/Profile';

export default class App extends Component {

  render () {
    return (
      <Router>
        <Switch>
            <Route exact path="/employer/login/" component={EmployeerLoginPage}/>
            <Route exact path="/jobseeker/login/" component={() => <AutentificationPage isRegistration={false} />}/>
            <Route exact path="/jobseeker/register/" component={() => <AutentificationPage isRegistration={true} />}/>
            <Layout>
              <Route exact path="/" component={Home} />
              <Route exact path="/profile" component={Profile} />
            </Layout> 
        </Switch>
      </Router>
    );
  }
}
