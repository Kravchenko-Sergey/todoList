import React, { useCallback, useEffect } from 'react'
import './App.css'
import { TodolistsList } from '../features/TodolistsList/TodolistsList'
import { AppRootStateType, useAppSelector } from './store'
import { initializeAppTC, RequestStatusType } from './app-reducer'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import LinearProgress from '@mui/material/LinearProgress'
import { Menu } from '@mui/icons-material'
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Login } from '../features/Login/Login'
import { useDispatch, useSelector } from 'react-redux'
import { CircularProgress } from '@mui/material'
import { logoutTC } from '../features/Login/auth-reducer'

function App() {
	const status = useAppSelector<RequestStatusType>(state => state.app.status)
	const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
	const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.initialized)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeAppTC())
	}, [])

	const handleLogOut = useCallback(() => {
		dispatch(logoutTC())
	}, [])

	if (!isInitialized) {
		return <CircularProgress style={{ position: 'fixed', top: '30%', left: '50%' }} />
	}

	return (
		<BrowserRouter>
			<div className='App'>
				<ErrorSnackbar />
				<AppBar position='static'>
					<Toolbar>
						<IconButton edge='start' color='inherit' aria-label='menu'>
							<Menu />
						</IconButton>
						{isLoggedIn && (
							<Button color='inherit' onClick={handleLogOut}>
								Log out
							</Button>
						)}
					</Toolbar>
					{status === 'loading' && <LinearProgress />}
				</AppBar>
				<Container fixed>
					<Routes>
						<Route path={'/'} element={!isLoggedIn ? <Navigate to={'/login'} /> : <TodolistsList />} />
						<Route path={'/login'} element={isLoggedIn ? <Navigate to={'/'} /> : <Login />} />
					</Routes>
				</Container>
			</div>
		</BrowserRouter>
	)
}

export default App
