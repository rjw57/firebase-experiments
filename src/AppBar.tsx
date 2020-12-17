import {
  forwardRef,
  useRef,
  useState,
} from 'react';
import {
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
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
  user?: firebase.User | null;

  onSignOut?: () => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export const AppBar = forwardRef(({
  user, onSignOut, ...appBarProps
}: AppBarProps, ref) => {
  const classes = useStyles(appBarProps);
  const iconButtonEl = useRef<null | HTMLButtonElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = () => { setAnchorEl(iconButtonEl.current); };
  const handleClose = () => { setAnchorEl(null); };

  return <MuiAppBar ref={ref} classes={{...appBarProps.classes, root: classes.root}} {...appBarProps}>
    <Toolbar>
      <Typography variant="h6" className={classes.title}>Rubbish Chat</Typography>
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
            <UserAvatar displayName={user.displayName || ''} photoURL={user.photoURL || undefined} />
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
    </Toolbar>
  </MuiAppBar>;
});

export default AppBar;
