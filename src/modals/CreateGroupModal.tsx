import React, { useState } from 'react';
import { Box, Button, TextField, Modal, Typography } from '@mui/material';
import {createGroup} from "../store/api/actions/GroupActions";

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

interface CreateGroupModalProps {
    open: boolean;
    handleClose: () => void;
}

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ open, handleClose }) => {
    const [groupName, setGroupName] = useState('');
    const [groupImage, setGroupImage] = useState<File | null>(null);
    const [groupPassword, setGroupPassword] = useState('');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setGroupImage(e.target.files[0]);
        }
    };

    const handleSubmit = () => {
        // Логика отправки данных на сервер или обработка данных
        createGroup(groupName, groupPassword);
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
                    Создать группу
                </Typography>
                <form>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Название"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        type="file"
                        onChange={handleImageChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Пароль"
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
                        Создать
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleClose}
                        sx={{ mt: 2, ml: 2 }}
                    >
                        Отмена
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default CreateGroupModal;
