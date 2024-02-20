import { Link } from 'react-router-dom'
import FormatPrice from './FormatPrice'
const ProductList = ({ id, attributes }) => {
  const { title, company, image, price, category } = attributes

  return (
    <Link
      key={id}
      to={`/products/${id}`}
      className='flex flex-col sm:flex-row p-4 
    
     bg-base-100 shadow-xl hover:shadow-2xl duration-300 group  gap-4'
    >
      <img
        src={image}
        alt={title}
        className='w-36 rounded-lg h-28 object-cover group-hover:scale-105 transition duration-300'
      />
      <div className='flex flex-col w-auto sm:flex-row sm:justify-between sm:w-full '>
        <section>
          <h1 className='text-xl font-bold my-4'>{title}</h1>
          <h2>{company}</h2>
        </section>
        <span className='text-primary font-extrabold'>
          {FormatPrice(price)}
        </span>
      </div>
    </Link>
  )
}
export default ProductList
