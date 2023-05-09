import { TasksActionsType, tasksReducer } from '../features/TodolistsList/tasks-reducer'
import { TodolistsActionsType, todolistsReducer } from '../features/TodolistsList/todolists-reducer'
import { AnyAction, applyMiddleware, combineReducers, createStore, legacy_createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { appReducer } from './app-reducer'

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
	tasks: tasksReducer,
	todolists: todolistsReducer,
	app: appReducer
})
// непосредственно создаём store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
// определить автоматически тип всего объекта состояния

export type RootState = ReturnType<typeof store.getState>
// Общий тип всех экшенов
export type AppActionsType = TodolistsActionsType | TasksActionsType

export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionsType>

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActionsType>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
