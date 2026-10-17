import { useEffect, useState } from 'react'

import {
  faFlagCheckered,
  faHandshake,
  faLayerGroup,
  faRobot,
  faRocket,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loader from 'react-loaders'

import AnimatedLetters from '../AnimatedLetters'
import './index.scss'

const promises = [
  { icon: faRocket, label: 'Ship Fast', color: '#ff4500' },
  { icon: faUsers, label: 'Lead Teams', color: '#00ff7f' },
  { icon: faLayerGroup, label: 'Scale Systems', color: '#28a4d9' },
  { icon: faHandshake, label: 'Client First', color: '#ffd700' },
  { icon: faRobot, label: 'AI-Accelerated', color: '#c084fc' },
  { icon: faFlagCheckered, label: 'Own Delivery', color: '#ec4d28' },
]

const About = () => {
  const aboutArray = 'About Me'.split('')

  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <div className="container about-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={aboutArray}
              idx={15}
            />
          </h1>
          <p>
            I’m a Senior Software Developer & Project Manager based in Jaipur,
            India, with 7+ years at Deorwine Infotech. My journey began hands-on
            in software engineering and organically expanded into team
            leadership, product thinking, and cross-functional delivery
            ownership.
          </p>
          <p>
            I’ve worked with early-stage startups, mid-scale products, and
            structured enterprise environments, so I’m comfortable in both
            high-velocity and process-driven teams. I’m known for bridging the
            gap between engineering, clients, and management, combining
            technical depth with clear communication.
          </p>
          <p>
            Lately I build and ship with agentic AI tools like Claude Code,
            Codex, Cursor, and Lovable to move from idea to production faster.
          </p>
        </div>

        <div className="stage-cube-cont">
          <div className="cubespinner">
            {promises.map((promise, idx) => (
              <div key={promise.label} className={`face${idx + 1}`}>
                <FontAwesomeIcon icon={promise.icon} color={promise.color} />
                <span className="face-label">{promise.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default About
