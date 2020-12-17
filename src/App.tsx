import React from 'react';
import {
  Box,
  CircularProgress,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
} from '@material-ui/core';
import firebase from 'firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth';

import AppBar from './AppBar';
import HideOnScroll from './HideOnScroll';
import SignIn from './SignIn';

const App = () => {
  const [ user, loading ] = useAuthState(firebase.auth());
  const authProvider = React.useMemo(() => {
    const authProvider = new firebase.auth.GoogleAuthProvider();
    authProvider.addScope('profile');
    authProvider.setCustomParameters({hd: 'cam.ac.uk', prompt: 'select_account'});
    return authProvider;
  }, []);

  const handleSignIn = () => { firebase.auth().signInWithRedirect(authProvider); };
  const handleSignOut = () => { firebase.auth().signOut(); };

  return <>
    <CssBaseline />
    <HideOnScroll>
      <AppBar showUser={!loading} user={user} onSignIn={handleSignIn} onSignOut={handleSignOut}>
        <Toolbar>
          <Typography variant="h6">Experimental app</Typography>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
    <Toolbar />
    <Container>
      <Box my={2}>
        {
          loading && <div style={{textAlign: 'center'}}><CircularProgress /></div>
        }
        {
          !loading && (!user || user.isAnonymous) && (
            <SignIn onSignIn={handleSignIn} />
          )
        }
        {
          !loading && user && !user.isAnonymous && (
            <Typography>
              {[...new Array(120)]
                .map(
                  () => `Cras mattis consectetur purus sit amet fermentum.
    Cras justo odio, dapibus ac facilisis in, egestas eget quam.
    Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
    Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                )
                .join('\n')}
            </Typography>
          )
        }
      </Box>
    </Container>
  </>;
}

export default App;
