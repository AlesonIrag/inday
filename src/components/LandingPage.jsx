import { useState, useEffect, useMemo } from 'react'
import './LandingPage.css'

function LandingPage({ onStart }) {
  const [showText, setShowText] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [loadedImages, setLoadedImages] = useState([])
  
  // Add your images here - put them in the public folder
  const images = [
    '/gf.jpeg',
    '/g.png',
    '/v.png',
    '/s.jpeg',
    '/qt.png',
    '/q.png',
    '/t.png',
    '/w.png',
    '/a.png',
  ]

  // Generate floating elements for LEFT side only - memoized to prevent reset
  const floatingHeartsLeft = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
    id: i,
    emoji: ['♡', '💖', '💗', '🦋', '❤️', '💓'][Math.floor(Math.random() * 6)],
    left: `${Math.random() * 15}%`, // Only 0-15% (left side)
    delay: `${Math.random() * 10}s`,
    duration: `${8 + Math.random() * 8}s`,
    size: `${28 + Math.random() * 20}px`
  })), [])

  // Generate floating elements for RIGHT side only - memoized to prevent reset
  const floatingHeartsRight = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
    id: i,
    emoji: ['♡', '💖', '💗', '🦋', '❤️', '💓'][Math.floor(Math.random() * 6)],
    left: `${85 + Math.random() * 15}%`, // Only 85-100% (right side)
    delay: `${Math.random() * 10}s`,
    duration: `${8 + Math.random() * 8}s`,
    size: `${28 + Math.random() * 20}px`
  })), [])

  const floatingFlowersLeft = useMemo(() => Array.from({ length: 6 }, (_, i) => ({
    id: i,
    emoji: ['🌹', '🌺', '🌸', '🌼', '🌻', '💐'][Math.floor(Math.random() * 6)],
    left: `${Math.random() * 15}%`, // Only 0-15% (left side)
    delay: `${Math.random() * 10}s`,
    duration: `${10 + Math.random() * 10}s`,
    size: `${32 + Math.random() * 24}px`
  })), [])

  const floatingFlowersRight = useMemo(() => Array.from({ length: 6 }, (_, i) => ({
    id: i,
    emoji: ['🌹', '🌺', '🌸', '🌼', '🌻', '💐'][Math.floor(Math.random() * 6)],
    left: `${85 + Math.random() * 15}%`, // Only 85-100% (right side)
    delay: `${Math.random() * 10}s`,
    duration: `${10 + Math.random() * 10}s`,
    size: `${32 + Math.random() * 24}px`
  })), [])

  const floatingButterfliesLeft = useMemo(() => Array.from({ length: 5 }, (_, i) => ({
    id: i,
    emoji: '🦋',
    left: `${Math.random() * 15}%`, // Only 0-15% (left side)
    delay: `${Math.random() * 10}s`,
    duration: `${12 + Math.random() * 8}s`,
    size: `${35 + Math.random() * 20}px`
  })), [])

  const floatingButterfliesRight = useMemo(() => Array.from({ length: 5 }, (_, i) => ({
    id: i,
    emoji: '🦋',
    left: `${85 + Math.random() * 15}%`, // Only 85-100% (right side)
    delay: `${Math.random() * 10}s`,
    duration: `${12 + Math.random() * 8}s`,
    size: `${35 + Math.random() * 20}px`
  })), [])

  useEffect(() => {
    // Set all images as loaded immediately - no checking
    setLoadedImages(images)
    setTimeout(() => setShowText(true), 1500)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (loadedImages.length > 1) {
      // Start slideshow immediately - change image every 5 seconds
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % loadedImages.length)
      }, 5000)
      
      return () => clearInterval(interval)
    }
  }, [loadedImages.length])

  return (
    <div className="landing-page">
      {/* Floating Hearts */}
      <div className="landing-floating-hearts">
        {floatingHeartsLeft.map((heart) => (
          <div
            key={`heart-left-${heart.id}`}
            className="landing-heart"
            style={{
              left: heart.left,
              animationDelay: heart.delay,
              animationDuration: heart.duration,
              fontSize: heart.size
            }}
          >
            {heart.emoji}
          </div>
        ))}
        {floatingHeartsRight.map((heart) => (
          <div
            key={`heart-right-${heart.id}`}
            className="landing-heart"
            style={{
              left: heart.left,
              animationDelay: heart.delay,
              animationDuration: heart.duration,
              fontSize: heart.size
            }}
          >
            {heart.emoji}
          </div>
        ))}
      </div>

      {/* Floating Flowers */}
      <div className="landing-floating-flowers">
        {floatingFlowersLeft.map((flower) => (
          <div
            key={`flower-left-${flower.id}`}
            className="landing-flower"
            style={{
              left: flower.left,
              animationDelay: flower.delay,
              animationDuration: flower.duration,
              fontSize: flower.size
            }}
          >
            {flower.emoji}
          </div>
        ))}
        {floatingFlowersRight.map((flower) => (
          <div
            key={`flower-right-${flower.id}`}
            className="landing-flower"
            style={{
              left: flower.left,
              animationDelay: flower.delay,
              animationDuration: flower.duration,
              fontSize: flower.size
            }}
          >
            {flower.emoji}
          </div>
        ))}
      </div>

      {/* Floating Butterflies */}
      <div className="landing-floating-butterflies">
        {floatingButterfliesLeft.map((butterfly) => (
          <div
            key={`butterfly-left-${butterfly.id}`}
            className="landing-butterfly"
            style={{
              left: butterfly.left,
              animationDelay: butterfly.delay,
              animationDuration: butterfly.duration,
              fontSize: butterfly.size
            }}
          >
            {butterfly.emoji}
          </div>
        ))}
        {floatingButterfliesRight.map((butterfly) => (
          <div
            key={`butterfly-right-${butterfly.id}`}
            className="landing-butterfly"
            style={{
              left: butterfly.left,
              animationDelay: butterfly.delay,
              animationDuration: butterfly.duration,
              fontSize: butterfly.size
            }}
          >
            {butterfly.emoji}
          </div>
        ))}
      </div>

      <div className="photo-background">
        {loadedImages.map((image, index) => (
          <img 
            key={index}
            src={image} 
            alt="My Love" 
            className={`slideshow-image ${index === currentImageIndex ? 'active' : ''}`}
            loading="eager"
            style={{
              display: 'block',
              visibility: 'visible'
            }}
          />
        ))}
        <div className="photo-overlay"></div>
      </div>
      
      {showText && (
        <div className="subtle-text" onClick={onStart}>
          <span className="button-text-default">Open it inday♡</span>
          <span className="button-text-hover">I love you ♡</span>
        </div>
      )}
    </div>
  )
}

export default LandingPage
