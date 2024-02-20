import { redirect, useLoaderData } from 'react-router-dom'
import { toast } from 'react-toastify'
import { customFetch } from '../utils/axios'
import OrdersItem from '../components/OrdersItem'
import { SectionTitle } from '../components'
import OrdersPagination from '../components/OrdersPagination'
const ordersQuery = (page, user) => {
  return {
    queryKey: ['orders', page || 1],
    queryFn: () =>
      customFetch.get(`/orders?page=${page || 1}`, {
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      }),
  }
}
export const loader =
  (store, queryClient) =>
  async ({ request }) => {
    const formData = new URL(request.url).searchParams.entries()
    const values = Object.fromEntries(formData)
    const { user } = store.getState().user
    if (!user) {
      toast.warn('Unauthorized Access you must login')
      return redirect('/login')
    }
    try {
      const resp = await queryClient.ensureQueryData(
        ordersQuery(parseInt(values.page), user)
      )
      return resp.data
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        'there was an error placing your order'
      toast.error(errorMessage)
      if (error?.response?.status === 401 || 403) return redirect('/login')
      return null
    }
  }
const Orders = () => {
  const { data, meta } = useLoaderData()
  const { total } = meta.pagination
  return (
    <>
      <SectionTitle text='Your Orders' />
      <div className='mt-8'>
        <h1 className='text-xl font-bold'>OrdersTotal: {total}</h1>
        <div className='grid grid-cols-5 my-4 border-b-2 border-base-200 pb-2'>
          <h3>Name</h3>
          <h3>Address</h3>
          <h3>Products</h3>
          <h3>Cost</h3>
          <h3>Date</h3>
        </div>
        {data.map((item, index) => {
          return <OrdersItem key={item.id} {...item.attributes} index={index} />
        })}
        <OrdersPagination />
      </div>
    </>
  )
}
export default Orders
