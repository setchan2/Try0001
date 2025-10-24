import { Request, Response } from 'express'
import Pixel from '../models/Pixel.js'

// Get all pixels
export const getAllPixels = async (req: Request, res: Response) => {
  try {
    const pixels = await Pixel.find().populate('ownerId', 'name email')

    res.json({
      success: true,
      data: pixels,
      count: pixels.length
    })
  } catch (error) {
    console.error('Error fetching pixels:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch pixels'
    })
  }
}

// Get pixel by coordinates
export const getPixelByCoordinates = async (req: Request, res: Response) => {
  try {
    const { x, y } = req.params

    const pixel = await Pixel.findOne({
      x: { $lte: Number(x) },
      $expr: { $gt: [{ $add: ['$x', '$width'] }, Number(x)] },
      y: { $lte: Number(y) },
      $expr: { $gt: [{ $add: ['$y', '$height'] }, Number(y)] }
    }).populate('ownerId', 'name email')

    if (!pixel) {
      return res.status(404).json({
        success: false,
        error: 'Pixel not found'
      })
    }

    res.json({
      success: true,
      data: pixel
    })
  } catch (error) {
    console.error('Error fetching pixel:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch pixel'
    })
  }
}

// Check if area is available
export const checkAreaAvailability = async (req: Request, res: Response) => {
  try {
    const { x, y, width, height } = req.body

    // Find any overlapping pixels
    const overlapping = await Pixel.findOne({
      x: { $lt: x + width },
      $expr: { $gt: [{ $add: ['$x', '$width'] }, x] },
      y: { $lt: y + height },
      $expr: { $gt: [{ $add: ['$y', '$height'] }, y] }
    })

    res.json({
      success: true,
      available: !overlapping,
      message: overlapping ? 'Area is already occupied' : 'Area is available'
    })
  } catch (error) {
    console.error('Error checking availability:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to check availability'
    })
  }
}

// Update pixel (image, link)
export const updatePixel = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { imageUrl, linkUrl, color } = req.body

    // TODO: Add authentication check
    // Verify that the user owns this pixel

    const pixel = await Pixel.findByIdAndUpdate(
      id,
      { imageUrl, linkUrl, color },
      { new: true, runValidators: true }
    )

    if (!pixel) {
      return res.status(404).json({
        success: false,
        error: 'Pixel not found'
      })
    }

    res.json({
      success: true,
      data: pixel
    })
  } catch (error) {
    console.error('Error updating pixel:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to update pixel'
    })
  }
}

// Get statistics
export const getStatistics = async (req: Request, res: Response) => {
  try {
    const totalPixels = await Pixel.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: { $multiply: ['$width', '$height'] } }
        }
      }
    ])

    const soldBlocks = totalPixels[0]?.total || 0
    const totalBlocks = 10000 // 100x100 grid
    const revenue = await Pixel.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$price' }
        }
      }
    ])

    res.json({
      success: true,
      data: {
        soldBlocks,
        totalBlocks,
        availableBlocks: totalBlocks - soldBlocks,
        completionPercentage: ((soldBlocks / totalBlocks) * 100).toFixed(2),
        totalRevenue: revenue[0]?.total || 0
      }
    })
  } catch (error) {
    console.error('Error fetching statistics:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch statistics'
    })
  }
}
