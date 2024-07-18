import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import {AppBar, Stack} from '@mui/material';
import {setToken} from '../../api';
import {useNavigate} from 'react-router-dom';

interface IFitAppBar {
    setOpen: (open: boolean) => void;
}

const FitAppBar = (props: IFitAppBar) => {

    const {setOpen} = props;

    const navigate = useNavigate();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const onClickLogout = () => {
        setToken('');
        navigate('/login');
    }

    return (
        <AppBar color='secondary' position="fixed">
            <Toolbar sx={{justifyContent: 'space-between'}}>
                <Stack direction='row' alignItems='center'>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Front-end Hackaton
                    </Typography>
                </Stack>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={onClickLogout}
                    edge="start"
                    sx={{mr: 2}}
                >
                    <LogoutIcon/>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default FitAppBar