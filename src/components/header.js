import React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";
import { useStateValue } from '../context';
import { auth, signOut } from '../firebase';

export default function MenuAppBar() {
    const [{ user }, dispatch] = useStateValue();

    const signOutHandler = () => {
        signOut(auth).then(() => {
            dispatch({
                type: 'SET_USER',
                user: null,
            });
        }).catch((err) => {
            alert(err.message);
        });
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                Notes
            </Typography>
            <Link to='/add' style={{ textDecoration: 'none' }}>
                <IconButton aria-label="add note">
                    <AddIcon />
                </IconButton>
            </Link>
            <IconButton aria-label="sing out" onClick={signOutHandler}>
                <LogoutIcon />
            </IconButton>
            <Avatar src={user.photoURL} alt={user.displayName} sx={{ bgcolor: '#3990d5', ml: 1 }} variant="rounded" />
        </Box>
    );
}