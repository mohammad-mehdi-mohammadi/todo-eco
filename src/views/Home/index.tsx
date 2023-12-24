import {
    Alert,
    Box,
    Button, CircularProgress,
    Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab,
    IconButton, List,
    ListItem,
    ListItemButton,
    ListItemText,
    Pagination, Snackbar, Stack,
    TextField
} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import {debounce} from "lodash";
import {makeStyles} from '@mui/styles';
import AddIcon from '@mui/icons-material/Add';
import {ChangeEvent, SyntheticEvent, useEffect, useState} from "react";
import TodoForm from "./components/TodoForm/index";
import {useDispatch, useSelector} from "react-redux";
import {DELETE_TODO, LOAD_TODO_LIST, TodoStateType, TOGGLE_TODO} from "../../redux/todo/types";
import Cookies from "js-cookie"
import {TodoType} from "../../types/todo";
import {useNavigate} from "react-router-dom";

const fabStyle = {
    floating: {
        right: 20,
        bottom: 20,
        position: 'fixed'
    }
}
const useStyles = makeStyles(fabStyle);

// local, none state variable
let _id = 0
const Index = () => {
    const navigate = useNavigate();
    const [snackbar, setSnackbar] = useState({
        isOpen: false,
        severity: "success",
        message: ""
    });
    const classes = useStyles();
    const dispatch = useDispatch();
    const {data, isSuccess, total} = useSelector((state: TodoStateType) => state.todo);
    const [page, setPage] = useState(1);
    const [editData, setEditData] = useState<TodoType | null>(null);
    const [search, setSearch] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState({
        addEdit: false,
        delete: false
    });

    const onAddEditDialogOpen = (data: TodoType | null) => {
        // if user wants to edit todo
        if (data) {
            setEditData(data)
        }
        setIsDialogOpen({
            ...isDialogOpen,
            addEdit: true,
        });
    };
    const onAddEditDialogClose = () => {
        setIsDialogOpen({
            ...isDialogOpen,
            addEdit: false,
        });
    };
    const onDeleteDialogOpen = (id: number) => {
        _id = id;
        setIsDialogOpen({
            ...isDialogOpen,
            delete: true,
        });
    };
    const onDeleteDialogClose = () => {
        _id = 0
        setIsDialogOpen({
            ...isDialogOpen,
            delete: false,
        });
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
    const getPageCount = (total: number) => {
        return Math.ceil(total / 10)
    }
    useEffect(() => {
        loadData()
    }, [])
    useEffect(() => {
        if (isSuccess) {
            if (!editData) {
                loadData();
            }
            setEditData(null)
            setSnackbar({
                isOpen: true,
                severity: "success",
                message: "Todo action is done successfully!"
            });
            setIsDialogOpen({
                addEdit: false,
                delete: false,
            });
        }
    }, [isSuccess])
    const loadData = () => {
        dispatch({
            type: LOAD_TODO_LIST, payload: {
                page,
                limit: 10,
                token: Cookies.get("token"),
                search
            }
        })
    }
    const onDelete = () => {
        dispatch({
            type: DELETE_TODO, payload: _id
        })
    }
    const onSearch = (value) => {
        setSearch(value);
    }
    const onPageChange = (event: ChangeEvent<unknown>, value: number) => {
        setPage(value)
    }
    const onToggle = (data: TodoType) => {
        dispatch({
            type: TOGGLE_TODO, payload: data
        })
    }
    useEffect(() => {
        loadData()
    }, [page])
    useEffect(() => {
        page === 1 ? loadData() : setPage(1)
    }, [search])
    return (
        <>
            <Stack spacing={2} sx={{width: '100%'}}>
                <Snackbar open={snackbar.isOpen} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={snackbar.severity} sx={{width: '100%'}}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Stack>
            <Container maxWidth="md">
                <Box mt={5}>
                    <TextField
                        label="Search"
                        size="small"
                        fullWidth
                        onChange={debounce(function (e) {
                            onSearch(e.target.value)
                        }, 500)}
                    />
                </Box>
                <Box>
                    {
                        data && data.length ? (
                            <>
                                <List sx={{width: '100%'}}>
                                    {data.map((item, index) => {

                                        return (
                                            <ListItem
                                                key={index}
                                                secondaryAction={
                                                    <>
                                                        <IconButton edge="end" aria-label="edit"
                                                                    onClick={() => onAddEditDialogOpen(item)}>
                                                            <EditIcon/>
                                                        </IconButton>
                                                        <IconButton edge="end" aria-label="delete"
                                                                    onClick={() => onDeleteDialogOpen(item.id)}>
                                                            <DeleteForeverIcon/>
                                                        </IconButton>
                                                        <IconButton edge="end" aria-label="info"
                                                                    onClick={() => navigate(`/detail/${item.id}`)}>
                                                            <InfoIcon/>
                                                        </IconButton>
                                                    </>
                                                }
                                                disablePadding
                                            >
                                                <ListItemButton role={undefined} dense onClick={() => onToggle(item)}>
                                                    <ListItemText primary={item.title}
                                                                  sx={item.isCompleted ? {textDecoration: 'line-through'} : ""}/>
                                                </ListItemButton>
                                            </ListItem>
                                        );
                                    })}
                                </List>
                                <Stack alignItems="center" mt={10}>
                                    <Pagination count={getPageCount(total)} color="primary" page={page}
                                                onChange={onPageChange}/>
                                </Stack>
                            </>
                        ) : data && !data.length ? (
                            <>No data</>
                        ) : (
                            <Box display="flex" justifyContent="center" mt={3}>
                                <CircularProgress size="1.5rem"
                                                  color="inherit"/></Box>
                        )
                    }
                </Box>

            </Container>
            <div className={classes.floating}>
                <Fab size="medium" color="secondary" aria-label="add" onClick={() => onAddEditDialogOpen()}>
                    <AddIcon/>
                </Fab>
            </div>
            <Dialog open={isDialogOpen.addEdit} onClose={onAddEditDialogClose} fullWidth={true}
                    maxWidth={"sm"}>
                <DialogTitle>{editData ? "Edit" : "Add new"} todo</DialogTitle>
                <DialogContent>

                    <TodoForm editData={editData}/>
                </DialogContent>
            </Dialog>
            <Dialog
                open={isDialogOpen.delete}
                keepMounted
                onClose={onDeleteDialogClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Delete it?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete it forever?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onDeleteDialogClose}>Cancel</Button>
                    <Button onClick={onDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Index
