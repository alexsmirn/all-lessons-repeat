import {Action, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {todolistsReducer} from "../model/todolists-reducer";
import {tasksReducer} from "../model/tasks-reducer";
import {thunk, ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, Action>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()