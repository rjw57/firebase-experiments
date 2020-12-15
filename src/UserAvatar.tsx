/**
 * Avatar for Firebase user. Profile image is displayed if possible.
 */
import {
  Avatar, AvatarProps
} from '@material-ui/core';
import firebase from 'firebase/app';

export interface UserAvatarProps extends AvatarProps {
  user: firebase.User;
};

export const UserAvatar = ({ user, ...otherProps }: UserAvatarProps) => (
  <Avatar
    src={ user.photoURL || undefined } alt={ user.displayName || undefined }
  />
);

export default UserAvatar;
