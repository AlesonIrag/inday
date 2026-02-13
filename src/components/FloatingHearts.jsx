import './FloatingHearts.css'

function FloatingHearts() {
  const hearts = Array.from({ length: 8 }, (_, i) => i)
  
  return (
    <div className="floating-hearts">
      {hearts.map((heart) => (
        <div 
          key={heart} 
          className="heart"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${6 + Math.random() * 4}s`
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  )
}

export default FloatingHearts
 