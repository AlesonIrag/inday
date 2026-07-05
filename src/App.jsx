import { useState, useEffect, useRef } from 'react'
import './App.css'
import LandingPage from './components/LandingPage'
import SelectionScreen from './components/SelectionScreen'
import LoveLetter from './components/LoveLetter'
import MemoryTimeline from './components/MemoryTimeline'
import BucketList from './components/BucketList'

// Shared working photo assets list (100% verified to load correctly)
const bgImages = [
  '/q.jpg',
  '/rt.jpg',
  '/rrt.jpg',
  '/rrrt.jpg',
  '/tog (1).jpeg',
  '/gd.jpeg',
  '/tog (3).jpeg',
  '/tog (4).jpeg',
  '/cy.jpeg',
  '/tog (7).jpeg',
  '/msr.jpeg',
  '/tog (9).jpeg',
  '/wwq.jpg',
  '/we.jpg',
   '/zxc.jpg',
  '/fd.jpeg',
  '/sd.jpg',
  '/td.jpg',
  '/db.jpg',
  '/sr.jpeg',
  '/yt.jpg',
  '/aa.jpg',
  '/by.jpg',
  '/mm.jpg',
  '/or.jpg',
  
   
]

function App() {
  const [started, setStarted] = useState(false)
  const [showSelection, setShowSelection] = useState(false)
  const [showFlowers, setShowFlowers] = useState(false)
  const [currentSection, setCurrentSection] = useState('letter')
  const [currentBgImage, setCurrentBgImage] = useState(0)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  
  // Audio state sync
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [prevVolume, setPrevVolume] = useState(0.7)
  const [userPaused, setUserPaused] = useState(false)

  const playlist = [
    { title: 'P.S. I LOVE YOU - Paul Partohap', url: '/Paul Partohap - P.S. I LOVE YOU (Lyric Video).mp3' },
    { title: 'Best Part - Daniel Caesar & H.E.R.', url: '/Daniel Caesar & H.E.R. - Best Part, a Visual.mp3' },
    { title: 'When I Met You - APO Hiking Society', url: '/APO Hiking Society - When I Met You (Official Lyric Video).mp3' }
  ]

  // Persistent audio reference on window to prevent duplicate instantiation on HMR/re-mounts
  if (!window.__globalAudio__) {
    window.__globalAudio__ = new Audio(playlist[0].url)
    window.__globalAudio__.volume = volume
    window.__globalAudio__.loop = false
    window.__globalAudio__.preload = 'auto'
  }
  const audio = window.__globalAudio__

  // Autoplay attempt
  useEffect(() => {
    const attemptPlay = async () => {
      try {
        await audio.play()
        setIsPlaying(true)
        setHasInteracted(true)
      } catch (err) {
        console.log('Autoplay blocked. Waiting for user interaction.', err)
      }
    }
    
    // Play audio
    attemptPlay()
    
    // Setup time and duration event listeners
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleLoadedMetadata = () => setDuration(audio.duration)
    const handleSongEnd = () => handleNextSong()

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('ended', handleSongEnd)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('ended', handleSongEnd)
    }
  }, [audio])

  // Watch interaction for autoplay bypass
  useEffect(() => {
    if (hasInteracted) return

    const startOnInteraction = () => {
      if (userPaused) return
      audio.play().then(() => {
        setIsPlaying(true)
        setHasInteracted(true)
      }).catch(err => console.log('Bypass failed', err))
    }
    const events = ['click', 'touchstart', 'keydown']
    events.forEach(e => document.addEventListener(e, startOnInteraction, { once: true, passive: true }))
    return () => events.forEach(e => document.removeEventListener(e, startOnInteraction))
  }, [audio, hasInteracted, userPaused])

  const handlePlayPause = (e) => {
    if (e) e.stopPropagation()
    setHasInteracted(true)
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
      setUserPaused(true)
    } else {
      audio.play().then(() => {
        setIsPlaying(true)
        setUserPaused(false)
      }).catch(e => console.log(e))
    }
  }

  const handleNextSong = (e) => {
    if (e) e.stopPropagation()
    setHasInteracted(true)
    const nextIdx = (currentSongIndex + 1) % playlist.length
    setCurrentSongIndex(nextIdx)
    audio.src = playlist[nextIdx].url
    audio.volume = volume // Maintain volume level across song changes
    audio.play().then(() => {
      setIsPlaying(true)
    }).catch(e => console.log(e))
  }

  const handlePrevSong = (e) => {
    if (e) e.stopPropagation()
    setHasInteracted(true)
    const prevIdx = (currentSongIndex - 1 + playlist.length) % playlist.length
    setCurrentSongIndex(prevIdx)
    audio.src = playlist[prevIdx].url
    audio.volume = volume // Maintain volume level across song changes
    audio.play().then(() => {
      setIsPlaying(true)
    }).catch(e => console.log(e))
  }

  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value)
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleToggleMute = (e) => {
    e.stopPropagation()
    if (volume > 0) {
      setPrevVolume(volume)
      audio.volume = 0
      setVolume(0)
    } else {
      audio.volume = prevVolume
      setVolume(prevVolume)
    }
  }

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value)
    audio.volume = newVol
    setVolume(newVol)
    if (newVol > 0) {
      setPrevVolume(newVol)
    }
  }

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00'
    const mins = Math.floor(time / 60)
    const secs = Math.floor(time % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    if (showFlowers) {
      const interval = setInterval(() => {
        setCurrentBgImage((prevIndex) => (prevIndex + 1) % bgImages.length)
      }, 3500)
      return () => clearInterval(interval)
    }
  }, [showFlowers])

  const handleStart = () => {
    if (!isPlaying && !userPaused) {
      audio.play().then(() => {
        setIsPlaying(true)
      }).catch(err => console.log(err))
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
    setCurrentSection(selection)
  }

  const renderSection = () => {
    switch(currentSection) {
      case 'letter':
        return <LoveLetter />
      case 'timeline':
        return <MemoryTimeline />
      case 'bucketlist':
        return <BucketList />
      default:
        return <LoveLetter />
    }
  }

  return (
    <div className="app">

      {/* Floating Modern Media Player Widget */}
      <div 
        className={`floating-music-player glass-panel ${isCollapsed ? 'collapsed' : ''}`}
        onClick={() => {
          if (isCollapsed) setIsCollapsed(false)
        }}
        title={isCollapsed ? "Click to open music controls" : ""}
      >
        <button 
          className="minimize-btn" 
          onClick={(e) => {
            e.stopPropagation()
            setIsCollapsed(true)
          }} 
          title="Minimize Player"
        >
          ×
        </button>

        <div className="player-disc-wrapper">
          <div className={`player-disc ${isPlaying ? 'rotating' : ''}`}>
            🎵
          </div>
        </div>
        
        <div className="player-details">
          <div className="player-track-scroll">
            <span className="player-track-title">{playlist[currentSongIndex].title}</span>
          </div>
          
          <div className="player-controls">
            <button className="ctrl-btn" onClick={handlePrevSong} title="Previous Song">⏮</button>
            <button className="ctrl-btn play-pause-btn" onClick={handlePlayPause} title={isPlaying ? "Pause" : "Play"}>
              {isPlaying ? "⏸" : "▶"}
            </button>
            <button className="ctrl-btn" onClick={handleNextSong} title="Next Song">⏭</button>
          </div>

          <div className="player-progress-bar-slot">
            <span className="time-lbl">{formatTime(currentTime)}</span>
            <input 
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleProgressChange}
              className="player-slider"
            />
            <span className="time-lbl">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume slider overlay on hover */}
        <div className="player-volume-control" onClick={handleToggleMute} title={volume === 0 ? "Unmute" : "Mute"}>
          <span className="vol-icon">
            {volume === 0 ? '🔇' : volume < 0.4 ? '🔈' : '🔊'}
          </span>
          <input 
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolumeChange}
            onClick={(e) => e.stopPropagation()}
            className="player-volume-slider"
          />
        </div>
      </div>
      

      {!started && !showSelection && !showFlowers ? (
        <LandingPage onStart={handleStart} />
      ) : !started && (showSelection || showFlowers) ? (
        showFlowers ? (
          <>
            <button className="back-to-landing" onClick={handleBackToLanding} title="Back to Landing">
              ←
            </button>
            <div className="flowers-transition">
              {/* Glassmorphic centerpiece note container */}
              <div className="transition-card-wrapper">
                <div className="transition-card glass-panel">
                  {/* Photo Frame showing the current image cleanly and sharply */}
                  <div className="transition-photo-frame">
                    <img 
                      src={bgImages[currentBgImage]} 
                      alt="Our memories Background" 
                      className="transition-photo-img-blur"
                    />
                    <img 
                      src={bgImages[currentBgImage]} 
                      alt="Our memories" 
                      className="transition-photo-img-main"
                      onError={(e) => {
                        // Fallback in case of any loading glitch
                        e.target.src = '/gf.jpeg'
                      }}
                    />
                  </div>
                  
                  {/* Text details & button below */}
                  <div className="transition-details">
                    <h1 className="flowers-message">Our picture together♡</h1>
                    <button className="continue-button" onClick={handleContinue}>
                      <span className="button-text-default">Long Press Baby</span>
                      <span className="button-text-hover">I Love You, Baby ♡</span>
                    </button>
                  </div>
                </div>
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
          }} title="Back to Dashboard">
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
