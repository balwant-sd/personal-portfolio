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
      'A real-time carrier vetting and freight fraud prevention platform that aggregates FMCSA compliance data, industry-reported fraud footprints, and identity verification logs to flag high-risk carriers before loads are booked.',
    technologies: [
      'Next.js',
      'Supabase',
      'Lovable',
      'Claude Code',
      'Cron Jobs',
    ],
    category: 'Logistics',
    status: 'Live',
    company: 'Deorwine Infotech',
    features: [
      'Forward-deployed engineering contact embedded with clients',
      'Rapid build-ship-iterate loops with agentic AI tools',
      'Resilient ingestion pipeline that survived breaking upstream schema changes',
      'Fixed a sync flaw that blanked ~8M records nightly, guaranteeing zero data gaps',
      'Post-launch monitoring, root-cause analysis, and hotfixes',
    ],
    images: [],
    githubUrl: null,
    liveUrl: 'https://www.crimreport.com/',
    isPrivate: false,
  },
  {
    id: 2,
    title: 'Freight Country',
    description:
      'A logistics marketplace enabling users to manage the complete freight lifecycle end to end.',
    technologies: ['Next.js', 'Flutter', 'Python', 'PostgreSQL'],
    category: 'Logistics',
    company: 'Deorwine Infotech',
    features: [
      'Led coordination for an 8-member team',
      'Sprint planning, delivery, and technical discussions',
      'Client communication and requirement clarification',
      'Resolved architecture challenges and authored SOPs for third-party API integrations',
    ],
    images: [],
    githubUrl: null,
    liveUrl: 'https://freightcountry.com/',
    isPrivate: false,
  },
  {
    id: 3,
    title: 'JMSS',
    description:
      'A CRM platform for automobile dealerships, managing the complete workflow from sales to service.',
    technologies: ['Next.js', 'MongoDB', 'Cursor AI'],
    category: 'CRM',
    company: 'Deorwine Infotech',
    features: [
      'Designed and built the entire platform single-handedly',
      'AI-assisted development cut effort by ~50%',
      'Scalable architecture with secure access control',
      'Workflows for leads, service tracking, customers, and finance records',
    ],
    images: [],
    githubUrl: null,
    liveUrl: null,
    isPrivate: true,
  },
  {
    id: 4,
    title: 'Avasar',
    description:
      'A digital brand-engagement platform powered by real-time validation and personalization.',
    technologies: ['Laravel', 'Flutter', 'PostgreSQL'],
    category: 'Brand Engagement',
    company: 'Deorwine Infotech',
    features: [
      'Designed the full technical architecture and database schema',
      'Optimized task and reward workflows',
      'Led coordination for a 7-member cross-functional team',
      'Worked with stakeholders to validate solutions and deliver end to end',
    ],
    images: [],
    githubUrl: null,
    liveUrl: 'https://www.avasar.club',
    isPrivate: false,
  },
  {
    id: 5,
    title: 'Bidbyt',
    description:
      'An internet startup building F&B marketplaces with the mission of making authentic cuisines easily accessible across borders.',
    technologies: ['PWA', 'Next.js', 'Fastify', 'MongoDB'],
    category: 'Marketplace',
    company: 'Deorwine Infotech',
    features: [
      'Grew from developer to leading the product with the founder',
      'Turned customer feedback and business requirements into features fast',
      'Owned monitoring, debugging, and day-to-day operations',
      'Contributed to product and growth strategy',
    ],
    images: [],
    githubUrl: null,
    liveUrl: 'https://www.facebook.com/bidbyt',
    linkLabel: 'Facebook Page',
    note: 'No longer operational',
    isPrivate: false,
  },
  {
    id: 6,
    title: 'MedVol Stockists',
    description:
      'A B2B web portal where pharmaceutical stockists manage orders, invoices, purchase orders and returns across multiple pharma companies and business modules.',
    category: 'Pharma B2B',
    company: 'Deorwine Infotech',
    technologies: [],
    features: [
      'Owned the portal end to end as the only frontend engineer, from wireframes and UI design to architecture and production releases',
      'Core workflows for orders, invoice upload and tracking, purchase orders, remarks, goods returns, and e-invoice acknowledgements',
      'Configuration-driven modules: tabs, columns and API versions come from a backend module list, so new business lines ship without rewriting screens',
      'Led a zero-downtime move from V1 to V2 microservice APIs with a version-dispatch layer running both side by side',
      'Presigned multi-file document uploads with safeguards against duplicate submissions',
      'Linked frontend, backend and DevOps: defined API contracts, flagged mismatches early, and coordinated releases',
    ],
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
      'A Gulf-focused B2C delivery startup where customers request orders, book pickups and returns, and schedule deliveries, while the business assigns drivers manually or automatically in real time.',
    category: 'Logistics',
    company: 'Deorwine Infotech',
    technologies: [],
    features: [
      'Owned database design and API development',
      'Order, pickup, return and scheduled-delivery flows',
      'Manual and real-time automatic driver assignment',
      'APIs powering the web app, admin portal and mobile apps',
    ],
    images: [],
    githubUrl: null,
    liveUrl: 'https://gofetchit-uae.com/',
    isPrivate: false,
  },
  {
    id: 8,
    title: 'LiveLoad',
    description:
      'An Africa-focused logistics marketplace where customers post single pickup to single delivery loads, vendors bid on them, and the assigned vendor hauls the parcel to its destination.',
    category: 'Logistics',
    company: 'Deorwine Infotech',
    technologies: [],
    features: [
      'Owned the web app, admin portal, database and API development',
      'Load posting, vendor bidding and assignment workflows',
      'Assigned vendors take responsibility for each haul from pickup to delivery',
      'APIs serving both the web platform and the mobile apps',
    ],
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
            A selection of products I’ve built and led across logistics, pharma, CRM,
            brand engagement, and marketplaces. I’ve also delivered
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
                    <p className="company">{project.company}</p>
                  </div>

                  {project.description && (
                    <p className="project-description">{project.description}</p>
                  )}

                  {project.features.length > 0 && (
                    <div className="project-features">
                      <h4>Key Features:</h4>
                      <ul>
                        {project.features.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    </div>
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
