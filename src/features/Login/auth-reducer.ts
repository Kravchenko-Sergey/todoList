import { Dispatch } from 'redux'
import { setAppStatusAC } from '../../app/app-reducer'
import { authAPI, LoginParamsType } from '../../api/todolists-api'
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils'

type InitialStateType = typeof initialState

const initialState = {
	isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType) => {
	switch (action.type) {
		case 'login/SET-IS-LOGGED-IN': {
			return { ...state, isLoggedIn: action.value }
		}
		default:
			return state
	}
}

type ActionsType = SetAppStatusACType

type SetAppStatusACType = ReturnType<typeof setIsLoggedInAC>
export const setIsLoggedInAC = (value: boolean) => {
	return {
		type: 'login/SET-IS-LOGGED-IN',
		value
	} as const
}

export const loginTC =
	(data: LoginParamsType): any =>
	(dispatch: Dispatch): any => {
		dispatch(setAppStatusAC('loading'))
		authAPI
			.login(data)
			.then(res => {
				if (res.data.resultCode === 0) {
					dispatch(setIsLoggedInAC(true))
					dispatch(setAppStatusAC('succeeded'))
				} else {
					handleServerAppError(res.data, dispatch)
				}
			})
			.catch(error => {
				handleServerNetworkError(error, dispatch)
			})
	}

export const logoutTC = (): any => (dispatch: Dispatch) => {
	dispatch(setAppStatusAC('loading'))
	authAPI
		.logout()
		.then(res => {
			if (res.data.resultCode === 0) {
				dispatch(setIsLoggedInAC(false))
				dispatch(setAppStatusAC('succeeded'))
			} else {
				handleServerAppError(res.data, dispatch)
			}
		})
		.catch(error => {
			handleServerNetworkError(error, dispatch)
		})
}
