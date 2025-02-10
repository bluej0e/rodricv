import { translations } from '@/lib/translations'

export default function Education() {
  return (
    <section className="education glassmorphism">
      <h2><i className="fas fa-graduation-cap"></i> <span data-translate="education.title">Education</span></h2>
      <div className="education-timeline">
        {translations.en.education.items.map((item, index) => (
          <div className="education-item" key={index}>
            <h3 data-translate="degree">{item.degree}</h3>
            <p className="school" data-translate="school">{item.school}</p>
            <p data-translate="description">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
} 