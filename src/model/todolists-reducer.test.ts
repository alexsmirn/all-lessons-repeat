import {v1} from "uuid";
import {TodolistType} from "../app/App";
import {changeTodolistFilterAC, changeTodolistTitleAC, todolistsReducer} from "./todolists-reducer";

let todolistId1: string
let todolistId2: string
let initialState: TodolistType[]

beforeEach(() => {
    //Initial state
    todolistId1 = v1()
    todolistId2 = v1()

    initialState = [
        {id: todolistId1, title: 'Todolist N1', filter: 'all'},
        {id: todolistId2, title: 'Todolist N2', filter: 'all'},
    ]
})

test('correct todolist should change title', () => {
    const newTitle = 'New Todolist Title'
    const resultState = todolistsReducer(initialState, changeTodolistTitleAC(todolistId2, newTitle))

    expect(resultState.length).toBe(2)
    expect(resultState[1].title).toBe(newTitle)
})

test('filter of correct todolist should be changed', () => {
    const newFilterValue = 'completed'
    const resultState = todolistsReducer(initialState, changeTodolistFilterAC(todolistId2, newFilterValue))

    expect(resultState.length).toBe(2)
    expect(resultState[0].filter).toBe('all')
    expect(resultState[1].filter).toBe(newFilterValue)
})