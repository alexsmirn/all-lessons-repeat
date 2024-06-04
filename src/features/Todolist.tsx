import {Button} from "../components/Button";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Simulate} from "react-dom/test-utils";
import change = Simulate.change;
import {TodolistFilterType} from "../app/App";

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
    removeTask: (taskId: string) => void
    addTask: (title: string) => void,
    changeTaskStatus: (taskId: string) => void,
    changeFilter: (todolistId: string, newFilterValue: TodolistFilterType) => void
}
export const Todolist = (props: TodolistPropsType) => {
    const [inputValue, setInputValue] = useState<string>('')
    const [error, setError] = useState<boolean>(false)


    //Handlers
    const onChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
        if (inputValue === '') {
            setError(false)
            setInputValue(event.currentTarget.value)
        } else setInputValue(event.currentTarget.value)
    }
    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        event.key === 'Enter' && addTaskHandler(inputValue)
    }
    const changeTasksFilterHandler = (todolistId: string, newFilterValue: TodolistFilterType) => {
        props.changeFilter(todolistId, newFilterValue)
    }
    const changeTaskStatusHandler = (taskId: string) => {
        props.changeTaskStatus(taskId)
    }
    const addTaskHandler = (title: string) => {
        if (title.trim() !== '') {
            props.addTask(title.trim())
            setInputValue('')
        } else {
            setError(true)
            setInputValue('')
        }
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={inputValue}
                       onChange={onChangeInputValue}
                       onKeyUp={addTaskOnKeyUpHandler}
                       className={error ? 'error-input' : ''}
                />
                <Button title={'+'} callBack={() => addTaskHandler(inputValue)}/>
                {error && <p className={'error-message'}>Title is required</p>}
            </div>
            {props.tasks.length === 0 ? <p>Тасок нет</p> :
                <ul>
                    {props.tasks.map(task => <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                        <input type="checkbox" checked={task.isDone} onChange={() => changeTaskStatusHandler(task.id)}/>
                        <span>{task.title}</span>
                        <Button title={'X'} callBack={() => props.removeTask(task.id)}/>
                    </li>)}
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
            </div>
            {props.date && <span>{props.date}</span>}
        </div>
    )
}