import { Outlet } from 'react-router-dom'
import { Header, Navbar } from '../components/'

const HomeLayout = () => {
  return (
    <>
      <Header />
      <Navbar />
      <div className='align-element mt-10'>
        <Outlet />
      </div>
    </>
  )
}
export default HomeLayout
