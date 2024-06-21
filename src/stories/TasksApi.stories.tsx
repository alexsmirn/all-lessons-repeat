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
    const newTaskTitle = 'Created Task💦'
    const todolistId = '364b1cc9-d281-413b-af4a-be8ec12e8092'
    useEffect(() => {
        todolistApi.createTask(todolistId, newTaskTitle)
            .then(res => setState(res.data.data))
    }, []);
    return <div>{JSON.stringify(state)}</div>
}

// export const updateTaskTitle = () => {
//     const [state, setState] = useState<any>(null)
//     const todolistId = '364b1cc9-d281-413b-af4a-be8ec12e8092'
//     const taskId = '9258572d-48d0-422e-9e15-6b3c5e2b00ab'
//     const model: ChangeTaskModelType = {
//
//     }
// }

export const deleteTask = () => {
    const [state, setState] = useState<any>()
    const todolistId = '364b1cc9-d281-413b-af4a-be8ec12e8092'
    const taskId = 'a2072c6d-3c7c-4b99-ae68-b46ea705e904'

    useEffect(() => {
        todolistApi.deleteTask(todolistId, taskId)
            .then(res => setState(res.data))
    }, []);

    return <div>{JSON.stringify(state)}</div>
}


