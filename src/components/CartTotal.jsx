import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import CartSubTotal from './CartSubTotal'

const CartTotal = ({ shipping, cartTotal, orderTotal, tax }) => {
  const { user } = useSelector((store) => store.user)

  return (
    <div className='lg:col-span-2'>
      <CartSubTotal
        shipping={shipping}
        cartTotal={cartTotal}
        tax={tax}
        orderTotal={orderTotal}
      />
      {!user ? (
        <Link to='/login' className='btn btn-block btn-primary mt-6 mb-8'>
          Please Login
        </Link>
      ) : (
        <Link to='/checkout' className='btn btn-block btn-primary mt-6 mb-8'>
          Proceed To Check
        </Link>
      )}
    </div>
  )
}
export default CartTotal
