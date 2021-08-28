import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import AppAnimate from '../../../@crema/core/AppAnimate';
import { CremaTheme } from '../../../types/AppContextPropsType';
import TableDayOrder from '../container/TableDayOrder';

const useStyles = makeStyles((theme: CremaTheme) => ({
  wrap: {},
  top: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  topLeft: {
    width: 'calc(30% - 30px)',
  },
  topRight: {
    width: '70%',
  },
  link: {
    display: 'flex',
    backgroundColor: '#fff',
    alignItems: 'center',
    marginBottom: '15px',
    justifyContent: 'space-between',
  },
  url: {
    fontSize: '12px',
    width: 'calc(100% - 125px)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    padding: '0px 8px',
  },
  copyButton: {
    backgroundColor: 'rgb(52,172,109,0.2)',
    display: 'flex',
    alignItems: 'center',
    color: '#34AC6D',
    padding: '12px 8px',
    width: '125px',
    justifyContent: 'space-between',
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.8,
    },
  },
  sumItem: {
    display: 'flex',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: '5px',
    padding: '15px',
    marginBottom: '15px',
    '& .left': {
      width: '53px',
      height: '53px',
      borderRadius: '50%',
      marginRight: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  bottom: {},
  bottomLeft: {},
  bottomRight: {},
}));
const PageOne = () => {
  const boxRef = React.useRef<HTMLInputElement>(null);
  const classes = useStyles();
  const handleCopy = () => {
    navigator.clipboard.writeText(boxRef.current?.textContent ?? '');
  };
  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
      <Box className={classes.wrap}>
        <Box className={classes.top}>
          <Box className={classes.topLeft}>
            <Box className={classes.link}>
              <div className={classes.url} ref={boxRef}>
                https://www.figma.com/file/vi0MjvT1lR6rWdWyArrduZ/GoTRUST-CRM?node-id=84%3A667
              </div>

              <Box className={classes.copyButton} onClick={handleCopy}>
                <Box>Copy link CTV</Box>
                <img src='/assets/images/dasboard/copy.png' alt='icon-shit' />
              </Box>
            </Box>
            <Box>
              <Box className={classes.sumItem}>
                <Box className='left' bgcolor='rgb(52,172,109,0.2)'>
                  <img src='/assets/images/dasboard/order.svg' alt='icon-shit' />
                </Box>
                <Box className='right'>
                  <Box color='#90A0B7' fontSize='16px'>
                    Số tiền đã bán được
                  </Box>
                  <Box fontSize='18px' fontWeight='bold' color='334D6E'>
                    20.000.000 vnd
                  </Box>
                </Box>
              </Box>
              <Box className={classes.sumItem}>
                <Box className='left' bgcolor='rgb(16,156,241,0.2)'>
                  <img src='/assets/images/dasboard/money.png' alt='icon-shit' />
                </Box>
                <Box className='right'>
                  <Box color='#90A0B7' fontSize='16px'>
                    Tiền Hoa hồng
                  </Box>
                  <Box fontSize='18px' fontWeight='bold' color='334D6E'>
                    2.000.000 VND
                  </Box>
                </Box>
              </Box>
              <Box className={classes.sumItem}>
                <Box className='left' bgcolor='rgb(136,90,248,0.2)'>
                  <img src='/assets/images/dasboard/wallet.png' alt='icon-shit' />
                </Box>
                <Box className='right'>
                  <Box color='#90A0B7' fontSize='16px'>
                    Tổng số đơn
                  </Box>
                  <Box fontSize='18px' fontWeight='bold' color='334D6E'>
                    165 Đơn
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className={classes.topRight}>
            <TableDayOrder />
          </Box>
        </Box>
        <Box className={classes.bottom}>
          <Box className={classes.bottomLeft} />
          <Box className={classes.bottomRight} />
        </Box>
      </Box>
    </AppAnimate>
  );
};

export default PageOne;
