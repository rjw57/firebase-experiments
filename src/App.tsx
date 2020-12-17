import React from 'react';
import {
  Box,
  CircularProgress,
  Container,
  CssBaseline,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import firebase from 'firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth';

import AppBar from './AppBar';
import BottomBox from './BottomBox';
import ChatInput from './ChatInput';
import HideOnScroll from './HideOnScroll';
import SignIn from './SignIn';

const App = () => {
  const [ user, loading ] = useAuthState(firebase.auth());
  const handleSignOut = () => { firebase.auth().signOut(); };

  return <>
    <CssBaseline />
    <HideOnScroll>
      <AppBar user={user} onSignOut={handleSignOut}>
        <Toolbar>
          <Typography variant="h6">Experimental app</Typography>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
    <Toolbar />
    {
      loading && (
        <Box textAlign="center" my={4}>
          <CircularProgress />
        </Box>
      )
    }
    {
      !loading && (!user || user.isAnonymous) && (
        <Container>
          <Box my={2}><SignIn /></Box>
        </Container>
      )
    }
    {
      !loading && user && !user.isAnonymous && (
        <>
          <Container>
            <Box my={2}>
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
          <Toolbar />
          <BottomBox>
            <Paper>
              <Container>
                <ChatInput />
              </Container>
            </Paper>
          </BottomBox>
        </>
      )
    }
  </>;
}

export default App;
