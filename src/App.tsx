import React from 'react';
import {
  Box,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
} from '@material-ui/core';
import firebase from 'firebase/app';

import AppBar from './AppBar';
import FirebaseContext from './FirebaseContext';
import HideOnScroll from './HideOnScroll';

const App = () => {
  const { authProvider, user } = React.useContext(FirebaseContext);
  const handleSignIn = () => { firebase.auth().signInWithRedirect(authProvider); };
  const handleSignOut = () => { firebase.auth().signOut(); };

  return <>
    <CssBaseline />
    <HideOnScroll>
      <AppBar user={user} onSignIn={handleSignIn} onSignOut={handleSignOut}>
        <Toolbar>
          <Typography variant="h6">Experimental app</Typography>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
    <Toolbar />
    <Container>
      <Box my={2}>
        <Typography>Hello</Typography>
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
      </Box>
    </Container>
  </>;
}

export default App;
