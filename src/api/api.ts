import axios from 'axios'

const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.1/',
	withCredentials: true
})

export const todolistAPI = {
	getTodolists() {
		return instance.get<GetTodolistType[]>(`todo-lists`)
	},
	createTodolist(title: string) {
		return instance.post<ResponseType<{ item: GetTodolistType }>>('todo-lists', { title })
	},
	deleteTodolist(todolistId: string) {
		return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
	},
	updateTodolist(todolistId: string, title: string) {
		return instance.put<ResponseType>(`todo-lists/${todolistId}`, { title })
	}
}

export const tasksAPI = {
	getTasks(todolistId: string) {
		return instance.get<GetTasksType[]>(`todo-lists/${todolistId}/tasks`)
	},
	createTask(todolistId: string, title: string) {
		return instance.post<ResponseTaskType<{ item: GetTasksType }>>(`todo-lists/${todolistId}/tasks`, { title })
	},
	deleteTask(todolistId: string, taskId: string) {
		return instance.delete<ResponseTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`)
	},
	updateTask(todolistId: string, taskId: string, title: string) {
		return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, { title })
	}
}

type ResponseType<T = {}> = {
	resultCode: number
	messages: string[]
	data: T
}

type GetTodolistType = {
	id: string
	title: string
	addedDate: string
	order: number
}

type ResponseTaskType<T = {}> = {
	data: T
	messages: string[]
	fieldsErrors: string[]
	resultCode: number
}

type GetTasksType = {
	id: string
	title: string
	description: null
	todoListId: string
	order: number
	status: number
	priority: number
	startDate: null
	deadline: null
	addedDate: string
}
