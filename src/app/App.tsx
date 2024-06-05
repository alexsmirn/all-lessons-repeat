import React, {useEffect, useState} from 'react';
import './App.css';
import {Todolist} from "../features/Todolist";
import {v1} from "uuid";

type TodolistType = {
    id: string,
    title: string,
    filter: TodolistFilterType
}

export type TodolistFilterType = 'all' | 'completed' | 'active'

function App() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: 'Todolist N1', filter: 'all'},
        {id: todolistId2, title: 'Todolist N2', filter: 'all'},
    ])

    const [tasks, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: 'Todolist N1 Task N1', isDone: false},
            {id: v1(), title: 'Todolist N1 Task N2', isDone: false},
            {id: v1(), title: 'Todolist N1 Task N3', isDone: true},
            {id: v1(), title: 'Todolist N1 Task N4', isDone: true},
            {id: v1(), title: 'Todolist N1 Task N5', isDone: true},
            {id: v1(), title: 'Todolist N1 Task N6', isDone: true},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Todolist N2 Task N1', isDone: false},
            {id: v1(), title: 'Todolist N2 Task N2', isDone: false},
            {id: v1(), title: 'Todolist N2 Task N3', isDone: true},
            {id: v1(), title: 'Todolist N2 Task N4', isDone: true},
            {id: v1(), title: 'Todolist N2 Task N5', isDone: true},
            {id: v1(), title: 'Todolist N2 Task N6', isDone: true},
        ]
    })

    useEffect(() => {
        console.log('UseEffect')
        console.log(todolists)
        console.log(tasks)
    })

    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }

    const addTask = (todolistId: string, title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const changeTaskStatus = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => {
                return task.id === taskId ? {...task, isDone: !task.isDone} : task
            })})
    }

    const changeFilter = (todolistId: string, newFilterValue: TodolistFilterType) => {
        setTodolists(todolists.map(tdl => tdl.id === todolistId ? {...tdl, filter: newFilterValue} : tdl))
    }

    const removeTodolist = (todolistId: string) => {
        const newTodolists = todolists.filter(tdl => tdl.id !== todolistId)
        setTodolists(newTodolists)

        delete tasks[todolistId]
        setTasks({...tasks})
    }

    return (
        <div className="App">
            {todolists.map(tdl => {

                let tasksForTodolist = tasks[tdl.id]

                if (tdl.filter === 'completed') {tasksForTodolist = tasks[tdl.id].filter(el => el.isDone)}
                if (tdl.filter === 'active') {tasksForTodolist = tasks[tdl.id].filter(el => !el.isDone)}

                return (
                    <Todolist key={tdl.id}
                              title={tdl.title}
                              tasks={tasksForTodolist}
                              date={'28.08.2024'}
                              filter={tdl.filter}
                              todolistId={tdl.id}
                        //Callbacks
                              removeTask={removeTask}
                              addTask={addTask}
                              changeTaskStatus={changeTaskStatus}
                              changeFilter={changeFilter}
                              removeTodolist={removeTodolist}
                    />
                )
            })}
        </div>
    );
}

export default App;
