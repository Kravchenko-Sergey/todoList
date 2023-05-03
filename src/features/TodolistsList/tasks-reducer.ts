import { TasksStateType } from '../../app/App'
import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistsType } from './todolists-reducer'
import { TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType } from '../../api/todolists-api'
import { Dispatch } from 'redux'
import { AppRootStateType } from '../../app/store'

const initialState: TasksStateType = {
	/*"todolistId1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ],
    "todolistId2": [
        { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ]*/
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
	switch (action.type) {
		case 'REMOVE-TASK':
			return { ...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId) }
		case 'ADD-TASK':
			return { ...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]] }
		case 'UPDATE-TASK':
			return {
				...state,
				[action.todolistId]: state[action.todolistId].map(t => (t.id === action.taskId ? { ...t, ...action.model } : t))
			}
		case 'ADD-TODOLIST':
			return { ...state, [action.todolist.id]: [] }
		case 'REMOVE-TODOLIST':
			const copyState = { ...state }
			delete copyState[action.id]
			return copyState
		case 'SET-TODOLISTS': {
			const copyState = { ...state }
			action.todolists.forEach(tl => {
				copyState[tl.id] = []
			})
			return copyState
		}
		case 'SET-TASKS': {
			return { ...state, [action.todolistId]: action.tasks }
		}
		default:
			return state
	}
}

export const removeTaskAC = (taskId: string, todolistId: string) =>
	({ type: 'REMOVE-TASK', taskId, todolistId } as const)
export const addTaskAC = (task: TaskType) => ({ type: 'ADD-TASK', task } as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => {
	return { type: 'UPDATE-TASK', model, todolistId, taskId } as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
	return { type: 'CHANGE-TASK-TITLE', title, todolistId, taskId } as const
}
export const setTasksAC = (tasks: TaskType[], todolistId: string) => {
	return {
		type: 'SET-TASKS',
		tasks,
		todolistId
	} as const
}

export const fetchTasksTC =
	(todolistId: string): any =>
	(dispatch: Dispatch<ActionsType>) => {
		todolistsAPI.getTasks(todolistId).then(res => {
			dispatch(setTasksAC(res.data.items, todolistId))
		})
	}

export const removeTaskTC =
	(taskId: string, todolistId: string): any =>
	(dispatch: Dispatch<ActionsType>) => {
		todolistsAPI.deleteTask(todolistId, taskId).then(res => {
			dispatch(removeTaskAC(taskId, todolistId))
		})
	}
export const addTaskTC =
	(title: string, todolistId: string): any =>
	(dispatch: Dispatch<ActionsType>) => {
		todolistsAPI.createTask(todolistId, title).then(res => {
			const task = res.data.data
			const action = addTaskAC(task.item)
			dispatch(action)
		})
	}
export const updateTaskTC =
	(taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string): any =>
	(dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
		const state = getState()
		const task = state.tasks[todolistId].find(task => task.id === taskId)
		if (!task) {
			return
		}
		const apiModel: UpdateTaskModelType = {
			deadline: task.deadline,
			description: task.description,
			priority: task.priority,
			startDate: task.startDate,
			title: task.title,
			status: task.status,
			...domainModel
		}
		todolistsAPI.updateTask(todolistId, taskId, apiModel).then(res => {
			const action = updateTaskAC(taskId, domainModel, todolistId)
			dispatch(action)
		})
	}

type ActionsType =
	| ReturnType<typeof removeTaskAC>
	| ReturnType<typeof addTaskAC>
	| ReturnType<typeof updateTaskAC>
	| ReturnType<typeof changeTaskTitleAC>
	| AddTodolistActionType
	| RemoveTodolistActionType
	| SetTodolistsType
	| ReturnType<typeof setTasksAC>

export type UpdateDomainTaskModelType = {
	title?: string
	description?: string
	status?: TaskStatuses
	priority?: TaskPriorities
	startDate?: string
	deadline?: string
}
