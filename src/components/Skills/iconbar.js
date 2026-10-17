import { skillIconFor } from './skillIcons'

const MIN_ITEMS = 16 // enough logos to fill the bar before it repeats
const SECONDS_PER_ITEM = 2.2

// endless horizontal strip of skill logos; the list is doubled so the loop is seamless
const IconBar = ({ skills }) => {
  let items = skills
  while (items.length < MIN_ITEMS) items = items.concat(skills)
  const loop = items.concat(items)

  return (
    <div className="icon-bar" aria-label={`Skills: ${skills.join(', ')}`}>
      <div
        key={skills.join()}
        className="icon-track"
        style={{ animationDuration: `${items.length * SECONDS_PER_ITEM}s` }}
      >
        {loop.map((skill, idx) => {
          const { Icon, color } = skillIconFor(skill)
          return (
            <span
              key={idx}
              className="icon-item"
              aria-hidden={idx >= items.length}
            >
              <Icon color={color} aria-hidden="true" />
              <span className="icon-name">{skill}</span>
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default IconBar
