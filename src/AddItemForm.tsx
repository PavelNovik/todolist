import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {Button, IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

type InputProps = {
    onClick: (title: string) => void
}
export const AddItemForm: FC<InputProps> = ({onClick}) => {
    const [newTitle, setNewTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const onClickHandler = () => {
        const trimmedTitle = newTitle.trim()
        trimmedTitle ? onClick(trimmedTitle) : setError('Input should not be empty')
        setNewTitle('')
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter" && e.ctrlKey) {
            onClickHandler()
        }
    }

    const userMessage: JSX.Element = error ?
        <span style={{fontSize: '13px'}}>Press any key</span> :
        <span style={{fontSize: '13px'}}>Press ctrl+enter to add new title</span>

    const stylesButton = {
            maxWidth: '38px',
            maxHeight: '38px',
            minWidth: '38px',
            minHeight: '38px',
            color: 'white',
            backgroundColor: 'red',
            marginLeft: '5px',
        }

    return (
        <div>
            <TextField label={error ? error : "New Title"} id="outlined-size-small" size="small"
                       className={error ? 'error' : undefined} value={newTitle} onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler} error={!!error}/>
            <Button size="small"
                    style={newTitle? stylesButton : {...stylesButton, opacity: "0.5"}}
                    disabled={!newTitle}
                    onClick={onClickHandler}>+</Button>
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
