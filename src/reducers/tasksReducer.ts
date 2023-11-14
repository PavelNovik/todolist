import {TasksType} from "../App";
import {v1} from "uuid";
import {TaskType} from "../Todolist";
import {AddNewTodolistACType, RemoveTodolistACType} from "./todolistReducer";

export const tasksReducer = (tasks: TasksType, action: TaskReducerType): TasksType => {
    switch (action.type) {
        case "REMOVE-TASK" : {
            return {
                ...tasks,
                [action.payload.todolistId]: tasks[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            }
        }
        case "ADD-TASK" : {
            const newTask: TaskType = {id: v1(), title: action.payload.newTitle, isDone: false}
            return {...tasks, [action.payload.todolistId]: [newTask, ...tasks[action.payload.todolistId]]}
        }
        case "CHANGE-TASK-STATUS" : {
            return {...tasks, [action.payload.todolistId]: tasks[action.payload.todolistId].map(t=> t.id === action.payload.id ? {...t, isDone: action.payload.isDone} : t)}
        }
        case "CHANGE-TASK-TITLE" : {
            return {...tasks, [action.payload.todolistId]: tasks[action.payload.todolistId].map(t=> t.id === action.payload.taskId ? {...t, title: action.payload.newTitle} : t)}
        }
        case 'ADD-NEW-TODOLIST': {
            return {...tasks, [action.payload.newTodolistId]:[]}
        }
        case "REMOVE-TODOLIST" : {
            const copyTasks = {...tasks}
            delete copyTasks[action.payload.todolistId]
            return copyTasks
        }
        default:
            return tasks
    }
}

export type TaskReducerType = RemoveTaskACType | AddTaskACType | ChangeTaskStatusACType | ChangeTaskTitleACType | AddNewTodolistACType | RemoveTodolistACType

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
// type AddNewTodolistACType = ReturnType<typeof addNewTodolistAC>
// export const addNewTodolistAC = (newTodolistId: string, newTitle:string) => {
//     return {
//         type: "ADD-NEW-TODOLIST",
//         payload: {
//             newTodolistId,
//             newTitle
//         }
//     } as const
// }