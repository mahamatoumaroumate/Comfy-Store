import { Link, useLoaderData } from 'react-router-dom'
import { customFetch } from '../utils/axios'
import { FormatPrice } from '../components'
import { useDispatch } from 'react-redux'
import { addItem } from '../features/cart/cartSlice'
const singleProductQuery = (id) => {
  return {
    queryKey: ['singleProduct', id],
    queryFn: () => customFetch.get(`products/${id}`),
  }
}
import { useState } from 'react'
export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      const resp = await queryClient.ensureQueryData(
        singleProductQuery(params.id)
      )

      return resp.data
    } catch (error) {
      return null
    }
  }
const SingleProduct = () => {
  const { data } = useLoaderData()
  const [active, setActive] = useState(0)
  const [amount, setAmount] = useState(1)
  const dispatch = useDispatch()
  const { colors, category, company, description, image, title, price } =
    data.attributes
  const selectList = Array.from({ length: 20 }, (_, index) => index + 1)

  const productID = data.id
  return (
    <>
      <div className='text-lg breadcrumbs my-4'>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/products'>Products</Link>
          </li>
        </ul>
      </div>
      <div className='grid lg:grid-cols-2 gap-8'>
        <img
          src={image}
          alt={title}
          className='w-[100%]  h-96 object-cover rounded-lg lg:w-[90%]'
        />
        <div>
          <h1 className='capitalize text-3xl font-bold my-2'>{title}</h1>
          <h2 className='text-xl font-semibold text-slate-400 my-2'>
            {company}
          </h2>
          <h2 className='text-xl font-bold'>{FormatPrice(price)}</h2>
          <p className='text-lg tracking-wider leading-6 my-4'>{description}</p>
          <div>
            <h1 className='text-xl font-bold'>Colors</h1>
            {colors.map((color, index) => {
              return (
                <div
                  className={`badge badge-md mx-1 my-2 cursor-pointer ${
                    index === active && 'border-2 border-black'
                  } `}
                  style={{
                    background: color,
                  }}
                  key={color}
                  onClick={() => setActive(index)}
                ></div>
              )
            })}
          </div>
          <select
            className='select select-primary w-64 block'
            onChange={(e) => setAmount(parseInt(e.target.value))}
          >
            {selectList.map((item, index) => {
              return (
                <option value={item} key={index}>
                  {item}
                </option>
              )
            })}
          </select>
          <button
            className='btn btn-secondary btn-sm my-4'
            onClick={() =>
              dispatch(
                addItem({
                  amount,
                  price,
                  image,
                  cartID: productID + colors[active],
                  price,
                  productColor: colors[active],
                  company,
                  title,
                })
              )
            }
          >
            ADD TO BAG
          </button>
        </div>
      </div>
    </>
  )
}
export default SingleProduct
