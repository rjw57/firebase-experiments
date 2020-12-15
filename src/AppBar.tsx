import * as React from 'react';

import {
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import firebase from 'firebase/app';

import UserAvatar from './UserAvatar';

export interface AppBarProps extends MuiAppBarProps {
  user: firebase.User | null;

  onSignIn?: () => void;
  onSignOut?: () => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export const AppBar = React.forwardRef(({ user, onSignIn, onSignOut, ...appBarProps }: AppBarProps, ref) => {
  const classes = useStyles(appBarProps);
  const iconButtonEl = React.useRef<null | HTMLButtonElement>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = () => { setAnchorEl(iconButtonEl.current); };
  const handleClose = () => { setAnchorEl(null); };

  return <MuiAppBar ref={ref} classes={{...appBarProps.classes, root: classes.root}} {...appBarProps}>
    <Toolbar>
      <Typography variant="h6" className={classes.title}>Hello</Typography>
      {
        user && !user.isAnonymous && <>
          <IconButton
            edge="end"
            aria-controls="account-menu-appbar"
            aria-label="account of current user"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
            ref={iconButtonEl}
          >
            <UserAvatar user={user} />
          </IconButton>
          <Menu
            id="account-menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={() => { handleClose(); onSignOut && onSignOut(); }}>
              Sign out
            </MenuItem>
          </Menu>
        </>
      }
      {
        (!user || user.isAnonymous) && <>
          <Button color="inherit" onClick={onSignIn}>
            Sign in
          </Button>
        </>
      }
    </Toolbar>
  </MuiAppBar>;
});

export default AppBar;
