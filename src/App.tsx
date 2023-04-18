import React, { useCallback } from 'react'
import './App.css'
import { TaskType, Todolist } from './components/Todolist/Todolist'
import { AddItemForm } from './components/AddItemForm/AddItemForm'
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material'
import { Menu } from '@mui/icons-material'
import {
	addTodoListAC,
	updateTodoListTitleAC,
	changeFilterAC,
	removeTodoListAC
} from './state/reducers/todoListsReducer'
import { addTaskAC, changeStatusAC, removeTaskAC, updateTaskAC } from './state/reducers/tasksReducer'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from './state/store'

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListType = {
	id: string

	title: string
	filter: FilterValuesType
}

export type TasksStateType = {
	[key: string]: Array<TaskType>
}

export const App = () => {
	const dispatch = useDispatch()

	const todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todoLists)

	const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

	const updateTask = useCallback(
		(todolistId: string, taskId: string, newTitle: string) => {
			dispatch(updateTaskAC(todolistId, taskId, newTitle))
		},
		[dispatch]
	)

	const updateTodolistTitle = useCallback(
		(todolistID: string, newTitle: string) => {
			dispatch(updateTodoListTitleAC(todolistID, newTitle))
		},
		[dispatch]
	)

	const removeTask = useCallback(
		(id: string, todolistId: string) => {
			dispatch(removeTaskAC(id, todolistId))
		},
		[dispatch]
	)

	const addTask = useCallback(
		(todolistId: string, title: string) => {
			dispatch(addTaskAC(todolistId, title))
		},
		[dispatch]
	)

	const changeStatus = useCallback(
		(id: string, isDone: boolean, todoListId: string) => {
			dispatch(changeStatusAC(id, isDone, todoListId))
		},
		[dispatch]
	)

	const changeFilter = useCallback(
		(value: FilterValuesType, todolistId: string) => {
			dispatch(changeFilterAC(value, todolistId))
		},
		[dispatch]
	)

	const removeTodolist = useCallback(
		(id: string) => {
			dispatch(removeTodoListAC(id))
		},
		[dispatch]
	)

	const addTodoList = useCallback(
		(newTitle: string) => {
			dispatch(addTodoListAC(newTitle))
		},
		[dispatch]
	)

	return (
		<div className='App'>
			<AppBar position={'static'}>
				<Toolbar>
					<IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
						<Menu />
					</IconButton>
					<Typography>News</Typography>
					<Button color={'inherit'}>Login</Button>
				</Toolbar>
			</AppBar>
			<Container fixed>
				<Grid container style={{ padding: '20px 0' }}>
					<AddItemForm callBack={addTodoList} />
				</Grid>
				<Grid container spacing={3}>
					{todoLists.map(tl => {
						return (
							<Grid item key={tl.id}>
								<Paper style={{ padding: '10px' }}>
									<Todolist todoListId={tl.id} title={tl.title} filter={tl.filter} />
								</Paper>
							</Grid>
						)
					})}
				</Grid>
			</Container>
		</div>
	)
}
