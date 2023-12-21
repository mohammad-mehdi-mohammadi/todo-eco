import {Button, Container, Grid, TextField} from "@mui/material";

const Home = () => {

    return (
        <>
            <Container maxWidth="md">
                <Grid container>
                    <Grid xs={12} md = {10}>
                        <TextField
                            error
                            id="outlined-error-helper-text"
                            label="Text..."
                            helperText="Incorrect entry."
                            size="small"
                            fullWidth

                        />
                    </Grid>
                    <Grid xs={12} md = {2}>
                        <Button fullWidth variant="contained" size="medium">Add</Button>
                    </Grid>

                </Grid>

            </Container>

        </>
    )
}

export default Home
