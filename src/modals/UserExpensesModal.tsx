import React, { useEffect, useState } from "react";
import {
    Modal, Box, Typography, TextField, MenuItem,
    IconButton, Table, TableBody, TableCell, TableHead, TableRow
} from "@mui/material";
import {
    addExpense,
    getExpenses, getFilteredExpenses,
    removeExpense, updateAmountOfExpense,
    updateCategoryOfExpense,
} from "../store/api/actions/ExpenseActions";
import { getUserInfo } from "../store/api/actions/UserActions";
import { getCategories } from "../store/api/actions/CategoryActions";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IUserInfo from "../models/userInfo";
import IExpense from "../models/expense";
import ICategory from "../models/category";
import Button from "@mui/material/Button";
import ExpandIcon from '@mui/icons-material/Expand';
import IExpenseFilter from "../models/expenseFilter";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    maxHeight: '100vh',
    overflow: 'auto'
};

interface UserExpensesModalProps {
    open: boolean;
    handleClose: () => void;
    userId: number;
}

const UserExpensesModal: React.FC<UserExpensesModalProps> = ({ open, handleClose, userId }) => {
    const [expenses, setExpenses] = useState<IExpense[]>([]);
    const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [newExpense, setNewExpense] = useState<{ amount: number; description: string; categoryId: number, userId: number, groupId: number, createdAt: Date }>({
        amount: 0,
        description: '',
        categoryId: 0,
        userId: userId,
        groupId: localStorage.getItem('groupId') ? parseInt(localStorage.getItem('groupId') as string, 10) : 0,
        createdAt: new Date()
    });
    const [editableRow, setEditableRow] = useState<number | null>(null);
    const [editedExpense, setEditedExpense] = useState<IExpense | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [filter, setFilter] = useState<IExpenseFilter>({});

    const handleSort = async (key: keyof IExpenseFilter) => {
        let direction = filter[key] === 'asc' ? 'desc' : 'asc';
        const newFilter = { ...filter, [key]: direction };
        if (key === 'amount') {
            newFilter.date = undefined;
        } else if (key === 'date') {
            newFilter.amount = undefined;
        }
        setFilter(newFilter);

        const sortedExpenses = await getFilteredExpenses(userId, newFilter);
        setExpenses(sortedExpenses);
    };

    useEffect(() => {
        const fetchData = async () => {
            if (userId) {
                const fetchedExpenses = await getFilteredExpenses(userId, filter);
                setExpenses(fetchedExpenses);

                const fetchedUserInfo = await getUserInfo(userId);
                setUserInfo(fetchedUserInfo);

                const fetchedCategories = await getCategories();
                setCategories(fetchedCategories);
                if (fetchedCategories.length > 0) {
                    setNewExpense(prevState => ({
                        ...prevState,
                        categoryId: fetchedCategories[0].id,
                    }));
                }
            }
        };
        fetchData();
    }, [userId, filter]);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewExpense(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewExpense(prevState => ({
            ...prevState,
            categoryId: parseInt(event.target.value, 10),
        }));
    };

    const handleAddExpense = async () => {
        await addExpense(newExpense);
        const updatedExpenses = await getExpenses(userId);
        setExpenses(updatedExpenses);
    };

    const handleEditExpense = (expense: IExpense) => {
        setEditableRow(expense.id);
        setEditedExpense({ ...expense });
    };

    const handleSaveExpense = async () => {
        if (editedExpense) {
            await updateCategoryOfExpense(editedExpense.id, editedExpense.categoryId);
            await updateAmountOfExpense(editedExpense.id, editedExpense.amount);
            // await updateExpense(editedExpense);
            const updatedExpenses = await getExpenses(userId);
            setExpenses(updatedExpenses);
            setEditableRow(null);
            setEditedExpense(null);
        }
    };

    const handleCancelEdit = () => {
        setEditableRow(null);
        setEditedExpense(null);
    };

    const handleEditedInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setEditedExpense(prevState => ({
            ...prevState,
            [name]: value,
        } as IExpense));
    };

    const handleEditedCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedExpense(prevState => ({
            ...prevState,
            categoryId: parseInt(event.target.value, 10),
        } as IExpense));
    };

    const handleBlur = () => {
        handleSaveExpense();
    };

    const formatDate = (date: Date | string) => {
        console.log(date);
        const parsedDate = typeof date === 'string' ? new Date(date) : date;
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric'
        };
        return new Intl.DateTimeFormat('ru-RU', options).format(parsedDate);
    };

    const handleDeleteExpense = async (expenseId: number) => {
        await removeExpense(expenseId);
        const updatedExpenses = await getExpenses(userId);
        setExpenses(updatedExpenses);
    };

    const handleCategoryFilterChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const categoryId = parseInt(event.target.value, 10);
        const newFilter = { ...filter, categoryId };
        setFilter(newFilter);

        const filteredExpenses = await getFilteredExpenses(userId, newFilter);
        setExpenses(filteredExpenses);
    };


    if (isExpanded) {
        return (
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...style, width: '90%', height: '90%', overflow: 'auto' }}>
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="h6" component="h2">
                            Расходы
                        </Typography>
                        <IconButton onClick={toggleExpand} size="small">
                            <ExpandIcon fontSize="small" />
                        </IconButton>
                    </Box>
                    <Box sx={{ maxHeight: '100%', overflowY: 'auto' }}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell onClick={() => handleSort('date')} style={{ cursor: 'pointer' }}>
                                        Date {filter.date === 'asc' ? '↑' : '↓'}
                                    </TableCell>
                                    <TableCell onClick={() => handleSort('amount')} style={{ cursor: 'pointer' }}>
                                        Amount {filter.amount === 'asc' ? '↑' : '↓'}
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            select
                                            label="Category"
                                            value={filter.categoryId || ''}
                                            onChange={handleCategoryFilterChange}
                                            size="small"
                                            margin="normal"
                                        >
                                            {categories.map(category => (
                                                <MenuItem key={category.id} value={category.id}>
                                                    {category.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {expenses.map(expense => (
                                    <TableRow key={expense.id}>
                                        <TableCell>{formatDate(expense.createdAt)}</TableCell>
                                        <TableCell>
                                            {editableRow === expense.id ? (
                                                <TextField
                                                    name="amount"
                                                    value={editedExpense?.amount}
                                                    onChange={handleEditedInputChange}
                                                    onBlur={handleBlur}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            handleSaveExpense();
                                                        }
                                                    }}
                                                    size="small"
                                                />
                                            ) : (
                                                expense.amount
                                            )}
                                        </TableCell>
                                        <TableCell title={expense.categoryName}>
                                            {editableRow === expense.id ? (
                                                <TextField
                                                    select
                                                    name="categoryId"
                                                    value={editedExpense?.categoryId}
                                                    onChange={handleEditedCategoryChange}
                                                    onBlur={handleBlur}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            handleSaveExpense();
                                                        }
                                                    }}
                                                    size="small"
                                                >
                                                    {categories.map(category => (
                                                        <MenuItem key={category.id} value={category.id}>
                                                            {category.name}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            ) : (
                                                expense.categoryName
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {editableRow === expense.id ? (
                                                <>
                                                    <IconButton onClick={handleSaveExpense} size="small">
                                                        <EditIcon fontSize="small" />
                                                    </IconButton>
                                                    <IconButton onClick={handleCancelEdit} size="small">
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </>
                                            ) : (
                                                <>
                                                    <IconButton onClick={() => handleEditExpense(expense)} size="small">
                                                        <EditIcon fontSize="small" />
                                                    </IconButton>
                                                    <IconButton onClick={() => handleDeleteExpense(expense.id)} size="small">
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </Box>
            </Modal>
        );
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {userInfo && (
                    <>
                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="h6" component="h2">
                                {`${userInfo.firstName} ${userInfo.lastName}`}
                            </Typography>
                            <Box>
                                {/* Вот здесь вы можете разместить иконку */}
                                <IconButton onClick={toggleExpand} size="small">
                                    <ExpandIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        </Box>

                    </>
                )}
                <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>


                    <Table size="small">

                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {expenses.map(expense => (
                                <TableRow key={expense.id}>
                                    <TableCell>{formatDate(expense.createdAt)}</TableCell>
                                    <TableCell>
                                        {editableRow === expense.id ? (
                                            <TextField
                                                name="amount"
                                                value={editedExpense?.amount}
                                                onChange={handleEditedInputChange}
                                                onBlur={handleBlur}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        handleSaveExpense();
                                                    }
                                                }}
                                                size="small"
                                            />
                                        ) : (
                                            expense.amount
                                        )}
                                    </TableCell>
                                    <TableCell title={expense.categoryName}>
                                        {editableRow === expense.id ? (
                                            <TextField
                                                select
                                                name="categoryId"
                                                value={editedExpense?.categoryId}
                                                onChange={handleEditedCategoryChange}
                                                onBlur={handleBlur}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        handleSaveExpense();
                                                    }
                                                }}
                                                size="small"
                                            >
                                                {categories.map(category => (
                                                    <MenuItem key={category.id} value={category.id}>
                                                        {category.name}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        ) : (
                                            expense.categoryName
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editableRow === expense.id ? (
                                            <>
                                                <IconButton onClick={handleSaveExpense} size="small">
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton onClick={handleCancelEdit} size="small">
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </>
                                        ) : (
                                            <>
                                                <IconButton onClick={() => handleEditExpense(expense)} size="small">
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton onClick={() => handleDeleteExpense(expense.id)} size="small">
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
                <Box mt={2}>
                    <Typography variant="h6" component="h2">
                        Добавить новый расход
                    </Typography>
                    <Box display="flex" gap={1} alignItems="center">
                        <TextField
                            label="Сумма"
                            name="amount"
                            type="number"
                            value={newExpense.amount}
                            onChange={handleInputChange}
                            size="small"
                            margin="normal"
                        />
                        <TextField
                            select
                            label="Категория"
                            name="categoryId"
                            value={newExpense.categoryId}
                            onChange={handleCategoryChange}
                            size="small"
                            margin="normal"
                        >
                            {categories.map(category => (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                    <TextField
                        fullWidth
                        label="Описание"
                        name="description"
                        value={newExpense.description}
                        onChange={handleInputChange}
                        size="small"
                        margin="normal"
                    />
                    <Box mt={2}>
                        <Button onClick={handleAddExpense}>Добавить расход</Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default UserExpensesModal;
