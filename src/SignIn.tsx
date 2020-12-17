import {
  Button,
  Grid,
} from '@material-ui/core';

export interface SignInProps {
  onSignIn?: () => void
}

export const SignIn = ({ onSignIn }: SignInProps) => (
  <Grid container>
    <Grid item sm={4} />
    <Grid item xs={12} sm={4}>
      <Button fullWidth variant="contained" color="primary" size="large" onClick={onSignIn}>
        Sign in
      </Button>
    </Grid>
    <Grid item sm={4} />
  </Grid>
);

export default SignIn;
