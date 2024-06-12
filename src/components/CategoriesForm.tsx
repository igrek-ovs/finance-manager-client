import React, { useState, useEffect } from 'react';
import ICategory from "../models/category";
import { getCategories } from "../store/api/actions/CategoryActions";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddCategoryModal from "../modals/AddCategoryModal";
import {deleteCategory} from "../store/api/actions/CategoryActions";

// Mock function to simulate deleting a category


export const CategoriesForm = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [modalAddingCategories, setModalAddingCategories] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getCategories();
            setCategories(response);
        };
        fetchData();
    }, []);

    const handleOpeningModal = () => {
        setModalAddingCategories(true);
    };

    const handleClosingModal = () => {
        setModalAddingCategories(false);
    };

    return (
        <Container>
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={3} mb={2}>
                <Typography variant="h4">Manage Your Categories!</Typography>
                <Button variant="contained" color="primary" onClick={handleOpeningModal}>Add Category</Button>
                <AddCategoryModal open={modalAddingCategories} handleClose={handleClosingModal} />
            </Box>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Category Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categories.map((category) => (
                        <TableRow key={category.id}>
                            <TableCell>{category.name}</TableCell>
                            <TableCell>{category.description}</TableCell>
                            <TableCell align="right">
                                <IconButton color="secondary" onClick={() => deleteCategory(category.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
};

export default CategoriesForm;
