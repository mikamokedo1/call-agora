import React, { useContext } from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import AppContext from '../../../@crema/utility/AppContext';
import { ThemeMode } from '../../constants/AppEnums';
import AppContextPropsType from '../../../types/AppContextPropsType';

const AppLogo = () => {
  const { themeMode } = useContext<AppContextPropsType>(AppContext);
  const useStyles = makeStyles(() => ({
    logoRoot: {
      display: 'flex',
      flexDirection: 'row',
      cursor: 'pointer',
      alignItems: 'center',
    },
    logo: {
      height: 36,
      marginRight: 10,
    },
  }));
  const classes = useStyles();
  return (
    <Box className={classes.logoRoot}>
      <Hidden smUp>
        <img className={classes.logo} src='/assets/images/dasboard/logo.png' alt='crema-logo' />
      </Hidden>
      <Hidden xsDown>
        <img className={classes.logo} src='/assets/images/dasboard/logo.png' alt='crema-logo' />
      </Hidden>
    </Box>
  );
};

export default AppLogo;
