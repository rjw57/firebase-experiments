/**
 * Avatar for Firebase user. Profile image is displayed if possible.
 */
import { ComponentProps } from 'react';
import { Avatar } from '@material-ui/core';

export interface UserAvatarProps extends ComponentProps<typeof Avatar> {
  displayName: string;
  photoURL?: string;
};

export const UserAvatar = ({ displayName, photoURL, ...otherProps }: UserAvatarProps) => (
  <Avatar src={photoURL} alt={displayName} {...otherProps} />
);

export default UserAvatar;
