import React from 'react'
import { Link, Form, redirect } from 'react-router-dom'
import { FormInput } from '../components'
import { customFetch } from '../utils/axios'
import { toast } from 'react-toastify'
const url = '/auth/local/register'
export const action = async ({ request }) => {
  const formData = await request.formData() // Add await keyword here
  const data = Object.fromEntries(formData)
  try {
    const resp = await customFetch.post(url, {
      ...data,
    })
    toast.success('successfully registered')
    return redirect('/login')
  } catch (error) {
    return error.response.data.msg
  }
}
const Register = () => {
  return (
    <div className='grid w-96 align-element h-screen items-center text-center'>
      <div className='card bg-base-200'>
        <h1 className='text-3xl font-bold pt-8'>Register</h1>
        <Form method='post' className='card-body'>
          <FormInput
            type='text'
            name='username'
            labelText='Username'
            defaultValue=''
          />
          <FormInput
            type='email'
            name='email'
            labelText='Email'
            defaultValue=''
          />
          <FormInput
            type='password'
            name='password'
            labelText='Password'
            defaultValue=''
          />
          <button className='btn btn-primary btn-block' type='submit'>
            Register
          </button>
          <p>
            Already a member yet?{' '}
            <Link to='/login' className='link link-hover text-primary'>
              Login
            </Link>
          </p>
        </Form>
      </div>
    </div>
  )
}

export default Register
