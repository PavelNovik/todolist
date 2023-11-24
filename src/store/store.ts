import {combineReducers, createStore, legacy_createStore} from "redux";
import {todolistReducer} from "../reducers/todolistReducer";
import {tasksReducer} from "../reducers/tasksReducer";

export const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
})

export type rootStateType = ReturnType<typeof rootReducer>

export const store = legacy_createStore(rootReducer)
// export const store = createStore(rootReducer)

// @ts-ignore
window.store = store