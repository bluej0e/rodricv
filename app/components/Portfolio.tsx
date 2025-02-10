'use client'

import Header from './sections/Header'
import About from './sections/About'
import Experience from './sections/Experience'
import Skills from './sections/Skills'
import Education from './sections/Education'
import Interests from './sections/Interests'

export default function Portfolio() {
  return (
    <div className="container">
      <Header />
      <About />
      <Experience />
      <Skills />
      <Education />
      <Interests />
    </div>
  )
}

function isExperienceEntry(value: any): value is { 
  company: string; 
  role: string; 
  period: string; 
  description: string; 
  achievements: string[]; 
} {
  return typeof value === 'object' && 'company' in value;
}

function getInterestIcon(title: string): string {
  const iconMap: Record<string, string> = {
    'Gaming': 'gamepad',
    'Urban Exploration': 'mountain',
    'Camping': 'campground',
    'Cycling': 'bicycle',
    'Café Culture': 'coffee',
    'Reading': 'book',
    'Tech Exploration': 'laptop-code',
    'Beach': 'umbrella-beach',
    'Cinema': 'film',
    'Travel': 'plane',
    'Mindfulness': 'leaf',
    'Entrepreneurship': 'lightbulb'
  }
  return iconMap[title] || 'star'
} 