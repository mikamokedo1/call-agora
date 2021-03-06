import React, { useEffect, useRef } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from 'src/redux/reducers/Auth';
import AppAnimate from '../../../@crema/core/AppAnimate';
import { fetchStatistic, fetchOrders, fetchSummary } from '../../../redux/actions/dashboard';
import { statisticSelector, summarySelector, ordersSelector } from '../../../redux/reducers/Dashboard';
import TableList from '../container/TableList';
import ChartStistic from '../container/ChartStistic';
import ChartStacked from '../container/ChartStacked';
import 'react-datepicker/dist/react-datepicker.css';

const useStyles = makeStyles(() => ({
  wrap: {
    height: '100%',
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
    '@media screen and (max-width: 750px)': {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  topLeft: {
    width: 'calc(30% - 30px)',
    '@media screen and (max-width: 750px)': {
      width: '100%',
      order: 1,
    },
  },
  topRight: {
    width: '70%',
    backgroundColor: '#fff',
    borderRadius: '4px',
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
    '&:last-child': {
      marginBottom: '0px',
      '@media screen and (max-width: 750px)': {
        marginBottom: '10px',
      },
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
    '@media screen and (max-width: 750px)': {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  bottomLeft: {
    width: 'calc(30% - 30px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: '5px',
    padding: '15px',

    '@media screen and (max-width: 750px)': {
      width: '100%',
    },
  },
  bottomRight: {
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: '5px',
    padding: '15px',
    '@media screen and (max-width: 750px)': {
      width: '100%',
    },
  },
}));

const PageOne = () => {
  const dispatch = useDispatch();
  const boxRef = useRef<HTMLInputElement>(null);
  const summary = useSelector(summarySelector);
  const statistics = useSelector(statisticSelector);
  const orders = useSelector(ordersSelector);
  const user = useSelector(userSelector);
  const pageTop = useRef<HTMLDivElement>(null);
  const classes = useStyles();
  const handleCopy = () => {
    navigator.clipboard.writeText(boxRef.current?.textContent ?? '');
  };

  useEffect(() => {
    if (statistics.length === 0) {
      dispatch(fetchStatistic());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <div className={classes.top} ref={pageTop}>
          <Box className={classes.topRight}>
            <TableList />
          </Box>
          <Box className={classes.topLeft}>
            <Box className={classes.link}>
              <div className={classes.url} ref={boxRef}>
                {`https://vtmd.gotrust.vn?r=${user?.reseller}`}
              </div>

              <Box className={classes.copyButton} onClick={handleCopy}>
                <Box>Copy link CTV</Box>
                <img src="/assets/images/dasboard/copy.png" alt="icon-shit" />
              </Box>
            </Box>
            <Box>
              <Box className={classes.sumItem}>
                <Box className="left" bgcolor="rgb(52,172,109,0.2)">
                  <img src="/assets/images/dasboard/order.svg" alt="icon-shit" />
                </Box>
                <Box className="right">
                  <Box color="#90A0B7" fontSize="16px">
                    T???ng s??? ????n
                  </Box>
                  <Box fontSize="18px" fontWeight="bold" color="334D6E">
                    {summary ? `${summary.totalOrder} ????n` : '0 ????n'}
                  </Box>
                </Box>
              </Box>
              <Box className={classes.sumItem}>
                <Box className="left" bgcolor="rgb(16,156,241,0.2)">
                  <img src="/assets/images/dasboard/money.png" alt="icon-shit" />
                </Box>
                <Box className="right">
                  <Box color="#90A0B7" fontSize="16px">
                    S??? ti???n ???? b??n ???????c
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
              <Box className={classes.sumItem}>
                <Box className="left" bgcolor="rgb(136,90,248,0.2)">
                  <img src="/assets/images/dasboard/wallet.png" alt="icon-shit" />
                </Box>
                <Box className="right">
                  <Box color="#90A0B7" fontSize="16px">
                    Ti???n hoa h???ng
                  </Box>
                  <Box fontSize="18px" fontWeight="bold" color="334D6E">
                    {summary
                      ? `${summary.commission.toLocaleString('it-IT', {
                          style: 'currency',
                          currency: 'VND',
                        })}`
                      : '0 VND'}
                  </Box>
                </Box>
              </Box>
              <Box className={classes.sumItem}>
                <Box className="left" bgcolor="rgb(255,187,70,0.2)">
                  <img src="/assets/images/dasboard/danhan.png" alt="icon-shit" style={{ width: '31px' }} />
                </Box>
                <Box className="right">
                  <Box color="#90A0B7" fontSize="16px">
                    Ti???n ???? nh???n
                  </Box>
                  <Box fontSize="18px" fontWeight="bold" color="334D6E">
                    {summary
                      ? `${summary.paidCommission.toLocaleString('it-IT', {
                          style: 'currency',
                          currency: 'VND',
                        })}`
                      : '0 VND'}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </div>
        <Box className={classes.bottom} height={`calc(100% - ${(pageTop.current?.offsetHeight ?? 434) + 20}px)`}>
          <Box className={classes.bottomRight}>
            <Box fontWeight="bold" color="#334D6E" mb="15px">
              Bi???u ????? b??n theo ng??y ????n/tri???u ?????ng
            </Box>
            <Box height="calc(100% - 28px)">
              <ChartStistic />
            </Box>
          </Box>
          <Box className={classes.bottomLeft}>
            <Box fontWeight="bold" color="#334D6E" mb="15px">
              Lo???i ????n
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
