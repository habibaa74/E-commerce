import React from 'react'
import { InfinitySpin} from 'react-loader-spinner'
export default function Loader() {
  return (
    <div className='h-screen flex justify-center relative top-52'>
<InfinitySpin
  visible={true}
  width="200"
  color="#4fa94d"
  ariaLabel="infinity-spin-loading"
  />
    </div>
  )
}
