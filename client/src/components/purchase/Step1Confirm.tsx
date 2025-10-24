import { usePurchaseStore } from '../../stores/purchaseStore.js'
import { GRID_SIZE } from '../../types/canvas.js'

export default function Step1Confirm() {
  const purchaseInfo = usePurchaseStore((state) => state.purchaseInfo)

  if (!purchaseInfo) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">구매 정보를 찾을 수 없습니다.</p>
      </div>
    )
  }

  const { x, y, width, height, totalBlocks, pricePerBlock, totalPrice } = purchaseInfo

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          선택한 픽셀 영역 확인
        </h2>
        <p className="text-gray-600">
          구매하실 픽셀 영역 정보를 확인해주세요
        </p>
      </div>

      {/* Visual Preview */}
      <div className="bg-gray-50 rounded-lg p-8">
        <div className="max-w-md mx-auto">
          <div className="relative bg-white border-4 border-primary-500 rounded-lg overflow-hidden">
            {/* Grid visualization */}
            <div
              className="bg-gradient-to-br from-primary-100 to-primary-200"
              style={{
                width: '100%',
                paddingBottom: `${(height / width) * 100}%`,
                position: 'relative'
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-700">
                    {width} × {height}
                  </div>
                  <div className="text-sm text-primary-600 mt-1">블록</div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-3">
            선택한 영역의 미리보기
          </p>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Location Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            위치 정보
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-blue-700">시작 좌표 (X, Y):</span>
              <span className="font-semibold text-blue-900">
                ({x}, {y})
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700">끝 좌표 (X, Y):</span>
              <span className="font-semibold text-blue-900">
                ({x + width - 1}, {y + height - 1})
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700">그리드 위치:</span>
              <span className="font-semibold text-blue-900">
                {GRID_SIZE}×{GRID_SIZE} 중
              </span>
            </div>
          </div>
        </div>

        {/* Size Info */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-semibold text-green-900 mb-3 flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            </svg>
            크기 정보
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-green-700">블록 크기:</span>
              <span className="font-semibold text-green-900">
                {width} × {height}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700">픽셀 크기:</span>
              <span className="font-semibold text-green-900">
                {width * 10} × {height * 10} px
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700">총 블록 수:</span>
              <span className="font-semibold text-green-900">{totalBlocks}개</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Summary */}
      <div className="bg-gradient-to-r from-primary-50 to-purple-50 border-2 border-primary-300 rounded-lg p-6">
        <h3 className="font-bold text-primary-900 mb-4 text-lg flex items-center">
          <svg
            className="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          가격 정보
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center text-gray-700">
            <span>블록당 가격:</span>
            <span className="font-semibold">₩{pricePerBlock.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-gray-700">
            <span>총 블록 수:</span>
            <span className="font-semibold">{totalBlocks}개</span>
          </div>
          <div className="border-t-2 border-primary-300 pt-3 flex justify-between items-center">
            <span className="text-xl font-bold text-primary-900">총 결제 금액:</span>
            <span className="text-3xl font-bold text-primary-700">
              ₩{totalPrice.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Info Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex">
          <svg
            className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <div className="text-sm text-yellow-800">
            <p className="font-semibold mb-1">구매 전 확인사항</p>
            <ul className="list-disc list-inside space-y-1">
              <li>픽셀은 한 번 구매하면 영구적으로 소유하게 됩니다</li>
              <li>다음 단계에서 이미지와 링크를 설정할 수 있습니다</li>
              <li>이미지는 언제든지 변경 가능합니다</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
