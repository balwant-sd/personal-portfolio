import { useEffect, useMemo, useState } from 'react'

import Loader from 'react-loaders'

import IconBar from './iconbar'
import { skillCategories, skillsFor } from './skillsData'
import WordCloud from './wordcloud'
import AnimatedLetters from '../AnimatedLetters'
import './index.scss'

const Skills = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  const [category, setCategory] = useState('All')
  const texts = useMemo(() => skillsFor(category), [category])

  const skillsArray = 'Skills'.split('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <div className="container skills-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={skillsArray}
              idx={15}
            />
            <br />
          </h1>
          <p>
            I work across the stack with React, Next.js, Node.js, and Laravel,
            backed by MongoDB, MySQL, and PostgreSQL, on both monolithic and
            microservice architectures, deployed to Vercel, Netlify, AWS, and
            Heroku.
          </p>
          <p>
            I’ve integrated a wide range of third-party services: Stripe,
            Razorpay, Telr, and Cardknox for payments; SendGrid, Brevo, Twilio,
            and SMSGlobal for messaging; Firebase, Google Maps, New Relic, and
            Sentry. On the delivery side I run Agile, Scrum, and Kanban teams,
            own roadmaps and stakeholder communication, and mentor developers.
          </p>

          <div className="filter-container">
            {skillCategories.map((name) => (
              <button
                key={name}
                className={`filter-btn ${category === name ? 'active' : ''}`}
                onClick={() => setCategory(name)}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        <div className="tagcloud-wrap">
          <WordCloud texts={texts} />
        </div>

        <IconBar skills={texts} />
      </div>

      <Loader type="pacman" />
    </>
  )
}

export default Skills
