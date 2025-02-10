'use client'

export default function ContactButton() {
  return (
    <div className="contact-button">
      <button className="contact-trigger">
        <i className="fas fa-comments"></i>
        <span data-translate="contact.button">Contact Me</span>
      </button>
      <div className="contact-menu">
        <a href="mailto:rv.rodrigo.viola@gmail.com" className="contact-option">
          <i className="fas fa-envelope"></i>
          <span data-translate="contact.email">Email</span>
        </a>
        <a href="tel:+59892033302" className="contact-option">
          <i className="fas fa-phone"></i>
          <span data-translate="contact.call">Call</span>
        </a>
        <a href="https://wa.me/59892033302" target="_blank" className="contact-option">
          <i className="fab fa-whatsapp"></i>
          <span data-translate="contact.whatsapp">WhatsApp</span>
        </a>
        <a href="https://t.me/ro_mvd" target="_blank" className="contact-option">
          <i className="fab fa-telegram"></i>
          <span data-translate="contact.telegram">Telegram</span>
        </a>
      </div>
    </div>
  )
} 