import { useMemo } from 'react'
import './FloatingFlowers.css'

function FloatingFlowers() {
  // Spawn a high density garden of falling flowers and flapping butterflies for the transition screen
  const items = useMemo(() => {
    const list = [
      { type: 'rose', emoji: '🌹' },
      { type: 'blossom', emoji: '🌸' },
      { type: 'hibiscus', emoji: '🌺' },
      { type: 'tulip', emoji: '🌷' },
      { type: 'butterfly', emoji: '🦋' }
    ]
    
    return Array.from({ length: 22 }, (_, i) => {
      const typeItem = list[i % list.length]
      return {
        id: i,
        type: typeItem.type,
        emoji: typeItem.emoji,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 4}s`,
        duration: `${6 + Math.random() * 7}s`,
        size: `${25 + Math.random() * 25}px`
      }
    })
  }, [])

  return (
    <div className="floating-flowers-garden">
      {items.map((item) => (
        <div
          key={item.id}
          className="garden-path-container"
          style={{
            left: item.left,
            animationDelay: item.delay,
            animationDuration: item.duration,
            fontSize: item.size
          }}
        >
          <div className={`garden-body type-${item.type}`}>
            {item.emoji}
          </div>
        </div>
      ))}
    </div>
  )
}

export default FloatingFlowers
