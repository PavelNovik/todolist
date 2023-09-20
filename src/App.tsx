import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

export type FilterType = 'all' | 'active' | 'completed'


function App() {
    // BLL
    const todoListTitle: string = "What to learn"

    // useState()
    // useReducer()
    // redux

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "CSS", isDone: false},
        {id: 5, title: "SASS", isDone: true},
    ])


    const removeTask = (taskId: number) => {
        const result: Array<TaskType> = tasks.filter(t => t.id !== taskId)
        setTasks(result)
    }

    const [filter, setFilter] = useState<FilterType>('all')

    // With function and switch case
    const getFilteredTasks = (allTasks: Array<TaskType>, filterValue: FilterType): Array<TaskType> => {
        switch (filterValue) {
            case "active":
                return allTasks.filter(t => !t.isDone)
            case "completed":
                return allTasks.filter(t => t.isDone)
            case "all":
                return allTasks
        }
    }

    const filteredTasks: Array<TaskType> = getFilteredTasks(tasks, filter)


    // Ternary operator
    // const getFilTask: Array<TaskType> = filter === "active" ? tasks.filter(t => t.isDone === false) : filter === "completed" ? tasks.filter(t => t.isDone === true) : tasks

    // With if else operator

    // let filteredTask: Array<TaskType> = tasks
    // if (filter === 'active') {
    //     filteredTask = tasks.filter(t => t.isDone === false)
    // }
    // if (filter === 'completed') {
    //     filteredTask = tasks.filter(t => t.isDone === true)
    // }
    const filterTask = (value: FilterType) => {
        setFilter(value)
    }



    return (
        <div className="App">
            <Todolist title={todoListTitle} tasks={filteredTasks} removeTask={removeTask} filterTask={filterTask}/>


        </div>
    );
}

export default App;

