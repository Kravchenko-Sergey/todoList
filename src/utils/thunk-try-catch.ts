import { AppDispatch, AppRootStateType } from 'app/store'
import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk'
import { appActions } from 'app/app-reducer'
import { handleServerNetworkError } from 'utils/error-utils'

export const thunkTryCatch = async (
	thunkAPI: BaseThunkAPI<AppRootStateType, any, AppDispatch, any>,
	logic: Function
) => {
	const { dispatch, rejectWithValue } = thunkAPI
	dispatch(appActions.setAppStatus({ status: 'loading' }))
	try {
		return await logic()
	} catch (e) {
		handleServerNetworkError(e, dispatch)
		return rejectWithValue(null)
	} finally {
		dispatch(appActions.setAppStatus({ status: 'idle' }))
	}
}
