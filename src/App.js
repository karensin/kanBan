import React from 'react';
import { useState } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap/Container';
import { v4 as uuidv4 } from 'uuid';

class Task {
  constructor(id, content) {
    //constructor is function not a map
    this.id = id;
    this.content = content;
  }
}

function Column(props) {

  //each task should generate its own div tag n id to seperate 
  const toDisplay = props.tasks.map(task => <div onClick='' key={task.id}> {task.content}</div>)
  // props.tasks is a list of strings
  // task is a string
  // 

  return (
    <div>
      {toDisplay}
    </div>
  )
}

function App() {
  //make 4 lists to store different stages 
  // 1. planned 2. in progress 3. testing 4. done  
  // create a task
  // delete a task 
  // move a task 

  //task string

  //list of strings
  const [tasks, setTasks] = useState([])

  //planned [] of tasks (objs)
  //inProgress [] 
  //testing []
  //done []
  const [planned, setPlanned] = useState([])
  const [inProgress, setinProgress] = useState([])
  const [testing, setTesting] = useState([])
  const [done, getDone] = useState([])

  function keyPressed(e) {

    if (e.key === "Enter") {
      let tempTask = new Task(uuidv4(), e.target.value)
      setTasks([...tasks, tempTask])

    }
  }
  console.log(tasks)

  return (
    <div className="App">
      Kanban
      <div className="container">

      </div>

      <input name="test" onKeyPress={keyPressed} />
      <Column tasks={tasks} />
    </div>
  );
}

export default App;
