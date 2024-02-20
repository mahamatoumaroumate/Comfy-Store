import { useSelector } from 'react-redux'
import { CartItems, CartTotal, SectionTitle } from '../components'

const Cart = () => {
  const { cartItems, cartTotal, orderTotal, shipping, tax } = useSelector(
    (store) => store.cart
  )
  if (cartItems.length === 0) {
    return <SectionTitle text='Your Cart Is Empty' />
  }
  return (
    <>
      <SectionTitle text='Shopping Cart' />
      <div className='grid lg:grid-cols-6 gap-16 mt-16'>
        <CartItems cartItems={cartItems} />
        <CartTotal
          orderTotal={orderTotal}
          cartTotal={cartTotal}
          tax={tax}
          shipping={shipping}
        />
      </div>
    </>
  )
}
export default Cart
