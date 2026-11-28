import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { useEffect } from 'react'
import LoginPage from '@/presentation/pages/LoginPage'
import DesignSystemPage from '@/presentation/pages/DesignSystemPage'
import MesasListPage from '@/presentation/pages/MesasListPage'
import MesaDetailPage from '@/presentation/pages/MesaDetailPage'
import PedidoMontagemPage from '@/presentation/pages/PedidoMontagemPage'

const DocumentationRoute = () => {
  useEffect(() => {
    window.location.replace(
      'https://github.com/adaejbr/app-template-restaurante-fed/blob/develop/Documenta%C3%A7%C3%A3o/Documenta%C3%A7%C3%A3o/DOCUMENTACAO.md'
    )
  }, [])

  return null
}

function App() {
  return (
    <div className="min-h-screen bg-background text-text-primary px-4 py-6 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <BrowserRouter>
          <nav
            aria-label="Navegação principal"
            className="flex flex-wrap items-center gap-2 border-b border-background-tertiary pb-4"
          >
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `inline-flex items-center min-h-[44px] rounded-md px-3 py-2 text-body-sm font-medium transition-colors focus-ring ${
                  isActive
                    ? 'bg-primary-500 text-text-inverse'
                    : 'text-text-secondary hover:bg-background-secondary hover:text-text-primary'
                }`
              }
            >
              Design System
            </NavLink>
            <NavLink
              to="/mesas"
              className={({ isActive }) =>
                `inline-flex items-center min-h-[44px] rounded-md px-3 py-2 text-body-sm font-medium transition-colors focus-ring ${
                  isActive
                    ? 'bg-primary-500 text-text-inverse'
                    : 'text-text-secondary hover:bg-background-secondary hover:text-text-primary'
                }`
              }
            >
              Mesas
            </NavLink>
            <NavLink
              to="/mesas/table-4"
              className={({ isActive }) =>
                `inline-flex items-center min-h-[44px] rounded-md px-3 py-2 text-body-sm font-medium transition-colors focus-ring ${
                  isActive
                    ? 'bg-secondary-500 text-background'
                    : 'text-text-secondary hover:bg-background-secondary hover:text-text-primary'
                }`
              }
            >
              Visão Mesa 4 (Demo)
            </NavLink>
          </nav>

          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/documentacao" element={<DocumentationRoute />} />
            <Route path="/mesas" element={<MesasListPage />} />
            <Route path="/mesas/:mesaId" element={<MesaDetailPage />} />
            <Route path="/mesa/:mesaId" element={<MesaDetailPage />} />
            <Route
              path="/pedido/novo/:comandaId"
              element={<PedidoMontagemPage />}
            />
            <Route path="/" element={<DesignSystemPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
