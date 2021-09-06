import React, { useEffect, useMemo } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import * as R from 'ramda';
import AppAnimate from '../../../@crema/core/AppAnimate';
import { CremaTheme } from '../../../types/AppContextPropsType';
import { fetchStatistic, fetchOrders, fetchSummary } from '../../../redux/actions/dashboard';
import { ordersSelector, statisticSelector, summarySelector } from '../../../redux/reducers/Dashboard';
import { Order } from '../../../types/models/Dashboard';
import TableList from '../container/TableList';
import ChartStistic from '../container/ChartStistic';
import 'react-datepicker/dist/react-datepicker.css';

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
    backgroundColor: '#fff',
    borderRadius: '4px',
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
    '&:last-child': {
      marginBottom: '0px',
    },
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
    backgroundColor: '#fff',
    borderRadius: '5px',
    padding: '15px',
  },
  bottomRight: {
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: '5px',
    padding: '15px',
  },
}));

const PageOne = () => {
  const dispatch = useDispatch();
  const boxRef = React.useRef<HTMLInputElement>(null);
  const orders = useSelector(ordersSelector);
  const summary = useSelector(summarySelector);
  const statistics = useSelector(statisticSelector);

  const classes = useStyles();
  const handleCopy = () => {
    navigator.clipboard.writeText(boxRef.current?.textContent ?? '');
  };

  useEffect(() => {
    if (statistics.length === 0) {
      dispatch(fetchStatistic());
    }
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchSummary());
  }, [dispatch]);

  const options2 = {
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
      },

      y: {
        stacked: true,
        grid: {
          display: false,
        },
      },
    },
    responsive: true,
    animation: false,
  };

  const DATACHARTSTACK = useMemo(() => {
    return {
      labels: ['Gói 1', 'Gói 2', 'Gói 3'],
      datasets: !orders
        ? []
        : R.pipe<
            Order[] | undefined,
            Order[],
            { [k: string]: Order[] },
            any,
            { label: string; data: Order[]; backgroundColor: string }[]
          >(
            R.defaultTo<Order[]>([]),
            R.groupBy((g) => g.period),
            R.values,
            R.addIndex(R.map)((item, index) => {
              return {
                label: index === 0 ? '3 Tháng' : index === 1 ? '6 Tháng' : '12 Tháng',
                data: R.pipe<Order[], any, any, number[]>(
                  R.groupBy((g) => g.package),
                  R.values,
                  R.map((m: Order[]) => m.length),
                )(item),
                backgroundColor: index === 0 ? '#FFB946' : index === 1 ? '#885AF8' : '#34AC6D',
              };
            }),
          )(orders),
    };
  }, [orders]);

  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
      <Box className={classes.wrap}>
        <Box className={classes.top}>
          <Box className={classes.topRight}>
            <TableList />
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
                    {summary ? `${summary.totalOrder} đơn` : '0 đơn'}
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
                    {summary
                      ? `${summary.totalAmount.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}`
                      : '0 VND'}
                  </Box>
                </Box>
              </Box>
              <Box className={classes.sumItem}>
                <Box className='left' bgcolor='rgb(136,90,248,0.2)'>
                  <img src='/assets/images/dasboard/wallet.png' alt='icon-shit' />
                </Box>
                <Box className='right'>
                  <Box color='#90A0B7' fontSize='16px'>
                    Tiền hoa hồng
                  </Box>
                  <Box fontSize='18px' fontWeight='bold' color='334D6E'>
                    {summary
                      ? `${summary.commission.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}`
                      : '0 VND'}
                  </Box>
                </Box>
              </Box>
              <Box className={classes.sumItem}>
                <Box className='left' bgcolor='rgb(255,187,70,0.2)'>
                  <img src='/assets/images/dasboard/danhan.png' alt='icon-shit' />
                </Box>
                <Box className='right'>
                  <Box color='#90A0B7' fontSize='16px'>
                    Tiền đã nhận
                  </Box>
                  <Box fontSize='18px' fontWeight='bold' color='334D6E'>
                    {summary
                      ? `${summary.paidCommission.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}`
                      : '0 VND'}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className={classes.bottom}>
          <Box className={classes.bottomRight}>
            <Box fontWeight='bold' color='#334D6E' mb='15px'>
              Biểu đồ bán theo ngày đơn/triệu
            </Box>
            <Box height='calc(100% - 28px)'>
              <ChartStistic />
            </Box>
          </Box>
          <Box className={classes.bottomLeft}>
            <Box fontWeight='bold' color='#334D6E' mb='15px'>
              Loại đơn
            </Box>
            <Box height='calc(100% - 28px)'>
              <Bar data={DATACHARTSTACK} options={options2} />
            </Box>
          </Box>
        </Box>
      </Box>
    </AppAnimate>
  );
};

export default PageOne;
