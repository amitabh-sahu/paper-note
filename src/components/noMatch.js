import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";


function noMatch() {
    return (
        <Box sx={{ textAlign: 'center' }}>
            <Typography component="h1" variant="h1">
                404
            </Typography>
            <Typography component="h1" variant="h3">
                Page not found
            </Typography>
            <Link to='/' style={{ fontSize: '1.5rem', textDecoration: 'none' }}>
                go to home
            </Link>
        </Box>
    );
}

export default noMatch;