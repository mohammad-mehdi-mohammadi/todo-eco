import './App.css'
import {Routes} from './routes';
import Cookies from "js-cookie"
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {AUTO_LOGIN_WITH_TOKEN, UserStateType} from "./redux/auth/types";
import {useThemeContext} from "./contexts/theme";

function App() {
    const theme = useThemeContext();
    const isDark = theme.isDark;
    const {data, isLogout} = useSelector((state: UserStateType) => state.user);
    const dispatch = useDispatch();
    const [token, setToken] = useState(Cookies.get('token') || null)
    useEffect(() => {
        if(!isLogout) {
            if (data) {
                Cookies.set('token', data.token, {expires: 1})
            }
            if (Cookies.get('token') && !(data)) {
                dispatch({type: AUTO_LOGIN_WITH_TOKEN, payload: token})
            }
        } else {
            setToken(null)
        }
    }, [data, token])
    const themeMaterial = createTheme({
        palette: {
            mode: isDark ? 'dark' : "light",
        },
    });

    return (
        <ThemeProvider theme={themeMaterial}>
            <CssBaseline/>
            <Routes isAuthorized={!!data || !!token}/>
        </ThemeProvider>
    )
}

export default App
