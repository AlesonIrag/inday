import './FloatingFlowers.css'

function FloatingFlowers() {
  const flowers = ['🌹', '🌺', '🌸', '🌼', '🌻', '💐', '🌷', '🏵️']
  const flowerElements = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    flower: flowers[Math.floor(Math.random() * flowers.length)]
  }))
  
  return (
    <div className="floating-flowers">
      {flowerElements.map((item) => (
        <div 
          key={item.id} 
          className="flower"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${4 + Math.random() * 4}s`,
            fontSize: `${30 + Math.random() * 30}px`
          }}
        >
          {item.flower}
        </div>
      ))}
    </div>
  )
}

export default FloatingFlowers
