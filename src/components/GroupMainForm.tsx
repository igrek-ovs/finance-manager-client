import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {useNavigate, useParams} from 'react-router-dom';
import { getIsAdmin, getMembers } from '../store/api/actions/MemberActions';
import { getGroupName } from "../store/api/actions/GroupActions";
import { getUserStatistic } from "../store/api/actions/StatisticActions";
import IGroupMember from "../models/groupMembers";
import IUserStatistic from "../models/userStatistic";
import {AppBar, Button, CardActionArea, Table, TableBody, TableCell, TableRow, Toolbar, Tooltip} from '@mui/material';
import { useState } from "react";
import UserExpensesModal from '../modals/UserExpensesModal';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";  // Импортируйте модальное окно
import AdbIcon from '@mui/icons-material/Adb';

const pages = ['All Groups', 'Group Statistic', 'Categories', 'Members']; // Определите переменные pages
const settings = ['Profile', 'Logout'];

function stringToColor(string: string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
}

// Функция для создания аватара на основе имени и фамилии
function fullNameAvatar(firstName: string, lastName: string) {
    const fullName = `${firstName} ${lastName}`;
    return {
        sx: {
            bgcolor: stringToColor(fullName),
        },
        children: `${firstName[0]}${lastName[0]}`,
    };
}

const GroupMainForm: React.FC = () => {
    const { id } = useParams<{ id: string | undefined }>();
    const groupId = id ? parseInt(id, 10) : undefined;
    const [isAdmin, setIsAdmin] = React.useState(false);
    const [groupName, setGroupName] = React.useState('');
    const [groupMembers, setGroupMembers] = React.useState<IGroupMember[]>([]);
    const [userStatistics, setUserStatistics] = React.useState<IUserStatistic[]>([]);
    const [modalUserExpenses, setModalUserExpenses] = useState<boolean>(false);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const navigate = useNavigate();

    const handleOpeningModal = (userId: number) => {
        setSelectedUserId(userId);
        setModalUserExpenses(true);
    };

    const handleClosingModal = () => {
        setModalUserExpenses(false);
        setSelectedUserId(null);
    };

    React.useEffect(() => {
        const fetchData = async () => {
            if (groupId != null) {
                const response = await getIsAdmin(groupId);
                setIsAdmin(response);

                const gName = await getGroupName(groupId);
                setGroupName(gName);

                const members = await getMembers(groupId);
                setGroupMembers(members);

                const userStatistics = await getUserStatistic(groupId);
                setUserStatistics(userStatistics);

                localStorage.setItem('groupId', groupId.toString());
            }
        };

        fetchData();
    }, [groupId]);

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleMenuClick = (page: string) => {
        handleCloseNavMenu();
        switch (page) {
            case 'All Groups':
                navigate('/mygroups');
                break;
            case 'Group Statistic':
                navigate('/group-statistic');
                break;
            case 'Categories':
                navigate('/categories');
                break;
            case 'Members':
                navigate('/members');
                break;
            default:
                break;
        }
    };

    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            {groupName}
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={() => handleMenuClick(page)}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            {groupName}
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Grid container spacing={3} mt={0.2}>
                {userStatistics.map((stat) => (
                    <Grid item xs={12} sm={6} md={4} lg={3.5} key={stat.userId}>
                        <Card>
                            <CardActionArea onClick={() => handleOpeningModal(stat.userId)}>
                                <CardContent>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item mb={1}>
                                            <Avatar {...fullNameAvatar(stat.firstName, stat.lastName)} />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h6" >{`${stat.firstName} ${stat.lastName}`}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Table >
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>Last Month Expenses</TableCell>
                                                <TableCell>${stat.lastMonthExpenses}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Last Week Expenses</TableCell>
                                                <TableCell>${stat.lastWeekExpenses}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Average Day Expenses</TableCell>
                                                <TableCell>${stat.avgDayExpenses.toFixed(2)}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Total Expenses</TableCell>
                                                <TableCell>${stat.totalExpenses}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Top Category</TableCell>
                                                <TableCell>{stat.mostPopularCategory}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {selectedUserId && (
                <UserExpensesModal
                    open={modalUserExpenses}
                    handleClose={handleClosingModal}
                    userId={selectedUserId}
                />
            )}
        </>
    );
};

export default GroupMainForm;
