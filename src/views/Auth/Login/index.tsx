import {Alert, Box, Button, CircularProgress, Snackbar, Stack, TextField} from "@mui/material";
import {Link} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {SyntheticEvent, useEffect, useState} from "react";

import YupValidation from "./YupValidation";

import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../../redux/root-reducers";
import {LOGIN_USER} from "../../../redux/auth/types";

const Login = () => {
    // to handle pending requests when component unmounted to avoid memory leak
    let isSubscribed = true;

    const {data, isLoading, errors} = useSelector((state: StateType) => state.user);
    const dispatch = useDispatch();
    const [snackbar, setSnackbar] = useState({
        isOpen: false,
        severity: "success",
        message: ""
    });
    useEffect(() => {
        return () => {
            isSubscribed = false;
        };
    }, [])
    const initialValue = {
        username: "",
        password: "",
    };

    const handleSubmit = (values) => {
        dispatch({type: LOGIN_USER, payload: values})
    };
    const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbar({
            ...snackbar,
            isOpen: false,
        });
    };
    useEffect(() => {
        if (data === undefined) {
            setSnackbar({
                isOpen: true,
                severity: "error",
                message: "Username or password is incorrect"
            });
        }
    }, [data])

    useEffect(() => {
        if (errors && errors.length) {
            setSnackbar({
                isOpen: true,
                severity: "error",
                message: "Something went wrong...!"
            });
        }
    }, [errors])

    return (
        <>
            <Stack spacing={2} sx={{width: '100%'}}>
                <Snackbar open={snackbar.isOpen} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={snackbar.severity} sx={{width: '100%'}}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Stack>
            <Box>

                <Formik
                    initialValues={initialValue}
                    validationSchema={YupValidation}
                    onSubmit={handleSubmit}
                >
                    {(props) => {
                        const {name} = props.values;
                        return (
                            <Form>
                                <TextField
                                    label="Username"
                                    name="username"
                                    fullWidth
                                    variant="outlined"
                                    margin="dense"
                                    size="small"
                                    value={name}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    helperText={<ErrorMessage name="username"/>}
                                    error={props.errors.username && props.touched.username}
                                    required
                                />

                                <Field
                                    as={TextField}
                                    label="Password"
                                    name="password"
                                    type="password"
                                    fullWidth
                                    variant="outlined"
                                    margin="dense"
                                    size="small"
                                    helperText={<ErrorMessage name="password"/>}
                                    error={props.errors.password && props.touched.password}
                                    required
                                />
                                <Button loading={isLoading.toString()} type="submit" disabled={isLoading} fullWidth
                                        variant="contained"
                                        size="medium">{isLoading ?
                                    <Box display="flex" alignItems="center"><CircularProgress size="1.5rem"
                                                                                              color="inherit"/></Box> : "Login"}</Button>
                            </Form>
                        );
                    }}
                </Formik>
                <Box textAlign={"center"} mt={2}>
                    <Link to={"/auth/register"}>
                        Don't have an account? Let's register
                    </Link>
                </Box>
            </Box>
        </>
    )
}

export default Login
