import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

// custom
import {UserStateContext, reducer, initUserState} from 'src/states/GlobalContext';
import TopicContainer from './components/TopicContainer';
import topics from './data/Topics';
import JWTService from 'src/services/restapi/JWT';

// todo: move to styles/
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    flexContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    '& .MuiTextField-root': {
      margin: "20px",
      width: '25ch',
    },
  },
  menuButton: {
    marginRight: "20px",
  },
  title: {
    flexGrow: 1,
  },
  queryContainer: {
    marginTop: "30px",
    marginBottom: "30px",
  }
}));

// drawer
const drawerWidth = 240;

// styled is a function to CreateStyledComponent
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  // todo: use later
  // styling
  const classes = useStyles();
  const theme = useTheme();

  // drawer handlers
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // global context setup
  const [usrState, dispatch] = React.useReducer(reducer, initUserState);

  React.useEffect(() => {
    /**
     * 1. check if JWT exists in localstorage
     * 2. if not, request to get one
     */
     JWTService.getToken();
  })
  return (
    <UserStateContext.Provider
      value={{usrState, dispatch}}
    >
    <BrowserRouter>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} color={"secondary"}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Envoy Security Workshop
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {topics.map((topic, index) => (
              <ListItem component={Link} to={topic.path} key={topic.label} onClick={handleDrawerClose}>
                <ListItemIcon>
                  {topic.getIcon()}
                </ListItemIcon>
                <ListItemText primary={topic.label} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          <Switch>
            <Route exact path={["/", "/home"]} component={TopicContainer} />
              {topics.map((topic) => {
                return (
                  <Route
                    key={topic.label}
                    path={topic.path}
                    render={topic.getComponent}
                  />
                )
              })}
          </Switch>
        </Main>
      </Box>
    </BrowserRouter>
    </UserStateContext.Provider>
  );
}
