import { useState, useEffect } from 'react'
import './LoveLetter.css'

function LoveLetter() {
  const [selectedLetter, setSelectedLetter] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const lettersData = [
    {
      id: 1,
      tag: "Valentine's Day",
      title: "My first letter♡",
      intro: "Happy Valentine's Day Baby!",
      paragraphs: [
        "Hi Baby! mag inoa nasad ko ha kay mao man jud imong e sulti ba HAHAHA, di jud bitaw ko kaybaw mo himo letter pero i'll try. Nabuhat ko ni nga system kay mag long last ni as long as di e delete, ganahan ko memorable imong valentines day sa kani nga gamay nga effort, wala man koy mahatag nga flower karun nga valentines pero labaw panis flower , explore this system kay pun'an pa ko ni sa mga umaabut pa natu nga date og mga memories nga mahimo. CHECK THIS SYSTEM EVERYTIME NAA TAY DATE.",
        "Thank you for giving me inspiration every single day both physically and virtually, I felt very comfortable. Thank you for staying even when I offended you many times. Salamat sa advices ako jud tu gipang sink in sa akoa, dako kaayug impact to tanan sa akong kinabuhi. Salamat sa tanan kaayu nimo nako dae, I love you and I will love you always.",
        "Ayaw na palabig ka stress sa imong kuya ha, if naa ka problem naa rako ha 'all ears to listen' problema nimo tanan even sa school, family or anything, ayaw tawn luoma. About sa 'vocal when it comes sa atua' okay rajud na nako ma feel man sad nako imong actions nga na appreciate nimo tanan, ka anad na ha kay mao nani dina baya ta magbuwag ana ko HAHAHAHAHA."
      ],
      highlight: "Take care always my pretty/beautiful/gorgeous Baby. I love youuu! ♡"
    },
    {
      id: 2,
      tag: "1st Monthsary",
      title: "Second letter♡",
      intro: "Happy Monthsary, Baby!",
      paragraphs: [
        "Happy First Monthsary, Baby! Wa lang damha ba nga usa na ka buwan ang nilabay sukad nga atung gisugdan atung pag higugma'ay 'officially', Parang kalian lang baby sa? Looking back those days, I smile at everything we've shared together every conversation 'libak' hahaha, every laugh and every little moment with you. Thank you for trusting me to share your day, whether you're happy, excited, or just ranting I love listening to you.",
        "This is just a beginning of our journey together baby, daghan pa tag buhaton nga memories like visit og cafe's, kaon sa imong mga cravings, og sa lugar nga wapa natu naadtuan. Daghan pa tag trials ma agi'an og atung atubangon pareho, natural rana nay away or di pagkasinabut pero atu ranang storyaan, okay? Part na para mas molig'on ang pundasyon sa atung relasyon.",
        "Thank you for the full tank. it wasn't just my gas that you filled, you filled the parts of me that felt empty. You filled my days with happiness, my heart with love, and my mind with peace. When I felt drained, you filled me with strength. When I doubted myself, you filled me with reassurance. When I felt like I had nothing left, you reminded me that I was never alone. Thank you for constantly filling my life with your love, care, and kindness. "
      ],
      highlight: "I love youuuuu very very very very veryyyy muchhhh baby! alwayssss, permiiiii og kanunaaaaay, matag-adlaw gayud ta ka nga higugmaon baby ko♡"
    },
    
  ]

  // Array of her pictures for slideshow
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
    if (isOpen) {
      // Change slideshow image every 4 seconds
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [isOpen, images.length])

  const handleOpenEnvelope = (letter) => {
    setSelectedLetter(letter)
    setIsOpen(true)
  }

  const handleCloseLetter = () => {
    setIsOpen(false)
    setSelectedLetter(null)
  }

  return (
    <div className={`love-letter-section ${isOpen ? 'letter-is-open' : ''}`}>
      {/* Floating decorations */}
      <div className="letter-decorations">
        <span className="deco-item d1">🌹</span>
        <span className="deco-item d2">💕</span>
        <span className="deco-item d3">🌸</span>
        <span className="deco-item d4">💖</span>
        <span className="deco-item d5">✨</span>
        <span className="deco-item d6">💗</span>
        <span className="deco-item d7">🦋</span>
      </div>

      {!isOpen ? (
        /* Sealed Envelope Selection Grid */
        <div className="envelope-selection-container">
          <h2 className="envelope-hint">Choose what you want to read, Baby♡</h2>
          
          <div className="envelopes-grid">
            {lettersData.map((letter) => (
              <div 
                key={letter.id} 
                className="envelope-card-item"
                onClick={() => handleOpenEnvelope(letter)}
              >
                <div className="envelope">
                  <div className="flap top-flap"></div>
                  <div className="flap left-flap"></div>
                  <div className="flap right-flap"></div>
                  <div className="pocket"></div>
                  
                  {/* Sealed Wax Stamp Heart */}
                  <div className="heart-seal">
                    <span className="heart-icon">❤️</span>
                  </div>
                </div>
                <div className="envelope-tag-label">{letter.tag}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Opened Letter View */
        <div className="opened-letter-container">
          <button className="close-letter-btn" onClick={handleCloseLetter}>
           Close
          </button>
          
          <div className="letter-layout">
            
            {/* Left Side: Photo Frame Carousel */}
            <div className="letter-photo-frame">
              <div className="photo-card-polaroid">
                <div className="photo-slideshow">
                  {images.map((image, index) => (
                    <img 
                      key={index}
                      src={image} 
                      alt="My Love" 
                      className={`letter-photo ${index === currentImageIndex ? 'active' : ''}`}
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                  ))}
                </div>
                <div className="polaroid-label">
                  Pretty Baby♡
                </div>
              </div>
            </div>

            {/* Right Side: Love Letter Content */}
            <div className="letter-paper glass-panel">
              <div className="paper-line-decorations"></div>
              
              <h1 className="letter-title">{selectedLetter.intro}</h1>
              
              <div className="letter-body">
                {selectedLetter.paragraphs.map((p, idx) => (
                  <p key={idx} className="message-paragraph">
                    {p}
                  </p>
                ))}

                <div className="message-highlight">
                  <p className="highlight-text">{selectedLetter.highlight}</p>
                </div>
              </div>

              <div className="letter-signature">
                <p className="signature-text">Forever and Always,</p>
                <p className="signature-name">Itonworks ♡</p>
              </div>
            </div>
            
          </div>
        </div>
      )}
    </div>
  )
}

export default LoveLetter
