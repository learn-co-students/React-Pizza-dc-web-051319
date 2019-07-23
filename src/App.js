import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {

  state = {
    pizzas: [],
    clickedPizza: {
      id: "",
      topping: "",
      size: "",
      vegetarian: ""
    }
  }

  componentDidMount() {
    fetch("http://localhost:4000/pizzas")
    .then(res => res.json())
    .then(data => {
      this.setState({
        pizzas: data
      })
    })
  }

  handleEditClick = (pizzaObj) => {
    this.setState({
      clickedPizza: {
        id:pizzaObj.id,
        topping: pizzaObj.topping,
        size: pizzaObj.size,
        vegetarian: pizzaObj.vegetarian
      }
    })
  }

  handleSizeChange = (event) => {
    let copyClickPizza = {...this.state.clickedPizza}
    copyClickPizza.size = event.target.value

    this.setState({
      clickedPizza: copyClickPizza
    })
  }

  handleToppingChange = (event) => {
  
    let copyClickPizza = {...this.state.clickedPizza}
    copyClickPizza.topping = event.target.value

    this.setState({
      clickedPizza: copyClickPizza
    })
  }

  handleVegetarianChange = (event) => {
    let copyClickPizza = {...this.state.clickedPizza}

    if (event.target.value === "Vegetarian") {
      copyClickPizza.vegetarian = true
    } else if (event.target.value === "Not Vegetarian") {
      copyClickPizza.vegetarian = false
    }
  
    this.setState({
      clickedPizza: copyClickPizza
    })
  }

  updatePizza = (pizzaObj) => {
    let pizzaId = this.state.clickedPizza.id
    fetch(`http://localhost:4000/pizzas/${pizzaId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }, 
      body: JSON.stringify(this.state.clickedPizza)
    })
    .then(response => response.json())
    .then(updatedPizza => {
      let updatedPizzas = this.state.pizzas.map(pizza => pizza.id === updatedPizza.id ? updatedPizza : pizza)
      this.setState({
        pizzas: updatedPizzas
      }) 
    })
  }
  

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm 
          clickedPizza={this.state.clickedPizza} 
          handleSizeChange={this.handleSizeChange}
          handleToppingChange={this.handleToppingChange}
          handleVegetarianChange={this.handleVegetarianChange}
          updatePizza={this.updatePizza}
        />
        <PizzaList pizzas={this.state.pizzas} handleEditClick={this.handleEditClick}/>
      </Fragment>
    );
  }
}

export default App;
