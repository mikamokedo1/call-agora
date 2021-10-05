import React from 'react';
import { Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

interface StyleProps {
  size: 'small' | 'big';
}
const useStyles = makeStyles<Theme, StyleProps>(() => ({
  avatar: {
    width: ({ size }) => (size === 'big' ? '55px' : '40px'),
    height: ({ size }) => (size === 'big' ? '55px' : '40px'),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '10px',
  },
  avatarImage: {
    borderRadius: '50%',
  },
}));
interface AvatarProps {
  size: 'small' | 'big';
  url: string;
}
const Avatar = ({ size, url }: AvatarProps) => {
  const props = {
    size,
  };
  const classes = useStyles(props);
  return (
    <Box className={classes.avatar}>
      <img className={classes.avatarImage} alt="avatar" src={url} />
    </Box>
  );
};

export default Avatar;
