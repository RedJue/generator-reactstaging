import React, { Component } from 'react';
import { Link } from 'react-router';
import './index.scss';
export default class Topbar extends Component {
  render() {
    return (
      <div> 
        <div className="header">
          <Link to="page1">page1</Link>
          <Link to="page2">page2</Link>
          <Link to="page3">page3</Link>
        </div>  
        {this.props.children}
      </div>
    );
  }
}