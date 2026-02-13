import './SelectionScreen.css'

function SelectionScreen({ onSelect, onBack }) {
  const options = [
    {
      id: 'message',
      icon: '💌',
      title: 'My Message',
      description: 'Words from my heart'
    },
    {
      id: 'timeline',
      icon: '⏰',
      title: 'Our Story',
      description: 'Our journey together'
    }
  ]

  return (
    <div className="selection-screen">
      <button className="back-button" onClick={onBack} title="Back">
        ←
      </button>
      
      <h1 className="selection-title">Happy Valentine's Day, Inday♡</h1>
      <p className="selection-subtitle">Pick what you'd like to see</p>
      
      <div className="options-grid">
        {options.map((option) => (
          <div 
            key={option.id}
            className="option-card"
            onClick={() => onSelect(option.id)}
          >
            <div className="option-icon">{option.icon}</div>
            <h3 className="option-title">{option.title}</h3>
            <p className="option-description">{option.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SelectionScreen
