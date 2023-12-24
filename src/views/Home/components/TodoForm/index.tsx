import {Alert, Box, Button, CircularProgress, Grid, Snackbar, Stack, TextField} from "@mui/material";

import {ErrorMessage, Form, Formik} from "formik";
import {FC, SyntheticEvent, useEffect, useState} from "react";
import Cookies from "js-cookie"
import YupValidation from "./YupValidation";

import {useDispatch, useSelector} from "react-redux";
import {ADD_TODO, EDIT_TODO, TodoStateType} from "../../../../redux/todo/types";
import {TodoType} from "../../../../types/todo";

interface PageProps {
    editData: TodoType | null
}

const TodoForm: FC<PageProps> = ({editData}) => {

    const {isLoading, errors} = useSelector((state: TodoStateType) => state.todo);
    const dispatch = useDispatch();
    const [snackbar, setSnackbar] = useState({
        isOpen: false,
        severity: "success",
        message: ""
    });
    const initialValue = {
        title: editData ? editData.title : "",
    };

    const handleSubmit = (values) => {
        if(editData) {
            dispatch({
                type: EDIT_TODO, payload: {
                    ...editData,
                    title: values.title
                }
            })
        } else {
            dispatch({
                type: ADD_TODO, payload: {
                    ...values,
                    token: Cookies.get('token'),
                    isCompleted: false
                }
            })
        }
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
                        const {title} = props.values;
                        return (
                            <Form>
                                <Grid container spacing={2} mt={0}>
                                    <Grid item xs={12} md={10}>
                                        <TextField
                                            label="Title"
                                            name="title"
                                            fullWidth
                                            variant="outlined"
                                            margin="dense"
                                            size="small"
                                            value={title}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            helperText={<ErrorMessage name="title"/>}
                                            error={props.errors.title && props.touched.title}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={2} mt={1}>
                                        <Button loading={isLoading.toString()} type="submit" disabled={isLoading}
                                                fullWidth
                                                variant={editData ? "outlined" : "contained"}
                                                size="medium">{isLoading ?
                                            <Box display="flex" alignItems="center"><CircularProgress size="1.5rem"
                                                                                                      color="inherit"/></Box> : editData ? "Edit" : "Add"}</Button>
                                    </Grid>

                                </Grid>

                            </Form>
                        );
                    }}
                </Formik>
            </Box>
        </>
    )
}

export default TodoForm
