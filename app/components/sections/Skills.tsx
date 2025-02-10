import { translations } from '@/lib/translations'

export default function Skills() {
  return (
    <section className="skills glassmorphism">
      <h2><i className="fas fa-robot"></i> <span data-translate="skills.title">Skills & Expertise</span></h2>
      <p className="mb-8" data-translate="skills.subtitle">
        Specialized in building sophisticated automation systems and AI integrations that transform business operations:
      </p>
      <div className="tech-categories">
        <div className="tech-category ai">
          <h4>
            <i className="fas fa-wand-magic-sparkles"></i>
            <span data-translate="skills.categories.ai.title">AI & LLMs</span>
          </h4>
          <div className="tech-tags">
            {translations.en.skills.categories.ai.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        </div>

        <div className="tech-category automation">
          <h4>
            <i className="fas fa-gears"></i>
            <span data-translate="skills.categories.automation.title">Automation</span>
          </h4>
          <div className="tech-tags">
            {translations.en.skills.categories.automation.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        </div>

        <div className="tech-category development">
          <h4>
            <i className="fas fa-code"></i>
            <span data-translate="skills.categories.development.title">Development</span>
          </h4>
          <div className="tech-tags">
            {translations.en.skills.categories.development.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        </div>

        <div className="tech-category marketing">
          <h4>
            <i className="fas fa-bullhorn"></i>
            <span data-translate="skills.categories.marketing.title">Digital Marketing</span>
          </h4>
          <div className="tech-tags">
            {translations.en.skills.categories.marketing.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 