import React from 'react';
import { useState } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap/Container';

function Board(props) {


  return (
    <div>
    </div>
  )
}


function App() {
  //make 4 lists to store different stages 
  // 1. planned 2. in progress 3. testing 4. done  
  // create a task
  // delete a task 
  // move a task 

  const [task, setTask] = useState(null)
  const [newTask, setNewTask] = useState(null)
  const [planned, setPlanned] = useState([])
  const [inProgress, setinProgress] = useState([])
  const [testing, setTesting] = useState([])
  const [done, getDone] = useState([])



  function onChangeAddTask(e) {
    setTask(e.target.value)
  }

  console.log(task, 'task')

  function keyPressed(e) {
    if (e.key === "Enter") {
      setPlanned([...planned, task])
    }
    //each task should generate its own div tag to seperate 
  }

  console.log(planned, 'planned')


  return (
    <div className="App">
      Kanban
      <div className="container">
        {planned}


      </div>

      <input name="test" onKeyPress={keyPressed} onChange={onChangeAddTask} />
      <Board task={task} />
    </div>
  );
}

export default App;
