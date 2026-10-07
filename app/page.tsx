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
      <p className="wrap print-foot">rv.rodrigo.viola@gmail.com · rodrigo-viola.com · Live demos of my work at rodrigo-viola.com/work</p>
      <Closing />
    </main>
    </>
  )
}
