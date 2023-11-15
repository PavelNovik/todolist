import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import {Grid} from "@mui/material";
import {
    addNewTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./reducers/todolistReducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
} from "./reducers/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {rootStateType} from "./store/store";

export type FilterType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
export type TasksType = {
    [key: string]: TaskType[]
}

function App() {

    const dispatch = useDispatch()
    const todolists = useSelector<rootStateType, TodolistType[]>((state) => state.todolists)
    const tasks = useSelector<rootStateType, TasksType>((state) => state.tasks)

    const removeTask = (todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(todolistId, taskId))
    }

    const filterTask = (todolistId: string, value: FilterType) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }
    const addTask = (todolistId: string, newTitle: string) => {
        dispatch(addTaskAC(todolistId, newTitle))
    }
    const changeTaskStatus = (todolistId: string, id: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, id, isDone))
    }
    const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, newTitle))
    }
    const addTodolist = (newTitle: string) => {
        dispatch(addNewTodolistAC(newTitle))
    }
    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }
    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistId, newTitle))
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Grid container spacing={2} style={{padding: '10px'}}>
                <Grid container item spacing={3}>
                    <Grid item xs={2}>
                        <AddItemForm onClick={addTodolist}/>
                    </Grid>
                </Grid>
                <Grid container item spacing={2}>
                    {todolists.map(el => {
                        const filteredTasks: TaskType[] = el.filter === "active" ? tasks[el.id].filter(t => !t.isDone) : el.filter === "completed" ? tasks[el.id].filter(t => t.isDone) : tasks[el.id]
                        return (
                            <Grid item xs={2}>
                                <Todolist key={el.id}
                                          id={el.id}
                                          title={el.title}
                                          tasks={filteredTasks}
                                          removeTask={removeTask}
                                          filterTask={filterTask}
                                          filter={el.filter}
                                          addTask={addTask}
                                          changeTaskStatus={changeTaskStatus}
                                          changeTaskTitle={changeTaskTitle}
                                          removeTodolist={removeTodolist}
                                          changeTodolistTitle={changeTodolistTitle}/>
                            </Grid>
                        )
                    })}
                </Grid>
            </Grid>
        </div>
    );
}

export default App;

