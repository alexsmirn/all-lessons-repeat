import {Button} from "../components/Button";
import {TodolistFilterType} from "../app/App";
import {AddItemForm} from "../components/AddItemForm";
import {EditableSpan} from "../components/EditableSpan";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    date?: string
    filter: TodolistFilterType
    todolistId: string

    //CallBacks
    removeTask: (todolistId: string, taskId: string) => void
    addTask: (todolistId: string, title: string) => void,
    changeTaskStatus: (todolistId: string, taskId: string) => void,
    changeFilter: (todolistId: string, newFilterValue: TodolistFilterType) => void
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    changeTodolistTitle: (todolistId: string, newValue: string) => void
}
export const Todolist = (props: TodolistPropsType) => {


    const changeTasksFilterHandler = (todolistId: string, newFilterValue: TodolistFilterType) => {
        props.changeFilter(todolistId, newFilterValue)
    }
    const changeTaskStatusHandler = (todolistId: string, taskId: string) => {
        props.changeTaskStatus(todolistId, taskId)
    }

    const removeTaskHandler = (todolistId: string, taskId: string) => {
        props.removeTask(todolistId, taskId)
    }

    const removeTodolistHandler = (todolistId: string) => {
        props.removeTodolist(todolistId)
    }

    const addTaskHandler = (title: string) => {
        props.addTask(props.todolistId, title)
    }

    const changeTodolistTitleHandler = (newValue: string) => {
        props.changeTodolistTitle(props.todolistId, newValue)
    }

    return (
        <div>
            <h3>
                <EditableSpan value={props.title} setNewValue={changeTodolistTitleHandler}/>
            </h3>
            <AddItemForm addItemCallBack={addTaskHandler}/>
            {props.tasks.length === 0 ? <p>Тасок нет</p> :
                <ul>
                    {props.tasks.map(task => {
                        const changeTaskTitleHandler = (title: string) => {
                            props.changeTaskTitle(props.todolistId, task.id, title)
                        }

                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox" checked={task.isDone} onChange={() => {
                                    changeTaskStatusHandler(props.todolistId, task.id)
                                }}/>
                                <EditableSpan value={task.title} setNewValue={changeTaskTitleHandler}/>
                                <Button title={'X'} callBack={() => removeTaskHandler(props.todolistId, task.id)}/>
                            </li>
                        )
                    })}
                </ul>
            }
            <div>
                <Button title={'All'}
                        callBack={() => changeTasksFilterHandler(props.todolistId, 'all')}
                        className={props.filter === 'all' ? 'active-filter' : ''}
                />
                <Button title={'Completed'}
                        callBack={() => changeTasksFilterHandler(props.todolistId, 'completed')}
                        className={props.filter === 'completed' ? 'active-filter' : ''}
                />
                <Button title={'Active'}
                        callBack={() => changeTasksFilterHandler(props.todolistId, 'active')}
                        className={props.filter === 'active' ? 'active-filter' : ''}
                />
                <Button title={'Delete TD'}
                        className={'delete-button'}
                        callBack={() => removeTodolistHandler(props.todolistId)}
                />
            </div>
            {props.date && <span>{props.date}</span>}
        </div>
    )
}