import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {
  constructor(){
    super()
  this.state = {
    pizzas: [], 
    newPizza: {}
  }
  }

  componentDidMount(){
    fetch('http://localhost:3000/pizzas')
    .then(resp => resp.json())
    .then(pizza => 
      this.setState({
      pizzas: pizza 
    })
    )
  }


  editPizza = (props) => {
    this.setState({
      newPizza: {
        id: props.id,
        topping: props.topping,
        size: props.size,
        vegetarian: props.vegetarian
      }
    })
    
  }

 handleChange = (event) => {
   let t = this
   var obj = `{"${event.target.id}":"${event.target.value}"}`
   let nuObj = JSON.parse(obj)
   this.setState({
     newPizza: {
        ...this.state.newPizza,
        ...nuObj
     }
   })
  }


handleVeggie = (event) => {
  let t = this
  if(event.target.value === "vegetarian"){
    event.target.checked = true
  }else if(event.target.value === "Not Vegetarian"){ event.target.checked = false}
  var veg = `{"${event.target.id}":${event.target.checked}}`
  let nuObj = JSON.parse(veg)
  this.setState({
    newPizza: {
      ...this.state.newPizza, 
      ...nuObj
    }
  })

}


sendIt = (event, props) => {
  event.preventDefault()

  let form = event.target

  debugger
  let t = this
 var pizza = t.state.newPizza
  let pizzaId = props.pizza.id
  fetch(`http://localhost:3000/pizzas/${pizzaId}`, {
    method: 'PATCH',
    headers:{
      "Content-Type": "application/json", 
      Accept: "application/json"
    },
    body: JSON.stringify({
      topping: t.state.newPizza.topping,
      size: t.state.newPizza.size,
      vegetarian: t.state.newPizza.vegetarian
  })
})
  .then(resp => resp.json())
  .then(data => 
    // document.getElementById("topping").value = "",
    // document.getElementById("vegetarian").checked = null,
    

    this.componentDidMount())

 
   
  
}


  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm pizza={this.state.newPizza} changeHandler={this.handleChange} handleVeggie={this.handleVeggie} sendIt={this.sendIt}/>
        <PizzaList pizzas={this.state.pizzas} editPizza={this.editPizza} />
      </Fragment>
    );
  }
}

export default App;
