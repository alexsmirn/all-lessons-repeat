import {v1} from "uuid";
import {TodolistType} from "../app/App";
import {todolistsReducer} from "./todolists-reducer";

test('correct todolist should be removed', () => {

    //Initial state
    const todolistId1 = v1()
    const todolistId2 = v1()

    const initialState: TodolistType[] = [
        {id: todolistId1, title: 'Todolist N1', filter: 'all'},
        {id: todolistId2, title: 'Todolist N2', filter: 'all'},
    ]

    //Action
    const action = {
        type: 'REMOVE-TODOLIST',
        id: todolistId1
    }

    const resultState = todolistsReducer(initialState, action)

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

    //Action
    const action = {
        type: 'ADD-TODOLIST',
        title: 'New Todolist from test'
    }

    const resultState = todolistsReducer(initialState, action)

    expect(resultState.length).toBe(3)
    expect(resultState[0].title).toBe(action.title)
})

test('correct todolist should change title', () => {
    //Initial state
    const todolistId1 = v1()
    const todolistId2 = v1()

    const initialState: TodolistType[] = [
        {id: todolistId1, title: 'Todolist N1', filter: 'all'},
        {id: todolistId2, title: 'Todolist N2', filter: 'all'},
    ]

    //Action
    const action = {
        type: 'CHANGE-TODOLIST-TITLE',
        todolistId: todolistId2,
        newTitle: 'New Todolist Title'
    }

    const resultState = todolistsReducer(initialState, action)

    expect(resultState.length).toBe(2)
    expect(resultState[1].title).toBe(action.newTitle)
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
    const action = {
        type: 'CHANGE-TODOLIST-FILTER',
        todolistId: todolistId2,
        newFilterValue: 'completed'
    }

    const resultState = todolistsReducer(initialState, action)

    expect(resultState.length).toBe(2)
    expect(resultState[0].filter).toBe('all')
    expect(resultState[1].filter).toBe(action.newFilterValue)
})