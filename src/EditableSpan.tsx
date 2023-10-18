import React, {ChangeEvent, FC, useState} from 'react';

type EditableSpanProps = {
    title: string
    isDone?: boolean
    onClick: (title: string) => void
}
export const EditableSpan: FC<EditableSpanProps> = ({title, isDone, onClick}) => {
    const [newTitle, setNewTitle] = useState(title)
    const [isEditable, setIsEditable] = useState(false)

    const onClickHandler = () => {
        setIsEditable(!isEditable)
        if(isEditable) {
            onClick(newTitle)
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return (isEditable ?
            <input onChange={onChangeHandler} onBlur={onClickHandler} type="text" value={newTitle} autoFocus/> :
            <span onDoubleClick={onClickHandler} className={isDone ? "task-done" : "task-active"}>{title}</span>

    );
};
