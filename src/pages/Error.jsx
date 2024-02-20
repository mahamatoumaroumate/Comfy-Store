import { useRouteError, Link } from 'react-router-dom'
import img from '../assets/not-found.svg'
const Error = () => {
  const error = useRouteError()
  if (error.status === 404) {
    return (
      <div className='h-screen w-screen grid'>
        <div className='flex flex-col justify-center items-center gap-4'>
          <img src={img} alt='not-found' className='w-96 h-64' />
          <h3>Ohh! Page Not Found</h3>
          <Link to='/' className='btn btn-small btn-primary'>
            Back Home
          </Link>
        </div>
      </div>
    )
  }
  return (
    <div className='min-h-screen grid '>
      <div className=' flex items-center justify-center'>
        <h2 className='text-3xl'>there was an error...</h2>
      </div>
    </div>
  )
}
export default Error
