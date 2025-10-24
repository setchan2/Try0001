import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/database.js'
import pixelRoutes from './routes/pixelRoutes.js'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:3000',
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Million Dollar Homepage API is running',
    timestamp: new Date().toISOString()
  })
})

// API Routes
app.use('/api/pixels', pixelRoutes)

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  })
})

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err.stack)
  res.status(500).json({
    success: false,
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
})

// Start server
const startServer = async () => {
  try {
    // Try to connect to MongoDB (optional for development)
    if (process.env.MONGODB_URI && process.env.MONGODB_URI !== 'mongodb://localhost:27017/million-dollar-homepage') {
      await connectDB()
    } else {
      console.log('⚠️  MongoDB connection skipped (not configured)')
      console.log('💡 Tip: Configure MONGODB_URI in .env to enable database features')
    }

    app.listen(PORT, () => {
      console.log('\n✅ Server started successfully!')
      console.log(`🚀 Running on port ${PORT}`)
      console.log(`📡 Health check: http://localhost:${PORT}/api/health`)
      console.log(`🎨 Pixels API: http://localhost:${PORT}/api/pixels`)
      console.log('')
    })
  } catch (error) {
    console.error('❌ Failed to start server:', error)
    process.exit(1)
  }
}

startServer()
