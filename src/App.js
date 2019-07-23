import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

class App extends Component {
  constructor() {
    super()
    this.state = {
      pizzas: [],
      currentPizza: {
        topping: '',
        size: '',
        vegetarian: null
      }
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/pizzas')
    .then(response => response.json())
    .then(pizzas => this.setState({
      pizzas: pizzas
    }))
  }

  editPizza = (pizza) => {
    this.setState({
      currentPizza: pizza
    })
  }

  handleOnChange = (e) => {
    if (e.target.value === 'Vegetarian') {
      this.setState({
        currentPizza: {...this.state.currentPizza, vegetarian: true}
      })
    } else if (e.target.value === 'Not Vegetarian') {
      this.setState({
        currentPizza: {...this.state.currentPizza, vegetarian: false}
      })
    } else {
      this.setState({
        currentPizza: {...this.state.currentPizza, [e.target.name]: e.target.value}
      })
    }
  }

  updatePizza = () => {
    let pizzaId = this.state.currentPizza.id
    fetch(`http://localhost:3000/pizzas/${pizzaId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }, 
      body: JSON.stringify(this.state.currentPizza)
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
        <PizzaForm currentPizza={this.state.currentPizza} updatePizza={this.updatePizza} handleOnChange={this.handleOnChange} />
        <PizzaList pizzas={this.state.pizzas} editPizza={this.editPizza} />
      </Fragment>
    );
  }
}

export default App;
