interface SidebarProps {
  onPurchaseClick?: () => void
}

export default function Sidebar({ onPurchaseClick }: SidebarProps) {
  const pricePerBlock = 100 // 10x10 픽셀 블록당 100원

  return (
    <aside className="w-full lg:w-80 bg-white rounded-lg shadow-md p-6 space-y-6 sticky top-20 self-start">
      {/* 가격 정보 */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-3">💰 가격 정보</h2>
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700">블록당 가격</span>
            <span className="text-xl font-bold text-primary-700">
              ₩{pricePerBlock.toLocaleString()}
            </span>
          </div>
          <div className="text-xs text-gray-600 pt-2 border-t border-primary-200">
            • 1 블록 = 10x10 픽셀 (100픽셀)
            <br />
            • 최소 구매: 1블록 (₩100)
            <br />• 최대 구매: 제한 없음
          </div>
        </div>
      </div>

      {/* 구매 가이드 */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-3">📝 구매 가이드</h2>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-start space-x-2">
            <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-xs font-bold">
              1
            </span>
            <p>원하는 픽셀 영역을 드래그하여 선택하세요</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-xs font-bold">
              2
            </span>
            <p>로그인 후 결제를 진행하세요</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-xs font-bold">
              3
            </span>
            <p>이미지와 링크를 업로드하세요</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-xs font-bold">
              4
            </span>
            <p>전 세계에 당신의 메시지를 알리세요!</p>
          </div>
        </div>
      </div>

      {/* CTA 버튼 */}
      <button
        onClick={onPurchaseClick}
        className="w-full py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-105 shadow-lg"
      >
        지금 픽셀 구매하기 →
      </button>

      {/* 픽셀 색상 범례 */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-3">🎨 픽셀 상태</h2>
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-white border-2 border-gray-200 rounded"></div>
            <span className="text-gray-700">판매 가능</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-primary-500 rounded"></div>
            <span className="text-gray-700">판매 완료</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-yellow-400 border-2 border-yellow-600 rounded"></div>
            <span className="text-gray-700">선택 중</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
