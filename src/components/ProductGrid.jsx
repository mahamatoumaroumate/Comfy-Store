import { Link } from 'react-router-dom'
import FormatPrice from './FormatPrice'
const ProductGrid = ({ id, attributes }) => {
  const { title, company, image, price, category } = attributes

  return (
    <Link
      key={id}
      to={`/products/${id}`}
      className='flex flex-col p-4 items-center rounded-xl  
     bg-base-100 shadow-xl hover:shadow-2xl duration-300 group '
    >
      <img
        src={image}
        alt={title}
        className='w-full rounded-lg h-52 object-cover group-hover:scale-105 transition duration-300'
      />
      <h1 className='text-xl font-bold my-4'>{title}</h1>
      <span className='text-primary font-extrabold'>{FormatPrice(price)}</span>
    </Link>
  )
}
export default ProductGrid
