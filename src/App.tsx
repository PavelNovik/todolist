import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import {Grid} from "@mui/material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./reducers/todolistReducer";
import {
    addNewTodolistAC,
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./reducers/tasksReducer";

export type FilterType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
export type TasksType = {
    [todolistId: string]: TaskType[]
}

function App() {

    // redux
    const todolistId1 = v1();
    const todolistId2 = v1();


    const [todolists, dispatchTodolist] = useReducer(todolistReducer,        [
            {id: todolistId1, title: "What to learn", filter: "all"},
            {id: todolistId2, title: "What to buy", filter: "all"},
        ])

    // const [todolists, setTodolists] = useState<TodolistType[]>(
    //     [
    //         {id: todolistId1, title: "What to learn", filter: "all"},
    //         {id: todolistId2, title: "What to buy", filter: "all"},
    //     ]
    // )


    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todolistId1]: [{id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "CSS", isDone: false},
            {id: v1(), title: "SASS", isDone: true}],
        [todolistId2]: [{id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "CSS", isDone: false},
            {id: v1(), title: "SASS", isDone: true}],
    })

    // const [tasks, setTasks] = useState<TasksType>({
    //         [todolistId1]: [{id: v1(), title: "HTML&CSS", isDone: true},
    //             {id: v1(), title: "JS", isDone: true},
    //             {id: v1(), title: "ReactJS", isDone: false},
    //             {id: v1(), title: "CSS", isDone: false},
    //             {id: v1(), title: "SASS", isDone: true}],
    //         [todolistId2]: [{id: v1(), title: "HTML&CSS", isDone: true},
    //             {id: v1(), title: "JS", isDone: true},
    //             {id: v1(), title: "ReactJS", isDone: false},
    //             {id: v1(), title: "CSS", isDone: false},
    //             {id: v1(), title: "SASS", isDone: true}],
    //     }
    // )


    const removeTask = (todolistId: string, taskId: string) => {
        // const result: TasksType = {...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)}
        // setTasks(result)
        dispatchTasks(removeTaskAC(todolistId, taskId))
    }

    const filterTask = (todolistId: string, value: FilterType) => {
        // setTodolists(todolists.map(t => t.id === todolistId ? {...t, filter: value} : t))
        dispatchTodolist(changeTodolistFilterAC(todolistId, value))

    }
    const addTask = (todolistId: string, newTitle: string) => {
        // const newTask: TaskType = {id: v1(), title: newTitle, isDone: false}
        // setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
        dispatchTasks(addTaskAC(todolistId, newTitle))
    }
    const changeTaskStatus = (todolistId: string, id: string, isDone: boolean) => {
        // setTasks({
        //     ...tasks, [todolistId]: tasks[todolistId].map(t => t.id === id ? {...t, isDone: isDone} : t)
        // })
        dispatchTasks(changeTaskStatusAC(todolistId, id, isDone))
    }
    const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        // setTasks({
        //     ...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title: newTitle} : t)
        // })

        dispatchTasks(changeTaskTitleAC(todolistId, taskId, newTitle))
    }
    const addTodolist = (newTitle: string) => {
        // const newTodolist: TodolistType = {id: v1(), title: newTitle, filter: "all"}
        // setTodolists([...todolists, newTodolist])
        // setTasks({...tasks, [newTodolist.id]: []})
        const newTodolistId = v1()
        dispatchTodolist(addTodolistAC(newTodolistId, newTitle))
        // setTasks({...tasks, [newTodolistId]: []})
        dispatchTasks(addNewTodolistAC(newTodolistId))
    }
    const removeTodolist = (todolistId: string) => {
        // setTodolists(todolists.filter(td => td.id !== todolistId))
        dispatchTodolist(removeTodolistAC(todolistId))
        delete tasks[todolistId]
    }
    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
        // setTodolists(todolists.map(td => td.id === todolistId ? {...td, title: newTitle} : td))
        dispatchTodolist(changeTodolistTitleAC(todolistId, newTitle))
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Grid container spacing={2} style={{padding: '10px'}}>
                <Grid container item spacing={3}>
                    <Grid item xs={2}>
                        <AddItemForm onClick={addTodolist}/>
                    </Grid>
                </Grid>
                <Grid container item spacing={2}>
                    {todolists.map(el => {
                        const filteredTasks: TaskType[] = el.filter === "active" ? tasks[el.id].filter(t => !t.isDone) : el.filter === "completed" ? tasks[el.id].filter(t => t.isDone) : tasks[el.id]
                        return (
                            <Grid item xs={2}>
                                <Todolist key={el.id}
                                          id={el.id}
                                          title={el.title}
                                          tasks={filteredTasks}
                                          removeTask={removeTask}
                                          filterTask={filterTask}
                                          filter={el.filter}
                                          addTask={addTask}
                                          changeTaskStatus={changeTaskStatus}
                                          changeTaskTitle={changeTaskTitle}
                                          removeTodolist={removeTodolist}
                                          changeTodolistTitle={changeTodolistTitle}/>
                            </Grid>
                        )
                    })}
                </Grid>
            </Grid>
        </div>
    );
}

export default App;

