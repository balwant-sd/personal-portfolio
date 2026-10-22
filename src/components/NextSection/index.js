import { faArrowDown, faComments } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'

import { sectionNames, sections } from '../Layout/useSectionScroll'
import { openTalk } from '../TalkToMe'
import './index.scss'

// phone-only button at the end of a section; the last section offers a chat instead
const NextSection = ({ path }) => {
  const navigate = useNavigate()
  const next = sections[sections.indexOf(path) + 1]

  if (!next) {
    return (
      <div className="next-section">
        <button type="button" onClick={openTalk}>
          <span>Let's talk</span>
          <FontAwesomeIcon icon={faComments} />
        </button>
      </div>
    )
  }

  return (
    <div className="next-section">
      <button type="button" onClick={() => navigate(next)}>
        <span>Next: {sectionNames[next]}</span>
        <FontAwesomeIcon icon={faArrowDown} />
      </button>
    </div>
  )
}

export default NextSection
