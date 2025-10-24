import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import PurchasePage from './pages/PurchasePage'
import { useAuthStore } from './stores/authStore.js'

function App() {
  const initAuth = useAuthStore((state) => state.initAuth)

  // Initialize Firebase auth listener on app mount
  useEffect(() => {
    const unsubscribe = initAuth()
    return () => unsubscribe()
  }, [initAuth])

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/purchase" element={<PurchasePage />} />
    </Routes>
  )
}

export default App
