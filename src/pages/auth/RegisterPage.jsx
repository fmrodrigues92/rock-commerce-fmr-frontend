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
    <div className="container py-5" style={{ maxWidth: 480 }}>
      <h1 className="h3 mb-4">Cadastro</h1>

      <form onSubmit={handleSubmit} className="card card-body shadow-sm">
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">E-mail</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Senha</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn btn-primary" type="submit" disabled={submitting}>
          {submitting ? 'Cadastrando...' : 'Cadastrar'}
        </button>

        <p className="mt-3 mb-0 small">
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </form>
    </div>
  )
}