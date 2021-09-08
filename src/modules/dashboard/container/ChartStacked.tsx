/* eslint-disable no-nested-ternary */
import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {Bar} from 'react-chartjs-2';
import * as R from 'ramda';
import {Order} from '../../../types/models/Dashboard';
import {ordersSelector} from '../../../redux/reducers/Dashboard';

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

const ChartStacked = () => {
  const orders = useSelector(ordersSelector);

  const DATACHARTSTACK = useMemo(() => {
    return {
      labels: ['Gói 1', 'Gói 2', 'Gói 3'],
      datasets: !orders
        ? []
        : R.pipe<
            Order[] | undefined,
            Order[],
            {[k: string]: Order[]},
            any,
            {label: string; data: Order[]; backgroundColor: string}[]
          >(
            R.defaultTo<Order[]>([]),
            R.groupBy((g) => g.period),
            R.values,
            R.addIndex(R.map)((item, index) => {
              return {
                label:
                  index === 0
                    ? '3 Tháng'
                    : index === 1
                    ? '6 Tháng'
                    : '12 Tháng',
                data: R.pipe<Order[], any, any, number[]>(
                  R.groupBy((g) => g.package),
                  R.values,
                  R.map((m: Order[]) => m.length),
                )(item),
                backgroundColor:
                  index === 0 ? '#FFB946' : index === 1 ? '#885AF8' : '#34AC6D',
              };
            }),
          )(orders),
    };
  }, [orders]);
  return <Bar data={DATACHARTSTACK} options={options2} />;
};

export default ChartStacked;
