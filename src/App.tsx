import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {ButtonAppBar} from "./ButtonAppBar";
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

    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(todolistId, taskId))
    },[dispatch])

    const filterTask = useCallback((todolistId: string, value: FilterType) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    },[dispatch])
    const addTask = useCallback((todolistId: string, newTitle: string) => {
        dispatch(addTaskAC(todolistId, newTitle))
    }, [dispatch])
    const changeTaskStatus = useCallback((todolistId: string, id: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, id, isDone))
    },[dispatch])
    const changeTaskTitle = useCallback((todolistId: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, newTitle))
    },[dispatch])
    const addTodolist = useCallback((newTitle: string) => {
        dispatch(addNewTodolistAC(newTitle))
    }, [dispatch])
    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    },[dispatch])
    const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistId, newTitle))
    },[dispatch])

    return (
        <div className="App">
            <ButtonAppBar/>
            <Grid container spacing={2} style={{padding: '10px'}}>
                <Grid container item spacing={3}>
                    <Grid item>
                        <AddItemForm onClick={addTodolist}/>
                    </Grid>
                </Grid>
                <Grid container item spacing={2}>
                    {todolists.map(el => {
                        return (
                            <Grid item key={el.id}>
                                <Todolist
                                    id={el.id}
                                    title={el.title}
                                    tasks={tasks[el.id]}
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

