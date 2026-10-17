import { useEffect, useState } from 'react'

import './index.scss'

const questions = [
  {
    q: 'Can you lead a team?',
    a: 'Yes. I coordinated an 8-member team on Freight Country and a 7-member cross-functional team on Avasar, running sprint planning, delivery, and technical discussions, and I mentor developers day to day.',
  },
  {
    q: 'How fast can you ship an MVP?',
    a: 'Fast. I build with agentic AI tools like Claude Code, Cursor, and Lovable. That is how I built JMSS, a full dealership CRM, on my own while cutting the effort by about 50%.',
  },
  {
    q: 'Have you worked with global clients?',
    a: 'Yes. I am the primary point of contact for 5+ international clients across the USA, Australia, UAE, and Europe, keeping engineering, design, and QA aligned with their goals.',
  },
  {
    q: 'What if production breaks?',
    a: 'I own it. On CRIM Report I traced a sync flaw that blanked nearly 8 million records every night and restructured the cron jobs so the data never has gaps.',
  },
]

const TYPE_SPEED_MS = 18

const AskMe = () => {
  const [active, setActive] = useState(null)
  const [typed, setTyped] = useState('')

  // type the selected answer out one character at a time
  useEffect(() => {
    if (active === null) return
    const answer = questions[active].a
    let count = 0
    setTyped('')
    const timer = setInterval(() => {
      count += 1
      setTyped(answer.slice(0, count))
      if (count >= answer.length) clearInterval(timer)
    }, TYPE_SPEED_MS)
    return () => clearInterval(timer)
  }, [active])

  return (
    <div className="ask-me">
      <h3>Ask me</h3>
      <ul>
        {questions.map((item, idx) => (
          <li key={item.q}>
            <button
              className={active === idx ? 'active' : ''}
              onClick={() => setActive(idx)}
            >
              <span className="prompt">&rsaquo;</span>
              {item.q}
            </button>
          </li>
        ))}
      </ul>
      <p className="answer" aria-live="polite">
        {active === null ? 'Pick a question above.' : typed}
        {active !== null && typed.length < questions[active].a.length && (
          <span className="caret">|</span>
        )}
      </p>
    </div>
  )
}

export default AskMe
