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
      'Grew from junior developer to senior developer and project manager, leading cross-functional teams of up to 8 people.',
      'Led 4+ major product launches and dozens of feature releases across logistics, pharma, automotive, brand engagement and F&B marketplaces.',
      'Made two products ~40% faster through API and database optimisation, and designed the databases and architecture behind major projects.',
      'Moved a pharma B2B portal from V1 to V2 microservice APIs with zero downtime, and fixed a sync flaw that blanked ~8 million records every night on a freight platform.',
      'Wrote 5+ SOPs that saved 500+ man-hours, and ran releases across Netlify, Vercel and AWS for 5+ live projects.',
      'Worked directly with clients in the USA, Australia, UAE and Europe, turning their requirements into delivered products.',
    ],
  },
]

// headline numbers, all drawn from the CV
const stats = [
  { value: '7+', label: 'Years building products' },
  { value: '10+', label: 'Products shipped' },
  { value: '5', label: 'Industries' },
  { value: '8', label: 'People led in a team' },
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
            across logistics, pharma, automotive, and marketplaces. Today I work with clients as co-founder of FlipFlop
            Tech Lab, alongside senior engineers, project managers, business
            analysts, and QA. I hold a B.Tech in Computer Science from Rajasthan
            Technical University, Kota.
          </p>
          <ul className="stats-strip">
            {stats.map((stat) => (
              <li key={stat.label}>
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </li>
            ))}
          </ul>
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
