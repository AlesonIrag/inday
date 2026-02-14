import { useState } from 'react'
import './MemoryTimeline.css'

function MemoryTimeline() {
  const [selectedMemory, setSelectedMemory] = useState(null)
  
  const memories = [
    {
      id: 1,
      date: 'January 25,2023',
      title: 'Your 18th Birthday',
      icon: '/db.jpg',
      description: 'The first time we danced remains in my memory.',
      image: '/db.jpg',
      story: 'First makakupot sa imong kamot nya crush tika dugay na maong sige kog ngisi atu kay sagul ang emotion pero naglabi ang kilig HAHAHAHA, sunod sayaw kay kasal natu HAHAHAHA ',
      zoom: 'out'
    },
     {
      id: 2,
      date: 'December 03, 2025',
      title: 'First Date',
      icon: '/fd.jpeg',
      description: 'Memorable date',
      image: '/fd.jpeg',
      story: 'Naikog ko nimo ani kay gihuwat jud ko nimo kay nadugay kog apply para OJT HAHAHA. but anyway, kananang lugara ang pinaka memorable sa akoa kay first natu date wa ko nag expect nga mosugot ka makig date sa akoa. kilig kayko ana TBH HAHAHAHA',    },
     {
      id: 3,
      date: 'January 20, 2026',
      title: 'Second Date',
      icon: '/sd.jpg',
      description: 'Sakpan nanay yarn? HAHAHAHAH',
      image: '/sd.jpg',
      story: 'Kani nga time nagpasukod kog ring nya wa pajud ko kita ni rosit kay wa ka nag ingun kuyog mog gawas HAHAHAHAHA, pag uli kay kulba kaayu ka kay sakpan nanay "sultii nalang akong mga kuya" HAHAHA. sunod sukod ring sa wedding ring na', },
    {
      id: 4,
      date: 'January 30, 2026',
      title: 'Third Date',
      icon: '/td.jpg',
      description: 'Gamayng oras tilokon makauban lang ka',
      image: '/td.jpg',
      story: 'Kani nga time kay first hatag nako flower "napay daghan puhon" first time na ko maong wakoy idea unsaon paghatag gisunod nalang nako sa tiktok sud2 sa ubox HAHAHA, nindut sad kayni nga date kay wajud planohi ba "managgkot man tu ang plano" pag uli pwerteng basaa natu duha, ayaw kabalaka dina ta mabasa puhon kay palit tag raptor, land cruiser og alphard HAHAHAHAHA',    },
{
      id: 4,
      date: 'February 14, 2026',
      title: 'Fourth Date',
      icon: '/yt.jpg',
      description: 'Happy Valentines Day!',
      image: '/yt.jpg',
      story: 'Happy Valentines Day, Inday! abi jud nakog di ta madayun HAHAHAHAH guol pa kayko abi kog di ta madayun kay ni ana kag "di ko palakwon ni mama" HAHAHAH TBH nag ampo jud ko madayun lang ta nya dako kaykog pasalamat kay gi dungog akong gi ampo nga madayun ta. Anyways, happy kaykooo promiseee, first time pud nako maka date sa valentines day and happy ko kayko jud as in walay kabutangan "tawga lang kog oa HAHAHA" I love you, inday!!! ' , } ,
     { 

      id: 5,
      date: 'January 30, 2026',
      title: 'Angry you',
      icon: '/n.jpg',
      description: 'Ka scary',
      image: '/n.jpg',
       story: 'Hadlok jud kayka maglagut HAHAHAHA ay astig man ko nganong mahadlok man ko?????? joke HAHAHAHAAHAHA astig ras barkada pero di nimo. pulong pa bitawng ate belen "salbahis kayna, og maldita ko mas pa na" pero atubangon japun ko na imong ka maldita lisud raba kayka lambingon HAHAHAHAHA',     },
   
   { 

      id: 5,
      title: 'Flowers',
      icon: '/ww.jpeg',
      description: 'My happiness',
      image: '/ww.jpeg',
       story: 'Happy jud kayko nga mohatag ko nimo og flowers bisag gamay rana "makahatag ra nya kog mahalon og dagko puhon". Kasabut rajud ko ha nga wa ka maanad no worries about that, okay? that flowers reminds that I love you and you are very important to meee. Thank you, Inday! sa imong genuine nga gipakita nako, so much appreciated!!! ' },
        { 

      id: 5,
      title: 'First Story nimo nako ',
      icon: '/fs.jpg',
      description: 'KILIG KAAYU HAHAHAHAA',
      image: '/fs.jpg',
       story: 'KAKILIGGG KAAAAYUUUUUUU, wajud ko nag expect ana ay HAHAHAHAHA, appreciate kaayu nako daeee. Salamat kaayu indayyyy, very appreciated!!!! ', },
       {
      id: 7,
      date: 'November 26, 2023',
      title: 'Family yarn?',
      icon: '/fa.jpg',
      description: 'Feel nanako da belong ko HAHAHA',
      image: '/fa.jpg',
      story: 'Katu ning time nga wa mi nag expect nga mag gray mi tanan mga kuya nimo "og makahinumdom ka" HAHAHAHAHA chill2 ra ta ninyu diri nya inom sila ginagmay HAHAHA sila ra ha',    },
  ]

  return (
    <div className="memory-timeline">
      <h2 className="timeline-title">Every picture tells a story♡</h2>
      <p className="timeline-subtitle">Every moment with you is a beautiful memory</p>
      
      <div className="timeline-container">
        <div className="timeline-line"></div>
        
        {memories.map((memory, index) => (
          <div 
            key={memory.id}
            className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
            onClick={() => setSelectedMemory(memory)}
          >
            <div className="timeline-content">
              <div className="timeline-icon">
                <img src={memory.icon} alt="Her" className="timeline-icon-img" />
              </div>
              <div className="timeline-date">{memory.date}</div>
              <h3 className="timeline-event-title">{memory.title}</h3>
              <p className="timeline-description">{memory.description}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedMemory && (
        <div className="memory-modal" onClick={() => setSelectedMemory(null)}>
          <div className="memory-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedMemory(null)}>×</button>
            <img src={selectedMemory.image} alt={selectedMemory.title} className={`memory-image ${selectedMemory.zoom === 'out' ? 'zoom-out' : ''}`} />
            <div className="memory-details">
              <h3>{selectedMemory.title}</h3>
              <p className="memory-date">{selectedMemory.date}</p>
              <p className="memory-story">{selectedMemory.story}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MemoryTimeline
