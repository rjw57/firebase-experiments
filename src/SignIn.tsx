import { useMemo } from 'react';
import {
  Button,
  Grid,
} from '@material-ui/core';

import firebase from 'firebase/app';
import 'firebase/auth';

export const SignIn = () => {
  const ravenAuthProvider = useMemo(() => {
    const authProvider = new firebase.auth.GoogleAuthProvider();
    authProvider.addScope('profile');
    authProvider.setCustomParameters({hd: 'cam.ac.uk', prompt: 'select_account'});
    return authProvider;
  }, []);

  const googleAuthProvider = useMemo(() => {
    const authProvider = new firebase.auth.GoogleAuthProvider();
    authProvider.addScope('profile');
    return authProvider;
  }, []);

  const handleRavenSignIn = () => { firebase.auth().signInWithRedirect(ravenAuthProvider); };
  const handleGoogleSignIn = () => { firebase.auth().signInWithRedirect(googleAuthProvider); };

  return (
    <>
      <Grid container spacing={2} justify="center">
        <Grid item xs={12} sm={4}>
          <Button
            fullWidth variant="contained" color="primary" size="large"
            onClick={handleRavenSignIn}
          >
            Sign in with Raven
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} justify="center">
        <Grid item xs={12} sm={4}>
          <Button
            fullWidth variant="contained" size="large" onClick={handleGoogleSignIn}
          >
            Sign in with Google
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default SignIn;
