import React, {ChangeEvent, KeyboardEvent, FC, useState} from "react";
import {FilterType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    filterTask: (value: FilterType) => void
    filter: FilterType
    addTask: (newTitle: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
}

export const Todolist: FC<TodolistPropsType> = ({
                                                    title,
                                                    tasks,
                                                    removeTask,
                                                    filterTask,
                                                    filter,
                                                    addTask,
                                                    changeTaskStatus
                                                }) => {

    const [newTitle, setNewTitle] = useState<string>('')
    const [error, setError] = useState(false)

    const onClickHandler = () => {
        const trimmedTitle = newTitle.trim()
        trimmedTitle ? addTask(trimmedTitle) : setError(true)
        setNewTitle('')
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (e.key === "Enter" && e.ctrlKey) {
            onClickHandler()
        }
    }
    const setFilterAll = () => {
        filterTask('all')
    }
    const setFilterActive = () => {
        filterTask('active')
    }
    const setFilterCompleted = () => {
        filterTask('completed')
    }

    const listItems: Array<JSX.Element> = tasks.map((t) => {
        const removeTaskHandler = () => {
            removeTask(t.id)
        }
        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(t.id, e.currentTarget.checked)
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
    const userMessage: JSX.Element = error ?
        <span style={{color: "darkred"}}>Input should not be empty</span> : newTitle.length > 15 ?
            <span style={{color: "darkred"}}>Input is too long</span> :
            <span style={{fontSize: '13px'}}>Press ctrl+enter to add task</span>

    return (
        <div className={"todolist"}>
            <h3>{title}</h3>
            <div>
                <input className={error ? 'error' : undefined} value={newTitle} onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}/>
                <button disabled={!newTitle} onClick={onClickHandler}>+</button>
            </div>
            {userMessage}
            {tasksList}
            <div>
                <button className={filter === "all" ? 'active-filter' : undefined} onClick={setFilterAll}>All</button>
                <button className={filter === "active" ? 'active-filter' : undefined} onClick={setFilterActive}>Active
                </button>
                <button className={filter === "completed" ? 'active-filter' : undefined}
                        onClick={setFilterCompleted}>Completed
                </button>
            </div>
        </div>
    )
}