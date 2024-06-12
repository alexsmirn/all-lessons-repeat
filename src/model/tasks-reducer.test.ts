import {v1} from "uuid";
import {removeTaskAC, tasksReducer} from "./tasks-reducer";

test('correct task should be deleted from correct todolist', () => {

    //Initial state
    const todolistId1 = v1()
    const todolistId2 = v1()

    const initialState = {
        [todolistId1]: [
            {id: '1', title: 'Todolist N1 Task N1', isDone: false},
            {id: '2', title: 'Todolist N1 Task N2', isDone: false},
            {id: '3', title: 'Todolist N1 Task N3', isDone: true},
            {id: '4', title: 'Todolist N1 Task N4', isDone: true},
            {id: '4', title: 'Todolist N1 Task N5', isDone: true},
            {id: '5', title: 'Todolist N1 Task N6', isDone: true},
        ],
        [todolistId2]: [
            {id: '1', title: 'Todolist N2 Task N1', isDone: false},
            {id: '2', title: 'Todolist N2 Task N2', isDone: false},
            {id: '3', title: 'Todolist N2 Task N3', isDone: true},
            {id: '4', title: 'Todolist N2 Task N4', isDone: true},
            {id: '5', title: 'Todolist N2 Task N5', isDone: true},
            {id: '6', title: 'Todolist N2 Task N6', isDone: true},
        ]
    }

    const action = removeTaskAC(todolistId1, '2')

    const resultState = tasksReducer(initialState, action)

    expect(resultState).toEqual({
        [todolistId1]: [
            {id: '1', title: 'Todolist N1 Task N1', isDone: false},
            {id: '3', title: 'Todolist N1 Task N3', isDone: true},
            {id: '4', title: 'Todolist N1 Task N4', isDone: true},
            {id: '4', title: 'Todolist N1 Task N5', isDone: true},
            {id: '5', title: 'Todolist N1 Task N6', isDone: true},
        ],
        [todolistId2]: [
            {id: '1', title: 'Todolist N2 Task N1', isDone: false},
            {id: '2', title: 'Todolist N2 Task N2', isDone: false},
            {id: '3', title: 'Todolist N2 Task N3', isDone: true},
            {id: '4', title: 'Todolist N2 Task N4', isDone: true},
            {id: '5', title: 'Todolist N2 Task N5', isDone: true},
            {id: '6', title: 'Todolist N2 Task N6', isDone: true},
        ]
    })
})

test('correct task should be added to correct todolist', () => {
    //Initial state
    const todolistId1 = v1()
    const todolistId2 = v1()

    const initialState = {
        [todolistId1]: [
            {id: '1', title: 'Todolist N1 Task N1', isDone: false},
            {id: '2', title: 'Todolist N1 Task N2', isDone: false},
            {id: '3', title: 'Todolist N1 Task N3', isDone: true},
            {id: '4', title: 'Todolist N1 Task N4', isDone: true},
            {id: '4', title: 'Todolist N1 Task N5', isDone: true},
            {id: '5', title: 'Todolist N1 Task N6', isDone: true},
        ],
        [todolistId2]: [
            {id: '1', title: 'Todolist N2 Task N1', isDone: false},
            {id: '2', title: 'Todolist N2 Task N2', isDone: false},
            {id: '3', title: 'Todolist N2 Task N3', isDone: true},
            {id: '4', title: 'Todolist N2 Task N4', isDone: true},
            {id: '5', title: 'Todolist N2 Task N5', isDone: true},
            {id: '6', title: 'Todolist N2 Task N6', isDone: true},
        ]
    }

    const action = {}
})