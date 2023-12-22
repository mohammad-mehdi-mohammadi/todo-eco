import { Outlet } from 'react-router-dom';
import {Box} from "@mui/material";

const AnonymousLayout = () => {
  return (
      <>
        <Box maxWidth={400} marginX={"auto"} mt={"20vh"} paddingX={2} display={"flex"} alignItems={"center"} justifyContent={"center"}>
          <div>
            <Box mb={5} textAlign = {"center"} fontWeight={"bold"} fontSize={24}>ToDo</Box>
            <Outlet />
          </div>
        </Box>

      </>
  )
}

export default AnonymousLayout;
