import { useEffect, useState } from 'react'

import { faBriefcase } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loader from 'react-loaders'

import AnimatedLetters from '../AnimatedLetters'
import './index.scss'

const workExperience = [
  {
    id: 1,
    company: 'Deorwine Infotech',
    companyUrl: 'https://deorwine.com/',
    position: 'Senior Software Developer & Project Manager',
    duration: 'Oct 2023 – Present',
    location: 'Jaipur, Rajasthan, India',
    achievements: [
      'Managed 4+ major product launches and dozens of feature releases.',
      'Boosted app performance by ~40% through API and database optimizations for two products.',
      'Designed databases for 2 major projects with optimized relationships and scalable data flows.',
      'Created 5+ SOPs that streamlined workflows and saved 500+ cumulative man-hours.',
      'Improved efficiency and deployment stability by managing releases across Netlify, Vercel, and AWS for 5+ live projects with high uptime and smoother releases.',
      'Acted as the primary point of contact for 5+ international clients (USA, Australia, UAE, Europe) and coordinated cross-functional workflows across engineering, design, QA, and client.'
    ]
  },
  {
    id: 2,
    company: 'Deorwine Infotech',
    companyUrl: 'https://deorwine.com/',
    position: 'Software Developer',
    duration: 'June 2020 – Oct 2023',
    location: 'Jaipur, Rajasthan, India',
    achievements: [
      'Delivered 3+ full-scale web applications across logistics, pharma, and marketplace domains.',
      'Contributed across the stack using React, Next.js, Node.js, MySQL, and REST APIs.',
      'Improved system performance through API optimizations and architectural refinements.',
      'Took ownership of module design, requirement clarification, and team coordination.'
    ]
  },
  {
    id: 3,
    company: 'Deorwine Infotech',
    companyUrl: 'https://deorwine.com/',
    position: 'Junior Software Developer',
    duration: 'Apr 2019 – June 2020',
    location: 'Jaipur, Rajasthan, India',
    achievements: [
      'Built foundational skills using React.js, PHP, and MySQL.',
      'Supported senior developers and contributed to API integrations and UI enhancements.',
      'Learned to operate in different project environments and adapt to varying expectations.'
    ]
  }
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
            Since 2019 I’ve grown at Deorwine Infotech from junior developer to
            senior developer and project manager, shipping products for
            startups and international clients across logistics, pharma,
            automotive, and marketplaces. Before that I earned a B.Tech in
            Computer Science from Rajasthan Technical University, Kota.
          </p>
        </div>

        <div className="experience-container">
          <div className="timeline">
            {workExperience.map((job, index) => (
              <div key={job.id} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-marker">
                  <FontAwesomeIcon icon={faBriefcase} />
                </div>
                <div className="timeline-content">
                  <div className="job-header">
                    <h3 className="company-name">
                      <a href={job.companyUrl} target="_blank" rel="noreferrer">
                        {job.company}
                      </a>
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
