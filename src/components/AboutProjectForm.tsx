import React from 'react';
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    Grid, List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Toolbar,
    Typography
} from '@mui/material';
import { LockOutlined as LockOutlinedIcon, PersonAdd as PersonAddIcon, Person as PersonIcon } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const theme = createTheme();

function AboutProjectForm() {
    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Glophus
                    </Typography>
                    <Button color="inherit" startIcon={<PersonAddIcon />} component={Link}
                            to="/register">SignUp</Button>
                    <Button color="inherit" startIcon={<PersonIcon />} component={Link}
                            to="/login">SignIn</Button>
                </Toolbar>
            </AppBar>
            <Container sx={{ marginTop: 8, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Начинай управлять финансами вместе со своими близкими
                </Typography>
                <Box sx={{ marginBottom: 4 }}>
                    <Typography variant="h5" gutterBottom>
                        Чем мое приложение может быть полезным:
                    </Typography>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>

                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>

                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Work" secondary="Jan 7, 2014" />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>

                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Vacation" secondary="July 20, 2014" />
                        </ListItem>
                    </List>
                </Box>
                <Box sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', padding: 4 }}>
                    <Typography variant="h5" gutterBottom>
                        About Us
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Мы команда, посвятившая себя революции в управлении финансами семьи.
                    </Typography>
                </Box>
                <Button variant="contained" color="primary" size="large" sx={{ marginTop: 4 }} component={Link}
                        to="/register">
                    Get Started
                </Button>
            </Container>
        </ThemeProvider>
    );
}

export default AboutProjectForm;
