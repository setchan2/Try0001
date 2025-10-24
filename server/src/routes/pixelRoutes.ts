import { Router } from 'express'
import {
  getAllPixels,
  getPixelByCoordinates,
  checkAreaAvailability,
  updatePixel,
  getStatistics
} from '../controllers/pixelController.js'

const router = Router()

// GET /api/pixels - Get all pixels
router.get('/', getAllPixels)

// GET /api/pixels/stats - Get statistics
router.get('/stats', getStatistics)

// POST /api/pixels/check-availability - Check if area is available
router.post('/check-availability', checkAreaAvailability)

// GET /api/pixels/:x/:y - Get pixel at coordinates
router.get('/:x/:y', getPixelByCoordinates)

// PUT /api/pixels/:id - Update pixel
router.put('/:id', updatePixel)

export default router
