import React, {useEffect, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "../features/Todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "../components/AddItemForm";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import {createTheme, ThemeProvider} from "@mui/material";
import Button from "@mui/material/Button";


export type TodolistType = {
    id: string,
    title: string,
    filter: TodolistFilterType
}

type TasksStateType = {
    [key: string]: TaskType[]
}

export type TodolistFilterType = 'all' | 'completed' | 'active'

function App() {



    const [mode, setMode] = useState<'light' | 'dark'>('light')

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: 'Todolist N1', filter: 'all'},
        {id: todolistId2, title: 'Todolist N2', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: 'Todolist N1 Task N1', isDone: false},
            {id: v1(), title: 'Todolist N1 Task N2', isDone: false},
            {id: v1(), title: 'Todolist N1 Task N3', isDone: true},
            {id: v1(), title: 'Todolist N1 Task N4', isDone: true},
            {id: v1(), title: 'Todolist N1 Task N5', isDone: true},
            {id: v1(), title: 'Todolist N1 Task N6', isDone: true},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Todolist N2 Task N1', isDone: false},
            {id: v1(), title: 'Todolist N2 Task N2', isDone: false},
            {id: v1(), title: 'Todolist N2 Task N3', isDone: true},
            {id: v1(), title: 'Todolist N2 Task N4', isDone: true},
            {id: v1(), title: 'Todolist N2 Task N5', isDone: true},
            {id: v1(), title: 'Todolist N2 Task N6', isDone: true},
        ]
    })

    useEffect(() => {
        console.log('UseEffect')
        console.log(todolists)
        console.log(tasks)
    })

    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }

    const addTask = (todolistId: string, title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const changeTaskStatus = (todolistId: string, taskId: string) => {
        setTasks({
            ...tasks, [todolistId]: tasks[todolistId].map(task => {
                return task.id === taskId ? {...task, isDone: !task.isDone} : task
            })
        })
    }

    const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map((t) =>
                t.id === taskId ? {...t, title: newTitle} : t
            )})
    }

    const changeFilter = (todolistId: string, newFilterValue: TodolistFilterType) => {
        setTodolists(todolists.map(tdl => tdl.id === todolistId ? {...tdl, filter: newFilterValue} : tdl))
    }

    const removeTodolist = (todolistId: string) => {
        const newTodolists = todolists.filter(tdl => tdl.id !== todolistId)
        setTodolists(newTodolists)

        delete tasks[todolistId]
        setTasks({...tasks})
    }

    const addTodolist = (title: string) => {
        const newTodolist: TodolistType = {id: v1(), title: title, filter: "all"}
        setTodolists([newTodolist, ...todolists])
        setTasks({[newTodolist.id]: [], ...tasks})
    }

    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
        setTodolists(todolists.map(tdl => tdl.id === todolistId ? {...tdl, title: newTitle} : tdl))
    }

    const changeModeHandler = () => {
        mode === 'light' ? setMode('dark') : setMode('light')
    }

    const theme = createTheme({
        palette: {
            mode: mode === 'light' ? "light" : 'dark'
        }
    })

    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <AppBar position="static" sx={{marginBottom: '40px'}}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                        <Switch onChange={changeModeHandler}/>
                    </Toolbar>
                </AppBar>
                <Container fixed>
                    <Grid container sx={{mb: '20px'}}>
                        <AddItemForm addItemCallBack={addTodolist}/>
                    </Grid>
                    <Grid container spacing={4}>
                        {todolists.map(tdl => {

                            let tasksForTodolist = tasks[tdl.id]

                            if (tdl.filter === 'completed') {
                                tasksForTodolist = tasks[tdl.id].filter(el => el.isDone)
                            }
                            if (tdl.filter === 'active') {
                                tasksForTodolist = tasks[tdl.id].filter(el => !el.isDone)
                            }

                            return (
                                <Grid item>

                                    <Paper elevation={2} square={false} sx={{padding: '40px'}}>
                                        <Todolist key={tdl.id}
                                                  title={tdl.title}
                                                  tasks={tasksForTodolist}
                                                  date={'28.08.2024'}
                                                  filter={tdl.filter}
                                                  todolistId={tdl.id}
                                            //Callbacks
                                                  removeTask={removeTask}
                                                  addTask={addTask}
                                                  changeTaskStatus={changeTaskStatus}
                                                  changeFilter={changeFilter}
                                                  removeTodolist={removeTodolist}
                                                  changeTaskTitle={changeTaskTitle}
                                                  changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Container>

            </div>
        </ThemeProvider>
    );
}

export default App;
