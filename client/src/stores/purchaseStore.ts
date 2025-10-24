import { create } from 'zustand'
import { PurchaseInfo, PurchaseStep, PRICE_PER_BLOCK } from '../types/purchase.js'

interface PurchaseState {
  purchaseInfo: PurchaseInfo | null
  currentStep: PurchaseStep

  // Actions
  initializePurchase: (x: number, y: number, width: number, height: number) => void
  setImageFile: (file: File, preview: string) => void
  setLinkUrl: (url: string) => void
  setTitle: (title: string) => void
  setDescription: (description: string) => void
  nextStep: () => void
  previousStep: () => void
  resetPurchase: () => void
}

export const usePurchaseStore = create<PurchaseState>((set, get) => ({
  purchaseInfo: null,
  currentStep: {
    current: 1,
    completed: []
  },

  initializePurchase: (x, y, width, height) => {
    const totalBlocks = width * height
    const totalPrice = totalBlocks * PRICE_PER_BLOCK

    set({
      purchaseInfo: {
        x,
        y,
        width,
        height,
        totalBlocks,
        pricePerBlock: PRICE_PER_BLOCK,
        totalPrice,
        orderId: `ORDER_${Date.now()}_${Math.random().toString(36).substring(7)}`
      },
      currentStep: {
        current: 1,
        completed: []
      }
    })
  },

  setImageFile: (file, preview) => {
    const currentInfo = get().purchaseInfo
    if (!currentInfo) return

    set({
      purchaseInfo: {
        ...currentInfo,
        imageFile: file,
        imagePreview: preview
      }
    })
  },

  setLinkUrl: (url) => {
    const currentInfo = get().purchaseInfo
    if (!currentInfo) return

    set({
      purchaseInfo: {
        ...currentInfo,
        linkUrl: url
      }
    })
  },

  setTitle: (title) => {
    const currentInfo = get().purchaseInfo
    if (!currentInfo) return

    set({
      purchaseInfo: {
        ...currentInfo,
        title
      }
    })
  },

  setDescription: (description) => {
    const currentInfo = get().purchaseInfo
    if (!currentInfo) return

    set({
      purchaseInfo: {
        ...currentInfo,
        description
      }
    })
  },

  nextStep: () => {
    const { currentStep } = get()
    if (currentStep.current >= 3) return

    const nextStepNumber = (currentStep.current + 1) as 1 | 2 | 3
    set({
      currentStep: {
        current: nextStepNumber,
        completed: [...currentStep.completed, currentStep.current]
      }
    })
  },

  previousStep: () => {
    const { currentStep } = get()
    if (currentStep.current <= 1) return

    const prevStepNumber = (currentStep.current - 1) as 1 | 2 | 3
    set({
      currentStep: {
        current: prevStepNumber,
        completed: currentStep.completed
      }
    })
  },

  resetPurchase: () => {
    set({
      purchaseInfo: null,
      currentStep: {
        current: 1,
        completed: []
      }
    })
  }
}))
