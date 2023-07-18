import React, { useCallback, useEffect } from 'react'
import './App.css'
import { TodolistsList } from 'features/todolists-list/Todolists-list'
import { ErrorSnackbar } from 'components/error-snackbar/error-snackbar'
import { useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from 'features/auth/model/Login'
import {
	AppBar,
	Button,
	CircularProgress,
	Container,
	IconButton,
	LinearProgress,
	Toolbar,
	Typography
} from '@mui/material'
import { Menu } from '@mui/icons-material'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { selectIsLoggedIn } from 'features/auth/model/auth-selectors'
import { selectAppStatus, selectIsInitialized } from 'app/app-selectors'
import { authThunks } from 'features/auth/model/auth-reducer'

type PropsType = {
	demo?: boolean
}

export const App = ({ demo = false }: PropsType) => {
	const status = useSelector(selectAppStatus)
	const isInitialized = useSelector(selectIsInitialized)
	const isLoggedIn = useSelector(selectIsLoggedIn)

	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(authThunks.initializeApp())
	}, [dispatch])

	const logoutHandler = useCallback(() => {
		dispatch(authThunks.logout())
	}, [dispatch])

	if (!isInitialized) {
		return (
			<div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
				<CircularProgress />
			</div>
		)
	}

	return (
		<BrowserRouter>
			<div className='App'>
				<ErrorSnackbar />
				<AppBar position='static'>
					<Toolbar>
						{isLoggedIn && (
							<Button color='inherit' onClick={logoutHandler}>
								Log out
							</Button>
						)}
					</Toolbar>
					{status === 'loading' && <LinearProgress />}
				</AppBar>
				<Container fixed>
					<Routes>
						<Route path={'/'} element={<TodolistsList />} />
						<Route path={'/login'} element={<Login />} />
					</Routes>
				</Container>
			</div>
		</BrowserRouter>
	)
}
