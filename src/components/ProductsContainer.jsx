import ProductItem from './ProductGrid'
import ProductList from './ProductList'

const ProductsContainer = ({ data, menu }) => {
  return (
    <>
      {menu ? (
        <div
          className='grid gap-4
          mt-16'
        >
          {data.map((product) => {
            return <ProductList key={product.id} {...product} />
          })}
        </div>
      ) : (
        <div className='mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 '>
          {data.map((product) => {
            return <ProductItem key={product.id} {...product} />
          })}
        </div>
      )}
    </>
  )
}
export default ProductsContainer
