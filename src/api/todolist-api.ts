import axios from "axios";

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type FieldErrorType = {
    error: string
    field: string
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldErrorType[]
    data: D
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '8e288930-bf6a-40a9-8362-a0cc1b49ff5a'
    }
})

export const todolistApi = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists')
    },

    createTodolist(title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>('todo-lists', {title})
    },

    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },

    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title: title})
    }
}