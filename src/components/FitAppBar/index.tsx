import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import {AppBar} from '@mui/material';

interface IFitAppBar {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const FitAppBar = (props: IFitAppBar) => {

    const {open, setOpen} = props;

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    return (
        <AppBar position="fixed">
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{mr: 2, ...(open && {display: ' none'})}}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    Front-end Hackaton
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default FitAppBar