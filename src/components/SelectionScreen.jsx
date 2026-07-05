import './SelectionScreen.css'

function SelectionScreen({ onSelect, onBack }) {
  const options = [
    {
      id: 'letter',
      icon: '💌',
      title: 'Love Letter',
      description: 'All letters I made♡',
      color: '#093fb4'
    },
    {
      id: 'timeline',
      icon: '📸',
      title: 'Our Memories',
      description: 'Our happy memories together',
      color: '#093fb4'
    },
    {
      id: 'bucketlist',
      icon: '📝',
      title: 'Future',
      description: 'Our plans for our future',
      color: '#093fb4'
    }
  ]

  return (
    <div className="selection-screen">
      <button className="back-button" onClick={onBack} title="Back to Slideshow">
        ←
      </button>
      
      <div className="selection-header">
        <h1 className="selection-title">Pick one, Baby♡</h1>
        <p className="selection-subtitle">Explore all the corners of our sweet space</p>
      </div>
      
      <div className="options-grid">
        {options.map((option) => (
          <div 
            key={option.id}
            className="option-card glass-panel"
            onClick={() => onSelect(option.id)}
            style={{ '--glow-color': option.color }}
          >
            <div className="option-icon-wrapper" style={{ background: `linear-gradient(135deg, ${option.color}22 0%, ${option.color}55 100%)` }}>
              <span className="option-icon">{option.icon}</span>
            </div>
            <h3 className="option-title">{option.title}</h3>
            <p className="option-description">{option.description}</p>
            <div className="card-hover-border" style={{ borderColor: option.color }}></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SelectionScreen
