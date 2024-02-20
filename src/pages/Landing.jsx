import { Link, useLoaderData, useNavigation } from 'react-router-dom'
import { images } from '../utils/data'
import { customFetch } from '../utils/axios'
import { FormatPrice, SectionTitle } from '../components'
const featuredQuery = {
  queryKey: ['featured'],
  queryFn: () => customFetch.get('/products?featured=true'),
}
export const loader = (queryClient) => async () => {
  const resp = await queryClient.ensureQueryData(featuredQuery)

  return resp.data
}
const Landing = () => {
  const { data } = useLoaderData()
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'
  if (isLoading) {
    return (
      <div className='flex justify-center items-center mt-42'>
        <span className='loading loading-ring loading-lg'></span>
      </div>
    )
  }
  return (
    <>
      <div className='mt-20 grid lg:grid-cols-2 lg:gap-16'>
        <div className='flex flex-wrap  lg:max-w-lg lg:w-full'>
          <h2 className='text-4xl sm:text-5xl md:text-6xl font-bold'>
            We are changing the way people shop
          </h2>
          <p className='text-lg py-8 font-medium tracking-wider '>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
            repellat explicabo enim soluta temporibus asperiores aut obcaecati
            perferendis porro nobis.
          </p>
          <Link to='/products' className='btn btn-primary capitalize'>
            our products
          </Link>
        </div>
        <div className='hidden lg:flex carousel  carousel-center max-w-lg p-4 space-x-4 bg-neutral rounded-box '>
          {images.map((img, index) => {
            return (
              <div key={index} className='carousel-item '>
                <img
                  src={img}
                  className='rounded-box h-[25rem]  w-96 object-cover'
                />
              </div>
            )
          })}
        </div>
      </div>
      <SectionTitle text='Featured Products' />
      <div className='mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 '>
        {data.map((item) => {
          const { price, image, title } = item.attributes
          return (
            <Link
              key={item.id}
              to={`/products/${item.id}`}
              className='flex flex-col p-4 items-center rounded-xl  
     bg-base-100 shadow-xl hover:shadow-2xl duration-300 group '
            >
              <img
                src={image}
                alt={title}
                className='w-full rounded-lg h-52 object-cover group-hover:scale-105 transition duration-300'
              />
              <h1 className='text-xl font-bold my-4'>{title}</h1>
              <span className='text-primary font-extrabold'>
                {FormatPrice(price)}
              </span>
            </Link>
          )
        })}
      </div>
    </>
  )
}
export default Landing
