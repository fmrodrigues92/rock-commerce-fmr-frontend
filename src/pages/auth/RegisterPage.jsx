import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [form, setForm] = useState({
    name: '',
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
      await register(form)
      navigate('/products')
    } catch (err) {
      setError(err?.response?.data?.message || 'Falha ao realizar cadastro.')
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
          <div className="col-12 col-md-8 col-lg-5">
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
                  <h1 className="h3 fw-bold mb-1">Criar conta</h1>
                  <p className="text-muted mb-0">
                    Cadastre-se para acessar o catálogo de produtos.
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  {error && <div className="alert alert-danger">{error}</div>}

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Nome</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control form-control-lg"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Seu nome"
                      required
                      style={{ borderRadius: 14 }}
                    />
                  </div>

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
                      placeholder="Crie uma senha"
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
                    {submitting ? 'Cadastrando...' : 'Cadastrar'}
                  </button>
                </form>

                <p className="text-center text-muted mt-4 mb-0">
                  Já tem conta?{' '}
                  <Link to="/login" className="fw-semibold text-decoration-none">
                    Entrar
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