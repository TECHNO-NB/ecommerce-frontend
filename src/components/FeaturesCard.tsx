import React from 'react'


const FeaturesCard:React.FC<any> = ({val}) => {

  return (
    <div className=' cursor-pointer shadow-lg h-[22rem] pb-4 w-[18rem] rounded-[0.5rem] hover:scale-105 transition-all'>
        <div className="img-products flex w-full items-center rounded-[0.5rem] justify-center h-[65%] py-2 bg-[#F6F7FB]">
             <img  src={val.img} height={160} width={160}/>
        </div>
        <div className="txt text-center flex  items-center justify-center flex-col gap-1">
            <h1 className='font-bold mt-2 text-pink-400 text-2xl'>{val.title}</h1>
            <div className="color flex items-center justify-center gap-1">
                <div className="red bg-red-600 w-6 rounded-md  h-2"></div>
                <div className="purple bg-purple-600 w-6 rounded-md  h-2"></div>
                <div className="green bg-green-600 w-6 rounded-md  h-2"></div>
            </div>
            <p className='text text-[#151875]'>Size: 2xl</p>
             <div className="price text-xl text-[#151875]">$20</div>
        </div>
    </div>
  )
}

export default FeaturesCard