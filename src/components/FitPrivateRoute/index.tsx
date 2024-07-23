import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import FitAppBar from '../FitAppBar';
import FitDrawer from '../FitDrawer';
import { keyToken } from '../../api/keys';
import { Box } from "@mui/material";

interface IFitPrivateRoute {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const FitPrivateRoute = (props: IFitPrivateRoute) => {
    const { open, setOpen } = props;
    const localStorageToken = localStorage.getItem(keyToken);

    if (!localStorageToken) {
        return <Navigate to="/login" replace />;
    }

    return (
        <>
            <FitAppBar setOpen={setOpen} />
            <FitDrawer open={open} setOpen={setOpen} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    transition: (theme) =>
                        theme.transitions.create('margin', {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.leavingScreen,
                        }),
                    marginLeft: open ? '240px' : '0px',
                    marginTop: '64px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Outlet />
            </Box>
        </>
    );
};

export default FitPrivateRoute;
