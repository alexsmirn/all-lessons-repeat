
import {v1} from "uuid";
import {AddTodolistActionType, DeleteTodolistActionType, todolistId1, todolistId2} from "./todolists-reducer";
import {TasksStateType} from "../app/AppWithRedux";

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}

type AddTaskActionType = {
    type: 'ADD-TASK'
    todolistId: string
    newTaskTitle: string
}

type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    todolistId: string
    taskId: string
}

type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todolistId: string
    taskId: string
    newTaskTitle: string
}

type ActionsType =
    | RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | DeleteTodolistActionType
    | AddTodolistActionType

const initialTasks = {
    [todolistId1]: [
        {id: '1', title: 'Todolist N1 Task N1', isDone: false},
        {id: '2', title: 'Todolist N1 Task N2', isDone: false},
    ],
    [todolistId2]: [
        {id: '1', title: 'Todolist N2 Task N1', isDone: false},
        {id: '2', title: 'Todolist N2 Task N2', isDone: false},
    ]
}

export const tasksReducer = (state: TasksStateType = initialTasks, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(tsk => tsk.id !== action.taskId)}
        }
        case 'ADD-TASK': {
            const newTask = {id: v1(), title: action.newTaskTitle, isDone: false}
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(tsk =>
                    tsk.id === action.taskId ? {...tsk, isDone: !tsk.isDone} : tsk
                )
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {...state, [action.todolistId]: state[action.todolistId].map(
                    tsk => tsk.id === action.taskId ? {...tsk, title: action.newTaskTitle} : tsk
                )}
        }
        case 'DELETE-TODOLIST': {
            delete state[action.todolistId]
            return {...state}
        }
        case 'ADD-TODOLIST': {
            return {[action.todolistId]: [], ...state}
        }

        default:
            return state
    }
}

export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistId, taskId} as const
}

export const addTaskAC = (todolistId: string, newTaskTitle: string): AddTaskActionType => {
    return {type: 'ADD-TASK', todolistId, newTaskTitle} as const
}

export const changeTaskStatusAC = (todolistId: string, taskId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', todolistId, taskId} as const
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, newTaskTitle: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', todolistId, taskId, newTaskTitle} as const
}