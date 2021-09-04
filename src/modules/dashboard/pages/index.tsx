import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import AppAnimate from '../../../@crema/core/AppAnimate';
import { CremaTheme } from '../../../types/AppContextPropsType';
import TableDayOrder from '../container/TableDayOrder';
import { fetchStatistic, fetchOrders } from '../../../redux/actions/dashboard';

const useStyles = makeStyles((theme: CremaTheme) => ({
  wrap: {
    height: '100%',
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
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
      flexShrink: 0,
    },
  },
  sumItemHaft: {
    display: 'flex',
    backgroundColor: '#fff',
    borderRadius: '5px',
    padding: '15px',
    marginBottom: '15px',
    flexDirection: 'column',
    width: 'calc((100% - 20px) / 2)',
    '& .left': {
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      marginRight: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
  },
  bottom: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  bottomLeft: {
    width: 'calc(30% - 30px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  bottomRight: {
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}));
const PageOne = () => {
  const dispatch = useDispatch();
  const boxRef = React.useRef<HTMLInputElement>(null);
  const classes = useStyles();
  const handleCopy = () => {
    navigator.clipboard.writeText(boxRef.current?.textContent ?? '');
  };

  useEffect(() => {
    dispatch(fetchStatistic());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);
  const data = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
      {
        label: 'Tổng đơn',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: '#F7685B',
      },
      {
        label: 'Tổng tiền',
        data: [2, 3, 20, 5, 1, 4],
        backgroundColor: '#109CF1',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    responsive: true,
  };
  const data2 = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
      {
        label: '3 Tháng',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: '#FFB946',
      },
      {
        label: '6 Tháng',
        data: [2, 3, 20, 5, 1, 4],
        backgroundColor: '#885AF8',
      },
      {
        label: '12 Tháng',
        data: [3, 10, 13, 15, 22, 30],
        backgroundColor: '#34AC6D',
      },
    ],
  };
  const options2 = {
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
    responsive: true,
  };

  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
      <Box className={classes.wrap}>
        <Box className={classes.top}>
          <Box className={classes.topRight}>
            <TableDayOrder />
          </Box>
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
                    Tổng số đơn
                  </Box>
                  <Box fontSize='18px' fontWeight='bold' color='334D6E'>
                    165 Đơn
                  </Box>
                </Box>
              </Box>
              <Box className={classes.sumItem}>
                <Box className='left' bgcolor='rgb(16,156,241,0.2)'>
                  <img src='/assets/images/dasboard/money.png' alt='icon-shit' />
                </Box>
                <Box className='right'>
                  <Box color='#90A0B7' fontSize='16px'>
                    Số tiền đã bán được
                  </Box>
                  <Box fontSize='18px' fontWeight='bold' color='334D6E'>
                    2.000.000 VND
                  </Box>
                </Box>
              </Box>
              <Box display='flex' justifyContent='space-between'>
                <Box className={classes.sumItemHaft}>
                  <Box color='#90A0B7' fontSize='15px' mb='5px'>
                    Tiền hoa hồng
                  </Box>
                  <Box display='flex' alignItems='center'>
                    <Box className='left' bgcolor='rgb(136,90,248,0.2)'>
                      <img src='/assets/images/dasboard/wallet.png' alt='icon-shit' style={{ width: '15px' }} />
                    </Box>
                    <Box className='right'>
                      <Box fontSize='14px' fontWeight='bold' color='334D6E'>
                        20.000.000 VND
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box className={classes.sumItemHaft}>
                  <Box color='#90A0B7' fontSize='15px' mb='5px'>
                    Tiền đã nhận
                  </Box>
                  <Box display='flex' alignItems='center'>
                    <Box className='left' bgcolor='rgb(255,187,70,0.2)'>
                      <img src='/assets/images/dasboard/danhan.png' alt='icon-shit' style={{ width: '15px' }} />
                    </Box>
                    <Box className='right'>
                      <Box fontSize='14px' fontWeight='bold' color='334D6E'>
                        20.000.000 VND
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className={classes.bottom}>
          <Box className={classes.bottomRight}>
            <Box fontWeight='bold' color='#334D6E' mb='15px'>
              Biểu đồ bán theo ngày
            </Box>
            <Bar data={data} options={options} />
          </Box>
          <Box className={classes.bottomLeft}>
            <Box fontWeight='bold' color='#334D6E' mb='15px'>
              Loại đơn
            </Box>
            <Bar data={data2} options={options2} />
          </Box>
        </Box>
      </Box>
    </AppAnimate>
  );
};

export default PageOne;
