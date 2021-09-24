import React, { useState, useEffect } from 'react';
import Note from './note';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { db, doc, setDoc, query, orderBy, collection, onSnapshot } from '../firebase';
import { useStateValue } from '../context';

function AllNotes() {
    const [{ user }] = useStateValue();
    const [allNotes, setAllNotes] = useState([]);

    setDoc(doc(db, 'users', user.uid), ({
        name: user.displayName,
    }));

    useEffect(() => {
        const notesInAscOrder = query(collection(doc(collection(db, 'users'), user.uid), 'notes'), orderBy("timestamp", "desc"));
        const unsubscribe = onSnapshot(notesInAscOrder, (snapshots) => (
            setAllNotes(snapshots.docs.map((doc) => (
                {
                    id: doc.id,
                    data: doc.data(),
                }
            )))
        ));

        return () => {
            unsubscribe();
        }
    }, [user.uid]);

    return (
        <Box sx={{ display: 'grid', gridTemplateRows: 'auto max-content', gap: 2 }}>
            <Box sx={{ position: 'relative' }}>
                <Grid container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                    sx={{ overflowY: 'auto', position: 'absolute', top: 16, width: '100%', maxHeight: '100%', scrollBehavior: 'smooth' }}
                >
                    {allNotes.map((note) => (
                        <Grid item xs={4} sm={4} md={4} sx={{ p: 0, m: 0 }} key={note.id}>
                            <Note id={note.id} note={note.data} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Typography variant="h6" component="div" sx={{ textAlign: 'center' }}>
                {allNotes.length} Notes
            </Typography>
        </Box>
    );
}

export default AllNotes;