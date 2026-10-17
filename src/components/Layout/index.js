import { useEffect, useRef, useState } from 'react'

import { useLocation, useOutlet } from 'react-router-dom'

import TalkToMe from '../TalkToMe'
import useSectionScroll, { sections } from './useSectionScroll'
import Sidebar from '../Sidebar/'
import StarField from '../StarField'
import './index.scss'

const TRANSITION_MS = 800

const Layout = () => {
  useSectionScroll()

  const location = useLocation()
  const outlet = useOutlet()
  const [layers, setLayers] = useState([
    { key: location.pathname, element: outlet, direction: null },
  ])
  const prevPath = useRef(location.pathname)

  // keep the outgoing section mounted while the new one slides over it
  useEffect(() => {
    if (location.pathname === prevPath.current) return undefined
    const from = sections.indexOf(prevPath.current)
    const to = sections.indexOf(location.pathname)
    const direction = to < from ? 'down' : 'up'
    prevPath.current = location.pathname

    setLayers((current) => [
      current[current.length - 1],
      { key: location.pathname, element: outlet, direction },
    ])
    const timer = setTimeout(
      () =>
        setLayers((current) =>
          current.slice(-1).map((layer) => ({ ...layer, direction: null }))
        ),
      TRANSITION_MS
    )
    return () => clearTimeout(timer)
    // outlet changes with the location, so the pathname is the only trigger
  }, [location.pathname])

  return (
    <div className="App">
      <Sidebar />
      <div className="page">
        <span className="tags top-tags">&lt;body&gt;</span>

        {layers.map((layer) => (
          <div
            key={layer.key}
            className={`section-layer${
              layer.direction ? ` slide-${layer.direction}` : ''
            }`}
          >
            {layer.element}
          </div>
        ))}
        <StarField />
        <span className="tags bottom-tags">
          &lt;/body&gt;
          <br />
          <span className="bottom-tag-html">&lt;/html&gt;</span>
        </span>
      </div>
      <TalkToMe />
    </div>
  )
}

export default Layout
