import {v1} from "uuid";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolist-api";

let todolistId1: string
let todolistId2: string
let initialState: {[key: string]: TaskType[]}

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    initialState = {
        [todolistId1]: [
            {id: '1', title: 'Todolist N1 Task N1', todolistId: todolistId1,
                status: TaskStatuses.Completed, priority: TaskPriorities.Low,
                description: '', startDate: '', deadline: '', order: 0, addedDate: ''
            },
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

test('correct task should be deleted from correct todolist', () => {
    const action = removeTaskAC(todolistId1, '2')

    const resultState = tasksReducer(initialState, action)

    expect(resultState).toEqual({
        [todolistId1]: [
            {id: '1', title: 'Todolist N1 Task N1', isDone: false},
        ],
        [todolistId2]: [
            {id: '1', title: 'Todolist N2 Task N1', isDone: false},
            {id: '2', title: 'Todolist N2 Task N2', isDone: false},
        ]
    })
})

test('correct task should be added to correct todolist', () => {
    const newTaskTitle = 'New task (tasksReducer)'

    const action = addTaskAC(todolistId1, newTaskTitle)

    const resultState = tasksReducer(initialState, action)

    expect(resultState[todolistId1][0].title).toBe(newTaskTitle)
    expect(resultState[todolistId1].length).toBe(3)
})

test('correct tasks status should be changed', () => {
   const action = changeTaskStatusAC(todolistId1, '1')

    const resultState = tasksReducer(initialState, action)

    expect(resultState[todolistId1][0].status).toBe(true)
})

test('correct tasks title should be changed on correct title', () => {
    const newTitle = 'Task new title (tasksReducer)'
    const action = changeTaskTitleAC(todolistId1, '1', newTitle)

    const resultState = tasksReducer(initialState, action)

    expect(resultState[todolistId1][0].title).toBe(newTitle)
})