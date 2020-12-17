import {
  ChangeEvent,
  FormEvent,
  useState,
} from 'react';
import {
  IconButton,
  TextField,
  Toolbar,
  ToolbarProps,
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import {
  Send
} from '@material-ui/icons';

export interface ChatInputProps extends ToolbarProps {
  onNewMessage?: (message: string) => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { },
    input: {
      flexGrow: 1,
    },
  }),
);

export const ChatInput = ({ onNewMessage, ...toolbarProps }: ChatInputProps) => {
  const classes = useStyles(toolbarProps);
  const [message, setMessage] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setMessage('');
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Toolbar disableGutters classes={{root: classes.root}}>
        <TextField
          classes={{root: classes.input}} autoFocus
          value={message} onChange={handleOnChange}
        />
        <IconButton
          edge="end"
          color="inherit"
          type="submit"
        >
          <Send />
        </IconButton>
      </Toolbar>
    </form>
  );
};

export default ChatInput;
