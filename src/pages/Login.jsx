import { Form, Link, redirect, useNavigate } from 'react-router-dom'
import { FormInput } from '../components'
import { customFetch } from '../utils/axios'
import { setUser } from '../features/user/userSlice'
import { useDispatch } from 'react-redux'
const url = '/auth/local'
export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData() // Add await keyword here
    const data = Object.fromEntries(formData)
    try {
      const resp = await customFetch.post(url, data)
      store.dispatch(setUser(resp.data))

      return redirect('/')
    } catch (error) {
      console.log(error?.response?.data?.error?.message)
      return null
    }
  }

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const HandleGuestUser = async () => {
    try {
      const resp = await customFetch.post(url, {
        identifier: 'test@test.com',
        password: 'secret',
      })
      dispatch(setUser(resp.data))
      return navigate('/')
    } catch (error) {
      console.log(error?.response?.data?.error?.message)
      return null
    }
  }
  return (
    <div className='grid w-96 align-element h-screen items-center text-center'>
      <div className='card bg-base-200'>
        <h1 className='text-3xl font-bold pt-8'>Login</h1>
        <Form method='post' className='card-body '>
          <FormInput
            type='email'
            name='identifier'
            labelText='email'
            defaultValue=''
          />
          <FormInput
            type='password'
            name='password'
            labelText='password'
            defaultValue=''
          />
          <button className='btn btn-primary btn-block' type='submit'>
            Login
          </button>
          <button
            className='btn btn-secondary btn-block'
            type='button'
            onClick={HandleGuestUser}
          >
            GUEST USER
          </button>
          <p>
            Not a member yet ?{' '}
            <Link to='/register' className='link link-hover text-primary'>
              Register
            </Link>
          </p>
        </Form>
      </div>
    </div>
  )
}
export default Login
