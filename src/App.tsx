import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthStore } from '@/core/stores'
import LoginPage from '@/presentation/pages/LoginPage'
import DesignSystemPage from '@/presentation/pages/DesignSystemPage'

const DocumentationRoute = () => {
  useEffect(() => {
    window.location.replace(
      'https://github.com/adaejbr/app-template-restaurante-fed/blob/develop/Documenta%C3%A7%C3%A3o/Documenta%C3%A7%C3%A3o/DOCUMENTACAO.md'
    )
  }, [])

  return null
}

const PrivateRoute = ({ element }: { element: React.ReactNode }) => {
  const authStore = useAuthStore()
  if (authStore.isAuthenticated) {
    return <>{element}</>
  } else {
    return <Navigate to="/login" replace />
  }
}

function App() {
  return (
    <div className="min-h-screen bg-background text-text-primary p-8">
      <div className="max-w-4xl mx-auto space-y-12">
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />}/>
              <Route path="/documentacao" element={<DocumentationRoute />}/>
              {/* <Route path="/" element={ <PrivateRoute element={<DesignSystemPage />} />} />*/}
              <Route path="/" element={ <DesignSystemPage />}/>
            </Routes>
          </BrowserRouter>
        </div>
    </div>
  )
}

export default App
