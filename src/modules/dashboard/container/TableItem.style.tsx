import { makeStyles } from '@material-ui/core';
import { CremaTheme } from '../../../types/AppContextPropsType';

const useStyles = makeStyles((theme: CremaTheme) => ({
  tableCell: {
    fontSize: 13,
    padding: 8,
    '&:first-child': {
      paddingLeft: 20,
      '@media screen and (max-width: 750px)': {
        paddingLeft: 10,
      },
    },
    '&:last-child': {
      paddingRight: 20,
      '@media screen and (max-width: 750px)': {
        paddingRight: 10,
      },
    },
  },
  whiteSpace: {
    whiteSpace: 'nowrap',
  },
  anchar: {
    color: theme.palette.primary.main,
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    display: 'inline-block',
  },
  badgeRoot: {
    padding: '3px 10px',
    borderRadius: 4,
    display: 'inline-block',
  },
  red: {
    color: '#F7685B',
  },
  green: {
    color: '#34AC6D',
  },
}));
export default useStyles;
