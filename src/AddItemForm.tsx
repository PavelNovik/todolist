import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {Button, TextField} from "@mui/material";

type InputProps = {
    onClick: (title: string) => void
}
export const AddItemForm: FC<InputProps> = ({onClick}) => {
    const [newTitle, setNewTitle] = useState<string>('')
    const [error, setError] = useState(false)
    const onClickHandler = () => {
        const trimmedTitle = newTitle.trim()
        trimmedTitle ? onClick(trimmedTitle) : setError(true)
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

    const userMessage: JSX.Element = error ?
        <span style={{color: "darkred"}}>Input should not be empty</span> :
        <span style={{fontSize: '13px'}}>Press ctrl+enter</span>

    return (
        <div>
            <TextField label="New Title" id="outlined-size-small" size="small" className={error ? 'error' : undefined} value={newTitle} onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}/>
            <Button variant="contained" size="small" color="success" disabled={!newTitle} onClick={onClickHandler}>+</Button>
            <div>{userMessage}</div>
        </div>
    );
};

// <TextField
//     label="Size"
//     id="outlined-size-small"
//     defaultValue="Small"
//     size="small"
// />
