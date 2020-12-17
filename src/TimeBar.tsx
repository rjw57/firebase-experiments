import {
  Box,
  Divider,
  Typography,
} from '@material-ui/core';
import TimeAgo from 'react-timeago';

export interface TimeBarProps {
  date: Date;
};

export const TimeBar = ({ date }: TimeBarProps) => (
  <Box display="flex" alignItems="center">
    <Box flexGrow={1}><Divider variant="fullWidth" /></Box>
    <Box color="text.secondary" px={1}>
      <Typography variant="caption">
        <TimeAgo date={date} />
      </Typography>
    </Box>
    <Box flexGrow={1}><Divider variant="fullWidth" /></Box>
  </Box>
);

export default TimeBar;
