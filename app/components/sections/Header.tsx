export default function Header() {
  return (
    <header className="glassmorphism">
      <div className="profile-section">
        <div className="profile-content">
          <h1>Rodrigo Viola</h1>
          <p className="title" data-translate="title">
            AI & Automation Expert | Digital Marketing Strategist
          </p>
          <p className="subtitle" data-translate="subtitle">
            Transforming Business Through AI & Automation
          </p>
        </div>
      </div>
      <div className="contact-info">
        <a href="mailto:rv.rodrigo.viola@gmail.com" className="contact-item tag">
          <i className="fas fa-envelope"></i>
          <span data-translate="contact.email_address">rv.rodrigo.viola@gmail.com</span>
        </a>
        <a href="https://rodrigoviola.online" target="_blank" className="contact-item tag">
          <i className="fas fa-globe"></i>
          <span data-translate="contact.website">RodrigoViola.online</span>
        </a>
        <a href="tel:+59892033302" className="contact-item tag">
          <i className="fas fa-phone"></i>
          <span data-translate="contact.phone">+598 092 033 302</span>
        </a>
        <span className="contact-item tag">
          <i className="fas fa-map-marker-alt"></i>
          <span data-translate="contact.location">Montevideo, Uruguay</span>
        </span>
      </div>
    </header>
  )
} 