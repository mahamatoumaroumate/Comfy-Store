import { useState } from 'react'
import FormatPrice from './FormatPrice'

const RangeInput = ({ name, min, max, value, defaultValue }) => {
  const [val, setValue] = useState(defaultValue || 100000)

  return (
    <div>
      <label htmlFor={name} className='label flex justify-between'>
        <h3 className='label-text'>{value}</h3>
        <h3 className='label-text'>{FormatPrice(val)}</h3>
      </label>
      <input
        className='range range-sm range-primary'
        type='range'
        min={min}
        max={max}
        step='10'
        name={name}
        id={name}
        value={val}
        onChange={(e) => setValue(e.target.value)}
      />
      <label
        htmlFor={name}
        className='label flex justify-between font-semibold'
      >
        <h3 className='label-text'>{min}</h3>
        <h3 className='label-text'>Max:{FormatPrice(max)}</h3>
      </label>
    </div>
  )
}
export default RangeInput
