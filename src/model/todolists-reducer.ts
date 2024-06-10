import {TodolistFilterType, TodolistType} from "../app/App";
import {v1} from "uuid";

const todolistId1 = v1()
const todolistId2 = v1()

const initialState: TodolistType[] = [
    {id: todolistId1, title: 'Todolist N1', filter: 'all'},
    {id: todolistId2, title: 'Todolist N2', filter: 'all'},
]

//Action Types
type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    todolistId: string
}
type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
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

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tdl => tdl.id !== action.todolistId)

        case 'ADD-TODOLIST': {
            const todolistId = v1()
            return [{id: todolistId, title: action.title, filter: "all"}, ...state]
        }

        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tdl =>
                tdl.id === action.todolistId ? {...tdl, title: action.newTitle} : tdl)
        }

        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tdl =>
                tdl.id === action.todolistId ? {...tdl, filter: action.newFilterValue} : tdl)
        }

        default: {
            return state
        }
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: "REMOVE-TODOLIST", todolistId} as const
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", title} as const
}

export const changeTodolistTitleAC = (todolistId: string, newTitle: string): ChangeTodolistTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", todolistId, newTitle} as const
}

export const changeTodolistFilterAC = (todolistId: string, newFilterValue: TodolistFilterType): ChangeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", todolistId, newFilterValue} as const
}