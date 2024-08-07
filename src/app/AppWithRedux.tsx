import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import {Todolist} from "../features/Todolist/Todolist";
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
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    deleteTodolistAC,
    fetchTodolists,
    TodolistDomainType,
    TodolistFilterType
} from "../model/todolists-reducer";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../model/tasks-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../state/store";
import {TaskType} from "../api/todolist-api";

export type TasksStateType = {
    [key: string]: TaskType[]
}



function AppWithRedux() {
    console.log('App called')

    const [mode, setMode] = useState<'light' | 'dark'>('light')

    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodolists)
    }, []);

    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(todolistId, taskId))
    }, [])
    const changeTaskTitle = useCallback((todolistId: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, newTitle))
    }, [])
    const changeFilter = useCallback((todolistId: string, newFilterValue: TodolistFilterType) => {
        dispatch(changeTodolistFilterAC(todolistId, newFilterValue))
    }, [])
    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(deleteTodolistAC(todolistId))
    }, [])
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [])
    const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistId, newTitle))
    }, [])
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
                            return (
                                <Grid item key={tdl.id}>

                                    <Paper elevation={2} square={false} sx={{padding: '40px'}}>
                                        <Todolist key={tdl.id}
                                                  title={tdl.title}
                                                  tasks={tasks[tdl.id]}
                                                  date={'28.08.2024'}
                                                  filter={tdl.filter}
                                                  todolistId={tdl.id}
                                            //Callbacks
                                                  removeTask={removeTask}
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

// @ts-ignore
export default AppWithRedux;