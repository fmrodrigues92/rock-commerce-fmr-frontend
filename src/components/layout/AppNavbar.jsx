import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function AppNavbar() {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/products">
          Rock Commerce
        </Link>

        <div className="collapse navbar-collapse show">
          <ul className="navbar-nav me-auto">
            {isAuthenticated && (
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  Produtos
                </Link>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-2">
            {isAuthenticated ? (
              <>
                <span className="text-muted small">
                  {user?.name ?? 'Usuário'}
                </span>
                <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link className="btn btn-outline-primary btn-sm" to="/login">
                  Login
                </Link>
                <Link className="btn btn-primary btn-sm" to="/register">
                  Cadastro
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}