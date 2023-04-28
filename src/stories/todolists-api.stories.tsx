import React, { useEffect, useState } from 'react'
import { todolistAPI } from '../api/api'

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
