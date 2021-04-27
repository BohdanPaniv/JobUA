import React, { Component } from 'react';
import { Route } from 'react-router';
import { Home } from '../Pages/Home/Home';
import { Footer } from '../PageElements/Footer/Footer';
import { NavMenu } from '../PageElements/NavMenu/NavMenu';

export class Layout extends Component {

  render () {
    return (
      <>
        <NavMenu />
        {this.props.children}
        {/* <Route exact path="/" component={Home}/> */}
        {/* <div>
            
        </div> */}
        {/* <Footer /> */}
      </>
    );
  }
}