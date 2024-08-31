import React from 'react'

interface Props {
  promotionSignText: string
}

const PromotionSign = ({ promotionSignText }: Props) => {
  return (
    <div className='w-full px-1.5 py-2 font-semibold text-center text-white bg-main md:text-lg'>
      {promotionSignText}
    </div>
  )
}

export default PromotionSign