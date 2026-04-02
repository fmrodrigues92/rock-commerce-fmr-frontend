import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import http from '../../api/http'

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [meta, setMeta] = useState({
    current_page: 1,
    per_page: 5,
    total: 0,
    last_page: 1,
  })

  const [loading, setLoading] = useState(true)
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  const [error, setError] = useState('')

  const filters = useMemo(() => {
    return {
      search: searchParams.get('search') || '',
      category: searchParams.get('category') || '',
      page: Number(searchParams.get('page') || 1),
      per_page: Number(searchParams.get('per_page') || 5),
    }
  }, [searchParams])

  const [searchInput, setSearchInput] = useState(filters.search)
  const [categoryInput, setCategoryInput] = useState(filters.category)

  useEffect(() => {
    setSearchInput(filters.search)
    setCategoryInput(filters.category)
  }, [filters.search, filters.category])

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [filters.page, filters.per_page, filters.category, filters.search])

  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true)

      const response = await http.get('/categories')
      setCategories(response.data?.data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setCategoriesLoading(false)
    }
  }

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await http.get('/products', {
        params: {
          page: filters.page,
          per_page: filters.per_page,
          ...(filters.category ? { category: filters.category } : {}),
          ...(filters.search ? { search: filters.search } : {}),
        },
      })

      setProducts(response.data?.data || [])
      setMeta(
        response.data?.meta || {
          current_page: 1,
          per_page: 5,
          total: 0,
          last_page: 1,
        },
      )
    } catch (err) {
      setError(err?.response?.data?.message || 'Falha ao carregar os produtos.')
    } finally {
      setLoading(false)
    }
  }

  const updateParams = (newValues) => {
    const params = new URLSearchParams(searchParams)

    Object.entries(newValues).forEach(([key, value]) => {
      if (value === '' || value === null || value === undefined) {
        params.delete(key)
      } else {
        params.set(key, String(value))
      }
    })

    setSearchParams(params)
  }

  const handleFilterSubmit = (event) => {
    event.preventDefault()

    updateParams({
      search: searchInput.trim() || null,
      category: categoryInput || null,
      page: 1,
    })
  }

  const handlePageChange = (page) => {
    updateParams({ page })
  }

  return (
    <div
      className="min-vh-100"
      style={{ background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)' }}
    >
      <div className="container py-4 py-md-5">
        <div className="row align-items-end g-3 mb-4 mb-md-5">
          <div className="col-lg-6">
            <span className="badge text-bg-dark rounded-pill px-3 py-2 mb-3">
              Catálogo
            </span>
            <h1 className="display-6 fw-bold mb-2">Encontre os melhores produtos</h1>
            <p className="text-muted mb-0">
              Explore o catálogo, filtre por categoria e encontre exatamente o que procura.
            </p>
          </div>

          <div className="col-lg-6">
            <div className="card border-0 shadow-sm" style={{ borderRadius: 18 }}>
              <div className="card-body">
                <form onSubmit={handleFilterSubmit}>
                  <div className="row g-2">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar produto..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        style={{ borderRadius: 12 }}
                      />
                    </div>

                    <div className="col-md-4">
                      <select
                        className="form-select"
                        value={categoryInput}
                        onChange={(e) => setCategoryInput(e.target.value)}
                        disabled={categoriesLoading}
                        style={{ borderRadius: 12 }}
                      >
                        <option value="">Todas as categorias</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-2 d-grid">
                      <button className="btn btn-dark" style={{ borderRadius: 12 }}>
                        Buscar
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {error && <div className="alert alert-danger mb-4">{error}</div>}

        {loading ? (
          <div className="row g-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div className="col-12 col-md-6 col-xl-4" key={index}>
                <div
                  className="card h-100 border-0 shadow-sm"
                  style={{ borderRadius: 22, overflow: 'hidden' }}
                >
                  <div className="placeholder-glow">
                    <div className="placeholder w-100" style={{ height: 240 }} />
                  </div>
                  <div className="card-body p-4">
                    <p className="placeholder-glow mb-2">
                      <span className="placeholder col-4" />
                    </p>
                    <p className="placeholder-glow mb-2">
                      <span className="placeholder col-8" />
                    </p>
                    <p className="placeholder-glow mb-2">
                      <span className="placeholder col-10" />
                    </p>
                    <p className="placeholder-glow">
                      <span className="placeholder col-6" />
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="card border-0 shadow-sm" style={{ borderRadius: 18 }}>
            <div className="card-body p-4 text-center">
              <h2 className="h5 mb-2">Nenhum produto encontrado</h2>
              <p className="text-muted mb-0">
                Tente ajustar a busca ou remover alguns filtros.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <p className="text-muted mb-0">
                {meta.total} produto{meta.total !== 1 ? 's' : ''} encontrado
                {meta.total !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="row g-4">
              {products.map((product) => (
                <div className="col-12 col-md-6 col-xl-4" key={product.id}>
                  <div
                    className="card h-100 border-0 shadow-sm"
                    style={{ borderRadius: 22, overflow: 'hidden' }}
                  >
                    <div
                      style={{
                        height: 240,
                        backgroundImage: product.image_url
                          ? `url(${product.image_url})`
                          : 'none',
                        backgroundColor: '#e9ecef',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />

                    <div className="card-body d-flex flex-column p-4">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <span className="badge text-bg-light border">
                          {product.category_name}
                        </span>
                        <span className="fw-bold fs-5">R$ {product.price}</span>
                      </div>

                      <h2 className="h5 fw-bold">{product.name}</h2>
                      <p className="text-muted flex-grow-1">{product.description}</p>

                      <div className="d-flex gap-2 mt-3">
                        <Link
                          to={`/products/${product.id}`}
                          className="btn btn-dark flex-fill"
                          style={{ borderRadius: 12 }}
                        >
                          Ver detalhes
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <nav className="mt-5">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${meta.current_page <= 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(meta.current_page - 1)}
                    disabled={meta.current_page <= 1}
                  >
                    Anterior
                  </button>
                </li>

                {Array.from({ length: meta.last_page }, (_, index) => index + 1).map((page) => (
                  <li
                    className={`page-item ${page === meta.current_page ? 'active' : ''}`}
                    key={page}
                  >
                    <button className="page-link" onClick={() => handlePageChange(page)}>
                      {page}
                    </button>
                  </li>
                ))}

                <li
                  className={`page-item ${
                    meta.current_page >= meta.last_page ? 'disabled' : ''
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(meta.current_page + 1)}
                    disabled={meta.current_page >= meta.last_page}
                  >
                    Próxima
                  </button>
                </li>
              </ul>
            </nav>
          </>
        )}
      </div>
    </div>
  )
}