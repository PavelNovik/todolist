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
    addTask: (newTitle: string) => void
}

export const Todolist: FC<TodolistPropsType> = ({title, tasks, removeTask, filterTask, addTask}) => {

    const [newTitle, setNewTitle] = useState<string>('')


    const listItems: Array<JSX.Element> = tasks.map((t) => {
        return (<li key={t.id}><input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                <button onClick={() => removeTask(t.id)}>x</button>
            </li>
        )
    })

    const tasksList: JSX.Element = !tasks.length ? (<span>Your tasks list is empty</span>) : (<ul>
        {listItems}
    </ul>)

    const onClickHandler = () => {
        addTask(newTitle)
        setNewTitle('')
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && e.ctrlKey) {
            onClickHandler()
        }
    }

    return (
        <div className={"todolist"}>
            <h3>{title}</h3>
            <div>
                <input value={newTitle} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
                <button disabled={!newTitle} onClick={onClickHandler}>+</button>
            </div>
            {tasksList}
            <div>
                <button onClick={() => filterTask('all')}>All</button>
                <button onClick={() => filterTask('active')}>Active</button>
                <button onClick={() => filterTask('completed')}>Completed</button>
            </div>
        </div>
    )
}