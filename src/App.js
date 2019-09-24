import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {

  state = {
    pizzas: [],
    selectedPizza: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/pizzas')
      .then(res => res.json())
      .then(pizzas => this.setState({ pizzas }))
  }

  selectPizza = (pizza) => {
    this.setState({
      selectedPizza: this.state.pizzas.find(p => p === pizza)
    })
  }
  handleChange = (value, key) => {
    let selectedPizza = { ...this.state.selectedPizza }
    selectedPizza[key] = value
    this.setState({ selectedPizza })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { pizzas, selectedPizza } = this.state
    const editedPizza = pizzas.find(pizza => pizza.id === selectedPizza.id)
    const i = pizzas.indexOf(editedPizza)
    let newPizzas = [...pizzas]
    newPizzas[i] = selectedPizza

    this.setState({
      pizzas: newPizzas,
      selectedPizza: ['']
    }, e.target.reset())
  }

  render() {
    return (
      <Fragment>
        <Header title={"Welcome to Flatiron School's Pizzeria"} />
        <PizzaForm
          selectedPizza={this.state.selectedPizza}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <PizzaList
          pizzas={this.state.pizzas}
          selectPizza={this.selectPizza}
        />
      </Fragment>
    );
  }
}

export default App;
