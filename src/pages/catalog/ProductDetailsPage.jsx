import { useParams } from 'react-router-dom'

export default function ProductDetailsPage() {
  const { id } = useParams()

  return (
    <div className="container py-4">
      <h1 className="h3 mb-3">Detalhes do produto</h1>
      <p className="text-muted">Produto selecionado: {id}</p>
    </div>
  )
}