import { Link, NavLink } from 'react-router-dom'
import { links } from '../utils/data'
import { useSelector } from 'react-redux'
const NavLinks = () => {
  const { user } = useSelector((store) => store.user)

  return (
    <>
      {links.map((link) => {
        if (!user && (link.text == 'Checkout' || link.text == 'Orders')) {
          return null
        }
        return (
          <li key={link.id}>
            <NavLink to={link.url}>{link.text}</NavLink>
          </li>
        )
      })}
    </>
  )
}
export default NavLinks
