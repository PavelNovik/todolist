import {FilterType, TodolistType} from "../App";
import {v1} from "uuid";

export const todolistId1 = v1();
export const todolistId2 = v1();

const initialState: TodolistType[] = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"},
]

export const todolistReducer = (state: TodolistType[] = initialState, action: TodosType): TodolistType[] => {
    switch (action.type) {
        case "ADD-NEW-TODOLIST" : {
            const newTodo: TodolistType = {id: action.payload.newTodolistId, title: action.payload.newTitle, filter: 'all'}
            return [newTodo, ...state]
        }
        case "REMOVE-TODOLIST" : {
            return state.filter(td => td.id !== action.payload.todolistId)
        }
        case "CHANGE-TODOLIST-TITLE" : {
            return state.map(td => td.id === action.payload.todolistId ? {
                ...td,
                title: action.payload.newTitle
            } : td)
        }
        case "CHANGE-TODOLIST-FILTER" : {
            return state.map(td => td.id === action.payload.todolistId ? {
                ...td,
                filter: action.payload.filterValue
            } : td)
        }
        default:
            return state

    }
}

export type TodosType = AddNewTodolistACType | RemoveTodolistACType | ChangeTodolistTitleACType | ChangeTodolistFilterACType


export type AddNewTodolistACType = ReturnType<typeof addNewTodolistAC>
export const addNewTodolistAC = ( newTitle: string) => {
    return {
        type: "ADD-NEW-TODOLIST",
        payload: {
            newTodolistId: v1(),
            newTitle
        }
    } as const
}

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
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