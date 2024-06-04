import React, {useState} from 'react';
import logo from '../logo.svg';
import './App.css';
import {TaskType, Todolist} from "../features/Todolist";
import {v1} from "uuid";
import {urlToHttpOptions} from "node:url";

type TodolistType = {
    id: string,
    title: string,
    filter: TodolistFilterType
}

export type TodolistFilterType = 'all' | 'completed' | 'active'

function App() {

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: v1(), title: 'Todolist N1', filter: 'all'},
        {id: v1(), title: 'Todolist N2', filter: 'all'},
        {id: v1(), title: 'Todolist N3', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'Task N1', isDone: false},
        {id: v1(), title: 'Task N2', isDone: false},
        {id: v1(), title: 'Task N3', isDone: true},
        {id: v1(), title: 'Task N4', isDone: true},
        {id: v1(), title: 'Task N5', isDone: true},
        {id: v1(), title: 'Task N6', isDone: true},
    ])

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(el => el.id !== taskId))
    }

    const addTask = (title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const changeTaskStatus = (taskId: string) => {
        const updatedState = tasks.map(el => {
            return el.id === taskId ? {...el, isDone: !el.isDone} : el
        })
        setTasks(updatedState)
    }

    const changeFilter = (todolistId: string, newFilterValue: TodolistFilterType) => {
        setTodolists(todolists.map(tdl => tdl.id === todolistId ? {...tdl, filter: newFilterValue} : tdl))
    }

    return (
        <div className="App">
            {todolists.map(tdl => {

                let tasksForTodolist = tasks

                if (tdl.filter === 'completed') {tasksForTodolist = tasks.filter(el => el.isDone)}
                if (tdl.filter === 'active') {tasksForTodolist = tasks.filter(el => !el.isDone)}

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
                    />
                )
            })}
        </div>
    );
}

export default App;
