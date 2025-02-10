'use client'

import { useEffect, useRef } from 'react'

interface ParticleColors {
  hue: number;
  saturation: string;
  lightness: string;
  alpha: number;
}

interface Mouse {
  x: number | undefined;
  y: number | undefined;
  radius: number;
}

class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  baseHue: number;

  constructor(canvas: HTMLCanvasElement) {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.1;
    this.speedX = Math.random() * 0.2 - 0.1;
    this.speedY = Math.random() * 0.2 - 0.1;
    this.baseHue = Math.random() * 30 - 15;
  }

  // ... rest of the Particle class implementation
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas to full viewport size
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Initial size
    handleResize()

    // Add resize listener
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      id="particles" 
      className="fixed inset-0 w-full h-full -z-10 bg-gradient-radial"
    />
  )
} 