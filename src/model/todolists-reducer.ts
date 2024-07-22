import {v1} from "uuid";
import {todolistApi, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";

const initialState: TodolistDomainType[] = []

//Action Types
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
    addedDate: string
    order: number
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    todolistId: string
    newTitle: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    todolistId: string
    newFilterValue: TodolistFilterType
}
export type DeleteTodolistActionType = {
    type: 'DELETE-TODOLIST'
    todolistId: string
}
export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: TodolistType[]
}

export type TodolistFilterType = 'all' | 'completed' | 'active'
export type TodolistDomainType = TodolistType & {
    filter: TodolistFilterType
}

type ActionsType =
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | DeleteTodolistActionType
    | SetTodolistsActionType

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            return action.todolists.map(tdl => {
                return {...tdl, filter: "all"}
            })
        }

        case 'ADD-TODOLIST': {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: "all",
                addedDate: '',
                order: 0
            }, ...state]
        }

        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tdl =>
                tdl.id === action.todolistId ? {...tdl, title: action.newTitle} : tdl)
        }

        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tdl =>
                tdl.id === action.todolistId ? {...tdl, filter: action.newFilterValue} : tdl)
        }

        case 'DELETE-TODOLIST': {
            return state.filter(tdl => tdl.id !== action.todolistId)
        }

        default: {
            return state
        }
    }
}

export const setTodolistsAC = (todolists: TodolistType[]): SetTodolistsActionType => {
    return {type: "SET-TODOLISTS", todolists}
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", title: title, todolistId: v1(), addedDate: '', order: 0} as const
}

export const changeTodolistTitleAC = (todolistId: string, newTitle: string): ChangeTodolistTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", todolistId, newTitle} as const
}

export const changeTodolistFilterAC = (todolistId: string, newFilterValue: TodolistFilterType): ChangeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", todolistId, newFilterValue} as const
}

export const deleteTodolistAC = (todolistId: string): DeleteTodolistActionType => {
    return {type: 'DELETE-TODOLIST', todolistId} as const
}

export const fetchTodolists = (dispatch: Dispatch) => {
    todolistApi.getTodolists()
        .then(res => dispatch(setTodolistsAC(res.data)))
}