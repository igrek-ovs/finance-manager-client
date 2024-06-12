import React, {useState} from 'react';
import { Box, Button, TextField, Modal, Typography } from '@mui/material';
import {createGroup} from "../store/api/actions/GroupActions";
import {addCategory} from "../store/api/actions/CategoryActions";
import category from "../models/category";

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

interface AddCategoryModalProps {
    open: boolean;
    handleClose: () => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ open, handleClose }) => {
    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');

    const handleSubmit = () => {
        // Логика отправки данных на сервер или обработка данных
        const groupId = localStorage.getItem('groupId');
        const newCategory = {name: categoryName, description: categoryDescription,groupId:groupId}
        addCategory(newCategory);
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
                    Добавить категорию
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Название"
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Описание"
                        onChange={(e) => setCategoryDescription(e.target.value)}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Добавить
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default AddCategoryModal;