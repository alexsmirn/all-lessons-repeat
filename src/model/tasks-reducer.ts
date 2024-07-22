import {v1} from "uuid";
import {
    AddTodolistActionType,
    DeleteTodolistActionType,
    SetTodolistsActionType,
} from "./todolists-reducer";
import {TasksStateType} from "../app/AppWithRedux";
import {TaskPriorities, TaskStatuses, TaskType, todolistApi} from "../api/todolist-api";
import {Dispatch} from "redux";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    todolistId: string
    newTaskTitle: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    todolistId: string
    taskId: string
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todolistId: string
    taskId: string
    newTaskTitle: string
}

export type SetTasksActionType = ReturnType<typeof setTasksAC>

type ActionsType =
    | RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | DeleteTodolistActionType
    | AddTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType

const initialTasks: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialTasks, action: ActionsType):TasksStateType  => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(tsk => tsk.id !== action.taskId)}
        }
        case 'ADD-TASK': {
            const newTask = {id: v1(), title: action.newTaskTitle, todolistId: action.todolistId,
                status: TaskStatuses.New, priority: TaskPriorities.Low,
                description: '', startDate: '', deadline: '', order: 0, addedDate: ''}
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(tsk =>
                    tsk.id === action.taskId ? {...tsk, status: tsk.status === TaskStatuses.InProgress ? TaskStatuses.Completed : TaskStatuses.InProgress} : tsk
                )
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(
                    tsk => tsk.id === action.taskId ? {...tsk, title: action.newTaskTitle} : tsk
                )
            }
        }
        case 'DELETE-TODOLIST': {
            delete state[action.todolistId]
            return {...state}
        }

        case 'ADD-TODOLIST': {
            return {[action.todolistId]: [], ...state}
        }

        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach(tdl => {
                stateCopy[tdl.id] = []
            })
            return stateCopy
        }

        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
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

export const setTasksAC = (tasks: TaskType[], todolistId: string) => {
    return {type: 'SET-TASKS', tasks, todolistId} as const
}

export const setTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistApi.getTasks(todolistId)
        .then(res => dispatch(setTasksAC(res.data.items, todolistId)))
}