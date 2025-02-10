import { translations } from '@/lib/translations'

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

export default function Interests() {
  return (
    <section className="interests glassmorphism">
      <h2><i className="fas fa-heart"></i> <span data-translate="interests.title">Interests & Activities</span></h2>
      <div className="interests-grid">
        {translations.en.interests.items.map((item, index) => (
          <div className="interest-item" key={index}>
            <i className={`fas fa-${getInterestIcon(item.title)}`}></i>
            <div className="interest-content">
              <h4 data-translate="title">{item.title}</h4>
              <p className="interest-detail" data-translate="detail">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
} 