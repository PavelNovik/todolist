import React, {ChangeEvent, memo, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanProps = {
    title: string
    isDone?: boolean
    onClick: (title: string) => void
}
export const EditableSpan = memo(({title, isDone, onClick}: EditableSpanProps) => {
    const [newTitle, setNewTitle] = useState(title)
    const [isEditable, setIsEditable] = useState(false)

    const onClickHandler = () => {
        setIsEditable(!isEditable)
        if (isEditable) {
            onClick(newTitle)
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return (isEditable ?
            <TextField onChange={onChangeHandler} onBlur={onClickHandler} color={'secondary'} variant={'outlined'}
                       label={'title'} size={'small'} value={newTitle} autoFocus/> :
            <span onDoubleClick={onClickHandler} className={isDone ? "task-done" : "task-active"}>{title}</span>

    );
});
