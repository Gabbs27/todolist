import React from "react";
import { useState } from "react";

function Form(props){

//set the state of the name variable
const [name, setName] = useState("");

// function handleSubmit(event){ preventDefault();} 
    function handleSubmit(e){
        e.preventDefault();
        if(name === ""){
        alert("Please enter a task");
        }
        else{
        //data from the form to app.js
        props.addTast(name);
        setName("");
        }
    }

//function onchange to set the state of the name variable
function handleChange(e){
    setName(e.target.value);
    console.log(e.target.value);
};

    return(
     <form onSubmit={handleSubmit}>   
    <h2 className="label-wrapper">
    <label htmlFor="new-todo-input" className="label__lg">
      What needs to be done?
    </label>
  </h2>
  <input
    type="text"
    id="new-todo-input"
    className="input input__lg"
    name="text"
    autoComplete="off"
    value={name}
    onChange={handleChange}
  />
  <button type="submit" className="btn btn__primary btn__lg">
    Add
  </button>
  </form>
    );
}

export default Form;