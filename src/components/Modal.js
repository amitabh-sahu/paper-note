import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Modal({ visible, handleClose, handleOK }) {
    return (
        <Box sx={{
            display: `${visible ? 'block' : 'none'}`,
            position: 'fixed',
            width: '100vw',
            height: '100vh',
            top: 0,
            left: 0,
            zIndex: 1,
            backgroundColor: '#000000ad',
        }}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                p: 3,
                zIndex: 1,
                borderRadius: 1,
                backgroundColor: '#fdfdfd',
                width: 'fit-content',
                display: 'grid',
                gap: 1
            }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    CONFIRMATION
                </Typography>
                <Typography id="modal-modal-text">
                    Are you sure you want to delete this note?
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="outlined" onClick={handleOK} sx={{ mx: 1 }}>OK</Button>
                    <Button variant="outlined" onClick={handleClose}>Close</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default Modal;