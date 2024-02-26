import React from 'react'

const UserDetails = (props) => {
    const {field, value} = props
  return (
    <>
      <div className='px-1 text-[14px]'>
        <p className='font-normal text-[#1C1C1C]'>{field}</p>
        <p className='mt-3 font-semibold'>{value}</p>
      </div>
    </>
  )
}

export default UserDetails