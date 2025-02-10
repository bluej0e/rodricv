'use client'

import { useState, useEffect } from 'react'
import { translations } from '@/lib/translations'
import type { Translation } from '@/lib/types'

type Language = 'en' | 'es'

function translateElements(selector: string, path: string, lang: Language) {
  document.querySelectorAll(selector).forEach(element => {
    const keys = path.split('.');
    let translation: any = translations[lang];
    for (const key of keys) {
      translation = translation[key];
    }
    if (translation && element instanceof HTMLElement) {
      element.textContent = translation;
    }
  });
}

function translateList(selector: string, path: string, lang: Language) {
  const elements = document.querySelectorAll(selector);
  const keys = path.split('.');
  let translationArray: any = translations[lang];
  for (const key of keys) {
    translationArray = translationArray[key];
  }
  
  elements.forEach((element, index) => {
    if (translationArray[index] && element instanceof HTMLElement) {
      element.textContent = translationArray[index];
    }
  });
}

function translateContent(lang: Language) {
  // Update meta tags
  document.documentElement.lang = lang;
  
  // Translate main sections
  translateElements('[data-translate="title"]', 'title', lang);
  translateElements('[data-translate="subtitle"]', 'subtitle', lang);
  translateElements('[data-translate="about.title"]', 'about.title', lang);
  translateElements('[data-translate="experience.title"]', 'experience.title', lang);
  translateElements('[data-translate="skills.title"]', 'skills.title', lang);
  translateElements('[data-translate="contact.button"]', 'contact.button', lang);

  // Translate about section
  translateList('[data-translate="about.content"] p', 'about.content', lang);

  // Translate experience section
  document.querySelectorAll('[data-company]').forEach(jobSection => {
    if (!(jobSection instanceof HTMLElement)) return;
    const company = jobSection.dataset.company;
    if (!company) return;

    const exp = translations[lang].experience[company];
    if (typeof exp === 'string') return;

    const roleElement = jobSection.querySelector('[data-translate="role"]');
    const periodElement = jobSection.querySelector('[data-translate="period"]');
    const descriptionElement = jobSection.querySelector('[data-translate="description"]');
    const h3Element = jobSection.querySelector('h3');

    if (roleElement instanceof HTMLElement) roleElement.textContent = exp.role;
    if (periodElement instanceof HTMLElement) periodElement.textContent = exp.period;
    if (descriptionElement instanceof HTMLElement) descriptionElement.textContent = exp.description;
    if (h3Element instanceof HTMLElement) h3Element.textContent = exp.company;

    const achievements = jobSection.querySelectorAll('[data-translate="achievements"] li');
    exp.achievements.forEach((achievement: string, index: number) => {
      const element = achievements[index];
      if (element instanceof HTMLElement) {
        element.textContent = achievement;
      }
    });
  });

  // Translate contact info
  translateElements('[data-translate="contact.email_address"]', 'contact.email_address', lang);
  translateElements('[data-translate="contact.website"]', 'contact.website', lang);
  translateElements('[data-translate="contact.phone"]', 'contact.phone', lang);
  translateElements('[data-translate="contact.location"]', 'contact.location', lang);

  // Translate skills section
  translateElements('[data-translate="skills.subtitle"]', 'skills.subtitle', lang);
  translateElements('[data-translate="skills.categories.ai.title"]', 'skills.categories.ai.title', lang);
  translateElements('[data-translate="skills.categories.automation.title"]', 'skills.categories.automation.title', lang);
  translateElements('[data-translate="skills.categories.development.title"]', 'skills.categories.development.title', lang);
  translateElements('[data-translate="skills.categories.marketing.title"]', 'skills.categories.marketing.title', lang);

  // Translate education section
  translateElements('[data-translate="education.title"]', 'education.title', lang);
  
  // Translate each education item
  document.querySelectorAll('.education-item').forEach((item, index) => {
    const education = translations[lang].education.items[index];
    if (!education) return;

    const degreeElement = item.querySelector('[data-translate="degree"]');
    const schoolElement = item.querySelector('[data-translate="school"]');
    const descriptionElement = item.querySelector('[data-translate="description"]');

    if (degreeElement instanceof HTMLElement) degreeElement.textContent = education.degree;
    if (schoolElement instanceof HTMLElement) schoolElement.textContent = education.school;
    if (descriptionElement instanceof HTMLElement) descriptionElement.textContent = education.description;
  });

  // Translate interests section
  translateElements('[data-translate="interests.title"]', 'interests.title', lang);
  
  // Translate each interest item
  document.querySelectorAll('.interest-item').forEach((item, index) => {
    const interest = translations[lang].interests.items[index];
    if (!interest) return;

    const titleElement = item.querySelector('[data-translate="title"]');
    const detailElement = item.querySelector('[data-translate="detail"]');

    if (titleElement instanceof HTMLElement) titleElement.textContent = interest.title;
    if (detailElement instanceof HTMLElement) detailElement.textContent = interest.detail;
  });

  // Add smooth transition effect
  if (document.body) {
    document.body.style.opacity = '0';
    setTimeout(() => {
      if (document.body) {
        document.body.style.opacity = '1';
      }
    }, 200);
  }
}

export default function LanguageToggle() {
  const [lang, setLang] = useState<Language>('en')

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') as Language || 'en'
    setLang(savedLang)
    document.documentElement.setAttribute('data-lang', savedLang)
    translateContent(savedLang)
  }, [])

  const toggleLanguage = () => {
    const newLang: Language = lang === 'en' ? 'es' : 'en'
    setLang(newLang)
    document.documentElement.setAttribute('data-lang', newLang)
    localStorage.setItem('lang', newLang)
    translateContent(newLang)
  }

  return (
    <div className="lang-switch">
      <button onClick={toggleLanguage} className="lang-toggle">
        <i className="fas fa-globe"></i>
        <span>{lang.toUpperCase()}</span>
      </button>
    </div>
  )
} 