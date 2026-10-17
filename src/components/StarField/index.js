import { useEffect, useRef } from 'react'

import './index.scss'

// three depths like the old CSS stars: small and slow, medium, big and fast
const TIERS = [
  { share: 0.7, size: 1, speed: 0.08, alpha: 0.6 },
  { share: 0.2, size: 1.6, speed: 0.16, alpha: 0.8 },
  { share: 0.1, size: 2.2, speed: 0.26, alpha: 1 },
]
const AREA_PER_STAR = 1800 // px² per star, so density matches any screen
const MAX_STARS = 900
const REPEL_RADIUS = 130 // size of the empty circle around the cursor
const EASE = 0.08 // how quickly stars move away and drift back

const makeStars = (width, height) => {
  const count = Math.min(MAX_STARS, Math.round((width * height) / AREA_PER_STAR))
  const stars = []
  TIERS.forEach((tier) => {
    for (let i = 0; i < Math.round(count * tier.share); i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        ox: 0,
        oy: 0,
        ...tier,
      })
    }
  })
  return stars
}

const StarField = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    const pointer = { x: -9999, y: -9999 }
    let width = 0
    let height = 0
    let stars = []
    let frame = null

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      stars = makeStars(width, height)
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = '#fff'
      for (const star of stars) {
        if (!reduceMotion) {
          // slow upward drift, wrapping to the bottom
          star.y -= star.speed
          if (star.y < -5) {
            star.y = height + 5
            star.x = Math.random() * width
          }
        }

        // push the star out of the circle around the pointer, ease back otherwise
        let tx = 0
        let ty = 0
        const dx = star.x - pointer.x
        const dy = star.y - pointer.y
        const dist = Math.hypot(dx, dy)
        if (dist < REPEL_RADIUS && dist > 0.01) {
          const push = REPEL_RADIUS - dist
          tx = (dx / dist) * push
          ty = (dy / dist) * push
        }
        star.ox += (tx - star.ox) * EASE
        star.oy += (ty - star.oy) * EASE

        ctx.globalAlpha = star.alpha
        ctx.fillRect(star.x + star.ox, star.y + star.oy, star.size, star.size)
      }
      ctx.globalAlpha = 1
      frame = requestAnimationFrame(draw)
    }

    const onPointerMove = (e) => {
      pointer.x = e.clientX
      pointer.y = e.clientY
    }
    const onPointerLeave = () => {
      pointer.x = -9999
      pointer.y = -9999
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerdown', onPointerMove, { passive: true })
    document.addEventListener('pointerleave', onPointerLeave)
    window.addEventListener('blur', onPointerLeave)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerdown', onPointerMove)
      document.removeEventListener('pointerleave', onPointerLeave)
      window.removeEventListener('blur', onPointerLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="star-field" aria-hidden="true" />
}

export default StarField
