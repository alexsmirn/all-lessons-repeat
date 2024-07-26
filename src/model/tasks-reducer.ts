import {AddTodolistActionType, DeleteTodolistActionType, SetTodolistsActionType,} from "./todolists-reducer";
import {TasksStateType} from "../app/AppWithRedux";
import {TaskStatuses, TaskType, todolistApi} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../state/store";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}

export type AddTaskActionType = ReturnType<typeof addTaskAC>

export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>

export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

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
            return {...state, [action.todolistId]: [action.newTask, ...state[action.todolistId]]}
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(tsk =>
                    tsk.id === action.taskId ? {...tsk, status: action.status} : tsk
                )
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(
                    tsk => tsk.id === action.taskId ? {...tsk, title: action.newTitle} : tsk
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

export const addTaskAC = (newTask: TaskType, todolistId: string) => {
    return {type: 'ADD-TASK', newTask, todolistId} as const
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return {type: 'CHANGE-TASK-STATUS', todolistId, taskId, status} as const
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string) => {
    return {type: 'CHANGE-TASK-TITLE', todolistId, taskId, newTitle} as const
}

export const setTasksAC = (tasks: TaskType[], todolistId: string) => {
    return {type: 'SET-TASKS', tasks, todolistId} as const
}

export const setTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistApi.getTasks(todolistId)
        .then(res => dispatch(setTasksAC(res.data.items, todolistId)))
}

export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    todolistApi.deleteTask(todolistId, taskId)
        .then(() => {
            dispatch(removeTaskAC(todolistId, taskId))
        })
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistApi.createTask(todolistId, title)
        .then(res => {
            console.log(res.data.data.item)
            dispatch(addTaskAC(res.data.data.item, todolistId))
        })
}

export const changeTaskStatusTC = (todolistId: string, taskId: string, newStatus: TaskStatuses) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const allTasksFromState = getState().tasks
        const tasksFromTodolist = allTasksFromState[todolistId]
        const task = tasksFromTodolist.find(task => task.id = taskId)

        if (task) {
                const model = {
                    title: task.title,
                    description: task.description,
                    status: newStatus,
                    priority: task.priority,
                    startDate: task.startDate,
                    deadline: task.deadline
                }

                todolistApi.changeTask(todolistId, taskId, model)
                    .then(res => dispatch(changeTaskStatusAC(todolistId, taskId, res.data.data.item.status)))
        }

    }
}


