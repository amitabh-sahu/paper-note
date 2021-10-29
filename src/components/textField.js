import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useParams, useHistory } from "react-router-dom";
import { db, doc, addDoc, setDoc, collection, onSnapshot, serverTimestamp } from '../firebase';
import { useStateValue } from '../context';

export default function MultilineTextFields() {
    const history = useHistory();
    const { noteId } = useParams();
    const [{ user }] = useStateValue();
    const [noteTitle, setNoteTitle] = useState('');
    const [noteText, setNoteText] = useState('');

    useEffect(() => {
        if (noteId) {
            const unsubscribe = onSnapshot(doc(collection(doc(collection(db, 'users'), user.uid), 'notes'), noteId), (note) => {
                setNoteTitle(note.data().title);
                setNoteText(note.data().text);
            });

            return () => {
                unsubscribe();
            }
        }
        else {
            setNoteTitle('');
            setNoteText('');
        }
    }, [noteId, user.uid]);

    const saveNote = () => {
        const noteData = {
            title: noteTitle,
            text: noteText,
            timestamp: serverTimestamp(),
        };
        if (noteId) {
            setDoc(doc(collection(doc(collection(db, 'users'), user.uid), 'notes'), noteId), (noteData));
        }
        else {
            addDoc(collection(doc(collection(db, 'users'), user.uid), 'notes'), (noteData));
        }
        history.push('/');
    };

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { my: 1, width: '100%' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                id="title"
                label="Title"
                multiline
                value={noteTitle}
                onChange={e => setNoteTitle(e.target.value)}
            />
            <TextField
                id="text"
                label="Text"
                multiline
                rows={5}
                value={noteText}
                onChange={e => setNoteText(e.target.value)}
            />
            <Button variant="contained" onClick={saveNote} sx={{ mr: 1, my: 1 }}>Save</Button>
            <Link to='/' style={{ textDecoration: 'none' }}>
                <Button variant="outlined" sx={{ ml: 1, my: 1 }}>Home</Button>
            </Link>
        </Box>
    );
}