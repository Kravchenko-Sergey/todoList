import React, { useEffect, useState } from 'react'
import { tasksAPI, todolistAPI } from '../api/api'

export default { title: 'API' }

export const GetTodolists = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		todolistAPI.getTodolists().then(res => setState(res.data))
	}, [])
	return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const title = 'React'
		todolistAPI.createTodolist(title).then(res => setState(res.data))
	}, [])
	return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const todolistId = 'b05a4724-79c3-4646-a83d-d51a57110eaa'
		todolistAPI.deleteTodolist(todolistId).then(res => setState(res.data))
	}, [])
	return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const todolistId = '40acac07-a88f-4895-8669-43155c8b6992'
		const title = 'abrakadabra'
		todolistAPI.updateTodolist(todolistId, title).then(res => setState(res.data))
	}, [])
	return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const todolistId = '40acac07-a88f-4895-8669-43155c8b6992'
		tasksAPI.getTasks(todolistId).then(res => setState(res.data))
	}, [])
	return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const todolistId = '40acac07-a88f-4895-8669-43155c8b6992'
		const title = 'newTask'
		tasksAPI.createTask(todolistId, title).then(res => setState(res.data))
	}, [])
	return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const todolistId = '40acac07-a88f-4895-8669-43155c8b6992'
		const taskId = '9a0fa246-dadb-4a4f-8dc6-a32956fdaf49'
		tasksAPI.deleteTask(todolistId, taskId).then(res => setState(res.data))
	}, [])
	return <div>{JSON.stringify(state)}</div>
}

export const UpdateTaskTitle = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const todolistId = '40acac07-a88f-4895-8669-43155c8b6992'
		const taskId = '78620dca-d656-480d-9035-711fb6163e45'
		const title = 'update title'
		tasksAPI.updateTask(todolistId, taskId, title).then(res => setState(res.data))
	}, [])
	return <div>{JSON.stringify(state)}</div>
}
