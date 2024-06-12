import * as React from 'react';
import {useEffect, useState} from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Grid from "@mui/material/Grid";
import {CardActions, Icon, Link, Paper} from "@mui/material";
import IGroup from "../models/group";
import {getAllGroupsForUser} from "../store/api/actions/GroupActions";
import {toast} from "react-toastify";
import {green} from "@mui/material/colors";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Button from "@mui/material/Button";
import CreateGroupModal from "../modals/CreateGroupModal";
import JoinGroupModal from "../modals/JoinGroupModal";
import GroupMainForm from "./GroupMainForm";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export const MyGroupsForm = () => {
    const [modalAddingIsOpen, setModalAddingIsOpen] = useState(false);
    const [modalJoiningIsOpen, setModalJoiningIsOpen] = useState(false);
    const [groups, setGroups] = useState<IGroup[]>([])
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
    const handleOpenAdding = () => {
        setModalAddingIsOpen(true);
    };

    const handleOpenJoining = () => {
        setModalJoiningIsOpen(true);
    }

    const handleClose = () => {
        setModalAddingIsOpen(false);
        setModalJoiningIsOpen(false);
        setAnchorEl(null);
    };

    useEffect(() => {
        getAllGroupsForUser().then((response) => {
            setGroups(response);
        }).catch((error) => {
            toast.error("Error getting groups");
        })
    }, []);

    // const handleCardClick = (id: number) => {
    //     setSelectedGroupId(id);
    // };

    const handleMenuClick = (event:any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={handleMenuClick}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleOpenAdding}>Create Own Group</MenuItem>
                        <MenuItem onClick={handleOpenJoining}>Enter Group</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Option 3</MenuItem>
                    </Menu>
                    <CreateGroupModal open={modalAddingIsOpen} handleClose={handleClose} />
                    <JoinGroupModal open={modalJoiningIsOpen} handleClose={handleClose} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        My Groups
                    </Typography>

                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Icon sx={{ color: green[500], fontSize:50}}>+</Icon>
                </Toolbar>
            </AppBar>
            <Box>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {groups.map((group) => (

                    <Grid item key={group.id} xs={12} sm={6}>
                    <Card sx={{ maxWidth: 345 }}>
                        <Link href={`/group/${group.id}`} style={{ textDecoration: 'none' }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="https://source.unsplash.com/random/400x300?group"
                                alt="group image"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {group.name}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        </Link>
                    </Card>
                    </Grid>

                ))}
                </Grid>
            </Box>
        </Box>


    );
};
