import {FilterType, TodolistType} from "../App";

export const todolistReducer = (todolists: TodolistType[], action: TodosType): TodolistType[] => {
    switch (action.type) {
        case "ADD-TODOLIST" : {
            const newTodo: TodolistType = {id: action.payload.newTodolistId, title: action.payload.newTitle, filter: 'all'}
            return [newTodo, ...todolists]
        }
        case "REMOVE-TODOLIST" : {
            return todolists.filter(td => td.id !== action.payload.todolistId)
        }
        case "CHANGE-TODOLIST-TITLE" : {
            return todolists.map(td => td.id === action.payload.todolistId ? {
                ...td,
                title: action.payload.newTitle
            } : td)
        }
        case "CHANGE-TODOLIST-FILTER" : {
            return todolists.map(td => td.id === action.payload.todolistId ? {
                ...td,
                filter: action.payload.filterValue
            } : td)
        }
        default:
            return todolists

    }
}

type TodosType = AddTodolistACType | RemoveTodolistACType | ChangeTodolistTitleACType | ChangeTodolistFilterACType


type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (newTodolistId: string, newTitle: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            newTodolistId,
            newTitle
        }
    } as const
}

type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {
            todolistId
        }
    } as const
}

type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistId: string, newTitle: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        payload: {
            todolistId,
            newTitle
        }
    } as const
}

type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>

export const changeTodolistFilterAC = (todolistId: string, filterValue: FilterType) => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        payload: {
            todolistId,
            filterValue
        }
    } as const
}