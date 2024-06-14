import {TodolistFilterType, TodolistType} from "../app/App";
import {v1} from "uuid";

const todolistId1 = v1()
const todolistId2 = v1()

const initialState: TodolistType[] = [
    {id: todolistId1, title: 'Todolist N1', filter: 'all'},
    {id: todolistId2, title: 'Todolist N2', filter: 'all'},
]

//Action Types
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    todolistId: string
    newTitle: string
}
type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    todolistId: string
    newFilterValue: TodolistFilterType
}
export type DeleteTodolistActionType = {
    type: 'DELETE-TODOLIST'
    todolistId: string
}

type ActionsType =
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | DeleteTodolistActionType

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            return [{id: action.todolistId, title: action.title, filter: "all"}, ...state]
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

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", title: title, todolistId: v1()} as const
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