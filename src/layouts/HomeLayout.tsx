import { Outlet } from 'react-router-dom';
import Header from "../components/layouts/home-layout/Header/index";

const HomeLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default HomeLayout;
