import {TasksStateType} from "../app/App";

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}

type ActionsType =
    | RemoveTaskActionType

export const tasksReducer = (state: TasksStateType = {}, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(tsk => tsk.id !== action.taskId)}
        }
        default: return state
    }
}

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {type: 'REMOVE-TASK', todolistId, taskId} as const
}