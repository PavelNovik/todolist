import {TodolistType} from "../App";
import {
    addNewTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./todolistReducer";

const startState: TodolistType[] = [
    {id: '1', title: 'Title1', filter: 'all'},
    {id: '2', title: 'Title2', filter: 'all'},
]
test('Add Todolist', () => {
    const action = addNewTodolistAC('Title3')
    const newState = todolistReducer(startState, action)

    expect(newState.length).toBe(3)
    expect(newState[0].title).toBe('Title3')
    expect(newState[0].id).toBe(action.payload.newTodolistId)

})

test('Remove Todolist', () => {
    const newState = todolistReducer(startState, removeTodolistAC('2'))

    expect(newState.length).toBe(1)
    expect(newState.every(t => t.id !== '2')).toBe(true)
    expect(newState.every(t => t.id !== '2')).toBeTruthy()
})

test('Change Todolist Title', () => {
    const newState = todolistReducer(startState, changeTodolistTitleAC('1', 'New Title'))

    expect(newState.length).toBe(2)
    expect(newState[0].title).toBe('New Title')

})
test('Change Todolist Filter', () => {
    const newState = todolistReducer(startState, changeTodolistFilterAC('2', 'active'))

    expect(newState[1].filter).toBe('active')
    expect(newState[0].filter).toBe('all')
})