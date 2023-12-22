
import './App.css'
import {Routes} from './routes';
import Cookies from "js-cookie"
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "./redux/root-reducers";
import {useEffect, useState} from "react";
import {AUTO_LOGIN_WITH_TOKEN} from "./redux/auth/types";

function App() {
    const {data} = useSelector((state: StateType) => state.user);
    const dispatch = useDispatch();
    const [token, setToken] = useState(Cookies.get('token') || null)
    useEffect(() => {
        if (data) {
            console.log(data, 'data')
            Cookies.set('token', data.token, {expires: 1})

        }
        console.log(token, data, 'token')
        if(token && !(data)) {

            dispatch({type: AUTO_LOGIN_WITH_TOKEN, payload: token})
        }
    }, [data, token])
    const darkTheme = createTheme({
        palette: {
            mode: 'light',
        },
    });

    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline/>
                <Routes isAuthorized={!!data || !!token}/>
            </ThemeProvider>
        </>
    )
}

export default App
