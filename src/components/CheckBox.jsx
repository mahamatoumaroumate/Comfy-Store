import { useState } from 'react'

const CheckBox = ({ name, defaultValue, value }) => {
  const [val, setValue] = useState(defaultValue || false)
  return (
    <div className='form-control flex justify-center items-center'>
      <label className='label cursor-pointer' htmlFor={name}>
        <span className='label-text'>{value}</span>
      </label>
      <input
        name={name}
        id={name}
        type='checkbox'
        checked={val}
        className='checkbox checkbox-primary'
        onChange={() => setValue(!val)}
      />
    </div>
  )
}
export default CheckBox
