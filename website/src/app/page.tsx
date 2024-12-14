import { Example } from '~/components/docs/example'
import { Usage } from '~/components/docs/usage'
import { Installation } from '../components/docs/installation'
import { Hero } from '../components/hero'

export default function Home() {
  return (
    <div className="space-y-8">
      <Hero />
      <Installation />
      <Usage />
      <Example />
    </div>
  )
}
