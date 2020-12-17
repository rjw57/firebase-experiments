export interface MessageProps {
  message: string;
};

export const Message = ({ message }: MessageProps) => {
  return <div>{message}</div>;
};

export default Message;
