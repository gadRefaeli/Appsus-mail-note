import { UserMsg } from '../cmps/UserMsg.jsx'

export function AppHeader() {
    const { Link,NavLink } = ReactRouterDOM;
  return (
      <nav >
          <UserMsg/>
          <ul className="nav-bar">
          <img src="./img/ICON-LOGO-01.png" width="70" height="70" alt="" />
          <NavLink exact  to="/"> <li>Home</li></NavLink>
          <NavLink to="/MailApp"><li>MisterEmail</li></NavLink>
          <NavLink to="/KeepApp"><li>MissKeep</li></NavLink>
          </ul>
      </nav>
  )
}