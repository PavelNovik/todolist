import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
// import Tasks from "./Tasks";


type TasksType = {
    taskId: number
    title: string
    isDone: boolean
}

export type DataType = {
    title: string
    tasks: Array<TasksType>
    students: Array<string>
}

export type FilterType = 'all' | 'active' | 'completed'


function App() {
    // BLL
    const todoListTitle: string = "What to learn"

    // useState()
    // useReducer()
    // redux

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "CSS", isDone: false},
        {id: 5, title: "SASS", isDone: true},
    ])


    const removeTask = (taskId: number) => {
        const result: Array<TaskType> = tasks.filter(t => t.id !== taskId)
        setTasks(result)
    }

    const [filter, setFilter] = useState<FilterType>('all')

    // With function and switch case
    const getFilteredTasks = (allTasks: Array<TaskType>, filterValue: FilterType): Array<TaskType> => {
        switch (filterValue) {
            case "active":
                return allTasks.filter(t => t.isDone === false)
            case "completed":
                return allTasks.filter(t => t.isDone === true)
            case "all":
                return allTasks
        }
    }

    const filterdTasks: Array<TaskType> = getFilteredTasks(tasks, filter)


    // Ternary operator
    // const getFilTask: Array<TaskType> = filter === "active" ? tasks.filter(t => t.isDone === false) : filter === "completed" ? tasks.filter(t => t.isDone === true) : tasks

    // With if else operator

    // let filteredTask: Array<TaskType> = tasks
    // if (filter === 'active') {
    //     filteredTask = tasks.filter(t => t.isDone === false)
    // }
    // if (filter === 'completed') {
    //     filteredTask = tasks.filter(t => t.isDone === true)
    // }
    const filterTask = (value: FilterType) => {
        setFilter(value)
    }

    // const tasks1: Array<TaskType> = [
    //     {id: 1, title: "HTML&CSS", isDone: true},
    //     {id: 2, title: "JS", isDone: true},
    //     {id: 3, title: "ReactJS", isDone: false},
    //     {id: 4, title: "CSS", isDone: false},
    //     {id: 5, title: "SASS", isDone: true},
    // ];
    // const tasks2: Array<TaskType> = [
    //     {id: 6, title: "Hello world", isDone: true},
    //     {id: 7, title: "I am Happy", isDone: false},
    //     {id: 8, title: "Yo", isDone: false},
    // ];
    // const data1: DataType = {
    //     title: "What to do",
    //     tasks: [
    //         {taskId: 1, title: "HTML&CSS2", isDone: true},
    //         {taskId: 2, title: "JS2", isDone: true}
    //     ],
    //     students: [
    //         'Jago Wormald1',
    //         'Saul Milne2',
    //         'Aariz Hester3',
    //         'Dion Reeve4',
    //         'Anisa Ortega5',
    //         'Blade Cisneros6',
    //         'Malaikah Phelps7',
    //         'Zeeshan Gallagher8',
    //         'Isobella Vo9',
    //         'Rizwan Mathis10',
    //         'Menaal Leach11',
    //         'Kian Walton12',
    //         'Orion Lamb13',
    //         'Faizah Huynh14',
    //         'Crystal Vaughan15',
    //         'Vivien Hickman16',
    //         'Stuart Lu17',
    //         'Karol Davison18',
    //         'Dario Burns19',
    //         'Chloe Rich20',
    //         'Martyna Felix',
    //         'Nida Glass',
    //         'Maeve Miles',
    //         'Hasnain Puckett',
    //         'Ayman Cano',
    //         'Safwan Perry',
    //         'Fox Kelly',
    //         'Louise Barlow',
    //         'Malaki Mcgill',
    //         'Leanna Cline',
    //         'Willard Hodge',
    //         'Amelia Dorsey',
    //         'Kiah Porter',
    //         'Jeanne Daly',
    //         'Mohsin Armstrong',
    //         'Laurie Rangel',
    //         'Princess Tierney',
    //         'Kasim Kendall',
    //         'Darryl Cope',
    //         'Elysha Ray',
    //         'Liyana Harris',
    //         'Kashif Blackburn',
    //         'Atif Zimmerman',
    //         'Sila Hartley',
    //         'Ralphie Hebert',
    //     ]
    // };
    // const data2: DataType = {
    //     title: "What to learn",
    //     tasks: [
    //         {taskId: 1, title: "HTML&CSS", isDone: true},
    //         {taskId: 2, title: "JS", isDone: true}
    //     ],
    //     students: [
    //         'Rick Kane',
    //         'Finnlay Bentley',
    //         'Samia North',
    //         'Isaac Morton',
    //         'Lily-Ann Clifford',
    //         'Thalia Park',
    //         'Sapphire Cruz',
    //         'Cieran Vazquez',
    //         'Anya Estes',
    //         'Dominika Field',
    //         'Rosanna Chung',
    //         'Safiyah Davey',
    //         'Ryley Beasley',
    //         'Kalvin Trejo',
    //         'Evie-Mae Farrell',
    //         'Juliet Valencia',
    //         'Astrid Austin',
    //         'Lyle Montgomery',
    //         'Nisha Mora',
    //         'Kylie Callaghan',
    //         'Star Wilks',
    //         'Marissa Colley',
    //         'Asa Fuller',
    //         'Leigh Kemp',
    //         'Avleen Dawson',
    //         'Sammy Bonilla',
    //         'Acacia Becker',
    //         'Coral Shepherd',
    //         'Melina Molina',
    //         'Kiran Bailey',
    //         'Clara Escobar',
    //         'Alexandru Horn',
    //         'Brandon-Lee Mercado',
    //         'Elouise Weston',
    //         'King Long',
    //         'Kerri Searle',
    //         'Kanye Hamer',
    //         'Elwood Benitez',
    //         'Mikail Whitaker',
    //         'Bobby Hardy',
    //         'Talha Ferry',
    //         'Priscilla Landry',
    //         'Olivia-Grace Cain',
    //         'Kiaan Wallace',
    //         'Wesley Padilla90',
    //         'Ella-Grace Wooten91',
    //         'Kaif Molloy92',
    //         'Kamal Broadhurst93',
    //         'Bianca Ferrell94',
    //         'Micheal Talbot95',
    //     ]
    // };
    return (
        <div className="App">
            <Todolist title={todoListTitle} tasks={filterdTasks} removeTask={removeTask} filterTask={filterTask}/>
            {/*<Todolist title={"English"} tasks={tasks2}/>*/}
            {/*<Tasks data={data1}/>*/}
            {/*<Tasks data={data2}/>*/}

        </div>
    );
}

export default App;

