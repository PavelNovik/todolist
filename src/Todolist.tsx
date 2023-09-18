import React, {FC} from "react";
import {FilterType} from "./App";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    filterTask: (value: FilterType) => void
}

export const Todolist: FC<TodolistPropsType> = ({title, tasks, removeTask, filterTask}) => {
    // const {title: myTitle, tasks} = props

    const listItems: Array<JSX.Element> = tasks.map((t) => {
        // debugger
        return (<li key={t.id}><input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                <button onClick={() => removeTask(t.id)}>x</button>
            </li>
        )
    })

    const tasksList: JSX.Element = !tasks.length ? (<span>Your tasks list is empty</span>) : (<ul>
        {listItems}
    </ul>)
    return (
        <div className={"todolist"}>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            {tasksList}
            {/*<ul>*/}
            {/*    {tasks.map((t, i) => {*/}
            {/*        return (<li key={i}><input type="checkbox" checked={t.isDone}/> <span>{t.title}</span><button>x</button></li>*/}
            {/*        )*/}
            {/*    })}*/}
            {/*</ul>*/}
            <div>
                <button onClick={() => filterTask('all')}>All</button>
                <button onClick={() => filterTask('active')}>Active</button>
                <button onClick={() => filterTask('completed')}>Completed</button>
            </div>
        </div>
    )
}