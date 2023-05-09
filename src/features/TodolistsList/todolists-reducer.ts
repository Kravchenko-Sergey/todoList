import { todolistsAPI, TodolistType } from '../../api/todolists-api'
import { AppThunkType } from '../../app/store'
import { RequestStatusType, setAppErrorAC, setAppStatusAC } from '../../app/app-reducer'

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
			return [{ ...action.todolist, filter: 'all', entityStatus: 'idle' }, ...state]
		case 'CHANGE-TODOLIST-TITLE':
			return state.map(tl => (tl.id === action.id ? { ...tl, title: action.title } : tl))
		case 'CHANGE-TODOLIST-ENTITY-STATUS':
			return state.map(tl => (tl.id === action.id ? { ...tl, entityStatus: action.status } : tl))
		case 'CHANGE-TODOLIST-FILTER':
			return state.map(tl => (tl.id === action.id ? { ...tl, filter: action.filter } : tl))
		case 'SET-TODOLISTS':
			return action.todolists.map(tl => ({ ...tl, filter: 'all', entityStatus: 'idle' }))
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
export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) =>
	({ type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, status } as const)
export const setTodolistsAC = (todolists: TodolistType[]) => ({ type: 'SET-TODOLISTS', todolists } as const)

export const fetchTodolistsTC = (): AppThunkType => {
	return dispatch => {
		dispatch(setAppStatusAC('loading'))
		todolistsAPI.getTodolists().then(res => {
			dispatch(setTodolistsAC(res.data))
			dispatch(setAppStatusAC('succeeded'))
		})
	}
}

export const removeTodolistTC = (todolistId: string): AppThunkType => {
	return dispatch => {
		dispatch(setAppStatusAC('loading'))
		dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
		todolistsAPI.deleteTodolist(todolistId).then(res => {
			dispatch(removeTodolistAC(todolistId))
			dispatch(setAppStatusAC('succeeded'))
		})
	}
}

export const createTodolistTC = (title: string): AppThunkType => {
	return dispatch => {
		dispatch(setAppStatusAC('loading'))
		todolistsAPI.createTodolist(title).then(res => {
			dispatch(addTodolistAC(res.data.data.item))
			dispatch(setAppStatusAC('succeeded'))
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
	| ReturnType<typeof changeTodolistEntityStatusAC>

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsType = ReturnType<typeof setTodolistsAC>

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
	filter: FilterValuesType
	entityStatus: RequestStatusType
}
