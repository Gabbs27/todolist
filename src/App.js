import React from 'react';
import Todo from "./components/Todo";
import FilterButton from './components/FilterButton';
import Form from './components/Form';
import { useState, useRef, useEffect } from 'react';
import { nanoid } from 'nanoid';

const FILTER_MAP ={
  All: () => true,
  Active: task => !task.completed,
  completed: task => task.completed
};

const FILTER_NAMES= Object.keys(FILTER_MAP);


//TODO
//Note: Since we're now utilizing usePrevious() in two files, a good efficiency refactor would be to move the usePrevious() function into its own file, export it from that file, and import it where you need it. Try doing this as an exercise once you've got to the end.
function usePrevious(value){
const ref =  useRef();
useEffect(() => {
  ref.current = value;
});
return ref.current;
};



function App(props) {

  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');

  const listHeadingRef = useRef(null);


  //function that receive data from the form and add it to the task array
  function addTast(name){
    //create a new task object
  const newTask = {id:"todo-"+nanoid(), name:name, completed:false};
   //add the new task to the task array
  setTasks([...tasks, newTask]);
  }

  //function that receive the id of the task and delete it from the task array
  function toggleTaskCompleted(id){    
    setTasks(tasks.map(task => 
  (task.id === id ? {...task, completed: !task.completed} : task)));
  }
  
  //function that receive the id of the task and delete it from the task array
  function deleteTask(id){
    setTasks(tasks.filter(task => task.id !== id));
  }

  //function that receive the id and name of the task and edit it
  function editTask(id, name){ 
    setTasks(tasks.map(task =>
      (task.id === id ? {...task, name: name} : task)));
  }

  //Key is used to identify each item in the list
  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map(task => (
  <Todo 
        id={task.id} 
        name={task.name} 
        completed={task.completed} 
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
        />
      ));

    //function that receive the filter name and filter the task array
const filterList =FILTER_NAMES.map(name => (
  <FilterButton 
  key={name} 
  name={name}
  isPressed={name===filter}
  setFilter={setFilter}
  />
));

const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
const headingText = `${taskList.length} ${tasksNoun} remaining`;

const prevTaskLength = usePrevious(tasks.length);

useEffect (() => {
  if (prevTaskLength !== tasks.length) {
    listHeadingRef.current.focus();
  }  }, [tasks.length, prevTaskLength]);

  return (
    <div className="todoapp stack-large">
      <h1>ToDo-Matic</h1> 
      <Form addTast={addTast}/> 
      <div className="filters btn-group stack-exception">
    {filterList}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
      {headingText}
      </h2>
      <ul  className="todo-list stack-large stack-exception" aria-labelledby="list-heading">
   {taskList}
         </ul>
    </div>
  );
}


export default App;
