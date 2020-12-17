import {
  Box,
  BoxProps,
} from '@material-ui/core';

export interface BottomBoxProps extends BoxProps { };

export const BottomBox = ({ children, ...boxProps }: BottomBoxProps) => {
  return (
    <Box position="fixed" bottom={0} left={0} right={0} {...boxProps}>
      { children }
    </Box>
  );
};

export default BottomBox;
