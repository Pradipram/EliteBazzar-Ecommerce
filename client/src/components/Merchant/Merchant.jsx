import React from 'react'
import BasicPie from './PieCharts'
import MerchantItem from './MerchantItem'

const Merchant = ({merchantProducts}) => {
  return (
    <div className='merchantHome'>
      <div>
        <h1 className='text-center pt-2'>statistics</h1>
        <BasicPie/>
      </div>
      <div>
        <h1 className='text-center'>
          Your Products
        </h1>
          <MerchantItem merchantProducts = {merchantProducts}/>
      </div>
    </div>
  )
}

export default Merchant