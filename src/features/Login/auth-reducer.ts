import { Dispatch } from 'redux'
import { setAppStatusAC } from 'app/app-reducer'
import { authAPI } from 'api/todolists-api'
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
	isLoggedIn: false,
	isInitialized: false
}

const slice = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: {
		setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
			state.isLoggedIn = action.payload.value
		},
		setIsInitializedAC(state, action: PayloadAction<{ initialized: boolean }>) {
			state.isInitialized = action.payload.initialized
		}
	}
})

export const authReducer = slice.reducer

export const { setIsLoggedInAC, setIsInitializedAC } = slice.actions

// thunks
export const loginTC = (data: any) => (dispatch: Dispatch) => {
	dispatch(setAppStatusAC({ status: 'loading' }))
	authAPI
		.login(data)
		.then(res => {
			if (res.data.resultCode === 0) {
				dispatch(setIsLoggedInAC({ value: true }))
				dispatch(setAppStatusAC({ status: 'succeeded' }))
			} else {
				handleServerAppError(res.data, dispatch)
			}
		})
		.catch(error => {
			handleServerNetworkError(error, dispatch)
		})
}

export const logOutTC = () => (dispatch: Dispatch) => {
	dispatch(setAppStatusAC({ status: 'loading' }))
	authAPI
		.logout()
		.then(res => {
			if (res.data.resultCode === 0) {
				dispatch(setIsLoggedInAC({ value: false }))
				dispatch(setAppStatusAC({ status: 'succeeded' }))
			} else {
				handleServerAppError(res.data, dispatch)
			}
		})
		.catch(error => {
			handleServerNetworkError(error, dispatch)
		})
}

export const initializedAppTC = () => (dispatch: Dispatch) => {
	dispatch(setAppStatusAC({ status: 'loading' }))
	authAPI
		.me()
		.then(res => {
			if (res.data.resultCode === 0) {
				dispatch(setIsLoggedInAC({ value: true }))
				dispatch(setAppStatusAC({ status: 'succeeded' }))
			} else {
				handleServerAppError(res.data, dispatch)
			}
		})
		.catch(error => {
			handleServerNetworkError(error, dispatch)
		})
		.finally(() => {
			dispatch(setIsInitializedAC({ initialized: true }))
		})
}
