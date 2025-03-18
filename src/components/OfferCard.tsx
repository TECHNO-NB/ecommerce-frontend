import React from 'react'


const OfferCard:React.FC<any> = ({data}) => {
    console.log(data.image)
  return (
    <div className='w-60 shadow-lg flex flex-col items-center justify-center px-4 py-2 h-60 rounded-md gap-8'>
        <div className="img-">
            <img src={data.image} height={65} width={65} alt="Image"/>
        </div>
        <div className="txt text-center">
            <h1 className='text-[#1A0B5B] font-bold text-xl'>{data.title}</h1>
            <p>{data.descriptions}</p>
        </div>
    </div>
  )
}

export default OfferCard