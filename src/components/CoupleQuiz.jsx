import { useState } from 'react'
import './CoupleQuiz.css'

function CoupleQuiz() {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selectedOpt, setSelectedOpt] = useState(null)
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const quizData = [
    {
      question: "Sino ang unang na-crush o unang nahulog sa ating dalawa?",
      options: [
        { text: "Si Baby (inday na maganda) ♡", isCorrect: false },
        { text: "Si Itonworks (crush tika dugay na!) 💖", isCorrect: true }
      ],
      correctComment: "Sakto! Crush na kay tika sukad pa sa una pa kaayo, sige lang kog ngisi adtong 18th birthday nimo HAHAHA!",
      wrongComment: "Ay mali! Ako jud ang una, pwerteng ngisi nako sa birthday sayaw nato! 😜"
    },
    {
      question: "Sino ang paborito nating 'Bossmanok' na maldita ug daling magtampo?",
      options: [
        { text: "Si Itonworks (super tagapagpasensya)", isCorrect: false },
        { text: "Si Baby (maldita pero pinalangga) 🐔", isCorrect: true }
      ],
      correctComment: "Mismo! Maldita kaayo ka usahay pero kabalo ko daling lambingon HAHAHA!",
      wrongComment: "Weh? Ikaw kaya! Bossmanok chicken wings yarn? 😂"
    },
    {
      question: "Saan ang ating pinaka-memorable at nakakakilig na first date?",
      options: [
        { text: "Sa dapit kung asa ko naghuwat nimo samtang nag apply kag OJT 🏫", isCorrect: true },
        { text: "Sa sinehan nga dako ug screen 🎬", isCorrect: false }
      ],
      correctComment: "Correct! Naikog kaayo ko ato kay nadugay ko, pero didto nagsugod ang tanan. Kilig kaayo! ♡",
      wrongComment: "Mali! Hinumdomi tong dapit kung asa ko nimo gihuwat samtang nag-apply kog OJT! 😉"
    },
    {
      question: "Unsay i-libre sa imo ni Itonworks para mawala imong sapot or kaguol?",
      options: [
        { text: "Ulan nga basang basa ta duha 🌧️", isCorrect: false },
        { text: "Paborito nimong Unliwings! 🍗", isCorrect: true }
      ],
      correctComment: "Tumpak! Dretso dayon unliwings para mabalik ang smile sa akong baby!",
      wrongComment: "Mali! Sige kag kaguol sa unliwings dretso dayon ta unliwings! 😋"
    },
    {
      question: "Kinsa tong sige ug ingon 'dili lagi ko muhilak' pero muhilak dindo sa sinehan?",
      options: [
        { text: "Si Baby nga iyakin dindo HAHAHA 😭", isCorrect: true },
        { text: "Si Itonworks nga astig", isCorrect: false }
      ],
      correctComment: "HAHAHA Sakto kaayo! 'Di lagi ko muhilak' pero pwerte diayng hilak dindooo! Cute kaayo!",
      wrongComment: "Mali! Ikaw to dae! Sige kag ingon 'di lagi ko muhilak' pero kabasa imong mata! 😂"
    }
  ]

  const handleOptionClick = (option, optIdx) => {
    if (showAnswerFeedback) return
    setSelectedOpt(optIdx)
    setShowAnswerFeedback(true)
    if (option.isCorrect) {
      setScore(prev => prev + 1)
    }
  }

  const handleNextClick = () => {
    setSelectedOpt(null)
    setShowAnswerFeedback(false)
    if (currentIdx + 1 < quizData.length) {
      setCurrentIdx(currentIdx + 1)
    } else {
      setQuizCompleted(true)
    }
  }

  const handleRestart = () => {
    setCurrentIdx(0)
    setSelectedOpt(null)
    setShowAnswerFeedback(false)
    setScore(0)
    setQuizCompleted(false)
  }

  const currentQuestion = quizData[currentIdx]

  return (
    <div className="couple-quiz-container">
      <div className="quiz-header">
        <h2 className="quiz-title">Couple Trivia Quiz 🎮</h2>
        <p className="quiz-subtitle">Gaano mo kakilala ang ating relasyon, Baby? Sagutin ang pagsusulit!</p>
      </div>

      {!quizCompleted ? (
        <div className="quiz-card glass-panel">
          <div className="quiz-progress-bar-container">
            <div 
              className="quiz-progress-bar" 
              style={{ width: `${((currentIdx) / quizData.length) * 100}%` }}
            ></div>
          </div>
          
          <div className="quiz-question-counter">
            Question {currentIdx + 1} of {quizData.length}
          </div>
          
          <h3 className="quiz-question-text">{currentQuestion.question}</h3>
          
          <div className="quiz-options-list">
            {currentQuestion.options.map((option, idx) => {
              let optClass = ""
              if (showAnswerFeedback) {
                if (option.isCorrect) optClass = "correct-opt"
                else if (selectedOpt === idx) optClass = "incorrect-opt"
                else optClass = "disabled-opt"
              } else if (selectedOpt === idx) {
                optClass = "selected-opt"
              }
              
              return (
                <button
                  key={idx}
                  className={`quiz-option-btn ${optClass}`}
                  onClick={() => handleOptionClick(option, idx)}
                  disabled={showAnswerFeedback}
                >
                  {option.text}
                </button>
              )
            })}
          </div>

          {showAnswerFeedback && (
            <div className={`answer-feedback-box ${currentQuestion.options[selectedOpt]?.isCorrect ? 'fb-correct' : 'fb-incorrect'}`}>
              <p className="feedback-comment">
                {currentQuestion.options[selectedOpt]?.isCorrect 
                  ? currentQuestion.correctComment 
                  : currentQuestion.wrongComment
                }
              </p>
              <button className="quiz-next-btn" onClick={handleNextClick}>
                {currentIdx + 1 === quizData.length ? "Finish Quiz 🏁" : "Next Question →"}
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Completed Screen */
        <div className="quiz-completed-card glass-panel">
          <div className="completed-trophy">🏆</div>
          <h3 className="completed-title">Quiz Completed!</h3>
          <p className="completed-score">
            You scored <strong className="score-number glow-text">{score}</strong> out of <strong className="score-total">{quizData.length}</strong>!
          </p>
          
          <div className="sweet-award-box">
            <h4>🏆 Certificate of Best Girlfriend Ever 🏆</h4>
            <p>
              This certifies that **Baby** is officially the most beautiful, gorgeous, pinalangga, and paboritong Bossmanok in Itonworks' entire universe. I love you forever and always! ♡
            </p>
          </div>

          <button className="quiz-restart-btn" onClick={handleRestart}>
            Play Again 🔄
          </button>
        </div>
      )}
    </div>
  )
}

export default CoupleQuiz
