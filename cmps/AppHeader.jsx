import { UserMsg } from '../cmps/UserMsg.jsx'

export function AppHeader() {
    const { Link } = ReactRouterDOM;
  return (
      <nav >
          <UserMsg/>
          <ul className="nav-bar">
          <img src="./img/ICON-LOGO-01.png" width="70" height="70" alt="" />
              <li><Link to="/">Home</Link></li>
              <li><Link to="/MailApp">MisterEmail</Link></li>
              <li><Link to="/KeepApp">MissKeep</Link></li>
          </ul>
      </nav>
  )
}