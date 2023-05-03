import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import {
	changeTodolistFilterAC,
	changeTodolistTitleTC,
	createTodolistTC,
	fetchTodolistsTC,
	FilterValuesType,
	removeTodolistTC,
	TodolistDomainType
} from './todolists-reducer'
import React, { useCallback, useEffect } from 'react'
import { addTaskTC, removeTaskTC, updateTaskTC } from './tasks-reducer'
import { TaskStatuses } from '../../api/todolists-api'
import Grid from '@mui/material/Grid'
import { AddItemForm } from '../../components/AddItemForm/AddItemForm'
import Paper from '@mui/material/Paper'
import { Todolist } from './Todolist/Todolist'
import { TasksStateType } from '../../app/App'
import { useAppDispatch, useAppSelector } from '../../app/hooks'

export const TodolistsList = () => {
	const todolists = useAppSelector(state => state.todolists)
	const tasks = useSelector<RootState, TasksStateType>(state => state.tasks)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchTodolistsTC())
	}, [])

	const removeTask = useCallback(function (id: string, todolistId: string) {
		const thunk = removeTaskTC(id, todolistId)
		dispatch(thunk)
	}, [])

	const addTask = useCallback(function (title: string, todolistId: string) {
		const thunk = addTaskTC(title, todolistId)
		dispatch(thunk)
	}, [])

	const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
		const thunk = updateTaskTC(id, { status }, todolistId)
		dispatch(thunk)
	}, [])

	const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
		const thunk = updateTaskTC(id, { title: newTitle }, todolistId)
		dispatch(thunk)
	}, [])

	const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
		const action = changeTodolistFilterAC(todolistId, value)
		dispatch(action)
	}, [])

	const removeTodolist = useCallback(function (id: string) {
		const thunk = removeTodolistTC(id)
		dispatch(thunk)
	}, [])

	const changeTodolistTitle = useCallback(function (id: string, title: string) {
		const thunk = changeTodolistTitleTC(id, title)
		dispatch(thunk)
	}, [])

	const addTodolist = useCallback(
		(title: string) => {
			const action = createTodolistTC(title)
			dispatch(action)
		},
		[dispatch]
	)

	return (
		<>
			<Grid container style={{ padding: '20px' }}>
				<AddItemForm addItem={addTodolist} />
			</Grid>
			<Grid container spacing={3}>
				{todolists.map(tl => {
					let allTodolistTasks = tasks[tl.id]

					return (
						<Grid item key={tl.id}>
							<Paper style={{ padding: '10px' }}>
								<Todolist
									id={tl.id}
									title={tl.title}
									tasks={allTodolistTasks}
									removeTask={removeTask}
									changeFilter={changeFilter}
									addTask={addTask}
									changeTaskStatus={changeStatus}
									filter={tl.filter}
									removeTodolist={removeTodolist}
									changeTaskTitle={changeTaskTitle}
									changeTodolistTitle={changeTodolistTitle}
								/>
							</Paper>
						</Grid>
					)
				})}
			</Grid>
		</>
	)
}
