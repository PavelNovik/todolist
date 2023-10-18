import React, {ChangeEvent, FC} from "react";
import {FilterType} from "./App";
import {Input} from "./Input";

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
    removeTodolist: (todolistIs: string) => void
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
                                                    removeTodolist
                                                }) => {
    const addTaskTitle = (newTitle: string) => {
        addTask(id, newTitle)
    }

    const removeTodolistHandler = () => removeTodolist(id)
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
        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(id, t.id, e.currentTarget.checked)
        }
        return (<li key={t.id}>
                <input onChange={changeTaskStatusHandler} type="checkbox" checked={t.isDone}/>
                <span className={t.isDone ? "task-done" : "task-active"}>{t.title}</span>
                <button onClick={removeTaskHandler}>x</button>
            </li>
        )
    })

    const tasksList: JSX.Element = !tasks.length ? (<span>Your tasks list is empty</span>) : (<ul>
        {listItems}
    </ul>)


    return (
        <div className={"todolist"}>
            <h3>{title}
                <button onClick={removeTodolistHandler}>X</button>
            </h3>
            <Input onClick={addTaskTitle}/>
            {tasksList}
            <div>
                <button className={filter === "all" ? 'active-filter' : ''} onClick={setFilterAll}>All</button>
                <button className={filter === "active" ? 'active-filter' : ''} onClick={setFilterActive}>Active
                </button>
                <button className={filter === "completed" ? 'active-filter' : ''}
                        onClick={setFilterCompleted}>Completed
                </button>
            </div>
        </div>
    )
}
