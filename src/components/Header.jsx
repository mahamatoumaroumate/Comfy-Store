import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../features/user/userSlice'
import { useQueryClient } from '@tanstack/react-query'
import { clearCart } from '../features/cart/cartSlice'
const Header = () => {
  const { user } = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  return (
    <div className='bg-neutral '>
      <section className='text-white align-element flex justify-center items-center md:justify-end   p-2 gap-8'>
        {user ? (
          <>
            <h4>Hello, {user?.user?.username || ''}</h4>
            <Link
              className='btn btn-outline btn-primary btn-xs capitalize px-8 tracking-wider'
              onClick={() => {
                dispatch(logoutUser()),
                  dispatch(clearCart()),
                  queryClient.removeQueries()
              }}
            >
              logout
            </Link>
          </>
        ) : (
          <>
            <div className='flex gap-8'>
              <Link to='/login' className='link link-hover'>
                Sign in / Guest
              </Link>
              <Link to='/register' className='link link-hover'>
                Create Account
              </Link>
            </div>
          </>
        )}
      </section>
    </div>
  )
}
export default Header
