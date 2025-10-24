import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore.js'
import { usePurchaseStore } from '../stores/purchaseStore.js'
import Step1Confirm from '../components/purchase/Step1Confirm'
import Step2Details from '../components/purchase/Step2Details'
import Step3Payment from '../components/purchase/Step3Payment'

export default function PurchasePage() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const loading = useAuthStore((state) => state.loading)
  const { purchaseInfo, currentStep, nextStep, previousStep } = usePurchaseStore()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login')
    }
  }, [user, loading, navigate])

  // Redirect to home if no purchase info
  useEffect(() => {
    if (!loading && !purchaseInfo) {
      navigate('/')
    }
  }, [purchaseInfo, loading, navigate])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    )
  }

  if (!user || !purchaseInfo) {
    return null
  }

  const canGoNext = () => {
    if (currentStep.current === 1) return true
    if (currentStep.current === 2) {
      // Require image upload
      return !!purchaseInfo.imagePreview
    }
    return false
  }

  const steps = [
    { number: 1, name: '영역 확인', icon: '📍' },
    { number: 2, name: '정보 입력', icon: '🎨' },
    { number: 3, name: '결제', icon: '💳' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">픽셀 구매</h1>
                <p className="text-sm text-gray-500">Million Dollar Homepage</p>
              </div>
            </div>

            {/* User Info */}
            <div className="flex items-center space-x-2">
              {user.photoURL && (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'User'}
                  className="w-8 h-8 rounded-full border-2 border-primary-200"
                />
              )}
              <span className="hidden sm:inline text-sm font-medium text-gray-700">
                {user.displayName || user.email}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                {/* Step Circle */}
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-all ${
                      currentStep.current === step.number
                        ? 'bg-primary-600 text-white scale-110 shadow-lg'
                        : currentStep.completed.includes(step.number)
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {currentStep.completed.includes(step.number) ? (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      step.icon
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <p
                      className={`text-sm font-semibold ${
                        currentStep.current === step.number
                          ? 'text-primary-700'
                          : 'text-gray-600'
                      }`}
                    >
                      {step.name}
                    </p>
                    <p className="text-xs text-gray-500">Step {step.number}</p>
                  </div>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="flex-1 h-1 mx-4 -mt-8">
                    <div
                      className={`h-full rounded transition-all ${
                        currentStep.completed.includes(step.number)
                          ? 'bg-green-500'
                          : currentStep.current > step.number
                          ? 'bg-primary-600'
                          : 'bg-gray-200'
                      }`}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          {/* Step Content */}
          {currentStep.current === 1 && <Step1Confirm />}
          {currentStep.current === 2 && <Step2Details />}
          {currentStep.current === 3 && <Step3Payment />}

          {/* Navigation Buttons */}
          {currentStep.current < 3 && (
            <div className="mt-8 flex items-center justify-between pt-6 border-t border-gray-200">
              <button
                onClick={() => {
                  if (currentStep.current === 1) {
                    navigate('/')
                  } else {
                    previousStep()
                  }
                }}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                ← {currentStep.current === 1 ? '취소' : '이전'}
              </button>

              <button
                onClick={nextStep}
                disabled={!canGoNext()}
                className={`px-6 py-3 font-semibold rounded-lg transition-all ${
                  canGoNext()
                    ? 'bg-primary-600 text-white hover:bg-primary-700 transform hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                다음 단계 →
              </button>
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            문의사항이 있으신가요?{' '}
            <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
              고객센터
            </a>
          </p>
        </div>
      </main>
    </div>
  )
}
