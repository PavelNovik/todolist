import {TasksType} from "../App";
import {
    addNewTodolistAC,
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./tasksReducer";

const tasks: TasksType = {
    ['1']: [
        {id: 'a', title: "title1.1", isDone: false},
        {id: 'b', title: "title1.2", isDone: true}
    ],
    ['2']: [
        {id: 'c', title: "title2.1", isDone: true},
        {id: 'd', title: "title2.2", isDone: false}
    ]
}

test('Remove Task from Todolist', () => {
    const newState = tasksReducer(tasks, removeTaskAC('2', 'd'))

    expect(tasks['2'].length).toBe(2)
    expect(newState['2'].length).toBe(1)
    expect(newState['2'].every(t => t.id !== 'd')).toBeTruthy()
    expect(newState[1].length).toBe(2)
})

test('Add Task in Todolist', () => {
    const newState = tasksReducer(tasks, addTaskAC('1', 'title1.3'))
    expect(tasks['1'].length).toBe(2)
    expect(newState['1'].length).toBe(3)
    expect(newState[1][0].title).toBe('title1.3')
    expect(newState[2].length).toBe(2)
})

test('Change Task Status in Todolist', () => {
    const newState = tasksReducer(tasks, changeTaskStatusAC('1', 'a', true))

    expect(tasks[1][0].isDone).toBeFalsy()
    expect(newState[1][0].isDone).toBeTruthy()
    expect(newState[1][1].isDone).toBeTruthy()
})

test('Change Task Title in Todolist', () => {
    const newState = tasksReducer(tasks, changeTaskTitleAC('2', 'c', 'New Title 2.1'))
    expect(tasks[2][0].title).toBe('title2.1')
    expect(newState[2][0].title).toBe('New Title 2.1')
})

test('Add New Todolist Title in Tasks List',()=> {
    const newState = tasksReducer(tasks, addNewTodolistAC('3'))

    expect(tasks[3]).toBeFalsy()
    expect(newState[3]).toBeTruthy()
    expect(newState[3].length).toBe(0)

})