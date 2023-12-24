import {Box, Button, CircularProgress} from "@mui/material";
import {useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Cookies from "js-cookie"
import {UserType} from "../../types/auth";
import todoService from "../../services/todo";

const Index = () => {
    // to handle pending requests when component unmounted to avoid memory leak
    let isSubscribed = true;

    const navigate = useNavigate();
    let {id} = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [info, setInfo] = useState(null);
    useEffect(() => {
        todoService.getTodo(id, Cookies.get("token")).then((res: {data: UserType}) => {
            if (isSubscribed) {
                setIsLoading(false)
                setInfo(res.data[0])
            }
        }).catch(error => {
            if (isSubscribed) {
                setIsLoading(false)
            }
        })
        return () => {
            isSubscribed = false;
        };
    }, [])
    return (
        <>
            <Box maxWidth={400} marginX="auto" mt={6}>
                <Button
                    onClick={() => navigate("/")}
                    variant="outlined"
                    size="medium">Go back</Button>
                {
                    isLoading ? (
                        <Box display="flex" justifyContent="center" mt={3}>
                            <CircularProgress size="1.5rem"
                                              color="inherit"/></Box>
                    ) : (
                        <>
                            {
                                info ? (
                                    <>
                                        <p>Title: {info.title}</p>
                                        <p>Is completed: {info.isCompleted ? "YES" : "NO"}</p>
                                    </>
                                ) : <>Not found</>
                            }
                        </>

                    )
                }
            </Box>
        </>
    )
}

export default Index
