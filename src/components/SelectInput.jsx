import { useState } from 'react'

const SelectInput = ({ list, name, value, defaultValue, width }) => {
  return (
    <div>
      <label htmlFor={name} className='label'>
        <h3 className='label-text'>{value}</h3>
      </label>
      <select
        name={name}
        id={name}
        className={`select select-sm select-primary ${
          width ? width : 'w-full'
        }`}
        defaultValue={defaultValue}
      >
        {list.map((item, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          )
        })}
      </select>
    </div>
  )
}
export default SelectInput
