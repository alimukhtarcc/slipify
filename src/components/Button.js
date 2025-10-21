import React from 'react'

export default function Button({label,onclick}) {
  return (
    <>  
        <button onClick={onclick} className='bg-primary-400 p-2 rounded-md text-white'>{label}</button>
    </>
  )
}

