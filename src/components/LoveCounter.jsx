import { useState, useEffect } from 'react'
import './LoveCounter.css'

function LoveCounter() {
  const startDate = new Date('2025-12-03T00:00:00') // First Date: Dec 03, 2025
  const [timeElapsed, setTimeElapsed] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date()
      const difference = now - startDate

      const msPerSecond = 1000
      const msPerMinute = 60 * 1000
      const msPerHour = 60 * 60 * 1000
      const msPerDay = 24 * 60 * 60 * 1000
      const msPerYear = 365.25 * 24 * 60 * 60 * 1000

      const years = Math.floor(difference / msPerYear)
      const remainderYears = difference % msPerYear
      
      const days = Math.floor(remainderYears / msPerDay)
      const remainderDays = remainderYears % msPerDay

      const hours = Math.floor(remainderDays / msPerHour)
      const remainderHours = remainderDays % msPerHour

      const minutes = Math.floor(remainderHours / msPerMinute)
      const remainderMinutes = remainderHours % msPerMinute

      const seconds = Math.floor(remainderMinutes / msPerSecond)

      setTimeElapsed({ years, days, hours, minutes, seconds })
    }

    calculateTime()
    const timer = setInterval(calculateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const milestones = [
    { title: 'First Date', date: 'Dec 03, 2025', desc: 'The day she waited for him during OJT application. The beginning of us ♡' },
    { title: 'First Flower Given', date: 'Jan 30, 2026', desc: 'Gifted inside a tiktok sudbox in the pouring rain. Raptor dreams!' },
    { title: 'First Kiss on Lips', date: 'Apr 15, 2026', desc: 'Mt.View shots under the stars. "Dipa ko ganahan mouli jud atu nga time" ♡' },
    { title: 'Our Next Date', date: 'Coming Soon', desc: 'Check this system every time we have a date! Future memories ahead.' }
  ]

  const formatNumber = (num) => String(num).padStart(2, '0')

  return (
    <div className="love-counter-container">
      <div className="counter-header">
        <h2 className="counter-title">Our Love Timer ♡</h2>
        <p className="counter-subtitle">Counting every single heartbeat together since our first date.</p>
      </div>

      {/* Clock Counter Grid */}
      <div className="clock-grid">
        {timeElapsed.years > 0 && (
          <div className="clock-slot glass-panel">
            <span className="clock-num glow-text">{formatNumber(timeElapsed.years)}</span>
            <span className="clock-tag">Years</span>
          </div>
        )}
        <div className="clock-slot glass-panel">
          <span className="clock-num glow-text">{formatNumber(timeElapsed.days)}</span>
          <span className="clock-tag">Days</span>
        </div>
        <div className="clock-slot glass-panel">
          <span className="clock-num glow-text">{formatNumber(timeElapsed.hours)}</span>
          <span className="clock-tag">Hours</span>
        </div>
        <div className="clock-slot glass-panel">
          <span className="clock-num glow-text">{formatNumber(timeElapsed.minutes)}</span>
          <span className="clock-tag">Minutes</span>
        </div>
        <div className="clock-slot glass-panel">
          <span className="clock-num glow-text">{formatNumber(timeElapsed.seconds)}</span>
          <span className="clock-tag">Seconds</span>
        </div>
      </div>

      {/* Milestone Cards Section */}
      <div className="milestones-section">
        <h3 className="milestones-title">Love Milestones</h3>
        <div className="milestones-grid">
          {milestones.map((ms, idx) => (
            <div key={idx} className="milestone-card glass-panel">
              <div className="milestone-badge">★</div>
              <span className="milestone-date">{ms.date}</span>
              <h4 className="milestone-name">{ms.title}</h4>
              <p className="milestone-desc">{ms.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LoveCounter
