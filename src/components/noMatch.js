import React from 'react';
import Box from '@mui/material/Box';
import { useLocation } from "react-router-dom";
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";

function NoMatch() {
    const location = useLocation();
    return (
        <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography component="h1" variant="h3">
                404
            </Typography>
            <Typography component="h3" variant="h5">
                Page not found. {location.pathname === '/fallout' ? 'Try again when connected to internet.' : ''}
            </Typography>
            <Link to='/' style={{ textDecoration: 'none' }}>
                go to home
            </Link>
        </Box>
    );
}

export default NoMatch;