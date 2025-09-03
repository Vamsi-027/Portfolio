'use client'

import HeroStatus from '../components/HeroStatus'
import MissionLog from '../components/MissionLog'
import Directives from '../components/Directives'
import CommsLink from '../components/CommsLink'

export default function Home() {
  return (
    <div className="space-y-0">
      <HeroStatus />
      <MissionLog />
      <Directives />
      <CommsLink />
    </div>
  )
}