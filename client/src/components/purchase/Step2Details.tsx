import { useState, useRef, ChangeEvent, DragEvent } from 'react'
import { usePurchaseStore } from '../../stores/purchaseStore.js'

export default function Step2Details() {
  const { purchaseInfo, setImageFile, setLinkUrl, setTitle, setDescription } =
    usePurchaseStore()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [dragActive, setDragActive] = useState(false)
  const [linkUrlValue, setLinkUrlValue] = useState(purchaseInfo?.linkUrl || '')
  const [titleValue, setTitleValue] = useState(purchaseInfo?.title || '')
  const [descriptionValue, setDescriptionValue] = useState(purchaseInfo?.description || '')
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  if (!purchaseInfo) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">구매 정보를 찾을 수 없습니다.</p>
      </div>
    )
  }

  const handleFileInput = (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setErrors({ ...errors, image: '이미지 파일만 업로드 가능합니다' })
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors({ ...errors, image: '이미지 크기는 5MB 이하여야 합니다' })
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      const preview = reader.result as string
      setImageFile(file, preview)
      setErrors({ ...errors, image: '' })
    }
    reader.readAsDataURL(file)
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileInput(file)
    }
  }

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleFileInput(file)
    }
  }

  const handleLinkUrlChange = (value: string) => {
    setLinkUrlValue(value)
    setLinkUrl(value)

    // Validate URL
    if (value && !isValidUrl(value)) {
      setErrors({ ...errors, linkUrl: '올바른 URL 형식이 아닙니다 (https://example.com)' })
    } else {
      setErrors({ ...errors, linkUrl: '' })
    }
  }

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url)
      return url.startsWith('http://') || url.startsWith('https://')
    } catch {
      return false
    }
  }

  const { width, height } = purchaseInfo

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">이미지 및 링크 설정</h2>
        <p className="text-gray-600">
          픽셀 영역에 표시될 이미지와 클릭 시 이동할 링크를 설정하세요
        </p>
      </div>

      {/* Image Upload */}
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
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          광고 이미지 업로드
          <span className="ml-2 text-sm font-normal text-red-500">*필수</span>
        </h3>

        {purchaseInfo.imagePreview ? (
          /* Image Preview */
          <div className="space-y-4">
            <div className="relative bg-gray-100 rounded-lg p-4">
              <img
                src={purchaseInfo.imagePreview}
                alt="Preview"
                className="max-w-full mx-auto rounded"
                style={{
                  maxHeight: '300px',
                  aspectRatio: `${width}/${height}`
                }}
              />
              <button
                onClick={() => {
                  setImageFile(undefined as any, '')
                  if (fileInputRef.current) {
                    fileInputRef.current.value = ''
                  }
                }}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <p className="text-sm text-gray-600 text-center">
              파일명: {purchaseInfo.imageFile?.name}
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              다른 이미지 선택
            </button>
          </div>
        ) : (
          /* Upload Area */
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-300 hover:border-primary-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <svg
              className="mx-auto h-12 w-12 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-gray-700 mb-2">
              이미지를 드래그하거나 클릭하여 업로드
            </p>
            <p className="text-sm text-gray-500 mb-4">
              PNG, JPG, GIF (최대 5MB)
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              파일 선택
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        )}

        {errors.image && <p className="text-sm text-red-600 mt-2">{errors.image}</p>}

        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-800">
            💡 <strong>권장 크기:</strong> {width * 10} × {height * 10} 픽셀
          </p>
        </div>
      </div>

      {/* Link URL */}
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
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
          링크 URL
          <span className="ml-2 text-sm font-normal text-gray-500">선택사항</span>
        </h3>
        <input
          type="url"
          value={linkUrlValue}
          onChange={(e) => handleLinkUrlChange(e.target.value)}
          placeholder="https://example.com"
          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 ${
            errors.linkUrl
              ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
              : 'border-gray-300 focus:border-primary-500 focus:ring-primary-200'
          }`}
        />
        {errors.linkUrl ? (
          <p className="text-sm text-red-600 mt-2">{errors.linkUrl}</p>
        ) : (
          <p className="text-sm text-gray-500 mt-2">
            사용자가 픽셀을 클릭하면 이 링크로 이동합니다
          </p>
        )}
      </div>

      {/* Optional: Title */}
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
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            />
          </svg>
          광고 제목
          <span className="ml-2 text-sm font-normal text-gray-500">선택사항</span>
        </h3>
        <input
          type="text"
          value={titleValue}
          onChange={(e) => {
            setTitleValue(e.target.value)
            setTitle(e.target.value)
          }}
          placeholder="광고 제목을 입력하세요"
          maxLength={50}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
        />
        <p className="text-sm text-gray-500 mt-2">
          {titleValue.length}/50 자 (호버 시 표시됩니다)
        </p>
      </div>

      {/* Optional: Description */}
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
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
          광고 설명
          <span className="ml-2 text-sm font-normal text-gray-500">선택사항</span>
        </h3>
        <textarea
          value={descriptionValue}
          onChange={(e) => {
            setDescriptionValue(e.target.value)
            setDescription(e.target.value)
          }}
          placeholder="광고에 대한 간단한 설명을 입력하세요"
          maxLength={200}
          rows={3}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 resize-none"
        />
        <p className="text-sm text-gray-500 mt-2">
          {descriptionValue.length}/200 자
        </p>
      </div>
    </div>
  )
}
