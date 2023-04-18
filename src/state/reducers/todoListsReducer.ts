import { FilterValuesType, TodoListType } from '../../App'
import { v1 } from 'uuid'

const UPDATE_TODOLIST_TITLE = 'UPDATE-TODOLIST-TITLE'
export const ADD_TODOLIST = 'ADD-TODOLIST'
const CHANGE_FILTER = 'CHANGE-FILTER'
export const REMOVE_TODOLIST = 'REMOVE-TODOLIST'

const initialSate: TodoListType[] = []

export const todoListsReducer = (
	state: TodoListType[] = initialSate,

	action: updateTodoListTitleACType | addTodoListACType | ChangeFilterACType | RemoveTodoListACType
): TodoListType[] => {
	switch (action.type) {
		case UPDATE_TODOLIST_TITLE: {
			return state.map(el => (el.id === action.payload.todoListId ? { ...el, title: action.payload.newTitle } : el))
		}
		case ADD_TODOLIST: {
			let newTodoList: TodoListType = {
				id: action.payload.todoListId,
				title: action.payload.newTitle,
				filter: 'all'
			}
			return [newTodoList, ...state]
		}
		case CHANGE_FILTER: {
			return state.map(el => (el.id === action.payload.todoListId ? { ...el, filter: action.payload.value } : el))
		}
		case REMOVE_TODOLIST: {
			return state.filter(el => el.id !== action.payload.id)
		}
		default:
			return state
	}
}

type updateTodoListTitleACType = ReturnType<typeof updateTodoListTitleAC>
export const updateTodoListTitleAC = (todoListId: string, newTitle: string) => {
	return {
		type: UPDATE_TODOLIST_TITLE,
		payload: { todoListId, newTitle }
	} as const
}

export type addTodoListACType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (newTitle: string) => {
	return {
		type: ADD_TODOLIST,
		payload: { newTitle, todoListId: v1() }
	} as const
}

type ChangeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (value: FilterValuesType, todoListId: string) => {
	return {
		type: CHANGE_FILTER,
		payload: { value, todoListId }
	} as const
}

export type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (id: string) => {
	return {
		type: REMOVE_TODOLIST,
		payload: { id }
	} as const
}
