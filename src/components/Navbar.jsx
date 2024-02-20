import { Link, NavLink } from 'react-router-dom'
import { PiShoppingCart } from 'react-icons/pi'
import { CgMenuLeft } from 'react-icons/cg'
import NavLinks from './NavLinks'
import { BsMoonFill, BsSunFill } from 'react-icons/bs'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const getThemes = () => {
  return localStorage.getItem('theme')
}
const Navbar = () => {
  const { numItemsInCart: total } = useSelector((store) => store.cart)

  const [theme, setTheme] = useState(getThemes() || 'winter')

  const handleTheme = () => {
    const newTheme = theme === 'winter' ? 'dracula' : 'winter'
    setTheme(newTheme)
  }
  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])
  return (
    <nav className='bg-base-200'>
      <div className='navbar align-element'>
        <div className='navbar-start'>
          <label className='label '>
            <h4 className='label-text'>
              <Link
                to='/'
                className='hidden btn  lg:block btn-primary text-3xl font-bold hover:btn-outline
                py-1'
              >
                C
              </Link>
              <div className='dropdown dropdown-bottom lg:hidden'>
                <div
                  tabIndex={0}
                  role='button'
                  className='btn m-1 text-3xl btn-outline border-none
                  hover:btn-ghost  '
                >
                  <CgMenuLeft />
                </div>
                <ul
                  tabIndex={0}
                  className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'
                >
                  <NavLinks />
                </ul>
              </div>
            </h4>
          </label>
        </div>
        <div className='hidden lg:block navbar-center'>
          <section className='menu menu-horizontal '>
            <NavLinks />
          </section>
        </div>
        <div className='navbar-end'>
          <label className='swap swap-rotate mr-4'>
            <input
              type='checkbox'
              className='theme-controller'
              value='synthwave'
            />

            <BsSunFill className='swap-on' onClick={handleTheme} />

            <BsMoonFill className='swap-off' onClick={handleTheme} />
          </label>
          <div className='indicator'>
            <span className='indicator-item badge badge-secondary mt-2 mr-2 bg-primary font-bold '>
              {total || 0}
            </span>
            <Link
              to='/cart'
              className='btn btn-outline border-none btn-circle text-3xl hover:btn-ghost'
            >
              <PiShoppingCart />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
export default Navbar
