import { useState, useEffect } from 'react'
import './App.css'
import LandingPage from './components/LandingPage'
import SelectionScreen from './components/SelectionScreen'
import LoveLetter from './components/LoveLetter'
import MemoryTimeline from './components/MemoryTimeline'
import FloatingHearts from './components/FloatingHearts'
import FloatingFlowers from './components/FloatingFlowers'

function App() {
  const [started, setStarted] = useState(false)
  const [showSelection, setShowSelection] = useState(false)
  const [showFlowers, setShowFlowers] = useState(false)
  const [currentSection, setCurrentSection] = useState('letter')
  const [currentBgImage, setCurrentBgImage] = useState(0)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [showMusicPrompt, setShowMusicPrompt] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const bgImages = ['/fd.jpeg', '/sd.jpg', '/td.jpg', '/sr.jpeg']

  const playlist = [
    '/Paul Partohap - P.S. I LOVE YOU (Lyric Video).mp3',
    '/Daniel Caesar & H.E.R. - Best Part, a Visual.mp3'
  ]

  // Create audio element ONCE and keep it persistent
  const [audio] = useState(() => {
    const audioEl = new Audio(playlist[0])
    audioEl.volume = 0.7
    audioEl.loop = false
    audioEl.preload = 'auto'
    return audioEl
  })

  // AGGRESSIVE autoplay - try muted first, then unmute (works on mobile)
  useEffect(() => {
    const attemptAutoplay = async () => {
      try {
        // Try playing with sound first
        audio.volume = 0.5
        audio.muted = false
        await audio.play()
        setIsPlaying(true)
        setTimeout(() => { audio.volume = 0.7 }, 1000)
        console.log('Autoplay with sound successful!')
      } catch (error) {
        console.log('Autoplay with sound blocked, trying muted:', error)
        try {
          // Try muted autoplay (allowed on mobile)
          audio.muted = true
          await audio.play()
          // Unmute after a tiny delay
          setTimeout(() => {
            audio.muted = false
            audio.volume = 0.7
            setIsPlaying(true)
            console.log('Muted autoplay successful, unmuted!')
          }, 100)
        } catch (mutedError) {
          console.log('Even muted autoplay blocked:', mutedError)
          // Music will play on first user interaction
        }
      }
    }
    
    // Try multiple times
    attemptAutoplay()
    const timer1 = setTimeout(attemptAutoplay, 100)
    const timer2 = setTimeout(attemptAutoplay, 500)
    const timer3 = setTimeout(attemptAutoplay, 1000)
    
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [audio])

  // Handle enabling music when user clicks
  const enableMusic = () => {
    audio.muted = false
    audio.volume = 0.7
    audio.play().catch(e => console.log('Play failed:', e))
    setIsPlaying(true)
  }

  // Start playing music on ANY user interaction (backup for mobile)
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!isPlaying) {
        audio.muted = false
        audio.volume = 0.7
        audio.play().then(() => {
          setIsPlaying(true)
          console.log('Music started on user interaction!')
        }).catch((error) => {
          console.log('Play on interaction failed:', error)
        })
      }
    }
    
    // Listen for ALL possible interaction events
    const events = ['click', 'touchstart', 'touchend', 'touchmove', 'scroll', 'keydown']
    events.forEach(event => {
      document.addEventListener(event, handleFirstInteraction, { once: true, passive: true })
    })
    
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleFirstInteraction)
      })
    }
  }, [audio, isPlaying])

  // Handle song changes
  useEffect(() => {
    const handleSongEnd = () => {
      const nextIndex = (currentSongIndex + 1) % playlist.length
      setCurrentSongIndex(nextIndex)
      audio.src = playlist[nextIndex]
      audio.play().catch(e => console.log('Next song failed:', e))
    }
    
    audio.addEventListener('ended', handleSongEnd)
    
    return () => {
      audio.removeEventListener('ended', handleSongEnd)
    }
  }, [audio, currentSongIndex, playlist])

  useEffect(() => {
    if (showFlowers) {
      const interval = setInterval(() => {
        setCurrentBgImage((prevIndex) => (prevIndex + 1) % bgImages.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [showFlowers, bgImages.length])

  useEffect(() => {
    localStorage.removeItem('valentineStarted')
    localStorage.removeItem('valentineSection')
  }, [])

  const handleStart = () => {
    // Ensure audio plays when user clicks the landing page button
    if (!isPlaying) {
      audio.play().catch((error) => {
        console.log('Audio play failed:', error)
      })
      setIsPlaying(true)
    }
    setShowFlowers(true)
  }

  const handleBackToLanding = () => {
    setShowFlowers(false)
  }

  const handleContinue = () => {
    setShowFlowers(false)
    setShowSelection(true)
  }

  const handleBackFromSelection = () => {
    setShowSelection(false)
    setShowFlowers(true)
  }

  const handleSelection = (selection) => {
    setStarted(true)
    setShowSelection(false)
    const sectionMap = {
      'message': 'letter',
      'timeline': 'timeline'
    }
    setCurrentSection(sectionMap[selection] || 'letter')
  }

  const renderSection = () => {
    switch(currentSection) {
      case 'letter':
        return <LoveLetter />
      case 'timeline':
        return <MemoryTimeline />
      default:
        return <LoveLetter />
    }
  }

  return (
    <div className="app">
      <FloatingHearts />
      {showFlowers && <FloatingFlowers />}
      
      {!started && !showSelection && !showFlowers ? (
        <LandingPage onStart={handleStart} />
      ) : !started && (showSelection || showFlowers) ? (
        showFlowers ? (
          <>
            <button className="back-to-landing" onClick={handleBackToLanding} title="Back to Landing">
              ←
            </button>
            <div className="flowers-transition">
              <div className="flowers-bg-slideshow">
                {bgImages.map((image, index) => (
                  <div
                    key={index}
                    className={`flowers-bg-image ${index === currentBgImage ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${image})` }}
                  />
                ))}
                <div className="flowers-bg-overlay"></div>
              </div>
              <div className="flowers-content">
                <h1 className="flowers-message">Happy Valentine's Day, Inday♡</h1>
                <button className="continue-button" onClick={handleContinue}>
                  <span className="button-text-default">Long press Inday</span>
                  <span className="button-text-hover">I love You, Inday♡</span>
                </button>
              </div>
            </div>
          </>
        ) : (
          <SelectionScreen onSelect={handleSelection} onBack={handleBackFromSelection} />
        )
      ) : (
        <>
          <button className="back-to-home" onClick={() => {
            setStarted(false)
            setShowSelection(true)
            setShowFlowers(false)
          }} title="Back">
            ←
          </button>
          <div className="content-container">
            {renderSection()}
          </div>
        </>
      )}
    </div>
  )
}

export default App
