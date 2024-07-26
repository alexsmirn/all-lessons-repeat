import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists',
    withCredentials: true,
    headers: {
        'API-KEY': '8e288930-bf6a-40a9-8362-a0cc1b49ff5a'
    }
})

export const todolistApi = {
    getTodolists() {
        return instance.get<TodolistType[]>('')
    },

    createTodolist(title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>('', {title})
    },

    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`/${todolistId}`)
    },

    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<ResponseType>(`/${todolistId}`, {title: title})
    },


    //Tasks ======================================================================================

    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`/${todolistId}/tasks`)
    },

    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{item: TaskType}>>(`/${todolistId}/tasks`, {title: title})
    },

    changeTask(todolistId: string, taskId: string, model: ChangeTaskModelType) {
        return instance.put<ResponseType<{item: TaskType}>>(`/${todolistId}/tasks/${taskId}`, model)
    },

    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/${todolistId}/tasks/${taskId}`)
    }
}

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}

type GetTasksResponseType = {
    items: TaskType[]
    totalCount: number
    error: string
}

export type ChangeTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    High = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todolistId: string
    order: number
    addedDate: string
}