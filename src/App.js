import React from 'react';
import { useState } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { Card, Icon, Image, Button, Feed } from 'semantic-ui-react';

//make 4 lists to store different stages 
// 1. planned 2. in progress 3. testing 4. done  
// create a task
// delete a task 
// move a task 

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
  let stagesNameList = ['Planned', 'In Progress', 'Testing', 'Completed']
  let stagesName = stagesNameList[props.stageID]

  // (blah) => doSomething()
  // function noName(blah) {doSomething()}
  //each task should generate its own div tag n id to seperate 
  const toDisplay = props.tasks.map(task =>

    < div >
      <Card.Description>
        <strong>{task.content}</strong>
      </Card.Description>
      <Button color='green' onClick={e => props.onClickMoveLeft(task.id, props.stageID)}> Left
      </Button>
      <Button color='red' onClick={e => props.onClickDelete(task.id, props.stageID)} > Delete</Button>
      < Button color='blue' onClick={e => props.onClickMoveRight(task.id, props.stageID)
      } key={task.id} > Right
      </Button >


    </div >)
  // props.tasks is a list of strings
  // task is a string

  return (

    <div className="column">
      <Card>
        <Card.Header>  {stagesName}</Card.Header>
        <Card.Content>  {toDisplay} </Card.Content>
      </Card>
    </div>
  )
}

function App() {
  // const [tasks, setTasks] = useState([])
  // const [planned, setPlanned] = useState([])   //planned [] of tasks (objs)
  // const [inProgress, setinProgress] = useState([])  //inProgress []
  // const [testing, setTesting] = useState([])  //testing []
  // const [done, setDone] = useState([])   //done []

  const [stages, setStages] = useState({ 0: [], 1: [], 2: [], 3: [] })


  function keyPressed(e) {

    if (e.key === "Enter") {
      console.log('fired', e.key)
      let tempTask = new Task(uuidv4(), e.target.value)
      console.log(tempTask)
      // setPlanned([...planned, tempTask])
      //  let tempStages=  stages['planned'].push(tempTask)
      let tempStages = { ...stages }
      tempStages[0].push(tempTask)
      setStages(tempStages)
    }
  }

  function onClickDelete(taskId, stageID) {

    //[] 
    let tempStage = stages[stageID]
    //return a list that is not our targeted task.id
    let tempTasks = tempStage.filter((task) => {
      return taskId !== task.id
    })
    let tempStages = { ...stages }
    tempStages[stageID] = tempTasks
    setStages(tempStages)

  }

  // move task

  function onClickMoveRight(taskId, stageID) {
    stageID = parseInt(stageID)

    console.log(stageID, stageID + 1)
    //add task to the right - in progress
    let taskClicked
    //  [] of tasks inside the stage
    let prevStage = stages[stageID]
    let nextStage = stages[stageID + 1]
    //return nextStage with new task
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

    tempStages[stageID + 1] = [...tempStages[stageID + 1], taskClicked]
    // tempStages[stageID + 1] = taskClicked

    setStages(tempStages)

    // setStages(tempStages)

    //remove that task from planned
  }

  function onClickMoveLeft(taskId, stageID) {

    stageID = parseInt(stageID)

    console.log(stageID, stageID + 1)
    //add task to the right - in progress
    let taskClicked
    //  [] of tasks inside the stage
    let prevStage = stages[stageID]
    let nextStage = stages[stageID - 1]
    //return nextStage with new task
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

    tempStages[stageID - 1] = [...tempStages[stageID - 1], taskClicked]
    // tempStages[stageID + 1] = taskClicked



    setStages(tempStages)


    // setStages(tempStages)

    //remove that task from planned

  }


  return (
    <div className="App">
      Kanban
      <div className="container"></div>
      <input type='text/javascript' name="test" onKeyPress={keyPressed} />
      <Container className="d-flex align-items-stretch">
        <Card.Group> </Card.Group>
        <Card.Group>
          <Card fluid color='red'>
            < Column tasks={stages[0]} stageID='0' onClickMoveLeft={onClickMoveLeft} onClickDelete={onClickDelete} onClickMoveRight={onClickMoveRight} >
            </Column>
          </Card>
        </Card.Group>
        <Card.Group>
          <Card fluid color='green'>
            < Column tasks={stages[1]} stageID='1' onClickMoveLeft={onClickMoveLeft} onClickDelete={onClickDelete} onClickMoveRight={onClickMoveRight} >
              In progress
      </Column>
          </Card>
        </Card.Group>
        <Card.Group>
          <Card fluid color='blue' >
            < Column tasks={stages[2]} stageID='2' onClickMoveLeft={onClickMoveLeft} onClickDelete={onClickDelete} onClickMoveRight={onClickMoveRight}>
              Testing
      </Column>
          </Card>
        </Card.Group>
        <Card.Group>
          <Card fluid color='grey' >
            < Column tasks={stages[3]} stageID='3' onClickMoveLeft={onClickMoveLeft} onClickDelete={onClickDelete} onClickMoveRight={onClickMoveRight}>
              Done
      </Column>
          </Card>
        </Card.Group>
      </Container>
    </div>
  );
}

export default App;
