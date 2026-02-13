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
    return audioEl
  })

  // Try to autoplay music immediately when app loads
  useEffect(() => {
    const attemptAutoplay = async () => {
      try {
        await audio.play()
        setIsPlaying(true)
        console.log('Autoplay successful!')
      } catch (error) {
        console.log('Autoplay blocked, showing music prompt:', error)
        setShowMusicPrompt(true)
      }
    }
    
    // Small delay to ensure DOM is ready
    const timer = setTimeout(attemptAutoplay, 500)
    
    return () => clearTimeout(timer)
  }, [audio])

  // Handle enabling music when user clicks the prompt
  const enableMusic = () => {
    audio.play().catch(e => console.log('Play failed:', e))
    setIsPlaying(true)
    setShowMusicPrompt(false)
  }

  // Start playing music on first user interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!isPlaying) {
        audio.play().catch((error) => {
          console.log('Autoplay prevented:', error)
        })
        setIsPlaying(true)
        setShowMusicPrompt(false)
      }
      // Remove listeners after first successful play
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
    }
    
    // Listen for both click and touch events for mobile support
    document.addEventListener('click', handleFirstInteraction)
    document.addEventListener('touchstart', handleFirstInteraction)
    
    return () => {
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
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
      setShowMusicPrompt(false)
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
      
      {/* Music prompt overlay if autoplay is blocked */}
      {showMusicPrompt && (
        <div className="music-prompt-overlay" onClick={enableMusic}>
          <div className="music-prompt">
            <div className="music-icon">🎵</div>
            <p>Click anywhere to play music</p>
          </div>
        </div>
      )}
      
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
