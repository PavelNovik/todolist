import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

function App() {
const tasks1: Array<TaskType> = [
    {id: 1, title: "HTML&CSS", isDone: true},
    {id: 2, title: "JS", isDone: true},
    {id: 3, title: "ReactJS", isDone: false},
    {id: 4, title: "CSS", isDone: false},
    {id: 5, title: "SASS", isDone: true},
];
const tasks2: Array<TaskType> = [
    {id: 6, title: "Hello world", isDone: true},
    {id: 7, title: "I am Happy", isDone: false},
    {id: 8, title: "Yo", isDone: false},
];
    return (
        <div className="App">
            <Todolist title={"What to learn"} tasks={tasks1}/>
            <Todolist title={"English"} tasks={tasks2}/>

        </div>
    );
}

export default App;

