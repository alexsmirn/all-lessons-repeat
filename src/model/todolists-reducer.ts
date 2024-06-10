import {TodolistType} from "../app/App";
import {v1} from "uuid";

const todolistId1 = v1()
const todolistId2 = v1()

const initialState: TodolistType[] = [
    {id: todolistId1, title: 'Todolist N1', filter: 'all'},
    {id: todolistId2, title: 'Todolist N2', filter: 'all'},
]
export const todolistsReducer = (state: TodolistType[] = initialState, action: any): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tdl => tdl.id !== action.id)

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