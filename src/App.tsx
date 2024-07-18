import './App.css'
import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import FitAppBar from './components/FitAppBar';
import FitDrawer, {drawerWidth} from './components/FitDrawer';
import PageBemVindo from './pages/PageBemVindo';
import {useState} from 'react';
import FitDrawerHeader from './components/FitDrawerHeader';


const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})<{
    open?: boolean;
}>(({theme, open}) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

function App() {
    const [open, setOpen] = useState(true);

    return (

        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <FitAppBar open={open} setOpen={setOpen}/>
            <FitDrawer open={open} setOpen={setOpen}/>
            <Main open={open}>
                <FitDrawerHeader/>
                <PageBemVindo/>
            </Main>
        </Box>
    )
}

export default App
