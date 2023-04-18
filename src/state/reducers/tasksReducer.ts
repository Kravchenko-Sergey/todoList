import { TasksStateType } from '../../App'
import { v1 } from 'uuid'
import { ADD_TODOLIST, addTodoListACType, REMOVE_TODOLIST, RemoveTodoListACType } from './todoListsReducer'

const UPDATE_TASK = 'UPDATE-TASK'
const REMOVE_TASK = 'REMOVE-TASK'
const ADD_TASK = 'ADD-TASK'
const CHANGE_STATUS = 'CHANGE-STATUS'

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: UnionType): TasksStateType => {
	switch (action.type) {
		case ADD_TODOLIST: {
			return {
				...state,
				[action.payload.todoListId]: []
			}
		}
		case REMOVE_TODOLIST: {
			const stateCopy = { ...state }
			delete stateCopy[action.payload.id]
			return stateCopy
		}
		case UPDATE_TASK: {
			return {
				...state,
				[action.payload.todoListId]: state[action.payload.todoListId].map(el =>
					el.id === action.payload.taskId ? { ...el, title: action.payload.newTitle } : el
				)
			}
		}
		case REMOVE_TASK: {
			return {
				...state,
				[action.payload.todoListId]: state[action.payload.todoListId].filter(el => el.id !== action.payload.id)
			}
		}
		case ADD_TASK: {
			const task = { id: v1(), title: action.payload.title, isDone: false }
			return {
				...state,
				[action.payload.todoListId]: [task, ...state[action.payload.todoListId]]
			}
		}
		case CHANGE_STATUS: {
			return {
				...state,
				[action.payload.todoListId]: state[action.payload.todoListId].map(el =>
					el.id === action.payload.id ? { ...el, isDone: action.payload.isDone } : el
				)
			}
		}
		default:
			return state
	}
}

type UnionType =
	| UpdateTaskACType
	| addTodoListACType
	| RemoveTaskACType
	| AddTaskACType
	| ChangeStatusACType
	| RemoveTodoListACType

type UpdateTaskACType = ReturnType<typeof updateTaskAC>
export const updateTaskAC = (todoListId: string, taskId: string, newTitle: string) => {
	return {
		type: UPDATE_TASK,
		payload: { todoListId, taskId, newTitle }
	} as const
}

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (id: string, todoListId: string) => {
	return {
		type: REMOVE_TASK,
		payload: { id, todoListId }
	} as const
}

type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todoListId: string) => {
	return {
		type: ADD_TASK,
		payload: { title, todoListId }
	} as const
}

type ChangeStatusACType = ReturnType<typeof changeStatusAC>
export const changeStatusAC = (id: string, isDone: boolean, todoListId: string) => {
	return {
		type: CHANGE_STATUS,
		payload: { id, isDone, todoListId }
	} as const
}
