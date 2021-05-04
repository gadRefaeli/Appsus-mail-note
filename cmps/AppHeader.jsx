export function AppHeader() {
    const { Link } = ReactRouterDOM;
  return (
      <nav >
          <ul className="nav-bar">
              <li><Link to="/book">Home</Link></li>
              <li><Link to="/about">About</Link></li>
          </ul>
      </nav>
  )
}