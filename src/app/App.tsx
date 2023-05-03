import React, { useCallback, useEffect } from 'react'
import './App.css'
import { Todolist } from '../features/TodolistsList/Todolist/Todolist'
import { AddItemForm } from '../components/AddItemForm/AddItemForm'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { Menu } from '@mui/icons-material'
import {
	changeTodolistFilterAC,
	changeTodolistTitleTC,
	createTodolistTC,
	fetchTodolistsTC,
	FilterValuesType,
	removeTodolistTC,
	TodolistDomainType
} from '../features/TodolistsList/todolists-reducer'
import { addTaskTC, removeTaskTC, updateTaskTC } from '../features/TodolistsList/tasks-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store'
import { TaskStatuses, TaskType } from '../api/todolists-api'
import { TodolistsList } from '../features/TodolistsList/TodolistList'

export type TasksStateType = {
	[key: string]: Array<TaskType>
}

function App() {
	return (
		<div className='App'>
			<AppBar position='static'>
				<Toolbar>
					<IconButton edge='start' color='inherit' aria-label='menu'>
						<Menu />
					</IconButton>
					<Typography variant='h6'>News</Typography>
					<Button color='inherit'>Login</Button>
				</Toolbar>
			</AppBar>
			<Container fixed>
				<TodolistsList />
			</Container>
		</div>
	)
}

export default App
