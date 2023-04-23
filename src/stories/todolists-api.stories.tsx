import React, { useEffect, useState } from 'react'
import { todolistsAPI } from '../api/todolists-api'
import { tasksAPI } from '../api/tasks-api'

export default { title: 'API' }

export const GetTodolists = () => {
	const [state, setState] = useState<any>({ name: 'Sergey' })
	useEffect(() => {
		todolistsAPI.getTodolists().then(response => setState(response.data))
	}, [])
	return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		todolistsAPI.createTodolist('blablabla').then(response => setState(response.data))
	}, [])

	return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const todolistId = 'c7ff10ab-da91-4dda-b8e2-8b7380936107'
		todolistsAPI.deleteTodolist(todolistId).then(response => setState(response.data))
	}, [])

	return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const todolistId = '3bfd3a56-750e-46a3-adab-5086b48a01d1'
		todolistsAPI.updateTodolistTitle(todolistId, 'blablabla').then(response => setState(response.data))
	}, [])

	return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
	const [state, setState] = useState<any>(null)
	const todolistId = '1270ab69-3ab8-4fcc-9ec5-41593ddfdfe1'
	useEffect(() => {
		tasksAPI.getTasks(todolistId).then(response => setState(response.data))
	}, [])
	return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
	const [state, setState] = useState<any>(null)
	const [todolistId, setTodolistId] = useState<any>('')
	const [taskId, setTaskId] = useState<any>('')
	const deleteTask = () => {
		const todolistId = '1270ab69-3ab8-4fcc-9ec5-41593ddfdfe1'
		const taskId = ''
		tasksAPI.getTasks(todolistId).then(response => setState(response.data))
	}
	return (
		<div>
			{JSON.stringify(state)}
			<div>
				<input
					placeholder={'todolistId'}
					value={todolistId}
					onChange={e => {
						setTodolistId(e.currentTarget.value)
					}}
				/>
				<input
					placeholder={'taskId'}
					value={taskId}
					onChange={e => {
						setTaskId(e.currentTarget.value)
					}}
				/>
				<button onClick={deleteTask}>delete task</button>
			</div>
		</div>
	)
}
