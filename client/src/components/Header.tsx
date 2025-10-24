import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore.js'

interface HeaderProps {
  soldPixels?: number
  totalPixels?: number
}

export default function Header({ soldPixels = 0, totalPixels = 10000 }: HeaderProps) {
  const navigate = useNavigate()
  const { user, signOut } = useAuthStore()
  const soldPercentage = ((soldPixels / totalPixels) * 100).toFixed(1)

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900">Million Dollar Homepage</h1>
              <p className="text-xs text-gray-500">픽셀 광고의 새로운 시작</p>
            </div>
          </Link>

          {/* Stats */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">{soldPixels.toLocaleString()}</div>
              <div className="text-xs text-gray-500">판매된 픽셀</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{soldPercentage}%</div>
              <div className="text-xs text-gray-500">완료율</div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="hidden sm:block px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
              소개
            </button>

            {user ? (
              <div className="flex items-center space-x-3">
                {/* User Profile */}
                <div className="hidden sm:flex items-center space-x-2">
                  {user.photoURL && (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      className="w-8 h-8 rounded-full border-2 border-primary-200"
                    />
                  )}
                  <span className="text-sm font-medium text-gray-700">
                    {user.displayName || user.email}
                  </span>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700 transition-colors"
              >
                로그인
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Stats */}
      <div className="md:hidden px-4 pb-3 flex justify-around border-t border-gray-100 pt-2">
        <div className="text-center">
          <div className="text-lg font-bold text-primary-600">{soldPixels.toLocaleString()}</div>
          <div className="text-xs text-gray-500">판매된 픽셀</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">{soldPercentage}%</div>
          <div className="text-xs text-gray-500">완료율</div>
        </div>
      </div>
    </header>
  )
}
