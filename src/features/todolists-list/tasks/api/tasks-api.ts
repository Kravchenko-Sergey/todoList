import { instance, ResponseType } from 'common/api/common-api'
import { GetTasksResponse, TaskType, UpdateTaskModelType } from 'features/todolists-list/tasks/api/tasks-api-types'

export const tasksAPI = {
	getTasks(todolistId: string) {
		return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
	},
	createTask(todolistId: string, taskTitile: string) {
		return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, { title: taskTitile })
	},
	updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
		return instance.put<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
	},
	deleteTask(todolistId: string, taskId: string) {
		return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
	}
}
