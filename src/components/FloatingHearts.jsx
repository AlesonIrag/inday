import { useMemo } from 'react'
import './FloatingHearts.css'

function FloatingHearts() {
  // Generate a rich set of interactive background particles: hearts, flowers, and flapping butterflies
  const particles = useMemo(() => {
    const items = [
      { type: 'heart', emoji: '💖' },
      { type: 'heart', emoji: '💗' },
      { type: 'heart', emoji: '❤️' },
      { type: 'heart', emoji: '💓' },
      { type: 'flower', emoji: '🌸' },
      { type: 'flower', emoji: '🌹' },
      { type: 'flower', emoji: '🌷' },
      { type: 'butterfly', emoji: '🦋' },
      { type: 'butterfly', emoji: '🦋' }
    ]
    
    return Array.from({ length: 15 }, (_, i) => {
      const item = items[i % items.length]
      return {
        id: i,
        type: item.type,
        emoji: item.emoji,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 8}s`,
        duration: `${8 + Math.random() * 8}s`,
        size: `${22 + Math.random() * 20}px`
      }
    })
  }, [])

  return (
    <div className="floating-hearts-overlay">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle-path-container"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            fontSize: p.size
          }}
        >
          <div className={`particle-body type-${p.type}`}>
            {p.emoji}
          </div>
        </div>
      ))}
    </div>
  )
}

export default FloatingHearts