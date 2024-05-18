import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

import "./Merchant.css"

export default function BasicPie() {
  return (
    <div className='pieChart mx-5 mb-2 mt-3'>
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 10, label: 'series A' },
            { id: 1, value: 15, label: 'series B' },
            { id: 2, value: 20, label: 'series C' },
          ],
        },
      ]}
      width={400}
      height={200}
    />
    </div>
  );
}