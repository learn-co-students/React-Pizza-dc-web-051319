import React from "react"
//import { prependOnceListener } from "cluster";

const PizzaForm = (props) => {

 
  return(
    <form id={props.pizza.id} onSubmit={(event) => props.sendIt(event,props)}>
      <div className="form-row">
        <div className="col">
            <input type="text" id="topping" className="form-control" placeholder="Pizza Topping" value={
                //Pizza Topping Should Go Here
               props.pizza.topping
              } onChange={props.changeHandler}/>
        </div>
        <div className="col">
          <select id="size" value={props.pizza.size} className="form-control" onChange={props.changeHandler}>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col" >
          <div className="form-check" onChange={props.handleVeggie}>
            <input className="form-check-input" id="vegetarian" type="radio" value="Vegetarian" checked={props.pizza.vegetarian === true}/>
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check" onChange={props.handleVeggie}>
            <input className="form-check-input" id="vegetarian" type="radio" value="Not Vegetarian" checked={props.pizza.vegetarian === false} />
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success" >Submit</button>
        </div>
      </div>
    </form>
  )
}

export default PizzaForm
