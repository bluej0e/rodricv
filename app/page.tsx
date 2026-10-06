import Hero from './components/Hero'
import Experience from './components/Experience'
import Systems from './components/Systems'
import Stack from './components/Stack'
import Closing from './components/Closing'
import SiteNav from './components/SiteNav'

export default function Page() {
  return (
    <>
    <SiteNav current="cv" />
    <main>
      <Hero />
      <Experience />
      <Systems />
      <Stack />
      <Closing />
    </main>
    </>
  )
}
