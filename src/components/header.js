import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
import { useStateValue } from '../context';

export default function MenuAppBar() {
    const [{ user }] = useStateValue();

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
                Notes
            </Typography>
            <Link to='/add' style={{ textDecoration: 'none' }}>
                <IconButton sx={{ mx: 1 }}>
                    <AddIcon sx={{ fontSize: 30 }} />
                </IconButton>
            </Link>
            <Avatar src={user.photoURL} alt={user.displayName} sx={{ bgcolor: '#3990d5' }} variant="rounded" />
        </Box>
    );
}