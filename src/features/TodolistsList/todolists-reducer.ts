import { todolistsAPI, TodolistType } from '../../api/todolists-api'
import { AppThunkType } from '../../app/store'

const initialState: Array<TodolistDomainType> = [
	/*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export const todolistsReducer = (
	state: Array<TodolistDomainType> = initialState,
	action: TodolistsActionsType
): Array<TodolistDomainType> => {
	switch (action.type) {
		case 'REMOVE-TODOLIST':
			return state.filter(tl => tl.id !== action.id)
		case 'ADD-TODOLIST':
			return [{ ...action.todolist, filter: 'all' }, ...state]
		case 'CHANGE-TODOLIST-TITLE':
			return state.map(tl => (tl.id === action.id ? { ...tl, title: action.title } : tl))
		case 'CHANGE-TODOLIST-FILTER':
			return state.map(tl => (tl.id === action.id ? { ...tl, filter: action.filter } : tl))
		case 'SET-TODOLISTS':
			return action.todolists.map(tl => ({ ...tl, filter: 'all' }))
		default:
			return state
	}
}

export const removeTodolistAC = (todolistId: string) => ({ type: 'REMOVE-TODOLIST', id: todolistId } as const)
export const addTodolistAC = (todolist: TodolistType) => ({ type: 'ADD-TODOLIST', todolist } as const)
export const changeTodolistTitleAC = (id: string, title: string) =>
	({ type: 'CHANGE-TODOLIST-TITLE', id, title } as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) =>
	({ type: 'CHANGE-TODOLIST-FILTER', id, filter } as const)
export const setTodolistsAC = (todolists: TodolistType[]) => ({ type: 'SET-TODOLISTS', todolists } as const)

export const fetchTodolistsTC = (): AppThunkType => {
	return dispatch => {
		todolistsAPI.getTodolists().then(res => {
			dispatch(setTodolistsAC(res.data))
		})
	}
}

export const removeTodolistTC = (todolistId: string): AppThunkType => {
	return dispatch => {
		todolistsAPI.deleteTodolist(todolistId).then(res => {
			dispatch(removeTodolistAC(todolistId))
		})
	}
}

export const createTodolistTC = (title: string): AppThunkType => {
	return dispatch => {
		todolistsAPI.createTodolist(title).then(res => {
			dispatch(addTodolistAC(res.data.data.item))
		})
	}
}

export const changeTodolistTitleTC = (id: string, title: string): AppThunkType => {
	return dispatch => {
		todolistsAPI.updateTodolist(id, title).then(res => {
			dispatch(changeTodolistTitleAC(id, title))
		})
	}
}

export type TodolistsActionsType =
	| RemoveTodolistActionType
	| AddTodolistActionType
	| ReturnType<typeof changeTodolistTitleAC>
	| ReturnType<typeof changeTodolistFilterAC>
	| SetTodolistsType

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsType = ReturnType<typeof setTodolistsAC>

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
	filter: FilterValuesType
}
