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
  // (blah) => doSomething()
  // function noName(blah) {doSomething()}
  //each task should generate its own div tag n id to seperate 
  const toDisplay = props.tasks.map(task => <button onClick={e => props.onClickDelete(task.id)} key={task.id}> {task.content}</button>)
  // props.tasks is a list of strings
  // task is a string
  // 

  return (
    <div>
      {toDisplay}
    </div>
  )
}
//make 4 lists to store different stages 
// 1. planned 2. in progress 3. testing 4. done  
// create a task
// delete a task 
// move a task 

function App() {
  const [tasks, setTasks] = useState([])
  const [planned, setPlanned] = useState([])   //planned [] of tasks (objs)
  const [inProgress, setinProgress] = useState([])  //inProgress [] 
  const [testing, setTesting] = useState([])  //testing []
  const [done, getDone] = useState([])   //done []

  function keyPressed(e) {
    if (e.key === "Enter") {
      let tempTask = new Task(uuidv4(), e.target.value)
      setTasks([...tasks, tempTask])

    }
  }
  console.log(tasks)

  let onClickDelete = function (taskId) {
    console.log('delete', taskId, tasks.id)
    let tempTasks = tasks.filter((task) => taskId !== task.id)
    setTasks(tempTasks)
  }

  return (
    <div className="App">
      Kanban
      <div className="container"></div>
      <input name="test" onKeyPress={keyPressed} />
      {/* passing a variable of type function */}
      < Column tasks={tasks} onClickDelete={onClickDelete} />
    </div>
  );
}

export default App;
