import {v1} from "uuid";
import {addTodolistAC, deleteTodolistAC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolist-api";

let todolistId1: string
let todolistId2: string
let todolistInitialState: TodolistDomainType[]
let tasksInitialState: {[key: string]: TaskType[]}
beforeEach(() => {
    //Initial state
    todolistId1 = v1()
    todolistId2 = v1()

    todolistInitialState = [
        {id: todolistId1, title: 'Todolist N1', filter: 'all', addedDate: '', order: 0},
        {id: todolistId2, title: 'Todolist N2', filter: 'all', addedDate: '', order: 0},
    ]

    tasksInitialState = {
        [todolistId1]: [
            {id: '1', title: 'Todolist N1 Task N1', todolistId: todolistId1,
                status: TaskStatuses.Completed, priority: TaskPriorities.Low,
                description: '', startDate: '', deadline: '', order: 0, addedDate: ''},
            {id: '2', title: 'Todolist N1 Task N2', todolistId: todolistId1,
                status: TaskStatuses.Completed, priority: TaskPriorities.Low,
                description: '', startDate: '', deadline: '', order: 0, addedDate: ''},
        ],
        [todolistId2]: [
            {id: '1', title: 'Todolist N2 Task N1', todolistId: todolistId1,
                status: TaskStatuses.Completed, priority: TaskPriorities.Low,
                description: '', startDate: '', deadline: '', order: 0, addedDate: ''},
            {id: '2', title: 'Todolist N2 Task N2', todolistId: todolistId1,
                status: TaskStatuses.Completed, priority: TaskPriorities.Low,
                description: '', startDate: '', deadline: '', order: 0, addedDate: ''},
        ]
    }
})

test('correct todolist should be deleted', () => {
    const action = deleteTodolistAC(todolistId1)
    const resultStateTodolists = todolistsReducer(todolistInitialState, action)
    const resultStateTasks = tasksReducer(tasksInitialState, action)

    const keys = Object.keys(resultStateTasks)

    expect(resultStateTodolists).toEqual([{id: todolistId2, title: 'Todolist N2', filter: 'all'}])
    expect(resultStateTasks).toEqual({
        [todolistId2]: [
            {id: '1', title: 'Todolist N2 Task N1', isDone: false},
            {id: '2', title: 'Todolist N2 Task N2', isDone: false},
        ]
    })

    expect(resultStateTodolists.length).toBe(1)
    expect(keys.length).toBe(1)
})

test('correct todolist should be added', () => {
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