import React from "react"

const PizzaForm = (props) => {
  return(
      <div className="form-row">
        <div className="col-5">
            <input type="text" onChange={(event) => props.handleToppingChange(event)} className="form-control" placeholder="Pizza Topping" value={
                props.clickedPizza.topping
              }/>
        </div>
        <div className="col">
          <select value={props.clickedPizza.size} onChange={(event) => props.handleSizeChange(event)} className="form-control">
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input className="form-check-input" type="radio" value="Vegetarian" onChange={(event) => props.handleVegetarianChange(event)} checked={props.clickedPizza.vegetarian ? true : false}/>
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" value="Not Vegetarian" onChange={(event) => props.handleVegetarianChange(event)}  checked={props.clickedPizza.vegetarian ? false : true}/>
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success" onClick={() => props.updatePizza(props.clickedPizza)}>Submit</button>
        </div>
      </div>

  )
}

export default PizzaForm
