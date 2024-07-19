import {useEffect, useState} from "react";
import {ChangeTaskModelType, todolistApi} from "../api/todolist-api";
import {store} from "../state/store";

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
    const taskId = 'ee00b822-5ef4-4dd8-a9ef-1abb3b8586bf'
    const newTitle = 'New Updated Title For Task😱'
    useEffect(() => {
        const rootState = store.getState()
        const task = rootState.tasks['364b1cc9-d281-413b-af4a-be8ec12e8092'].find(el => el.id === 'ee00b822-5ef4-4dd8-a9ef-1abb3b8586bf')

            const model: ChangeTaskModelType = {
                title: newTitle,
                description: task!.description,
                status: task!.status,
                priority: task!.priority,
                startDate: task!.startDate,
                deadline: task!.deadline,
            }

        todolistApi.changeTask(todolistId, taskId, model)
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const deleteTask = () => {
    const [state, setState] = useState<any>()
    const todolistId = '364b1cc9-d281-413b-af4a-be8ec12e8092'
    const taskId = '88afef8f-64ff-46fd-8074-e970effd247b'

    useEffect(() => {
        todolistApi.deleteTask(todolistId, taskId)
            .then(res => setState(res.data))
    }, []);

    return <div>{JSON.stringify(state)}</div>
}


