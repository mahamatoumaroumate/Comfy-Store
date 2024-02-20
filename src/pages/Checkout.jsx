import { Form, redirect, Navigate } from 'react-router-dom'
import { CartSubTotal, FormatPrice, SectionTitle } from '../components'
import { customFetch } from '../utils/axios'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { clearCart } from '../features/cart/cartSlice'
export const loader = (store) => async () => {
  const { user } = store.getState().user
  if (!user) {
    toast.warn('Unauthorized Access must login')
    return redirect('/login')
  }
  return null
}
export const action =
  (store) =>
  async ({ request }) => {
    const { user } = store.getState().user
    const formData = await request.formData()
    const { name, address } = Object.fromEntries(formData)
    const { cartItems, numItemsInCart, orderTotal, cartTotal } =
      store.getState().cart
    const info = {
      name,
      address,
      cartItems,
      numItemsInCart,
      orderTotal: FormatPrice(orderTotal),
      chargeTotal: cartTotal,
    }
    try {
      const resp = await customFetch.post(
        '/orders',
        {
          data: info,
        },
        {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        }
      )
      toast.success('your orders has been taken successfully')
      store.dispatch(clearCart())
      return redirect('/orders')
    } catch (error) {
      toast.error(`${error?.response?.data?.msg}`)
      return null
    }
  }
const Checkout = () => {
  const { shipping, cartTotal, orderTotal, tax } = useSelector(
    (store) => store.cart
  )
  return (
    <>
      <SectionTitle text='Place Your Order' />
      <div className='grid md:grid-cols-2 md:gap-16'>
        <section className='mt-12'>
          <h1 className='text-2xl font-bold tracking-wider my-8'>
            Shipping Information
          </h1>
          <Form method='post'>
            <label htmlFor='name' className=' font-semibold '>
              First Name
            </label>
            <input
              type='text'
              className='input input-md input-ghost border-primary-content block my-2 w-full'
              name='name'
              id='name'
              required
            />
            <label htmlFor='address' className=' font-semibold '>
              Address
            </label>
            <input
              type='text'
              className='input input-md input-ghost border-primary-content block my-2 w-full'
              name='address'
              id='address'
              required
            />
            <button className='btn btn-block btn-primary my-4'>
              Place Your Orders
            </button>
          </Form>
        </section>
        <CartSubTotal
          shipping={shipping}
          cartTotal={cartTotal}
          orderTotal={orderTotal}
          tax={tax}
          height='h-64'
          marginTop='md:mt-28'
        />
      </div>
    </>
  )
}
export default Checkout
