
export function AppHeader() {
    const { Link } = ReactRouterDOM;
  return (
      <nav >
          <ul className="nav-bar">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/MailApp">Mail App</Link></li>
              <li><Link to="/KeepApp">Keep App</Link></li>
          </ul>
      </nav>
  )
}