import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { statisticSelector } from '../../../redux/reducers/Dashboard';

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
  animation: false,
  responsive: true,
};
const ChartStistic = () => {
  const statistics = useSelector(statisticSelector);
  const DATACHART = useMemo(() => {
    return {
      labels: statistics.map((item) => {
        return format(new Date(item.orderDate), 'dd-MM-yyyy');
      }),
      datasets: [
        {
          label: 'Tổng đơn',
          data: statistics.map((item) => {
            return item.totalOrder;
          }),
          backgroundColor: '#F7685B',
        },
        {
          label: 'Tổng tiền',
          data: statistics.map((item) => {
            return item.totalAmount / 1000000;
          }),
          backgroundColor: '#109CF1',
        },
      ],
    };
  }, [statistics]);

  return <Bar data={DATACHART} options={options} />;
};

export default ChartStistic;
