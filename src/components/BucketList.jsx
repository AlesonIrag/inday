import { useState, useEffect } from 'react'
import './BucketList.css'

function BucketList() {
  const defaultPromises = [
    { id: 1, text: "Bibili ng Land Cruiser, Raptor, at Alphard balang araw! 🚗", checked: false, color: '#ffb3ba' },
    { id: 2, text: "Kakain ng Unliwings tuwing masama ang timpla ni Baby 🍗", checked: false, color: '#ffdfba' },
    { id: 3, text: "Hindi matutulog nang may galit sa isa't isa, pag-uusapan agad 🤫", checked: true, color: '#ffffba' },
    { id: 4, text: "Pupunta sa mas maraming cafe dates at mag-eexplore ng mga bagong lugar ☕", checked: false, color: '#baffc9' },
    { id: 5, text: "Magbabakasyon at mamamasyal ulit sa Hermits Cove 🏖️", checked: false, color: '#bae1ff' },
    { id: 6, text: "Hawak kamay at magsasayaw hanggang sa maging kasal na natin 💍", checked: false, color: '#e8c4ff' }
  ]

  const [promises, setPromises] = useState(() => {
    const saved = localStorage.getItem('couplePromises')
    return saved ? JSON.parse(saved) : defaultPromises
  })

  const [newPromise, setNewPromise] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState('')

  useEffect(() => {
    localStorage.setItem('couplePromises', JSON.stringify(promises))
  }, [promises])

  const handleToggle = (id) => {
    setPromises(prev => 
      prev.map(p => p.id === id ? { ...p, checked: !p.checked } : p)
    )
  }

  const handleAddPromise = (e) => {
    e.preventDefault()
    if (!newPromise.trim()) return
    
    const colors = ['#ffb3ba', '#ffdfba', '#ffffba', '#baffc9', '#bae1ff', '#e8c4ff']
    const randomColor = colors[Math.floor(Math.random() * colors.length)]

    const newObj = {
      id: Date.now(),
      text: newPromise,
      checked: false,
      color: randomColor
    }

    setPromises(prev => [newObj, ...prev])
    setNewPromise('')
  }

  const handleDeletePromise = (id) => {
    setPromises(prev => prev.filter(p => p.id !== id))
    if (editingId === id) {
      setEditingId(null)
      setEditingText('')
    }
  }

  const handleStartEdit = (promise) => {
    setEditingId(promise.id)
    setEditingText(promise.text)
  }

  const handleSaveEdit = (id) => {
    if (!editingText.trim()) return
    setPromises(prev => 
      prev.map(p => p.id === id ? { ...p, text: editingText } : p)
    )
    setEditingId(null)
    setEditingText('')
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditingText('')
  }

  return (
    <div className="bucket-list-container">
      <div className="bucket-header">
        <h2 className="bucket-title">List of our dreams 📝</h2>
        <p className="bucket-subtitle">Add a note about our future aspirations, and come back to check each goal as we turn our dreams into reality together.</p>
      </div>

      {/* Input Form */}
      <form className="add-promise-form glass-panel" onSubmit={handleAddPromise}>
        <input 
          type="text" 
          value={newPromise} 
          onChange={(e) => setNewPromise(e.target.value)}
          placeholder="Write a promise or goal for us..." 
          className="promise-input"
          maxLength={80}
        />
        <button type="submit" className="promise-add-btn">Add</button>
      </form>

      {/* Pinboard Sticky Notes Grid */}
      <div className="pinboard-grid">
        {promises.map((promise) => (
          <div 
            key={promise.id} 
            className={`sticky-note ${promise.checked ? 'promise-checked' : ''}`}
            style={{ backgroundColor: promise.color }}
          >
            {/* Red Push Pin Decor */}
            <div className="push-pin"></div>
            
            {/* Action Buttons Top-Right */}
            <div className="sticky-actions">
              <button 
                className="edit-promise-btn" 
                onClick={() => handleStartEdit(promise)} 
                title="Edit"
                disabled={editingId === promise.id}
              >
                ✏️
              </button>
              <button 
                className="delete-promise-btn" 
                onClick={() => handleDeletePromise(promise.id)} 
                title="Delete"
              >
                ×
              </button>
            </div>
            
            <div className="sticky-content">
              {editingId === promise.id ? (
                <div className="sticky-edit-container">
                  <textarea
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="sticky-edit-textarea"
                    maxLength={100}
                  />
                  <div className="sticky-edit-buttons">
                    <button 
                      type="button" 
                      className="sticky-edit-btn save" 
                      onClick={() => handleSaveEdit(promise.id)}
                    >
                      Save
                    </button>
                    <button 
                      type="button" 
                      className="sticky-edit-btn cancel" 
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="sticky-text">{promise.text}</p>
              )}
            </div>
            
            <div className="sticky-footer">
              <label className="checkbox-container">
                <input 
                  type="checkbox" 
                  checked={promise.checked} 
                  onChange={() => handleToggle(promise.id)} 
                  disabled={editingId === promise.id}
                />
                <span className="checkmark"></span>
                <span className="checkbox-label">{promise.checked ? "Completed♥" : "In Progress"}</span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BucketList
