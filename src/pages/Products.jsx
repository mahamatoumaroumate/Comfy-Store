import { useLoaderData } from 'react-router-dom'
import {
  SectionTitle,
  SearchForm,
  ProductsContainer,
  Pagination,
} from '../components'
import { BsGridFill, BsList } from 'react-icons/bs'
import { customFetch } from '../utils/axios'
import { useState } from 'react'
const productsQuery = (queryParams) => {
  const { search, category, company, sort, price, shipping, page } = queryParams
  return {
    queryKey: [
      'products',
      search ?? '',
      category ?? 'all',
      company ?? 'all',
      sort ?? 'a-z',
      price ?? 100000,
      shipping ?? false,
      page ?? 1,
    ],
    queryFn: () =>
      customFetch.get(`/products?`, {
        params: queryParams,
      }),
  }
}
export const loader =
  (queryClient) =>
  async ({ request }) => {
    const formData = new URL(request.url).searchParams.entries()
    const values = Object.fromEntries(formData)
    // const { search, category, company, order, price, shipping } = values

    try {
      const resp = await queryClient.ensureQueryData(productsQuery(values))

      return { data: resp.data.data, meta: resp.data.meta, params: values }
    } catch (error) {
      return error.response.data.msg
    }
  }
const Products = () => {
  const [isMenu, setIsMenu] = useState(false)
  const { data, meta } = useLoaderData()

  const { total } = meta.pagination
  return (
    <div>
      <SearchForm />
      <div className='flex justify-between items-center border-b-2 pb-8 mt-16 border-base-300'>
        <h2>{`${total} products`}</h2>
        <div className=' flex  justify-end gap-2'>
          <button
            className={`btn ${
              !isMenu && 'btn-primary'
            } btn-sm btn-circle text-xl`}
            onClick={() => setIsMenu(false)}
          >
            <BsGridFill />
          </button>
          <button
            className={`btn ${
              isMenu && 'btn-primary'
            } btn-sm btn-circle text-xl`}
            onClick={() => setIsMenu(true)}
          >
            <BsList />
          </button>
        </div>
      </div>

      <ProductsContainer data={data} menu={isMenu} />
      <Pagination />
    </div>
  )
}
export default Products
