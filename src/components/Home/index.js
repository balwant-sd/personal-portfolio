import { useEffect, useState } from 'react'

import Loader from 'react-loaders'

import AskMe from './AskMe'
import Logo from './Logo'
import RoleRotator from './RoleRotator'
import AnimatedLetters from '../AnimatedLetters'
import { openTalk } from '../TalkToMe'
import './index.scss'

const Home = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  const nameArray = 'alwant'.split('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 4000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <div className="container home-page">
        <div className="text-zone">
          <h1>
            <span className={letterClass}>H</span>
            <span className={`${letterClass} _12`}>i,</span>
            <br />
            <span className={`${letterClass} _13`}>I</span>
            <span className={`${letterClass} _14`}>'m</span>
            <span className="title-initial">B</span>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={nameArray}
              idx={15}
            />
            <br />
            <RoleRotator />
          </h1>
          <h2>
            Full Stack Engineering | Product Delivery | Agentic AI Development
          </h2>
          <button type="button" className="flat-button" onClick={openTalk}>
            LET'S TALK
          </button>
        </div>
        <div className="home-visual">
          <Logo />
          <AskMe />
        </div>
      </div>

      <Loader type="pacman" />
    </>
  )
}

export default Home
