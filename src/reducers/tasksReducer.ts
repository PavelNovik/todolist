import {TasksType} from "../App";
import {v1} from "uuid";
import {TaskType} from "../Todolist";
import {AddNewTodolistACType, RemoveTodolistACType, todolistId1, todolistId2} from "./todolistReducer";


const initialState: TasksType = {
    [todolistId1]: [{id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "CSS", isDone: false},
        {id: v1(), title: "SASS", isDone: true}],
    [todolistId2]: [{id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "CSS", isDone: false},
        {id: v1(), title: "SASS", isDone: true}],
}

export const tasksReducer = (state: TasksType = initialState, action: TaskReducerType): TasksType => {
    switch (action.type) {
        case "REMOVE-TASK" : {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            }
        }
        case "ADD-TASK" : {
            const newTask: TaskType = {id: v1(), title: action.payload.newTitle, isDone: false}
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        }
        case "CHANGE-TASK-STATUS" : {
            return {...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.id ? {
                    ...t,
                    isDone: action.payload.isDone
                } : t)
            }
        }
        case "CHANGE-TASK-TITLE" : {
            return {...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    title: action.payload.newTitle
                } : t)
            }
        }
        case 'ADD-NEW-TODOLIST': {
            return {...state, [action.payload.newTodolistId]: []}
        }
        case "REMOVE-TODOLIST" : {
            const copyTasks = {...state}
            delete copyTasks[action.payload.todolistId]
            return copyTasks
        }
        default:
            return state
    }
}

export type TaskReducerType =
    RemoveTaskACType
    | AddTaskACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | AddNewTodolistACType
    | RemoveTodolistACType

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            todolistId,
            taskId
        }
    } as const
}
type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistId: string, newTitle: string) => {
    return {
        type: "ADD-TASK",
        payload: {
            todolistId,
            newTitle
        }
    } as const
}

type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todolistId: string, id: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todolistId,
            id,
            isDone
        }
    } as const
}
type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload: {
            todolistId,
            taskId,
            newTitle
        }
    } as const
}
