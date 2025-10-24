import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePurchaseStore } from '../../stores/purchaseStore.js'
import { useAuthStore } from '../../stores/authStore.js'

export default function Step3Payment() {
  const navigate = useNavigate()
  const purchaseInfo = usePurchaseStore((state) => state.purchaseInfo)
  const resetPurchase = usePurchaseStore((state) => state.resetPurchase)
  const user = useAuthStore((state) => state.user)

  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | null>(null)

  if (!purchaseInfo) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">구매 정보를 찾을 수 없습니다.</p>
      </div>
    )
  }

  const handlePayment = async () => {
    if (!paymentMethod) {
      alert('결제 수단을 선택해주세요')
      return
    }

    setIsProcessing(true)

    // TODO: Implement actual TossPayments integration
    // This is a UI-only mock for now
    setTimeout(() => {
      alert('구매가 완료되었습니다! (현재는 UI 테스트 모드입니다)')
      resetPurchase()
      navigate('/')
    }, 2000)
  }

  const { x, y, width, height, totalBlocks, totalPrice, imagePreview, linkUrl, title } =
    purchaseInfo

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">결제 확인</h2>
        <p className="text-gray-600">구매 정보를 최종 확인하고 결제를 진행하세요</p>
      </div>

      {/* Purchase Summary */}
      <div className="bg-gradient-to-br from-primary-50 to-purple-50 border-2 border-primary-200 rounded-lg p-6">
        <h3 className="font-bold text-primary-900 mb-4 text-lg">📋 구매 요약</h3>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Left: Image Preview */}
          <div className="bg-white rounded-lg p-4">
            {imagePreview ? (
              <div>
                <img
                  src={imagePreview}
                  alt="Ad preview"
                  className="w-full rounded border-2 border-gray-200"
                  style={{ aspectRatio: `${width}/${height}` }}
                />
                {title && (
                  <p className="text-sm font-semibold text-gray-700 mt-2 truncate">{title}</p>
                )}
              </div>
            ) : (
              <div className="bg-gray-100 rounded flex items-center justify-center h-40">
                <p className="text-gray-500">이미지 없음</p>
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">픽셀 위치:</span>
              <span className="font-semibold text-gray-900">
                ({x}, {y}) - ({x + width - 1}, {y + height - 1})
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">픽셀 크기:</span>
              <span className="font-semibold text-gray-900">
                {width * 10} × {height * 10} px
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">총 블록 수:</span>
              <span className="font-semibold text-gray-900">{totalBlocks}개</span>
            </div>
            {linkUrl && (
              <div className="flex justify-between">
                <span className="text-gray-600">링크:</span>
                <a
                  href={linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary-600 hover:text-primary-700 truncate max-w-[200px]"
                >
                  {linkUrl}
                </a>
              </div>
            )}
            <div className="border-t pt-3 flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900">총 결제 금액:</span>
              <span className="text-2xl font-bold text-primary-700">
                ₩{totalPrice.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Buyer Info */}
      <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
          <svg
            className="w-5 h-5 mr-2 text-primary-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          구매자 정보
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">이름:</span>
            <span className="font-semibold text-gray-900">
              {user?.displayName || '사용자'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">이메일:</span>
            <span className="font-semibold text-gray-900">{user?.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">주문 ID:</span>
            <span className="font-mono text-xs text-gray-700">{purchaseInfo.orderId}</span>
          </div>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
          <svg
            className="w-5 h-5 mr-2 text-primary-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
          결제 수단 선택
        </h3>

        <div className="space-y-3">
          {/* Card Payment */}
          <button
            onClick={() => setPaymentMethod('card')}
            className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
              paymentMethod === 'card'
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-primary-300'
            }`}
          >
            <div className="flex items-center">
              <div
                className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                  paymentMethod === 'card' ? 'border-primary-500' : 'border-gray-300'
                }`}
              >
                {paymentMethod === 'card' && (
                  <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                )}
              </div>
              <div className="flex-grow">
                <p className="font-semibold text-gray-900">신용/체크카드</p>
                <p className="text-sm text-gray-500">
                  토스페이먼츠로 안전하게 결제하세요
                </p>
              </div>
              <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path
                  fillRule="evenodd"
                  d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </button>

          {/* Bank Transfer */}
          <button
            onClick={() => setPaymentMethod('transfer')}
            className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
              paymentMethod === 'transfer'
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-primary-300'
            }`}
          >
            <div className="flex items-center">
              <div
                className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                  paymentMethod === 'transfer' ? 'border-primary-500' : 'border-gray-300'
                }`}
              >
                {paymentMethod === 'transfer' && (
                  <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                )}
              </div>
              <div className="flex-grow">
                <p className="font-semibold text-gray-900">계좌이체</p>
                <p className="text-sm text-gray-500">실시간 계좌이체로 결제하세요</p>
              </div>
              <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>

      {/* Payment Button */}
      <div className="bg-white border-2 border-primary-200 rounded-lg p-6">
        <button
          onClick={handlePayment}
          disabled={!paymentMethod || isProcessing}
          className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
            !paymentMethod || isProcessing
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-primary-600 to-purple-600 text-white hover:from-primary-700 hover:to-purple-700 transform hover:scale-105 shadow-lg'
          }`}
        >
          {isProcessing ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              결제 처리 중...
            </span>
          ) : (
            `₩${totalPrice.toLocaleString()} 결제하기`
          )}
        </button>

        <p className="text-xs text-gray-500 text-center mt-3">
          결제 진행 시 <a href="#" className="text-primary-600 hover:underline">이용약관</a> 및{' '}
          <a href="#" className="text-primary-600 hover:underline">개인정보 처리방침</a>에
          동의하는 것으로 간주됩니다
        </p>
      </div>

      {/* Info Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <svg
            className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <div className="text-sm text-blue-800">
            <p className="font-semibold mb-1">테스트 모드 안내</p>
            <p>
              현재는 UI 테스트 모드입니다. 실제 결제는 진행되지 않으며, 구매 완료 후
              홈페이지로 이동합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
