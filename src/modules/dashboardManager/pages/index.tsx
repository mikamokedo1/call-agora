import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import AppAnimate from '../../../@crema/core/AppAnimate';
import { CremaTheme } from '../../../types/AppContextPropsType';
import { fetchStatistic, fetchOrders, fetchSummary, fetchStatisticChart } from '../../../redux/actions/dashboard';
import { statisticSelector, summarySelector, ordersSelector } from '../../../redux/reducers/Dashboard';
import TableList from '../container/TableList';
import ChartStistic from '../container/ChartStistic';
import ChartStacked from '../container/ChartStacked';

import 'react-datepicker/dist/react-datepicker.css';

const useStyles = makeStyles((theme: CremaTheme) => ({
  wrap: {
    display: 'flex',
    justifyContent: 'space-between',
    '@media screen and (max-width: 750px)': {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  left: {
    display: 'flex',
    width: '70%',
    flexDirection: 'column',
    '@media screen and (max-width: 750px)': {
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
    },
  },
  topLeft: {
    '@media screen and (max-width: 750px)': {
      width: '100%',
      order: 1,
    },
  },
  topRight: {
    backgroundColor: '#fff',
    borderRadius: '4px',
    marginBottom: '30px',
    '@media screen and (max-width: 750px)': {
      width: '100%',
      order: 2,
    },
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
    '@media screen and (max-width: 750px)': {
      padding: '10px',
      marginBottom: '10px',
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
  right: {
    display: 'flex',
    width: 'calc(30% - 30px)',
    flexDirection: 'column',
    '@media screen and (max-width: 750px)': {
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
    },
  },
  bottomLeft: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: '5px',
    padding: '15px',
    height: '100%',
    '@media screen and (max-width: 750px)': {
      width: '100%',
      marginBottom: '20px',
    },
  },
  bottomRight: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: '5px',
    padding: '15px',
    '@media screen and (max-width: 750px)': {
      width: '100%',
      marginBottom: '20px',
    },
  },
}));

const PageOne = () => {
  const dispatch = useDispatch();
  const summary = useSelector(summarySelector);
  const statistics = useSelector(statisticSelector);
  const orders = useSelector(ordersSelector);

  const classes = useStyles();

  useEffect(() => {
    if (statistics.length === 0) {
      dispatch(fetchStatistic());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchStatisticChart());
  }, [dispatch]);

  useEffect(() => {
    if (orders.length === 0) {
      dispatch(fetchOrders());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchSummary());
  }, [dispatch]);

  return (
    <AppAnimate animation="transition.slideUpIn" delay={200}>
      <Box className={classes.wrap}>
        <Box className={classes.left}>
          <Box className={classes.topRight}>
            <TableList />
          </Box>
          <Box className={classes.bottomRight}>
            <Box fontWeight="bold" color="#334D6E" mb="15px">
              Biểu đồ bán theo ngày đơn/triệu đồng
            </Box>
            <Box height="calc(100% - 28px)">
              <ChartStistic />
            </Box>
          </Box>
        </Box>
        <Box className={classes.right}>
          <Box className={classes.topLeft}>
            <Box>
              <Box className={classes.sumItem}>
                <Box className="left" bgcolor="rgb(52,172,109,0.2)">
                  <img src="/assets/images/dasboard/order.svg" alt="icon-shit" />
                </Box>
                <Box className="right">
                  <Box color="#90A0B7" fontSize="16px">
                    Tổng số đơn
                  </Box>
                  <Box fontSize="18px" fontWeight="bold" color="334D6E">
                    {summary ? `${summary.totalOrder} đơn` : '0 đơn'}
                  </Box>
                </Box>
              </Box>
              <Box className={classes.sumItem}>
                <Box className="left" bgcolor="rgb(16,156,241,0.2)">
                  <img src="/assets/images/dasboard/money.png" alt="icon-shit" />
                </Box>
                <Box className="right">
                  <Box color="#90A0B7" fontSize="16px">
                    Số tiền đã bán được
                  </Box>
                  <Box fontSize="18px" fontWeight="bold" color="334D6E">
                    {summary
                      ? `${summary.totalAmount.toLocaleString('it-IT', {
                          style: 'currency',
                          currency: 'VND',
                        })}`
                      : '0 VND'}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className={classes.bottomLeft}>
            <Box fontWeight="bold" color="#334D6E" mb="15px">
              Loại đơn
            </Box>
            <Box height="calc(100% - 28px)">
              <ChartStacked />
            </Box>
          </Box>
        </Box>
      </Box>
    </AppAnimate>
  );
};

export default PageOne;
