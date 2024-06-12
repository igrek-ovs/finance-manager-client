import React, { useState } from 'react';
import { Box, Button, TextField, Modal, Typography } from '@mui/material';
import {createGroup, joinGroup} from "../store/api/actions/GroupActions";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

interface JoinGroupModalProps {
    open: boolean;
    handleClose: () => void;
}

const JoinGroupModal: React.FC<JoinGroupModalProps> = ({ open, handleClose }) => {
    const [groupName, setGroupName] = useState('');
    const [groupPassword, setGroupPassword] = useState('');

    const handleSubmit = () => {
        // Логика отправки данных на сервер или обработка данных
        joinGroup(groupName, groupPassword);
        handleClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Join a Group
                </Typography>
                <form>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Name"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Password"
                        type="password"
                        value={groupPassword}
                        onChange={(e) => setGroupPassword(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        sx={{ mt: 2 }}
                    >
                        Join
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleClose}
                        sx={{ mt: 2, ml: 2 }}
                    >
                        Exit
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default JoinGroupModal;


