import {
  ReactNode,
} from 'react';
import {
  Box,
  Paper,
  Typography,
} from '@material-ui/core';

export interface UserContainerProps {
  children?: ReactNode;
  displayName: string;
  photoURL?: string;
};

export const UserContainer = ({ displayName, photoURL, children }: UserContainerProps) => (
  <Paper>
    <Box p={2}>
      <Box mb={1} color="text.secondary">
        <Typography variant="caption">{ displayName }</Typography>
      </Box>
      <Box mx={2}>{ children }</Box>
    </Box>
  </Paper>
);

export default UserContainer;
