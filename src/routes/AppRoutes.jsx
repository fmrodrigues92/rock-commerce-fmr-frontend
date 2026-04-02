import { Navigate, Route, Routes } from 'react-router-dom'
import AppNavbar from '../components/layout/AppNavbar'
import ProtectedRoute from '../components/routes/ProtectedRoute'
import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'
import ProductDetailsPage from '../pages/catalog/ProductDetailsPage'
import ProductsPage from '../pages/catalog/ProductsPage'

export default function AppRoutes() {
  return (
    <>
      <AppNavbar />

      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products/:id"
          element={
            <ProtectedRoute>
              <ProductDetailsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}