import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterType = 'all' | 'active' | 'completed'


function App() {
    // BLL
    const todoListTitle: string = "What to learn"

    // useState()
    // useReducer()
    // redux

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "CSS", isDone: false},
        {id: v1(), title: "SASS", isDone: true},
    ])


    const removeTask = (taskId: string) => {
        const result: Array<TaskType> = tasks.filter(t => t.id !== taskId)
        setTasks(result)
    }

    const [filter, setFilter] = useState<FilterType>('all')


    const filteredTasks: Array<TaskType> = filter === "active" ? tasks.filter(t => !t.isDone) : filter === "completed" ? tasks.filter(t => t.isDone) : tasks

    const filterTask = (value: FilterType) => {
        setFilter(value)
    }
    const addTask = (newTitle: string) => {
        const newTask: TaskType = {id: v1(), title: newTitle, isDone: false}
        setTasks([newTask, ...tasks])
    }
    const changeTaskStatus = (id: string, isDone: boolean) => {
        const changedTasks = tasks.map(t => t.id === id ? {...t, isDone: isDone} : t)
        setTasks(changedTasks)
    }

    return (
        <div className="App">
            <Todolist title={todoListTitle}
                      tasks={filteredTasks}
                      removeTask={removeTask}
                      filterTask={filterTask}
                      filter={filter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}/>
        </div>
    );
}

export default App;

