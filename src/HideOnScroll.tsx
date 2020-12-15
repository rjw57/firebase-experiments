import {
  Slide,
  useScrollTrigger,
} from '@material-ui/core';

export interface HideOnScrollProps {
  children: React.ReactElement;
};

export const HideOnScroll = ({ children }: HideOnScrollProps) => {
  const trigger = useScrollTrigger();

  return <Slide appear={false} direction="down" in={!trigger}>
    { children }
  </Slide>
};

export default HideOnScroll;
