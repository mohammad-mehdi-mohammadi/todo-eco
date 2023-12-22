import {Box, Button, CircularProgress, TextField} from "@mui/material";
import {Link} from "react-router-dom";
import {Formik, Field, Form, ErrorMessage} from "formik";
import YupValidation from "./YupValidation";
import {useEffect, useState} from "react";
import {UserType} from "../../../types/auth";
import {v4 as uuidv4} from 'uuid';
import authService from "../../../services/auth";
const Register = () => {
    // to handle pending requests when component unmounted to avoid memory leak
    let isSubscribed = true;
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        return () => {
            isSubscribed = false;
        };
    }, [])
    const initialValue = {
        username: "",
        password: "",
        confirmPassword: ""
    };

    const handleSubmit = (values, props) => {
        setIsLoading(true)
        authService.register({
            username: values.username,
            password: values.password,
            token: uuidv4()
        }).then((res: UserType) => {
            if (isSubscribed) {
                setIsLoading(false)
                props.resetForm();
            }
        }).catch(error => {
            if (isSubscribed) {
                setIsLoading(false)
            }
        })


    };

    return (
        <>
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
                                {/* First Way */}
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

                                <Field
                                    as={TextField}
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    type="password"
                                    fullWidth
                                    variant="outlined"
                                    margin="dense"
                                    size="small"
                                    helperText={<ErrorMessage name="confirmPassword"/>}
                                    error={
                                        props.errors.confirmPassword &&
                                        props.touched.confirmPassword
                                    }
                                    required
                                />

                                <Button loading={isLoading.toString()} type="submit" disabled={isLoading} fullWidth
                                        variant="contained"
                                        size="medium">{isLoading ?
                                    <Box display="flex" alignItems="center"><CircularProgress size="1.5rem"
                                                                                              color="inherit"/></Box> : "Register"}</Button>
                            </Form>
                        );
                    }}
                </Formik>


                <Box textAlign="center" mt={2}>
                    <Link to={"/auth/login"}>
                        Already have account? Let's login
                    </Link>
                </Box>
            </Box>
        </>
    )
}

export default Register
