import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils'
import { createSlice } from '@reduxjs/toolkit'
import { appActions } from 'app/app-reducer'
import { clearTasksAndTodolists } from 'common/actions/common-actions'
import { createAppAsyncThunk } from 'utils/create-app-async-thunk'
import { authApi } from 'features/auth/api/auth-api'
import { LoginParamsType } from 'features/auth/api/auth-api-types'

const slice = createSlice({
	name: 'auth',
	initialState: {
		isLoggedIn: false
	},
	reducers: {},
	extraReducers: builder => {
		builder.addCase(login.fulfilled, (state, action) => {
			state.isLoggedIn = action.payload.isLoggedIn
		})
		builder.addCase(logout.fulfilled, (state, action) => {
			state.isLoggedIn = action.payload.isLoggedIn
		})
		builder.addCase(initializeApp.fulfilled, (state, action) => {
			state.isLoggedIn = action.payload.isLoggedIn
		})
	}
})

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>('auth/login', async (arg, thunkAPI) => {
	const { dispatch, rejectWithValue } = thunkAPI
	try {
		dispatch(appActions.setAppStatus({ status: 'loading' }))
		const res = await authApi.login(arg)
		if (res.data.resultCode === 0) {
			dispatch(appActions.setAppStatus({ status: 'succeeded' }))
			return { isLoggedIn: true }
		} else {
			return rejectWithValue(null)
		}
	} catch (e) {
		handleServerNetworkError(e, dispatch)
		return rejectWithValue(null)
	}
})

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, void>('auth/logout', async (arg, thunkAPI) => {
	const { dispatch, rejectWithValue } = thunkAPI
	try {
		dispatch(appActions.setAppStatus({ status: 'loading' }))
		const res = await authApi.logout()
		if (res.data.resultCode === 0) {
			dispatch(clearTasksAndTodolists())
			dispatch(appActions.setAppStatus({ status: 'succeeded' }))
			return { isLoggedIn: false }
		} else {
			handleServerAppError(res.data, dispatch)
			return rejectWithValue(null)
		}
	} catch (e) {
		handleServerNetworkError(e, dispatch)
		return rejectWithValue(null)
	}
})

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>('app/initializeApp', async (arg, thunkAPI) => {
	const { dispatch, rejectWithValue } = thunkAPI

	try {
		const res = await authApi.me()
		if (res.data.resultCode === 0) {
			return { isLoggedIn: true }
		} else {
			handleServerAppError(res.data, dispatch)
			return rejectWithValue(null)
		}
	} catch (e) {
		handleServerNetworkError(e, dispatch)
		return rejectWithValue(null)
	} finally {
		dispatch(appActions.setAppInitialized({ isInitialized: true }))
	}
})

export const authReducer = slice.reducer

export const authThunks = { login, logout, initializeApp }
