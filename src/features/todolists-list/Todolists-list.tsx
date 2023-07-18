import React, { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { todolistsThunks } from 'features/todolists-list/todolists/model/todolists-reducer'
import { Grid, Paper } from '@mui/material'
import { AddItemForm } from 'components/addItem-form/addItem-form'
import { Navigate } from 'react-router-dom'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { selectIsLoggedIn } from 'features/auth/model/auth-selectors'
import { selectTasks } from 'features/todolists-list/tasks/model/tasks-selectors'
import { selectTodolists } from 'features/todolists-list/todolists/model/todolists-selectors'
import { Todolist } from 'features/todolists-list/todolists/ui/todolist/Todolist'

export const TodolistsList = () => {
	const todolists = useSelector(selectTodolists)
	const tasks = useSelector(selectTasks)
	const isLoggedIn = useSelector(selectIsLoggedIn)

	const dispatch = useAppDispatch()

	useEffect(() => {
		if (!isLoggedIn) {
			return
		}
		dispatch(todolistsThunks.fetchTodolists())
	}, [dispatch, isLoggedIn])

	const addTodolist = useCallback(
		(title: string) => {
			dispatch(todolistsThunks.addTodolist({ title }))
		},
		[dispatch]
	)

	if (!isLoggedIn) {
		return <Navigate to={'/login'} />
	}

	return (
		<>
			<Grid container style={{ padding: '20px' }}>
				<AddItemForm addItem={addTodolist} />
			</Grid>
			<Grid container style={{ display: 'flex', gap: 20, justifyContent: 'space-between' }}>
				{todolists.map(tl => {
					return (
						<Grid item key={tl.id} style={{ width: '49.1%' }}>
							<Paper style={{ padding: '10px' }}>
								<Todolist todolist={tl} tasks={tasks[tl.id]} />
							</Paper>
						</Grid>
					)
				})}
			</Grid>
		</>
	)
}
