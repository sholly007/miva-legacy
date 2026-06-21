export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-brand">
        <span className="site-nav-mark site-nav-mark-sm" aria-hidden="true" />
        <span className="site-footer-title">MIVA LEGACY</span>
      </div>
      <span className="site-footer-copy">© 2026 Miva Open University · Pioneer Class</span>
      <div className="site-footer-contact">
        <a 
          href="https://wa.me/233543152242" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Contact us on WhatsApp"
          className="site-footer-icon"
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12.04 2C6.58 2 2.18 6.4 2.18 11.85C2.18 13.76 2.73 15.57 3.75 17.1L2 22l5.2-1.93c1.47.84 3.16 1.33 4.84 1.33h.01c5.46 0 9.86-4.4 9.86-9.85C21.91 6.4 17.51 2 12.05 2zm.01 18c-1.45 0-2.9-.39-4.16-1.13l-.3-.18-3.1 1.15 1.17-3.03-.19-.31c-.79-1.28-1.22-2.77-1.22-4.31 0-4.5 3.67-8.16 8.18-8.16 2.18 0 4.22.85 5.77 2.4 1.55 1.55 2.4 3.6 2.4 5.78 0 4.5-3.67 8.16-8.17 8.16zm4.45-6.08c-.08-.13-.29-.21-.6-.37-.31-.16-1.86-.92-2.15-1.02-.29-.1-.5-.15-.71.15-.21.29-.81 1.02-.99 1.23-.18.21-.36.23-.67.08-.31-.15-1.32-.49-2.51-1.56-.93-.83-1.56-1.86-1.74-2.17-.18-.31-.02-.48.13-.63.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.09-.19.05-.35-.02-.49-.08-.13-.69-1.66-.95-2.27-.25-.6-.51-.51-.69-.52h-.59c-.21 0-.54.08-.82.38-.29.29-1.09 1.07-1.09 2.6 0 1.53 1.12 3 1.27 3.21.15.21 2.12 3.26 5.13 4.56.72.31 1.28.49 1.72.63.72.23 1.38.2 1.9.12.58-.09 1.86-.76 2.13-1.5.26-.74.26-1.37.18-1.5z"/>
          </svg>
        </a>
        <a 
          href="mailto:sonwopal@gmail.com" 
          aria-label="Email us"
          className="site-footer-icon"
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
        </a>
      </div>
    </footer>
  );
}
