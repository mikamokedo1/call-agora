import React from 'react';
import AppCard from '../../../@gotrust/core/AppCard';
import { Box, makeStyles, Typography, Divider } from '@material-ui/core';
import { Fonts } from '../../../shared/constants/AppEnums';
import { DrState } from '../../../types/models/dashboards/HealthCare';

const useStyles = makeStyles(theme => ({
  drTime: {
    fontWeight: Fonts.BOLD,
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
    '@media screen and (max-width: 1600px) and (min-width: 1280px)': {
      display: 'none',
    },
  },
  drCardContent: {
    width: 'calc(100% - 50px)',
    display: 'flex',
    alignItems: 'center',
  },
  textTruncate: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
  },
  divider: {
    height: '2px',
    backgroundColor: 'white',
    marginTop: '4px'
  }
}));

interface DrCardProps {
  data: DrState;
}

const DrCard: React.FC<DrCardProps> = ({ data }) => {
  const { bgColor, title, name } = data;
  const classes = useStyles();
  return (
    <AppCard
      height={1}
      style={{ backgroundColor: bgColor }}
      className='card-hover'>
      <Box display='flex' flexDirection='column' alignItems='center' textAlign='center' >
        <Box className={classes.drCardContent}>
          <Box flex={1} color='white' overflow='hidden' mr={2}>
            <Typography
              className={classes.textTruncate}
              component='h5'
              variant='inherit'
              color='inherit'>
              {title}
            </Typography>
            <Divider className={classes.divider} />
            <Box className={classes.textTruncate} component='p' pt={1.5}>
              {name}
            </Box>
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default DrCard;
