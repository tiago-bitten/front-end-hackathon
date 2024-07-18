import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import {keyToken} from '../../api/keys';

const FitLoginRoute = () => {
    const localStorageToken = localStorage.getItem(keyToken)

    if (localStorageToken) {
        return <Navigate to="/bem-vindo" replace/>;
    }

    return (
        <>
            <Outlet/>
        </>
    )
};

export default FitLoginRoute;