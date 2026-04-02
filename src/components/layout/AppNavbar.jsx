import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function AppNavbar() {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const userInitial = user?.name?.charAt(0)?.toUpperCase() || 'U'

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top border-bottom"
      style={{
        background: 'rgba(255, 255, 255, 0.78)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderColor: 'rgba(15, 23, 42, 0.08)',
      }}
    >
      <div className="container py-2">
        <Link
          to="/products"
          className="navbar-brand d-flex align-items-center gap-3 text-decoration-none"
        >
          <div
            className="d-flex align-items-center justify-content-center shadow-sm"
            style={{
              width: 42,
              height: 42,
              borderRadius: 14,
              background: 'linear-gradient(135deg, #111827 0%, #374151 100%)',
              color: '#fff',
              fontWeight: 800,
              letterSpacing: '0.5px',
              fontSize: 15,
            }}
          >
            RC
          </div>

          <div className="d-flex flex-column lh-sm">
            <span className="fw-bold text-dark" style={{ fontSize: '1.05rem' }}>
              Rock Commerce
            </span>
          </div>
        </Link>

        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Alternar navegação"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav mx-auto mb-3 mb-lg-0">
            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/products"
                    className={({ isActive }) =>
                      `nav-link px-3 fw-medium ${
                        isActive ? 'text-dark' : 'text-secondary'
                      }`
                    }
                    style={({ isActive }) => ({
                      borderRadius: 12,
                      background: isActive ? 'rgba(17, 24, 39, 0.06)' : 'transparent',
                    })}
                  >
                    Produtos
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          <div className="d-flex align-items-center gap-2">
            {isAuthenticated ? (
              <div
                className="d-flex align-items-center gap-3"
                style={{
                  padding: '6px 8px 6px 6px',
                  borderRadius: 18,
                  background: 'rgba(248, 250, 252, 0.95)',
                  border: '1px solid rgba(15, 23, 42, 0.06)',
                }}
              >
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #111827 0%, #4b5563 100%)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: 14,
                    flexShrink: 0,
                  }}
                >
                  {userInitial}
                </div>

                <div className="d-none d-md-block lh-sm">
                  <div className="small text-muted">Conectado como</div>
                  <div className="fw-semibold text-dark">
                    {user?.name ?? 'Usuário'}
                  </div>
                </div>

                <button
                  className="btn btn-dark btn-sm px-3"
                  onClick={handleLogout}
                  style={{ borderRadius: 12 }}
                >
                  Sair
                </button>
              </div>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <Link
                  to="/login"
                  className="btn btn-outline-dark btn-sm px-3"
                  style={{ borderRadius: 12 }}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="btn btn-dark btn-sm px-3"
                  style={{ borderRadius: 12 }}
                >
                  Cadastro
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}