import { instance, ResponseType } from './todolists-api'

export type TaskType = {
	description: string
	title: string
	status: number
	priority: number
	startDate: string
	deadline: string
	id: string
	todoListId: string
	order: number
	addedDate: string
}

type GetTasksResponseType = {
	error: string | null
	totalCount: number
	items: TaskType[]
}

type UpdateTaskType = {
	title: string
	description: string
	status: number
	priority: number
	startDate: string
	deadline: string
}

export const tasksAPI = {
	getTasks(todolistId: string) {
		return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
	},
	deleteTask(todolistId: string, taskId: string) {
		return instance.get<ResponseType>(`todo-lists/${todolistId}/tasks/${{ taskId }}`)
	},
	updateTask(todolistId: string, taskId: string, model: UpdateTaskType) {}
}
