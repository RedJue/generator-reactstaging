import React from "react";
export default class App extends React.Component {
    render(){
      return (
        <div>
          {this.props.children}
          <h1>Welcome !</h1>
        </div>
      )
    }
}