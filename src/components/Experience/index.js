import { useEffect, useState } from 'react'

import { faBriefcase } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loader from 'react-loaders'

import AnimatedLetters from '../AnimatedLetters'
import './index.scss'

const workExperience = [
  {
    id: 0,
    company: 'FlipFlop Tech Lab',
    companyUrl: 'https://flipfloptechlab.com/',
    position: 'Co-founder · Freelance & Fractional Senior Software Engineer',
    duration: 'Oct 2026 – Present',
    location: 'Remote · Open to clients worldwide',
    achievements: [
      'Co-founded FlipFlop Tech Lab, a group of senior engineers, project managers, business analysts and QA who deliver complete solutions.',
      'Our stack covers web apps (PHP and Laravel, Django and Flask, MERN), WordPress and Shopify, Flutter mobile apps, AI/ML, AI agents, chatbots and automation, and DevOps.',
      'Building products end to end for clients, from idea and architecture to launch and iteration.',
      'Ongoing retainers that keep live products improving, stable, and well monitored.',
      'Fractional senior engineering: architecture decisions, delivery planning, and guiding engineering teams.',
      'Shipping faster with agentic AI tools while staying accountable for code quality.',
    ],
  },
  {
    id: 1,
    company: 'Deorwine Infotech',
    companyUrl: 'https://deorwine.com/',
    position:
      'Junior Developer → Software Developer → Senior Software Developer & Project Manager',
    duration: 'Apr 2019 – Oct 2026',
    location: 'Jaipur, Rajasthan, India',
    achievements: [
      'Led cross-functional teams of engineers, designers and QA from planning through delivery and release.',
      'Led products end to end across logistics, pharma, automotive, brand engagement and F&B marketplaces.',
      'Designed database schemas and system architecture for products built to scale.',
      'Improved application performance through API and database optimisation.',
      'Wrote SOPs for releases and third-party integrations that reduced development effort.',
      'Worked directly with international clients, turning their requirements into shipped products.',
    ],
  },
]

const Experience = () => {
  const experienceArray = 'Experience'.split('')
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <div className="container experience-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={experienceArray}
              idx={15}
            />
          </h1>
          <p>
            I grew from junior developer to senior developer and project
            manager, shipping products for startups and international clients
            across logistics, pharma, automotive, and marketplaces. Today I
            work with clients as co-founder of FlipFlop Tech Lab, alongside
            senior engineers, project managers, business analysts, and QA. I
            hold a B.Tech in Computer Science from Rajasthan Technical
            University, Kota.
          </p>
        </div>

        <div className="experience-container">
          <div className="timeline">
            {workExperience.map((job, index) => (
              <div
                key={job.id}
                className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
              >
                <div className="timeline-marker">
                  <FontAwesomeIcon icon={faBriefcase} />
                </div>
                <div className="timeline-content">
                  <div className="job-header">
                    <h3 className="company-name">
                      {job.companyUrl ? (
                        <a
                          href={job.companyUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {job.company}
                        </a>
                      ) : (
                        <span>{job.company}</span>
                      )}
                    </h3>
                    <h4 className="position">{job.position}</h4>
                    <div className="job-meta">
                      <span className="duration">{job.duration}</span>
                      <span className="location">{job.location}</span>
                    </div>
                  </div>
                  <ul className="achievements">
                    {job.achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default Experience
