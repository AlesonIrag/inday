import { useState, useEffect, useMemo } from 'react'
import './LandingPage.css'

function LandingPage({ onStart }) {
  const [showCard, setShowCard] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Array of local pictures
  const images = [
     '/ptry (1).png',
    '/ptry (2).jpeg',
    '/ptry (3).jpeg',
    '/ptry (4).jpeg',
    '/ptry (5).jpeg',
    '/ptry (6).jpeg',
    '/ptry (7).jpeg',
    '/ptry (8).jpeg',
    '/ptry (9).jpeg',
    '/ptry (10).jpeg',
    '/ptry (11).jpeg',
    '/mwa.jpg',
    '/gf.jpeg',
    '/caf.jpg',
    '/g.png',
    '/zz.jpg',
    '/ww.jpeg',
    '/xx.jpg',
    '/vv.jpg',
    '/er.jpg',
    '/v.png',
    '/uu.jpg',
    '/s.jpeg',
    '/su.jpg',
    '/qt.png',
    '/tm.jpg',
    '/q.png',
    '/bb.jpg',
    '/qy.jpg',
    '/t.png',
    '/w.png',
    '/aaa.jpg',
    '/e.jpg',
    '/ssa.jpg',
    '/rr.jpg',
    '/fg.jpg',
    '/o.jpg',
    '/p.jpg',
    '/www.jpg',
    '/z.jpg',
    '/zz.jpg',
    '/zzz.jpg',
   
    

  ]

  useEffect(() => {
    // Show components with elegant delayed fade-in
    const timer = setTimeout(() => setShowCard(true), 600)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (images.length > 1) {
      // Slideshow interval matching the Ken Burns motion effect
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
      }, 5000)
      
      return () => clearInterval(interval)
    }
  }, [images.length])

  return (
    <div className="landing-page">
      {/* Split-Screen Main Wrapper */}
      <div className={`landing-main-wrapper ${showCard ? 'visible' : ''}`}>
        
        {/* Left Column: Premium Polaroid Slideshow Frame (100% visible) */}
        <div className="landing-photo-column">
          <div className="landing-photo-frame-outer">
            <div className="landing-photo-washi-tape"></div>
            <div className="landing-photo-slideshow">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`slideshow-container ${index === currentImageIndex ? 'active' : ''}`}
                >
                  {/* Blurred Background Copy */}
                  <img
                    src={image}
                    alt="Our Story Background"
                    className="slideshow-image-blur"
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                  {/* Sharp Contained Foreground */}
                  <img
                    src={image}
                    alt="Our Story"
                    className="slideshow-image-main"
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="photo-frame-label">I love you, Baby♡</div>
          </div>
        </div>

        {/* Right Column: Glassmorphic Centerpiece Card */}
        <div className="landing-card-column">
          <div className="centerpiece-card glass-panel">
            <div className="card-decorations">
              <span className="sparkle top-left">♡</span>
              <span className="sparkle top-right">♡</span>     
            </div>
            
            <h2 className="greeting-pretitle">I love you, Baby♡</h2>
            <h1 className="greeting-title">Hello Baby,</h1>
            <p className="greeting-message">
              I made this to keep our sweet memories alive forever. I hope this brings a big smile to your pretty face♡
            </p>
            
            <button className="start-gift-button" onClick={onStart}>
              <span className="button-label-default">Open It, Baby ♡</span>
              <span className="button-label-hover">I Love You So Much ♡</span>
              <div className="button-glow"></div>
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default LandingPage
