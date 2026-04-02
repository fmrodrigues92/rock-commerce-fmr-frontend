import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (event) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      await login(form)
      navigate('/products')
    } catch (err) {
      setError(err?.response?.data?.message || 'Falha ao realizar login.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className="min-vh-100 d-flex align-items-center"
      style={{
        background:
          'linear-gradient(135deg, #f8f9fa 0%, #eef1f4 50%, #ffffff 100%)',
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-xl-5 col-lg-6 col-md-8 col-sm-10">
            <div
              className="card border-0 shadow-lg"
              style={{ borderRadius: '22px', overflow: 'hidden' }}
            >
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <div
                    className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                    style={{
                      width: 64,
                      height: 64,
                      background: '#111827',
                      color: '#fff',
                      fontSize: 24,
                      fontWeight: 700,
                    }}
                  >
                    RC
                  </div>
                  <h1 className="h3 fw-bold mb-1">Entrar</h1>
                  <p className="text-muted mb-0">
                    Acesse sua conta para visualizar o catálogo.
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  {error && <div className="alert alert-danger">{error}</div>}

                  <div className="mb-3">
                    <label className="form-label fw-semibold">E-mail</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control form-control-lg"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="voce@email.com"
                      required
                      style={{ borderRadius: 14 }}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">Senha</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control form-control-lg"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Sua senha"
                      required
                      style={{ borderRadius: 14 }}
                    />
                  </div>

                  <button
                    className="btn btn-dark btn-lg w-100"
                    type="submit"
                    disabled={submitting}
                    style={{ borderRadius: 14 }}
                  >
                    {submitting ? 'Entrando...' : 'Entrar'}
                  </button>
                </form>

                <p className="text-center text-muted mt-4 mb-0">
                  Ainda não tem conta?{' '}
                  <Link to="/register" className="fw-semibold text-decoration-none">
                    Cadastre-se
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}