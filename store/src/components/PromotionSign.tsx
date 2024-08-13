import React from 'react'

interface Props {
  promotionSignText: string
}

const PromotionSign = ({ promotionSignText }: Props) => {
  return (
    <div className='py-2 bg-main w-full text-center text-white font-semibold text-lg'>
      {promotionSignText}
    </div>
  )
}

export default PromotionSign