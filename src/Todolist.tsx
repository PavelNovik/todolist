import React, {memo, useCallback, useMemo} from "react";
import {FilterType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton, Paper} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {Task} from "./Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    id: string
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    filterTask: (todolistId: string, value: FilterType) => void
    filter: FilterType
    addTask: (todolistId: string, newTitle: string) => void
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, id: string, newTitle: string) => void
    removeTodolist: (todolistIs: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

export const Todolist = memo(({
                                  id,
                                  title,
                                  tasks,
                                  removeTask,
                                  filterTask,
                                  filter,
                                  addTask,
                                  changeTaskStatus,
                                  changeTaskTitle,
                                  removeTodolist,
                                  changeTodolistTitle,
                              }: TodolistPropsType) => {

    const addTaskTitle = useCallback((newTitle: string) => {
        addTask(id, newTitle)
    }, [addTask, id])

    const removeTodolistHandler = useCallback(() => removeTodolist(id), [removeTodolist, id])

    const changeTodolistTitleHandler = useCallback((newTitle: string) => {
        changeTodolistTitle(id, newTitle)
    }, [changeTodolistTitle, id])
    const setFilterAll = useCallback(() => {
        filterTask(id, 'all')
    }, [filterTask, id])
    const setFilterActive = useCallback(() => {
        filterTask(id, 'active')
    }, [filterTask, id])
    const setFilterCompleted = useCallback(() => {
        filterTask(id, 'completed')
    }, [filterTask, id])

    const removeTaskCallback = useCallback((taskId: string) => {
        removeTask(id, taskId)
    }, [removeTask, id])

    const changeTaskTitleCallback = useCallback((taskId: string, newTitle: string) => {
        changeTaskTitle(id, taskId, newTitle)
    }, [changeTaskTitle, id])

    const changeTaskStatusCallback = useCallback((taskId: string, isDone: boolean) => {
        changeTaskStatus(id, taskId, isDone)
    }, [changeTaskStatus, id])

    const filteredTasks: TaskType[] = useMemo(()=> {
        return filter === "active" ? tasks.filter(t => !t.isDone) : filter === "completed" ? tasks.filter(t => t.isDone) : tasks
    }, [filter, tasks])

    const listItems: Array<JSX.Element> = filteredTasks.map((t) => {
        return (
            <Task key={t.id} id={t.id}
                  removeTask={removeTaskCallback}
                  changeTaskTitle={changeTaskTitleCallback}
                  changeTaskStatus={changeTaskStatusCallback}
                  title={t.title} isDone={t.isDone}/>)
    })

    const tasksList: JSX.Element = !tasks.length ? (<span>Your tasks list is empty</span>) : (<ul>
        {listItems}
    </ul>)


    const todosStyle = {
        borderRadius: "10px"
    }

    return (
        <Paper style={todosStyle} elevation={24} className={"todolist"}>
            <h3><EditableSpan title={title} onClick={changeTodolistTitleHandler}/>
                <IconButton aria-label="delete" size="large" onClick={removeTodolistHandler}><DeleteIcon
                    fontSize="inherit"/></IconButton>
            </h3>
            <AddItemForm onClick={addTaskTitle}/>
            {tasksList}
            <div>
                <Button color="success" variant={filter === "all" ? 'contained' : 'outlined'}
                        onClick={setFilterAll}>All</Button>
                <Button color="secondary" variant={filter === "active" ? 'contained' : 'outlined'}
                        onClick={setFilterActive}>Active
                </Button>
                <Button color="error" variant={filter === "completed" ? 'contained' : 'outlined'}
                        onClick={setFilterCompleted}>Completed
                </Button>
            </div>
        </Paper>
    )
})


