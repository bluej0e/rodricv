import ParticleBackground from './components/ParticleBackground'
import ThemeToggle from './components/ThemeToggle'
import LanguageToggle from './components/LanguageToggle'
import Portfolio from './components/Portfolio'
import ContactButton from './components/ContactButton'

export default function Home() {
  return (
    <main>
      <ThemeToggle />
      <LanguageToggle />
      <ParticleBackground />
      <Portfolio />
      <ContactButton />
    </main>
  )
} 