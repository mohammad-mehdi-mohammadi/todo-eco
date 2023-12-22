import {
    Box,
    Button,
    Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab,
    Grid,
    IconButton, List,
    ListItem,
    ListItemButton,
    ListItemText,
    Pagination, Stack,
    TextField
} from "@mui/material";
import { makeStyles } from '@mui/styles';
import AddIcon from '@mui/icons-material/Add';
import {useState} from "react";
const fabStyle = {
    floating: {
        right: 20,
        bottom: 20,
        position: 'fixed'
    }
}
const useStyles = makeStyles(fabStyle);
const Home = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Container maxWidth="md">
                <Box mt = {5}>
                    <TextField
                        label="Search"
                        size="small"
                        fullWidth

                    />
                </Box>
                <Box>
                    <List sx={{ width: '100%' }}>
                        {[0, 1, 2, 3].map((value) => {

                            return (
                                <ListItem
                                    key={value}

                                    disablePadding
                                >
                                    <ListItemButton role={undefined} dense>

                                        <ListItemText primary={`Line item ${value + 1}`} />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </Box>
                <Stack alignItems="center" mt = {10}>
                    <Pagination count={10} color="primary" />
                </Stack>
            </Container>
            <div className={classes.floating}>
                <Fab size="medium" color="secondary" aria-label="add" onClick={handleClickOpen}>
                    <AddIcon />
                </Fab>
            </div>
            <Dialog open={open} onClose={handleClose} fullWidth={true}
                    maxWidth={"sm"}>
                <DialogTitle>Add new todo</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} mt={0}>
                        <Grid item xs={12} md={10}>
                            <TextField
                                error
                                id="outlined-error-helper-text"
                                label="Text..."
                                helperText="Incorrect entry."
                                size="small"
                                fullWidth

                            />
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Button fullWidth variant="contained" size="medium">Add</Button>
                        </Grid>

                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Home
