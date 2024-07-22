import {useEffect, useState} from "react";
import {todolistApi} from "../api/todolist-api";

export default {title: 'Api Tasks'}



export const getTasks = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '364b1cc9-d281-413b-af4a-be8ec12e8092'
    useEffect(() => {
        todolistApi.getTasks(todolistId)
            .then(res => setState(res.data))
    }, []);
    return <div>{JSON.stringify(state)}</div>
}

export const createTask = () => {
    const [state, setState] = useState<any>(null)
    const newTaskTitle = 'Created Task🤩'
    const todolistId = '364b1cc9-d281-413b-af4a-be8ec12e8092'
    useEffect(() => {
        todolistApi.createTask(todolistId, newTaskTitle)
            .then(res => setState(res.data.data))
    }, []);
    return <div>{JSON.stringify(state)}</div>
}

export const updateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '364b1cc9-d281-413b-af4a-be8ec12e8092'
    const taskId = '40a36726-50c7-487e-9b82-a6556f9251ff'
    const newTitle = 'New Updated Title For Task😱'
    useEffect(() => {
        todolistApi.changeTask(todolistId, taskId, newTitle)
            .then(res => setState(res.data))
    }, []);
    return <div>{JSON.stringify(state)}</div>
}

export const deleteTask = () => {
    const [state, setState] = useState<any>()
    const todolistId = '364b1cc9-d281-413b-af4a-be8ec12e8092'
    const taskId = 'ee00b822-5ef4-4dd8-a9ef-1abb3b8586bf'

    useEffect(() => {
        todolistApi.deleteTask(todolistId, taskId)
            .then(res => setState(res.data))
    }, []);

    return <div>{JSON.stringify(state)}</div>
}


