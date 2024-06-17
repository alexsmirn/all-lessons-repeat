import {useEffect, useState} from "react";
import {todolistApi} from "../api/todolist-api";

export default {title: 'API'}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.getTodolists()
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.createTodolist('Create Todolist Title')
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const todolistId = '9a4140cd-acb7-4eda-a1c5-37e7bb0d5172'
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.deleteTodolist(todolistId)
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'c7d92f5c-6673-4e15-ad37-60e94a23f021'
    useEffect(() => {
        todolistApi.updateTodolistTitle(todolistId, 'Updated Title📝')
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}