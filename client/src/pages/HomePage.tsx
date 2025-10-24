import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'
import PixelCanvas from '@/components/PixelCanvas'
import type { Selection } from '@/types/canvas'
import { usePixels, usePixelStats } from '@/hooks/usePixels'
import { useAuthStore } from '../stores/authStore.js'
import { usePurchaseStore } from '../stores/purchaseStore.js'

export default function HomePage() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const initializePurchase = usePurchaseStore((state) => state.initializePurchase)

  const [currentSelection, setCurrentSelection] = useState<Selection | null>(null)

  // Fetch pixels and stats from API
  const { data: pixels = [], isLoading: pixelsLoading } = usePixels()
  const { data: stats } = usePixelStats()

  const soldPixels = stats?.soldBlocks || 0
  const totalPixels = stats?.totalBlocks || 10000

  const handlePurchaseClick = () => {
    // Check if user selected area
    if (!currentSelection) {
      alert('픽셀 영역을 먼저 선택해주세요!\n\n캔버스를 클릭하고 드래그하여 원하는 영역을 선택하세요.')
      return
    }

    // Check if user is logged in
    if (!user) {
      const goToLogin = confirm(
        '구매하려면 로그인이 필요합니다.\n\n로그인 페이지로 이동하시겠습니까?'
      )
      if (goToLogin) {
        navigate('/login')
      }
      return
    }

    // Calculate dimensions
    const x = Math.min(currentSelection.startX, currentSelection.endX)
    const y = Math.min(currentSelection.startY, currentSelection.endY)
    const width = Math.abs(currentSelection.endX - currentSelection.startX) + 1
    const height = Math.abs(currentSelection.endY - currentSelection.startY) + 1

    // Initialize purchase and navigate to purchase page
    initializePurchase(x, y, width, height)
    navigate('/purchase')
  }

  const handleSelectionChange = (selection: Selection | null) => {
    setCurrentSelection(selection)
    if (selection) {
      console.log('Selection changed:', selection)
    }
  }

  if (pixelsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header soldPixels={soldPixels} totalPixels={totalPixels} />

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Canvas Area */}
            <div className="flex-grow">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">픽셀 캔버스</h2>
                  <p className="text-gray-600 mt-1">
                    드래그하여 원하는 픽셀 영역을 선택하세요
                  </p>
                </div>

                {/* Pixel Canvas */}
                <div style={{ height: '600px' }}>
                  <PixelCanvas pixels={pixels} onSelectionChange={handleSelectionChange} />
                </div>

                {/* Canvas Controls */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded transition-colors">
                      <span className="text-lg">−</span> Zoom Out
                    </button>
                    <span className="text-sm text-gray-600 font-medium">100%</span>
                    <button className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded transition-colors">
                      <span className="text-lg">+</span> Zoom In
                    </button>
                  </div>
                  <button className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded transition-colors">
                    Reset View
                  </button>
                </div>
              </div>

              {/* Instructions */}
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">💡 사용 방법</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• 마우스 휠로 확대/축소가 가능합니다</li>
                  <li>• 드래그하여 캔버스를 이동할 수 있습니다</li>
                  <li>• 픽셀을 선택하려면 클릭 후 드래그하세요</li>
                  <li>• 이미 판매된 픽셀은 선택할 수 없습니다</li>
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <Sidebar onPurchaseClick={handlePurchaseClick} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
