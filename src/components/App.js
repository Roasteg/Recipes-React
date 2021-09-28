import React from 'react'
import Appbar from "./Appbar";
import {createTheme, ThemeProvider, CssBaseline} from "@mui/material";
import {AuthProvider} from "../context/AuthContext";

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
                </ThemeProvider>
        </AuthProvider>






    )

}

export default App