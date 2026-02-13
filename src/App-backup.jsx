import { useState, useEffect } from 'react'
import './App.css'
import LandingPage from './components/LandingPage'
import SelectionScreen from './components/SelectionScreen'
import LoveLetter from './components/LoveLetter'
import PhotoGallery from './components/PhotoGallery'
import MemoryTimeline from './components/MemoryTimeline'
import FloatingHearts from './components/FloatingHearts'
import FloatingFlowers from './components/FloatingFlowers'

function App() {
  const [started, setStarted] = useState(false)
  const [showSelection, setShowSelection] = useState(false)
  const [showFlowers, setShowFlowers] = useState(false)
  const [currentSection, setCurrentSection] = useState('letter')
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [audioElement, setAudioElement] = useState(null)
  const [currentBgImage, setCurrentBgImage] = useState(0)

  const bgImages = ['/fd.jpeg', '/sd.jpg', '/td.jpg', '/sr.jpeg']

  const playlist = [
    '/ED SHEERAN PERFECT (instrumental).mp3',
    '/Daniel Caesar - Japanese Denim.mp3',
    '/Daniel Caesar & H.E.R. - Best Part, a Visual.mp3'
  ]

  useEffect(() => {
    if (audioElement) {
      audioElement.play().catch((error) => {
        console.log('Autoplay prevented:', error)
      })
    }
  }, [audioElement])

  useEffect(() => {
    if (audioElement) {
      audioElement.src = playlist[currentSongIndex]
      audioElement.play().catch((error) => {
        console.log('Cannot play music:', error)
      })
    }
  }, [currentSongIndex, audioElement, playlist])

  const handleSongEnd = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % playlist.length)
  }

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
    setShowFlowers(true)
  }

  const handleContinue = () => {
    setShowFlowers(false)
    setShowSelection(true)
  }

  const handleSelection = (selection) => {
    setStarted(true)
    setShowSelection(false)
    const sectionMap = {
      'pictures': 'gallery',
      'message': 'letter',
      'timeline': 'timeline'
    }
    setCurrentSection(sectionMap[selection] || 'letter')
  }

  const renderSection = () => {
    switch(currentSection) {
      case 'letter':
        return <LoveLetter />
      case 'gallery':
        return <PhotoGallery />
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
      
      <audio 
        ref={setAudioElement}
        src={playlist[currentSongIndex]}
        onEnded={handleSongEnd}
        autoPlay
      />
      
      {!started && !showSelection && !showFlowers ? (
        <LandingPage onStart={handleStart} />
      ) : !started && (showSelection || showFlowers) ? (
        showFlowers ? (
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
              <h1 className="flowers-message">Happy Valentines Day, Inday!♡♡♡</h1>
              <button className="continue-button" onClick={handleContinue}>
                <span className="button-text-default">I love You, Inday!</span>
                <span className="button-text-hover">Click to Continue</span>
              </button>
            </div>
          </div>
        ) : (
          <SelectionScreen onSelect={handleSelection} />
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
