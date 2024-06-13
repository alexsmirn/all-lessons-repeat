import {v1} from "uuid";
import {TodolistType} from "../app/App";
import {addTodolistAC, deleteTodolistAC, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";

test('correct todolist should be deleted', () => {
    //Initial state
    const todolistId1 = v1()
    const todolistId2 = v1()

    const todolistInitialState: TodolistType[] = [
        {id: todolistId1, title: 'Todolist N1', filter: 'all'},
        {id: todolistId2, title: 'Todolist N2', filter: 'all'},
    ]

    const tasksInitialState = {
        [todolistId1]: [
            {id: '1', title: 'Todolist N1 Task N1', isDone: false},
            {id: '2', title: 'Todolist N1 Task N2', isDone: false},
        ],
        [todolistId2]: [
            {id: '1', title: 'Todolist N2 Task N1', isDone: false},
            {id: '2', title: 'Todolist N2 Task N2', isDone: false},
        ]
    }

    const action = deleteTodolistAC(todolistId1)
    const resultStateTodolists = todolistsReducer(todolistInitialState, action)
    const resultStateTasks = tasksReducer(tasksInitialState, action)

    const keys = Object.keys(resultStateTasks)

    expect(resultStateTodolists).toEqual([{id: todolistId2, title: 'Todolist N2', filter: 'all'}])
    expect(resultStateTasks).toEqual({[todolistId2]: [
            {id: '1', title: 'Todolist N2 Task N1', isDone: false},
            {id: '2', title: 'Todolist N2 Task N2', isDone: false},
        ]})

    expect(resultStateTodolists.length).toBe(1)
    expect(keys.length).toBe(1)
})

test('correct todolist should be added', () => {
    //Initial state
    const todolistId1 = v1()
    const todolistId2 = v1()

    const todolistInitialState: TodolistType[] = [
        {id: todolistId1, title: 'Todolist N1', filter: 'all'},
        {id: todolistId2, title: 'Todolist N2', filter: 'all'},
    ]

    const tasksInitialState = {
        [todolistId1]: [
            {id: '1', title: 'Todolist N1 Task N1', isDone: false},
            {id: '2', title: 'Todolist N1 Task N2', isDone: false},
        ],
        [todolistId2]: [
            {id: '1', title: 'Todolist N2 Task N1', isDone: false},
            {id: '2', title: 'Todolist N2 Task N2', isDone: false},
        ]
    }

    const newTodolistTitle = 'Task & Todolist Reducer'

    const action = addTodolistAC(newTodolistTitle)
    const resultStateTodolists = todolistsReducer(todolistInitialState, action)
    const resultStateTasks = tasksReducer(tasksInitialState, action)

    const keys = Object.keys(resultStateTasks)

    expect(resultStateTodolists.length).toBe(3)
    expect(resultStateTodolists[0].title).toBe(newTodolistTitle)

    expect(keys.length).toBe(3)
    expect(resultStateTasks[keys[0]].length).toBe(0)

    //Check for Ids
    expect(keys[0]).toBe(action.todolistId)
    expect(resultStateTodolists[0].id).toBe(action.todolistId)
})