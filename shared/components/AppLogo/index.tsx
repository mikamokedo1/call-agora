import React, {useContext} from 'react';
import {Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import AppContext from '../../../@gotrust/utility/AppContext';
import {ThemeMode} from '../../constants/AppEnums';
import Hidden from '@material-ui/core/Hidden';
import AppContextPropsType from '../../../types/AppContextPropsType';
import Image from 'next/image';

const AppLogo = () => {
  const {themeMode} = useContext<AppContextPropsType>(AppContext);
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
        <Image
          // className={classes.logo}
          src={
            themeMode === ThemeMode.DARK
              ? '/images/logo-white.png'
              : '/images/logo.png'
          }
          alt='trust-logo'
          height="40"
          width="40"
        />
      </Hidden>
      <Hidden xsDown>
        <Image
          // className={classes.logo}
          src={
            themeMode === ThemeMode.DARK
              ? '/logo-gotrust.png'
              : '/logo-gotrust.png'
          }
          alt='trust-logo'
          height="40"
          width="40"
        />
      </Hidden>
    </Box>
  );
};

export default AppLogo;
