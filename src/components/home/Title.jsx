import React from 'react'

const title = ({ title, description }) => {
  return (
    <div className='text-center max-w-2xl mx-auto mt-4'>
        <h2 className='text-4xl font-semibold text-slate-1000'>{title}</h2>
        <p className=' text-slate-500 leading-relaxed mt-5'>{description}</p>
    </div>
  )
}

export default title;
