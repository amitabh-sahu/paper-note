import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import logo from '../logo.png';
import { useStateValue } from '../context';
import { auth, provider, signInWithPopup, signInWithEmailAndPassword } from '../firebase';

export default function SignIn() {
    const [{ }, dispatch] = useStateValue();

    const signIn = () => {
        signInWithPopup(auth, provider).then((res) => {
            dispatch({
                type: 'SET_USER',
                user: res.user,
            });
        }).catch((err) => {
            alert(err.message);
        });
    };
    const signInGuest = () => {
        signInWithEmailAndPassword(auth, 'guest@papernote.com', 'guestpapernote').then((res) => {
            dispatch({
                type: 'SET_USER',
                user: res.user,
            });
        }).catch((err) => {
            alert(err.message);
        });
    };

    return (
        <Box sx={{
            fontSize: 'clamp(0.5rem, 0.5rem + 1vw, 1rem)',
            position: 'absolute',
            top: '50%', left: '50%',
            width: 'max-content',
            transform: 'translate(-50%, -50%)',
            p: '1em 2em',
            backgroundColor: '#e1e1e1',
            borderRadius: 1,
            textAlign: 'center',
            display: 'grid',
            placeItems: 'center'
        }}>
            <Box sx={{ display: 'flex', alignItems: 'end', m: '1em' }}>
                <CardMedia component="img" src={logo} alt="app logo" sx={{ width: '5em' }} />
                <Typography component="h1" sx={{ fontSize: '3em', color: '#546d79' }}>
                    Paper Note
                </Typography>
            </Box>
            <Box sx={{ width: 'fit-content', display: 'grid', gap: 1, m: 1 }}>
                <Button variant="contained" onClick={signIn}> Sign In with google </Button>
                <Button variant="contained" onClick={signInGuest}> Sign In as Guest </Button>
            </Box>
        </Box>
    );
}