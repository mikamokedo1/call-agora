import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import VideocamIcon from '@material-ui/icons/Videocam';
import PhoneIcon from '@material-ui/icons/Phone';
import Avatar from './Avatar';

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

const Header = () => {
  const classes = useStyles();
  return (
    <Box className={classes.wrap}>
      <Box display="flex" alignItems="center">
        <Avatar
          size="small"
          url="https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.6435-1/p100x100/152721571_909248686503731_2445109993268764589_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=7206a8&_nc_ohc=a-GCz6Y0caMAX_yLDxF&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fsgn5-6.fna&oh=fdaae27dc810f9ef99a22d62e0d7d651&oe=61834A9F"
        />
        <Box>
          <Box fontWeight={600}>Tam</Box>
          <Box>Active Now</Box>
        </Box>
      </Box>
      <Box display="flex" alignItems="center">
        <Box mr={2} display="flex" alignItems="center" justifyContent="center">
          <PhoneIcon />
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center">
          <VideocamIcon />
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
