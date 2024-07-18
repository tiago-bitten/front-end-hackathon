import React from "react";

import {Navigate, Outlet} from "react-router-dom";
import FitAppBar from '../FitAppBar';
import FitDrawer from '../FitDrawer';
import {keyToken} from '../../api/keys';

interface IFitPrivateRoute {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const FitPrivateRoute = (props: IFitPrivateRoute) => {

    const {open, setOpen} = props;

    const localStorageToken = localStorage.getItem(keyToken)

    if (!localStorageToken) {
        return <Navigate to="/login" replace/>;
    }

    return (
        <>
            <FitAppBar setOpen={setOpen}/>
            <FitDrawer open={open} setOpen={setOpen}/>
            <Outlet/>
        </>
    )
};

export default FitPrivateRoute;