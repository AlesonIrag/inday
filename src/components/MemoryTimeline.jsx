import { useState } from 'react'
import './MemoryTimeline.css'

function MemoryTimeline() {
  const [selectedMemory, setSelectedMemory] = useState(null)
  
  const memories = [
    {
      id: 1,
      date: 'January 25, 2023',
      title: 'Your 18th Birthday',
      icon: '/db.jpg',
      description: 'The first time we danced remains in my memory.',
      image: '/db.jpg',
      story: 'First makakupot sa imong kamot nya crush tika dugay na maong sige kog ngisi atu kay sagul ang emotion pero naglabi ang kilig HAHAHAHA, sunod sayaw kay kasal natu HAHAHAHA ',
      rotation: -2,
    },
    {
      id: 2,
      date: 'December 03, 2025',
      title: 'First Date',
      icon: '/fd.jpeg',
      description: 'Memorable date',
      image: '/fd.jpeg',
      story: 'Naikog ko nimo ani kay gihuwat jud ko nimo kay nadugay kog apply para OJT HAHAHA. but anyway, kananang lugara ang pinaka memorable sa akoa kay first natu date wa ko nag expect nga mosugot ka makig date sa akoa. kilig kayko ana TBH HAHAHAHA',
      rotation: 3,
    },
    {
      id: 3,
      date: 'January 20, 2026',
      title: 'Second Date',
      icon: '/sd.jpg',
      description: 'Sakpan nanay yarn? HAHAHAHAH',
      image: '/sd.jpg',
      story: 'Kani nga time nagpasukod kog ring nya wa pajud ko kita ni rosit kay wa ka nag ingun kuyog mog gawas HAHAHAHAHA, pag uli kay kulba kaayu ka kay sakpan nanay "sultii nalang akong mga kuya" HAHAHA. sunod sukod ring sa wedding ring na',
      rotation: -3,
    },
    {
      id: 4,
      date: 'January 30, 2026',
      title: 'Third Date',
      icon: '/td.jpg',
      description: 'Gamayng oras tilokon makauban lang ka',
      image: '/td.jpg',
      story: 'Kani nga time kay first hatag nako flower "napay daghan puhon" first time na ko maong wakoy idea unsaon paghatag gisunod nalang nako sa tiktok sud2 sa ubox HAHAHA, nindut sad kayni nga date kay wajud planohi ba "managgkot man tu ang plano" pag uli pwerteng basaa natu duha, ayaw kabalaka dina ta mabasa puhon kay palit tag raptor, land cruiser og alphard HAHAHAHAHA',
      rotation: 2,
    },
    {
      id: 5,
      date: 'February 14, 2026',
      title: 'Fourth Date',
      icon: '/yt.jpg',
      description: 'Happy Valentines Day!',
      image: '/yt.jpg',
      story: 'Happy Valentines Day, Inday! abi jud nakog di ta madayun HAHAHAHAH guol pa kayko abi kog di ta madayun kay ni ana kag "di ko palakwon ni mama" HAHAHAH TBH nag ampo jud ko madayun lang ta nya dako kaykog pasalamat kay gi dungog akong gi ampo nga madayun ta. Anyways, happy kaykooo promiseee, first time pud nako maka date sa valentines day and happy ko kayko jud as in walay kabutangan "tawga lang kog oa HAHAHA" I love you, inday!!! ',
      rotation: -2,
    },
    {
      id: 6,
      date: 'January 30, 2026',
      title: 'Angry you',
      icon: '/n.jpg',
      description: 'Ka scary',
      image: '/n.jpg',
      story: 'Hadlok jud kayka maglagut HAHAHAHA ay astig man ko nganong mahadlok man ko?????? joke HAHAHAHAAHAHA astig ras barkada pero di nimo. pulong pa bitawng ate belen "salbahis kayna, og maldita ko mas pa na" pero atubangon japun ko na imong ka maldita lisud raba kayka lambingon HAHAHAHAHA',
      rotation: 4,
    },
    {
      id: 7,
      date: 'February 2026',
      title: 'Flowers',
      icon: '/ww.jpeg',
      description: 'My happiness',
      image: '/ww.jpeg',
      story: 'Happy jud kayko nga mohatag ko nimo og flowers bisag gamay rana "makahatag ra nya kog mahalon og dagko puhon". Kasabut rajud ko ha nga wa ka maanad no worries about that, okay? that flowers reminds that I love you and you are very important to meee. Thank you, Inday! sa imong genuine nga gipakita nako, so much appreciated!!! ',
      rotation: -3,
    },
    {
      id: 8,
      date: 'February 2026',
      title: 'First Story nimo nako',
      icon: '/fs.jpg',
      description: 'KILIG KAAYU HAHAHAHAA',
      image: '/fs.jpg',
      story: 'KAKILIGGG KAAAAYUUUUUUU, wajud ko nag expect ana ay HAHAHAHAHA, appreciate kaayu nako daeee. Salamat kaayu indayyyy, very appreciated!!!! ',
      rotation: 1,
    },
    {
      id: 9,
      date: 'November 26, 2023',
      title: 'Family yarn?',
      icon: '/fa.jpg',
      description: 'Feel nanako da belong ko HAHAHA',
      image: '/fa.jpg',
      story: 'Katu ning time nga wa mi nag expect nga mag gray mi tanan mga kuya nimo "og makahinumdom ka" HAHAHAHAHA chill2 ra ta ninyu diri nya inom sila ginagmay HAHAHA sila ra ha',
      rotation: -1,
    },
    {
      id: 10,
      date: 'March 18, 2026',
      title: 'Bossmanok',
      icon: '/bm.jpg',
      description: 'Pakan.on para di saputon',
      image: '/bm.jpg',
      story: 'Grabe kag expectation sa inyung unliwings pero wa madayun, pero dikom sugot maguol akong baby dad on dayun og unliwings HAHAHA',
      rotation: 3,
    },
    {
      id: 11,
      date: 'March 18, 2026',
      title: 'Sine Date',
      icon: '/mm.jpg',
      description: 'Iyakin',
      image: '/mm.jpg',
      story: '"di lagi kom hilak" HAHAHAHAHA dindooooo HAHAHAHAHAHAHAA',
      rotation: -2,
    },
    {
      id: 12,
      date: 'March 27, 2026',
      title: 'Mt.View',
      icon: '/by.jpg',
      description: 'From cafe to mt.view',
      image: '/by.jpg',
      story: 'From cafe to Mt.view ba HAHAHA, andoks lang ang baon, napiyok pa pagbabye sa vc sa imong friends HAHAHAHA',
      rotation: 2,
    },
    {
      id: 13,
      date: 'April 08, 2026',
      title: 'Coke Tumbler',
      icon: '/ck.jpg',
      description: 'Bawalan mag coke pero gipangitaan jug sudlanan',
      image: '/ck.jpg',
      story: 'TBHHHHH, na feel kaayu nako nga happy kayka nakuha nimo ang tumbler "inpired na mag coke" happy kayko makita ka nga happy babyyy',
      rotation: -3,
    },
    {
      id: 14,
      date: 'March 23, 2026',
      title: 'Shawarmaaa',
      icon: '/js.jpg',
      description: 'Thanks sa libre babyyyz ',
      image: '/js.jpg',
      story: 'Thanks sa libre babyyyy, FAVVVV SHAWARMAAAA kuhang-kuha mo talaga gusto ko baby, mwamwaaaa',
      rotation: 1,
    },
    {
      id: 15,
      date: 'April 04, 2026',
      title: 'Hermits Cove',
      icon: '/tr.jpg',
      description: 'Pa dungog2 kas tiktok ha, adtuon dayun HAHAHA',
      image: '/tr.jpg',
      story: 'Ganahan kayko dad.on kag hermits, aside sa nagpadungog2 ka, reward sad ko na nimo kay drained ka ana nga week',
      rotation: -2,
    },
    {
      id: 16,
      date: 'April 15, 2026',
      title: 'Mt.view shots',
      icon: '/aa.jpg',
      description: 'Tagay with Baby HAHAHAHA',
      image: '/aa.jpg',
      story: 'FIRST KISSS SA LIPSSSS KILIG KAAAYU SHITTTT, DIPA KO GANAHAN MOULI JUD ATU NGA TIME KAY GANAHANA PA KO MAKAUBAN KA, ILOVEYOUBABYYYY',
      rotation: 3,
    },
    {
      id: 17,
      date: 'April 03, 2026',
      title: 'Family picture?',
      icon: '/or.jpg',
      description: 'Nag Picture nalang tag atua kay wala na sila, dina ka mauwaw',
      image: '/or.jpg',
      story: 'Naka pabor og picture kay wala na sila bayaw HAHAHAHAHAHAH, kana nga time kabantay najuds neil HAHAHAHAHAHAHA',
      rotation: -1,
    },
    {
      id: 18,
      date: 'May 8, 2026',
      title: 'My Palagi',
      icon: '/rrrt.jpg',
      description: 'TJs live concert',
      image: '/rt.jpg',
      story: 'palagiii HAHAHA uwaw kaykong gwyn ani uy HAHAHA, pero lingaw kayko nayabong gung nestea',
      rotation: 3,
    },
    {
      id: 19,
      date: 'May 27, 2026',
      title: 'Lola Edz Bday',
      icon: '/rrt.jpg',
      description: 'Resort',
      image: '/rrt.jpg',
      story: 'Garaag resort oh mura jug namayad HHAHAHAHA tsinelas doy ay HAHAHAHAHA, nindut kayni kay nikuyog imo mama og papa pero wa ka naka inom HAHAHAHA',
      rotation: 3,
    },
    {
      id: 20,
      date: 'June 4, 2026',
      title: 'The day you said yes',
      icon: '/msr.jpeg',
      description: 'Ka clingy sakong uyab uy',
      image: '/msr.jpeg',
      story: 'Pinaka kiliggg na momenttt dijud ko ni kalimtan giunsa ko nimo pagsugot HAHAHAHA. Im happy baby I love youuu',
      rotation: 3,
    },
     {
      id: 21,
      date: 'July 4, 2026',
      title: 'I love taking picture to you',
      icon: '/kj.jpg',
      description: 'Picture taking with my baby',
      image: '/kj.jpg',
      story: 'Ikaw akong model posing diha akoy bahalas picture, strikta kaykas angle baya HAHAHA mag practice kog maayu baby',
      rotation: 3,
    },
    {
      id: 22,
      date: 'July 4, 2026',
      title: 'Flowers',
      icon: '/ssa.jpg',
      description: 'Giving you flowers',
      image: '/ssa.jpg',
      story: 'I love giving you flowers, Baby. Funny kaayu ni pagkuha nakos seller kay sakpan nasad ko nimo HAHAHA dijud ka ma surprise uy',
      rotation: 3,
    },
    {
      id: 23,
      date: 'July 4, 2026',
      title: '1st Montsary',
      icon: '/q.jpg',
      description: 'I love youuu',
      image: '/q.jpg',
      story: 'Thank you, baby! nag enjoy kaykos atung monthsary. Salamat sa perfume baby kani ang pinakamahal nako na perfume, I love ittt!',
      rotation: 3,
    },
    {
      id: 24,
      date: 'July 4, 2026',
      title: 'First Photobooth',
      icon: '/zxc.jpg',
      description: 'I love youuuu',
      image: '/zxc.jpg',
      story: 'Sundan pa natug mga photobooth baby, I love youuuu!',
      rotation: 3,
    },
  ]

  return (
    <div className="memory-timeline">
      <div className="timeline-header">
        <h2 className="timeline-title">Every picture tells a story ♡</h2>
        <p className="timeline-subtitle">Every moment with you is a beautiful memory locked in time.</p>
      </div>

      {/* Polaroid Gallery Grid */}
      <div className="polaroid-gallery">
        {memories.map((memory) => (
          <div 
            key={memory.id}
            className="polaroid-pin-card"
            style={{ transform: `rotate(${memory.rotation || 0}deg)` }}
            onClick={() => setSelectedMemory(memory)}
          >
            {/* Cute Pin/Tape decorative element */}
            <div className="polaroid-washi-tape"></div>
            
            <div className="polaroid-img-wrapper">
              <img src={memory.icon} alt={memory.title} className="polaroid-thumbnail" />
            </div>
            
            <div className="polaroid-card-info">
              <span className="polaroid-card-date">{memory.date || 'Romantic Day'}</span>
              <h3 className="polaroid-card-title">{memory.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal View */}
      {selectedMemory && (
        <div className="memory-modal" onClick={() => setSelectedMemory(null)}>
          <div className="memory-modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedMemory(null)}>×</button>
            
            <div className="modal-body-layout">
              {/* Polaroid Picture Frame inside Modal */}
              <div className="modal-polaroid-frame">
                <img 
                  src={selectedMemory.image} 
                  alt={selectedMemory.title} 
                  className="modal-polaroid-img" 
                />
              </div>

              {/* Text stories */}
              <div className="modal-details">
                <div className="details-header">
                  <span className="details-date">{selectedMemory.date || 'Sweet Memory'}</span>
                  <h3 className="details-title">{selectedMemory.title}</h3>
                </div>
                
                <div className="details-story-box">
                  <p className="details-story-text">{selectedMemory.story}</p>
                </div>
                
                <div className="details-footer">
                  <span className="details-seal">Itonworks♡</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MemoryTimeline
