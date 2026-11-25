import { useEffect, useState } from 'react'

import {
  faCode,
  faCodeBranch,
  faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loader from 'react-loaders'

import { iconFor } from './techIcons'
import AnimatedLetters from '../AnimatedLetters'
import './index.scss'

// Projects data - easily scalable for future additions
const projects = [
  {
    id: 1,
    title: 'CRIM Report',
    description:
      'A carrier vetting and freight fraud prevention platform. It brings together FMCSA compliance data, industry-reported fraud signals and identity checks, so brokers and shippers can spot high-risk carriers before a load is booked.',
    technologies: [
      'Next.js',
      'Supabase',
      'Lovable',
      'Claude Code',
      'Cron Jobs',
    ],
    category: 'Logistics',
    status: 'Live',
    images: [],
    githubUrl: null,
    liveUrl: 'https://www.crimreport.com/',
    isPrivate: false,
  },
  {
    id: 2,
    title: 'Freight Country',
    description:
      'A freight marketplace for running the complete freight lifecycle in one place, end to end, with third-party logistics services integrated into the workflow.',
    technologies: ['Next.js', 'Flutter', 'Python', 'PostgreSQL'],
    category: 'Logistics',
    images: [],
    githubUrl: null,
    liveUrl: 'https://freightcountry.com/',
    isPrivate: false,
  },
  {
    id: 3,
    title: 'JMSS',
    description:
      'A CRM for automobile dealerships that covers the whole journey from sales to service: leads, service tracking, and customer and finance records, with role-based access for each team.',
    technologies: ['Next.js', 'MongoDB', 'Cursor AI'],
    category: 'CRM',
    images: [],
    githubUrl: null,
    liveUrl: null,
    isPrivate: true,
  },
  {
    id: 4,
    title: 'Avasar',
    description:
      'A brand-engagement platform where people complete tasks for brands and earn rewards, with real-time validation of every task and personalised experiences.',
    technologies: ['Laravel', 'Flutter', 'PostgreSQL'],
    category: 'Brand Engagement',
    images: [],
    githubUrl: null,
    liveUrl: 'https://www.avasar.club',
    isPrivate: false,
  },
  {
    id: 5,
    title: 'Bidbyt',
    description:
      'An F&B marketplace startup that set out to make authentic cuisines easy to order across borders, built as a progressive web app.',
    technologies: ['PWA', 'Next.js', 'Fastify', 'MongoDB'],
    category: 'Marketplace',
    images: [],
    githubUrl: null,
    liveUrl: null,
    note: 'No longer operational',
    isPrivate: false,
  },
  {
    id: 6,
    title: 'MedVol Stockists',
    description:
      'A B2B portal where pharmaceutical stockists manage orders, invoices, e-invoices, purchase orders and returns across multiple pharma companies. It is configuration-driven, so new business lines launch without rebuilding screens.',
    category: 'Pharma B2B',
    technologies: ['Next.js'],
    images: [],
    githubUrl: null,
    liveUrl: 'https://stockist.medvol.in',
    note: 'Access protected by SSO',
    isPrivate: false,
  },
  {
    id: 7,
    title: 'GoFetchIt',
    description:
      'A Gulf-focused delivery service where customers request orders, book pickups and returns, and schedule deliveries, while the business assigns drivers manually or automatically in real time.',
    category: 'Logistics',
    technologies: ['Express.js', 'React', 'MongoDB', 'Linode', 'AWS S3'],
    images: [],
    githubUrl: null,
    liveUrl: null,
    isPrivate: false,
  },
  {
    id: 8,
    title: 'LiveLoad',
    description:
      'An Africa-focused logistics marketplace: customers post a pickup and delivery, vendors bid on the load, and the winning vendor hauls it to its destination. It spans a web app, an admin portal and the APIs behind the mobile apps.',
    category: 'Logistics',
    technologies: ['React', 'Fastify', 'MongoDB', 'AWS S3'],
    images: [],
    githubUrl: null,
    liveUrl: null,
    isPrivate: true,
  },
]

const Projects = () => {
  const projectsArray = 'Projects'.split('')
  const [letterClass, setLetterClass] = useState('text-animate')
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  // Get unique categories for filtering
  const categories = [
    'All',
    ...new Set(projects.map((project) => project.category).filter(Boolean)),
  ]

  // Filter projects based on selected category
  const filteredProjects =
    filter === 'All'
      ? projects
      : projects.filter((project) => project.category === filter)

  return (
    <>
      <div className="container projects-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={projectsArray}
              idx={15}
            />
          </h1>
          <p>
            A selection of products I’ve built and led across logistics, pharma,
            CRM, brand engagement, and marketplaces. I’ve also delivered
            DocumentMaken, Kuwait Local, and more.
          </p>

          {/* Category Filter */}
          <div className="filter-container">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${filter === category ? 'active' : ''}`}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="projects-container">
          <div className="projects-grid">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="project-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Project Images Section - with provision for multiple images */}
                {project.images && project.images.length > 0 && (
                  <div className="project-images">
                    <div className="image-carousel">
                      {project.images.map((image, idx) => (
                        <img
                          key={idx}
                          src={image}
                          alt={`${project.title} ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="project-content">
                  <div className="project-header">
                    <div className="project-meta">
                      {project.category && (
                        <span className="category">{project.category}</span>
                      )}
                      {project.year && (
                        <span className="year">{project.year}</span>
                      )}
                      {project.status && (
                        <span
                          className={`status ${project.status.toLowerCase()}`}
                        >
                          {project.status}
                        </span>
                      )}
                    </div>
                    <h3 className="project-title">{project.title}</h3>
                  </div>

                  {project.description && (
                    <p className="project-description">{project.description}</p>
                  )}

                  {project.technologies.length > 0 && (
                    <div className="technologies">
                      {project.technologies.map((tech) => {
                        const { Icon, color } = iconFor(tech)
                        return (
                          <span key={tech} className="tech-tag">
                            <Icon color={color} aria-hidden="true" />
                            {tech}
                          </span>
                        )
                      })}
                    </div>
                  )}

                  <div className="project-links">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="project-link"
                      >
                        <FontAwesomeIcon icon={faCodeBranch} />
                        <span>Code</span>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="project-link"
                      >
                        <FontAwesomeIcon icon={faExternalLinkAlt} />
                        <span>{project.linkLabel || 'Visit Site'}</span>
                      </a>
                    )}
                    {project.note && (
                      <span className="project-note">{project.note}</span>
                    )}
                    {project.isPrivate && (
                      <span className="private-indicator">
                        <FontAwesomeIcon icon={faCode} />
                        <span>Private Project</span>
                      </span>
                    )}
                  </div>
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

export default Projects
