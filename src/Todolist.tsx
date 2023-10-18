import React, {ChangeEvent, FC} from "react";
import {FilterType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

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

export const Todolist: FC<TodolistPropsType> = ({
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
                                                }) => {
    const addTaskTitle = (newTitle: string) => {
        addTask(id, newTitle)
    }

    const removeTodolistHandler = () => removeTodolist(id)

    const changeTodolistTitleHandler = (newTitle: string) => {
        changeTodolistTitle(id, newTitle)
    }
    const setFilterAll = () => {
        filterTask(id, 'all')
    }
    const setFilterActive = () => {
        filterTask(id, 'active')
    }
    const setFilterCompleted = () => {
        filterTask(id, 'completed')
    }

    const listItems: Array<JSX.Element> = tasks.map((t) => {
        const removeTaskHandler = () => {
            removeTask(id, t.id)
        }
        const changeTaskTitleHandler = (newTitle: string) => {
            changeTaskTitle(id, t.id, newTitle)
        }
        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(id, t.id, e.currentTarget.checked)
        }
        return (<li key={t.id}>
                <Checkbox color="default" onChange={changeTaskStatusHandler} checked={t.isDone}/>
                <EditableSpan onClick={changeTaskTitleHandler} isDone={t.isDone} title={t.title}/>
                <IconButton aria-label="delete" onClick={removeTaskHandler}><DeleteIcon fontSize="small"/></IconButton>
            </li>
        )
    })

    const tasksList: JSX.Element = !tasks.length ? (<span>Your tasks list is empty</span>) : (<ul>
        {listItems}
    </ul>)


    return (
        <div className={"todolist"}>
            <h3><EditableSpan title={title} onClick={changeTodolistTitleHandler}/>
                <IconButton aria-label="delete" size="large" onClick={removeTodolistHandler}><DeleteIcon fontSize="inherit"/></IconButton>
            </h3>
            <AddItemForm onClick={addTaskTitle}/>
            {tasksList}
            <div>
                <Button color="success" variant={filter === "all" ? 'contained' : 'outlined'} onClick={setFilterAll}>All</Button>
                <Button color="success" variant={filter === "active" ? 'contained' : 'outlined'} onClick={setFilterActive}>Active
                </Button>
                <Button color="success" variant={filter === "completed" ? 'contained' : 'outlined'}
                        onClick={setFilterCompleted}>Completed
                </Button>
            </div>
        </div>
    )
}
