import ParticleBackground from './components/ParticleBackground'
import ThemeToggle from './components/ThemeToggle'
import LanguageToggle from './components/LanguageToggle'

export default function Home() {
  return (
    <>
      <ThemeToggle />
      <LanguageToggle />
      <ParticleBackground />
      {/* Rest of the content from index.html */}
    </>
  )
} 