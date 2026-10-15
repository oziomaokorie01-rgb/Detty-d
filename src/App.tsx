import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Layout } from './components/Layout'
import Home from './pages/Home'
import Budget from './pages/Budget'
import Food from './pages/Food'
import Dashboard from './pages/Dashboard'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/food" element={<Food />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
