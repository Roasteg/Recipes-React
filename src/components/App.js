import React from 'react'
import Appbar from "./Appbar"
import {createTheme, ThemeProvider, CssBaseline} from "@mui/material"
import {AuthProvider} from "../context/AuthContext"
import MainPage from "./MainPage"
import RecipesList from "../api/ApiContext";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});


function App() {
    return (
        <AuthProvider>
                <ThemeProvider theme={darkTheme}>
                    <CssBaseline/>
                    <Appbar/>
                    <MainPage/>
                </ThemeProvider>
        </AuthProvider>






    )

}

export default App