import axios from 'axios'

export const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.1/',
	withCredentials: true,
	headers: { 'API-KEY': 'dcd97401-6ed3-4abf-b445-8257562d2086' }
})

export type TodolistType = {
	id: string
	title: string
	addedDate: string
	order: number
}

export type ResponseType<D = {}> = {
	resultCode: number
	messages: Array<string>
	data: D
}

export const todolistsAPI = {
	getTodolists() {
		return instance.get<TodolistType[]>('1.1/todo-lists')
	},
	createTodolist(title: string) {
		return instance.post<ResponseType<{ item: TodolistType }>>('1.1/todo-lists', { title: title })
	},
	deleteTodolist(todolistId: string) {
		return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
	},
	updateTodolistTitle(todolistId: string, newTitle: string) {
		return instance.put<ResponseType>(`todo-lists/${todolistId}`, { title: newTitle })
	}
}
