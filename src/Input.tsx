import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';

type InputProps = {
    onClick: (title: string) => void
}
export const Input: FC<InputProps> = ({onClick}) => {
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
            <input className={error ? 'error' : undefined} value={newTitle} onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}/>
            <button disabled={!newTitle} onClick={onClickHandler}>+</button>
            <div>{userMessage}</div>
        </div>
    );
};

