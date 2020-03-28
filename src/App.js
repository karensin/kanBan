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

class Stage {
  constructor(stageID, task) {
    //constructor is function not a map
    this.stageID = stageID;
    this.task = task;
  }
}

function Column(props) {

  // (blah) => doSomething()
  // function noName(blah) {doSomething()}
  //each task should generate its own div tag n id to seperate 
  const toDisplay = props.tasks.map(task =>

    <div>
      {props.stageID}
      <div onClick={e => props.onClickMoveRight(task.id, props.stageID)} key={task.id}>  {task.content}  </div>
      <button onClick={e => props.onClickDelete(task.id)} > </button>
    </div>)
  // props.tasks is a list of strings
  // task is a string

  return (
    <div className="column">
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
  // const [tasks, setTasks] = useState([])
  // const [planned, setPlanned] = useState([])   //planned [] of tasks (objs)
  // const [inProgress, setinProgress] = useState([])  //inProgress [] 
  // const [testing, setTesting] = useState([])  //testing []
  // const [done, setDone] = useState([])   //done []

  const [stages, setStages] = useState({ 'planned': [], 'inProgress': [], 'testing': [], 'done': [] })

  // {
  //   planned: [{}] 

  // }

  function keyPressed(e) {

    if (e.key === "Enter") {
      let tempTask = new Task(uuidv4(), e.target.value)
      // setPlanned([...planned, tempTask])
      //  let tempStages=  stages['planned'].push(tempTask)
      let tempStages = { ...stages }
      tempStages['planned'].push(tempTask)
      setStages(tempStages)
    }
  }

  function onClickDelete(taskId) {
    // let tempTasks = planned.filter((task) => {
    //   return taskId !== task.id
    // }) //return a list that is not our targeted task.id

    // setPlanned(tempTasks)
  }

  // move task

  function onClickMoveRight(taskId, stageID) {
    console.log(stageID)
    //add task to the left one - in progress 
    let taskClicked
    //  [] of tasks inside the stage 
    let prevStage = stages[stageID]

    //return prevStage with new task 
    prevStage.map((task) => {
      if (taskId === task.id) {
        taskClicked = task
      }
    })
    //return new list without the task clicked
    let filteredOldTaskList = prevStage.filter((task) => {
      return taskId !== task.id
    })

    //

    let tempStages = { ...stages }
    tempStages[stageID] = filteredOldTaskList
    // setinProgress([...inProgress, taskClicked])
    //todo:  add to new list***** 
    setStages(tempStages)
    //remove that task from planned 
  }

  function onClickMoveLeft(taskId) {

  }


  return (
    <div className="App">
      Kanban
      <div className="container"></div>
      <input name="test" onKeyPress={keyPressed} />
      {/* passing a variable of type function */}

      < Column tasks={stages['planned']} stageID='planned' onClickDelete={onClickDelete} onClickMoveRight={onClickMoveRight} >
        planned
      </Column>

      < Column tasks={stages['inProgress']} stageID='inProgress' onClickDelete={onClickDelete} onClickMoveRight={onClickMoveRight} >
        In progress
      </Column>
      {/* < Column tasks={stages['planned']} stageID='testing' onClickDelete={onClickDelete} onClickMoveRight={onClickMoveRight}>
        Testing
      </Column>
      < Column tasks={done} stageID='done' onClickDelete={onClickDelete} onClickMoveRight={onClickMoveRight}>
        Done
      </Column> */}
    </div>
  );
}

export default App;
