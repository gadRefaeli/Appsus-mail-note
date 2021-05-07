<<<<<<< HEAD
=======
import { UserMsg } from '../cmps/UserMsg.jsx'
>>>>>>> ab961a3b5b7c54fd2f83867bef282dc0c9f14504

export function AppHeader() {
    const { Link } = ReactRouterDOM;
  return (
      <nav >
          <UserMsg/>
          <ul className="nav-bar">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/MailApp">Mail App</Link></li>
              <li><Link to="/KeepApp">Keep App</Link></li>
          </ul>
      </nav>
  )
}