import { translations } from '@/lib/translations'

function isExperienceEntry(value: any): value is { 
  company: string; 
  role: string; 
  period: string; 
  description: string; 
  achievements: string[]; 
} {
  return typeof value === 'object' && 'company' in value;
}

export default function Experience() {
  return (
    <section className="experience glassmorphism">
      <h2><i className="fas fa-briefcase"></i> Experience</h2>
      <div className="timeline">
        {['vairix', 'towerhouse', 'pgi', 'latamgaming'].map((company) => {
          const exp = translations.en.experience[company];
          if (!isExperienceEntry(exp)) return null;
          
          return (
            <div key={company} className="job" data-company={company}>
              <h3 data-translate={`experience.${company}.company`}>{exp.company}</h3>
              <p className="company">
                <span data-translate="role">{exp.role}</span>
                {' | '}
                <span data-translate="period">{exp.period}</span>
              </p>
              <p data-translate="description">{exp.description}</p>
              <ul data-translate="achievements">
                {exp.achievements.map((achievement: string, index: number) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  )
} 