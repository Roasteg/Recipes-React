import React, {useEffect, useRef, useState} from 'react'
import {
    Alert,
    AppBar,
    Box,
    Button,
    Dialog,
    FormLabel,
    IconButton,
    Slide,
    Snackbar,
    TextField,
    Toolbar,
    Typography
} from "@mui/material"
import "@mui/icons-material"
import {useAuth} from "../context/AuthContext"
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined'


export default function Appbar() {
    const [openRegistration, setOpenRegistration] = useState(false)
    const [openLogin, setOpenLogin] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [snackOpen, setSnackOpen] = useState(false)
    const [logged, setLoggedIn] = useState(false)

    const handleClickRegistration = () => {
        setOpenRegistration(true)
    }
    const handleCloseRegistration = () => {
        setOpenRegistration(false)
    }
    const handleSnack = () => {
        setSnackOpen(true)
    }
    const handleSnackClose = () => {
        setSnackOpen(false)
    }
    const handleClickLogin = () => {
        setOpenLogin(true)
    }
    const handleCloseLogin = () => {
        setOpenLogin(false)
    }

    useEffect(() => {
        if (currentUser) {
            return setLoggedIn(true)
        }
        setLoggedIn(false)
    }, [])


    const emailRef = useRef()
    const passRef = useRef()
    const passConfirmRef = useRef()
    const containerRef = useRef(null)
    const {signup, currentUser, login, logout} = useAuth()

    async function handleRegistration(e) {
        e.preventDefault()
        if (passRef.current.value !== passConfirmRef.current.value) {
            return setError('Passwords do not match')
        }
        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passRef.current.value)
        } catch {
            setError('Failed to create an account')
        } finally {
            setLoading(false)
            setOpenRegistration(false)
            setLoggedIn(false)
        }
        setLoading(false)
    }

    async function handleLogin(e) {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passRef.current.value)
        } catch {
            setError('Failed to sign in')
        } finally {
            setLoading(false)
            setOpenLogin(false)
            setLoggedIn(true)
        }
        setLoading(false)
    }

    async function handleLogout() {
        setError('')
        try {
            await logout()
            setLoggedIn(false)
        } catch {
            setError('Failed to logout')
        }
    }


    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        React recipes
                    </Typography>

                    {!logged && <Slide direction={"left"} in={true} timeout={{enter: 500, exit: 500}}
                                       style={{transitionDelay: '500ms'}}
                    ><Button color="inherit"
                             onClick={handleClickRegistration}> Sign
                        Up</Button></Slide>}
                    <Dialog open={openRegistration}
                            onClose={handleCloseRegistration}>
                        <Box component="form" sx={{
                            m: 1.4,
                            p: 1,
                            height: '80%',
                            width: '300px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }} onSubmit={handleRegistration}>
                            <FormLabel>Register</FormLabel>
                            <TextField required sx={{m: 1, textAlign: 'center'}} label="Email" variant="outlined"
                                       inputRef={emailRef}/>
                            <TextField required sx={{m: 1}} label="Password" variant="outlined"
                                       inputRef={passRef}/>
                            <TextField required sx={{m: 1}} label="Confirm password" variant="outlined"
                                       inputRef={passConfirmRef}/>
                            <Button variant="outlined"
                                    sx={{width: '40%', alignSelf: 'end', m: 1, textAlign: 'center'}}
                                    disabled={loading}
                                    type="submit" onClick={handleSnack}>Submit</Button>
                            {error &&
                            <Snackbar open={snackOpen} autoHideDuration={3000} onClose={handleSnackClose}><Alert
                                severity="error">{error}</Alert></Snackbar>}
                        </Box>
                    </Dialog>
                    {!logged && <Slide direction={"left"} timeout={{enter: 500, exit: 500}} appear in={true}
                                       style={{transitionDelay: '1000ms'}}
                                       container={containerRef.current}><Button color="inherit"
                                                                                onClick={handleClickLogin}> Log
                        In</Button></Slide>}
                    <Dialog open={openLogin}
                            onClose={handleCloseLogin}>
                        <Box component="form" sx={{
                            m: 1.4,
                            p: 1,
                            height: '80%',
                            width: '300px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }} onSubmit={handleLogin}>
                            <FormLabel>Log In</FormLabel>
                            <TextField sx={{m: 1, textAlign: 'center'}} label="Email" variant="outlined"
                                       inputRef={emailRef}/>
                            <TextField sx={{m: 1}} label="Password" variant="outlined"
                                       inputRef={passRef}/>
                            <Button variant="outlined"
                                    sx={{width: '40%', alignSelf: 'end', m: 1, textAlign: 'center'}}
                                    disabled={loading}
                                    type="submit" onClick={handleSnack}>Submit</Button>
                            {error &&
                            <Snackbar open={snackOpen} autoHideDuration={3000} onClose={handleSnackClose}><Alert
                                severity="error">{error}</Alert></Snackbar>}
                        </Box>
                    </Dialog>
                    {logged && <Slide direction={"left"} in={true} timeout={{enter: 500, exit: 500}}
                    ><IconButton
                        onClick={handleLogout}><ExitToAppOutlinedIcon/></IconButton></Slide>}

                </Toolbar>
            </AppBar>
        </Box>


    )
}