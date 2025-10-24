import { create } from 'zustand'
import { User } from 'firebase/auth'
import {
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth'
import { auth, googleProvider } from '../config/firebase.js'

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  initAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null,

  // Google Sign In
  signInWithGoogle: async () => {
    try {
      set({ error: null })
      const result = await signInWithPopup(auth, googleProvider)
      set({ user: result.user })
    } catch (error: any) {
      console.error('Google sign-in error:', error)
      set({ error: error.message || 'Failed to sign in with Google' })
    }
  },

  // Sign Out
  signOut: async () => {
    try {
      await firebaseSignOut(auth)
      set({ user: null, error: null })
    } catch (error: any) {
      console.error('Sign-out error:', error)
      set({ error: error.message || 'Failed to sign out' })
    }
  },

  // Initialize auth listener
  initAuth: () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      set({ user, loading: false })
    })
    return unsubscribe
  }
}))
