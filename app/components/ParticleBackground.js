'use client'

import { useEffect, useRef } from 'react'
// Move particle animation logic from scripts.js here
export default function ParticleBackground() {
  const canvasRef = useRef(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    // Initialize particle system...
  }, [])

  return <canvas ref={canvasRef} id="particles" />
} 