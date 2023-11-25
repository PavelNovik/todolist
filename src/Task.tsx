import React, {ChangeEvent, memo} from "react";
import {Checkbox, Fade, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";

type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
    removeTask: (id: string) => void
    changeTaskTitle: (id: string, newTitle: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
}
export const Task = memo(({id, title, isDone, removeTask, changeTaskTitle, changeTaskStatus}: TaskPropsType) => {
    const removeTaskHandler = () => {
        removeTask(id)
    }
    const changeTaskTitleHandler = (newTitle: string) => {
        changeTaskTitle(id, newTitle)
    }
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(id, e.currentTarget.checked)
    }
    return (<Fade in={true}>
            <li>
                <Checkbox color="success" onChange={changeTaskStatusHandler} checked={isDone}/>
                <EditableSpan onClick={changeTaskTitleHandler} isDone={isDone} title={title}/>
                <IconButton aria-label="delete" onClick={removeTaskHandler}><DeleteIcon
                    fontSize="small"/></IconButton>
            </li>
        </Fade>
    )
})