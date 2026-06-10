import { Route, Routes } from 'react-router-dom'
import { AdminLayout } from './components/layout/AdminLayout'
import { PortfolioPage } from './pages/PortfolioPage'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/*" element={<PortfolioPage />} />
      </Routes>
    </div>
  )
}

export default App
