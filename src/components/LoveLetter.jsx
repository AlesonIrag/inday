import { useState, useEffect } from 'react'
import './LoveLetter.css'

function LoveLetter() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Array of her pictures for slideshow
  const images = [
    '/gf.jpeg',
    '/g.png',
    '/v.png',
    '/s.jpeg',
    '/qt.png',
    '/q.png',
    '/t.png',
    '/w.png',
    '/a.png',
  ]

  useEffect(() => {
    // Change image every 4 seconds for a more romantic pace
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 4000)
    
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="love-letter">
      {/* Floating decorations */}
      <div className="letter-decorations">
        <span className="decoration-item" style={{ top: '10%', left: '5%', animationDelay: '0s' }}>🌹</span>
        <span className="decoration-item" style={{ top: '15%', right: '8%', animationDelay: '0.5s' }}>💕</span>
        <span className="decoration-item" style={{ top: '30%', left: '3%', animationDelay: '1s' }}>🌸</span>
        <span className="decoration-item" style={{ top: '45%', right: '5%', animationDelay: '1.5s' }}>💖</span>
        <span className="decoration-item" style={{ bottom: '30%', left: '7%', animationDelay: '2s' }}>🌺</span>
        <span className="decoration-item" style={{ bottom: '20%', right: '10%', animationDelay: '2.5s' }}>💗</span>
        <span className="decoration-item" style={{ top: '60%', left: '10%', animationDelay: '3s' }}>🌼</span>
        <span className="decoration-item" style={{ bottom: '40%', right: '3%', animationDelay: '3.5s' }}>❤️</span>
      </div>

      <div className="letter-container">
        {/* Her Picture Slideshow */}
        <div className="letter-photo-frame">
          <div className="photo-hearts">
          </div>
          
          {/* Slideshow images */}
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
          
          <div className="photo-flowers">
          </div>
        </div>

        {/* Romantic Message */}
        <div className="letter-message-card">
          <h1 className="letter-title">My Inday,</h1>
          
          <div className="letter-body">
            <p className="message-paragraph">
Hi Inday! mag inoa nasad ko ha kay mao man jud imong e sulti ba HAHAHA, di jud bitaw ko kaybaw mo himo letter pero i'll try. Nabuhat ko ni nga system kay mag long last ni as long as di e delete, ganahan ko memorable imong valentines day sa kani nga gamay nga effort, wala man koy mahatag nga flower karun nga valentines pero labaw panis flower , explore this system kay pun'an pa ko ni sa mga umaabut pa natu nga date og mga memories nga mahimo. CHECK THIS SYSTEM EVERYTIME NAA TAY DATE.


            </p>
            
            <p className="message-paragraph">
Thank you for giving me inspiration every single day both physically and virtually, I felt very comfortable. Thank you for staying even when I offended you many times. Salamat sa advices ako jud tu gipang sink in sa akoa, dako kaayug impact to tanan sa akong kinabuhi. Salamat sa tanan kaayu nimo nako dae, I love you and I will love you always.
 
            </p>
            
            <p className="message-paragraph">
Ayaw na palabig ka stress sa imong kuya ha, if naa ka problem naa rako ha "all ears to listen" problema nimo tanan even sa school, family or anything, ayaw tawn luoma. About sa "vocal when it comes sa atua" okay rajud na nako ma feel man sad nako imong actions nga na appreciate nimo tanan, ka anad na ha kay mao nani dina baya ta magbuwag ana ko HAHAHAHAHA.

            </p>

            <div className="message-highlight">
              <p className="highlight-text">Take care always my pretty/beautiful/gorgeous inday/doy. I love youuu!♡ </p>
            </div>
          </div>

          <div className="letter-signature">
            <p className="signature-text">Forever and Always,</p>
            <p className="signature-name">Itonworks♡</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoveLetter
