import React from 'react';
import {DataType} from "./App";


type TasksPropsType = {
    data: DataType
}
const Tasks = (props: TasksPropsType) => {
    return (
        <div>
            <h1>{props.data.title}</h1>
            <ul>
                {props.data.tasks.map(el => {
                    return (
                        <li>
                            <span>{el.taskId}</span>
                            <span>{el.title}</span>
                            <span>{el.isDone}</span>
                        </li>
                    )
                })}
            </ul>

            <ul>
                {props.data.students.map(el => {
                    return (
                        <li>{el}</li>
                    )
                })}
            </ul>
        </div>
    );
};

export default Tasks;