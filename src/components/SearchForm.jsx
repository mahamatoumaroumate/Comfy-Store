import { Form, Link, useLoaderData } from 'react-router-dom'
import FormInput from './FormInput'
import SelectInput from './SelectInput'
import RangeInput from './RangeInput'
import CheckBox from './CheckBox'

const SearchForm = () => {
  const {
    meta: { categories, companies },
    params,
  } = useLoaderData()
  const { search, shipping, company, category, price, sort } = params

  return (
    <Form className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-base-200  gap-4 p-8 rounded-lg items-center'>
      <div>
        <FormInput
          type='search'
          name='search'
          labelText='Search Product'
          inputSize='input-sm'
          defaultValue={search || ''}
        />
      </div>
      <SelectInput
        list={categories}
        name='category'
        value='Select Category'
        defaultValue={category}
      />
      <SelectInput
        list={companies}
        name='company'
        value='Select Company'
        defaultValue={company}
      />
      <SelectInput
        list={['a-z', 'z-a', 'high', 'low']}
        value='Sort By'
        name='order'
        defaultValue={sort}
      />
      <RangeInput
        name='price'
        value='Select Price'
        max={100000}
        min='0'
        defaultValue={price}
      />
      <CheckBox name='shipping' value='Free Shipping' defaultValue={shipping} />
      <button className='btn btn-primary btn-sm'>SEARCH</button>
      <Link to='/products' className='btn btn-secondary btn-sm'>
        CLEAR
      </Link>
    </Form>
  )
}
export default SearchForm
