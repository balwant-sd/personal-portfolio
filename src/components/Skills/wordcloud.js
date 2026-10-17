import { useEffect, useRef } from 'react'

import TagCloud from 'TagCloud'

const options = {
  radius: 300,
  // animation speed
  // slow, normal, fast
  maxSpeed: 'fast',
  initSpeed: 'fast',
  // 0 = top
  // 90 = left
  // 135 = right-bottom
  direction: 135,
  // interact with cursor move on mouse out
  keep: true,
}

const WordCloud = ({ texts }) => {
  const containerRef = useRef(null)
  const cloudRef = useRef(null)

  // create the cloud once, then swap its words when the category changes
  useEffect(() => {
    if (!cloudRef.current) {
      cloudRef.current = TagCloud(containerRef.current, texts, options)
    } else {
      cloudRef.current.update(texts)
    }
  }, [texts])

  useEffect(
    () => () => {
      cloudRef.current?.destroy()
      cloudRef.current = null
    },
    []
  )

  return (
    <div className="main">
      <span className="content" ref={containerRef}></span>
    </div>
  )
}

export default WordCloud
