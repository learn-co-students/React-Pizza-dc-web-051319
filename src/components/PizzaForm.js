import React from "react"

const PizzaForm = ({ selectedPizza, handleSubmit, handleChange }) => {

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="form-row">
        <div className="col-5">
          <input
            type="text"
            className="form-control"
            placeholder="Pizza Topping"
            value={selectedPizza.topping}
            onChange={(e) => (
              handleChange(e.target.value, "topping")
            )} />
        </div>
        <div className="col">
          <select value={selectedPizza.size} className="form-control"
            onChange={(e) => (
              handleChange(e.target.value, "size")
            )}>
            <option value="-">-</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">

            <label className="form-check-label">
              <input className="form-check-input"
                name="vegetarian"
                type="radio"
                value="Vegetarian"
                defaultChecked={selectedPizza.vegetarian}
                onChange={(e) => handleChange(e.target.checked, "vegetarian")}
              />
              Vegetarian</label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input className="form-check-input"
                name="vegetarian"
                type="radio"
                value="Not Vegetarian"
                defaultChecked={!selectedPizza.vegetarian}
                onChange={(e) => handleChange(e.target.checked, "vegetarian")}
              />
              Not Vegetarian</label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success">Submit</button>
        </div>
      </div>
    </form>
  )
}

export default PizzaForm
