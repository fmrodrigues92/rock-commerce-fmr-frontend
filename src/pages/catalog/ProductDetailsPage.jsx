import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import http from '../../api/http'

export default function ProductDetailsPage() {
  const { id } = useParams()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await http.get(`/products/${id}`)
      setProduct(response.data?.data || null)
    } catch (err) {
      setError(err?.response?.data?.message || 'Falha ao carregar o produto.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-vh-100"
      style={{ background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)' }}
    >
      <div className="container py-4 py-md-5">
        <div className="mb-4">
          <Link to="/products" className="text-decoration-none fw-semibold">
            ← Voltar para produtos
          </Link>
        </div>

        {loading ? (
          <div
            className="card border-0 shadow-sm overflow-hidden"
            style={{ borderRadius: 24 }}
          >
            <div className="row g-0">
              <div className="col-lg-6">
                <div className="placeholder w-100" style={{ minHeight: 420 }} />
              </div>
              <div className="col-lg-6">
                <div className="card-body p-4 p-md-5">
                  <p className="placeholder-glow">
                    <span className="placeholder col-3" />
                  </p>
                  <p className="placeholder-glow">
                    <span className="placeholder col-8" />
                  </p>
                  <p className="placeholder-glow">
                    <span className="placeholder col-5" />
                  </p>
                  <p className="placeholder-glow">
                    <span className="placeholder col-10" />
                  </p>
                  <p className="placeholder-glow">
                    <span className="placeholder col-9" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : !product ? (
          <div className="alert alert-warning">Produto não encontrado.</div>
        ) : (
          <div
            className="card border-0 shadow-sm overflow-hidden"
            style={{ borderRadius: 24 }}
          >
            <div className="row g-0">
              <div className="col-lg-6">
                <div
                  style={{
                    minHeight: 420,
                    height: '100%',
                    backgroundImage: product.image_url
                      ? `url(${product.image_url})`
                      : 'none',
                    backgroundColor: '#e9ecef',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              </div>

              <div className="col-lg-6">
                <div className="card-body p-4 p-md-5 h-100 d-flex flex-column">
                  <div className="mb-3">
                    <span className="badge text-bg-light border">
                      {product.category_name}
                    </span>
                  </div>

                  <h1 className="display-6 fw-bold mb-3">{product.name}</h1>

                  <div className="mb-4">
                    <span className="text-muted d-block mb-1">Preço</span>
                    <span className="fs-2 fw-bold text-dark">R$ {product.price}</span>
                  </div>

                  <p className="text-muted fs-5" style={{ lineHeight: 1.7 }}>
                    {product.description}
                  </p>

                  <div className="mt-auto pt-4 d-flex gap-2">
                    <button className="btn btn-dark btn-lg px-4" style={{ borderRadius: 14 }}>
                      Comprar
                    </button>
                  </div>

                  <div className="mt-4 small text-muted">Produto ID: {product.id}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}