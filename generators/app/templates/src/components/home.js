import React from "react"
import { connect } from "react-redux"
import { example } from "../actions/example.js"

@connect((store) => {
  console.log(store)
  return {
   name:store.name.name,
   age:store.age.age
  };
})
export default class Home extends React.Component {

  example(){
     this.props.dispatch(example())
  }
    render(){
      const { name, age } = this.props;
      return (
        <div>
          <h2>{name}</h2>
          <h2>{age}</h2>
          <button onClick={this.example.bind(this)}>change!</button>
        </div>
      )
    }
}


