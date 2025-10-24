import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8xL8-QRssCDOCBkbUoUhKVHXPFnkCX78",
  authDomain: "autho-ee1cd.firebaseapp.com",
  projectId: "autho-ee1cd",
  storageBucket: "autho-ee1cd.firebasestorage.app",
  messagingSenderId: "604903856509",
  appId: "1:604903856509:web:b5c4aa4ecdb90cba155414"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication
export const auth = getAuth(app)

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider()

export default app
