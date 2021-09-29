import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { statisticChartSelector } from '../../../redux/reducers/Dashboard';

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
  maintainAspectRatio: false,
};
const ChartStistic = () => {
  const statisticsChart = useSelector(statisticChartSelector);
  const DATACHART = useMemo(() => {
    return {
      labels: statisticsChart.map((item) => {
        return format(new Date(item.orderDate), 'dd-MM-yyyy');
      }),
      datasets: [
        {
          label: 'Tổng đơn',
          data: statisticsChart.map((item) => {
            return item.totalOrder;
          }),
          backgroundColor: '#F7685B',
        },
        {
          label: 'Tổng tiền',
          data: statisticsChart.map((item) => {
            return item.totalAmount / 1000000;
          }),
          backgroundColor: '#109CF1',
        },
      ],
    };
  }, [statisticsChart]);

  return <Bar data={DATACHART} options={options} />;
};

export default ChartStistic;
