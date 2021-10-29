import React from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { db, doc, deleteDoc, collection } from '../firebase';
import { useStateValue } from '../context';
import { Link } from "react-router-dom";

function Note({ id, note }) {
    const [{ user }] = useStateValue();
    const deleteNote = () => {
        const confirmation = window.confirm('Are you sure you want to delete this note?');
        if (confirmation) {
            deleteDoc(doc(collection(doc(collection(db, 'users'), user.uid), 'notes'), id));
        }
    };

    return (
        <Card sx={{ minWidth: 250, backgroundColor: '#42a5f5' }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {note.title}
                </Typography>
                <Typography variant="body1">
                    {note.text}
                </Typography>
            </CardContent>
            <CardActions>
                <Typography color="text.secondary" variant="body2" sx={{flex: 1}}>
                    {new Date(note.timestamp?.toDate()).toLocaleString()}
                </Typography>
                <Box>
                    <Link to={`/edit/${id}`} style={{ textDecoration: 'none' }}>
                        <IconButton aria-label="edit">
                            <EditIcon />
                        </IconButton>
                    </Link>
                    <IconButton onClick={deleteNote} aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </CardActions>
        </Card>
    );
}

export default Note;