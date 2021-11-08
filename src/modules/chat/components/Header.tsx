import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import VideocamIcon from '@material-ui/icons/Videocam';
import PhoneIcon from '@material-ui/icons/Phone';
import Avatar from './Avatar';
import getInitialsFromName from '../../../@crema/utility/getName';

const useStyles = makeStyles(() => ({
  wrap: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    borderBottom: '1px solid gray',
    boxShadow: ' 0px 1px 1px 0px rgba(0,0,0,0.3)',
    position: 'relative',
    zIndex: 1,
  },
}));

interface HeaderProps {
  onVideoCall: () => void;
  disabled: boolean;
}

const Header = ({ onVideoCall, disabled }: HeaderProps) => {
  const classes = useStyles();
  return (
    <Box className={classes.wrap}>
      <Box display="flex" alignItems="center">
        <Avatar size="small" url={getInitialsFromName('test') ?? ''} />
        <Box>
          <Box fontWeight={600}>Tam</Box>
          <Box>Active Now</Box>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" style={{ pointerEvents: disabled ? 'none' : 'auto' }}>
        <Box display="flex" alignItems="center" justifyContent="center" onClick={onVideoCall}>
          <VideocamIcon />
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
