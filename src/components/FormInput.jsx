import { useState } from 'react'

const FormInput = ({
  type,
  name,
  labelText,

  defaultValue,
  inputSize,
}) => {
  const [searchChanged, setSearchChanged] = useState(defaultValue || '')
  return (
    <div className='form-control'>
      <label htmlFor={name} className='label'>
        <h3 className=' capitalize label-text'>{labelText}</h3>
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={searchChanged}
        className={`input input-bordered input-primary w-full ${
          inputSize ? inputSize : 'input-md'
        }`}
        onChange={(e) => setSearchChanged(e.target.value)}
      />
    </div>
  )
}
export default FormInput
