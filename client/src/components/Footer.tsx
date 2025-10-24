export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Million Dollar Homepage</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              원조 밀리언 달러 홈페이지의 현대적 재해석. 픽셀 광고 공간을 구매하고 전 세계에
              당신의 메시지를 알리세요.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">빠른 링크</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  소개
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  가격 정책
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  자주 묻는 질문
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  내 픽셀 관리
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">법적 고지</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  이용약관
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  개인정보처리방침
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  환불 정책
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  문의하기
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} Million Dollar Homepage. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-500">
            <span>Made with ❤️ in Korea</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
