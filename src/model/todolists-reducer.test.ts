import {v1} from "uuid";
import {TodolistType} from "../app/App";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolists-reducer";

test('correct todolist should be removed', () => {

    //Initial state
    const todolistId1 = v1()
    const todolistId2 = v1()

    const initialState: TodolistType[] = [
        {id: todolistId1, title: 'Todolist N1', filter: 'all'},
        {id: todolistId2, title: 'Todolist N2', filter: 'all'},
    ]

    const resultState = todolistsReducer(initialState, removeTodolistAC(todolistId1))

    expect(resultState.length).toBe(1)
    expect(resultState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    //Initial state
    const todolistId1 = v1()
    const todolistId2 = v1()

    const initialState: TodolistType[] = [
        {id: todolistId1, title: 'Todolist N1', filter: 'all'},
        {id: todolistId2, title: 'Todolist N2', filter: 'all'},
    ]

    const title = 'New todolist from test'

    const resultState = todolistsReducer(initialState, addTodolistAC(title))

    expect(resultState.length).toBe(3)
    expect(resultState[0].title).toBe(title)
})

test('correct todolist should change title', () => {
    //Initial state
    const todolistId1 = v1()
    const todolistId2 = v1()

    const initialState: TodolistType[] = [
        {id: todolistId1, title: 'Todolist N1', filter: 'all'},
        {id: todolistId2, title: 'Todolist N2', filter: 'all'},
    ]

    const newTitle = 'New Todolist Title'
    const resultState = todolistsReducer(initialState, changeTodolistTitleAC(todolistId2, newTitle))

    expect(resultState.length).toBe(2)
    expect(resultState[1].title).toBe(newTitle)
})

test('filter of correct todolist should be changed', () => {
    //Initial state
    const todolistId1 = v1()
    const todolistId2 = v1()

    const initialState: TodolistType[] = [
        {id: todolistId1, title: 'Todolist N1', filter: 'all'},
        {id: todolistId2, title: 'Todolist N2', filter: 'all'},
    ]

    //Action
    const newFilterValue = 'completed'

    const resultState = todolistsReducer(initialState, changeTodolistFilterAC(todolistId2, newFilterValue))

    expect(resultState.length).toBe(2)
    expect(resultState[0].filter).toBe('all')
    expect(resultState[1].filter).toBe(newFilterValue)
})