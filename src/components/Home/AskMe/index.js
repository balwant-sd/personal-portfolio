import { useEffect, useState } from 'react'

import './index.scss'

const questions = [
  {
    q: 'What can you build for me?',
    a: 'End-to-end web and mobile products: marketplaces, CRMs, logistics and data platforms. I cover architecture, database design, APIs, frontend, and deployment, plus the integrations that tie it together, like payments, messaging, and maps.',
  },
  {
    q: 'Can you take an idea to production?',
    a: 'Yes. I turn rough business goals into clear requirements, design the architecture, build and ship the product with monitoring in place, then keep improving it from real user feedback.',
  },
  {
    q: 'How do you keep delivery on track?',
    a: 'I run Agile sprints against a clear roadmap, break work into owned tasks, flag risks early, and keep engineering, design, QA, and stakeholders working from the same plan.',
  },
  {
    q: 'How do you use AI in your work?',
    a: 'I build with agentic tools like Claude Code, Cursor, Codex, and Lovable to prototype, ship, and test much faster, while I stay accountable for the architecture and code quality.',
  },
  {
    q: 'What if something breaks in production?',
    a: 'I trace it to the root cause, ship a safe fix quickly, then harden the system with better monitoring and safeguards so it does not happen again.',
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
