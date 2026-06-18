"use client";

import Link from "next/link";
import { useState } from "react";

type NavLink = {
  href: string;
  label: string;
};

type SiteNavProps = {
  links: NavLink[];
  badge?: string;
};

export function SiteNav({ links, badge }: SiteNavProps) {
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <nav className="site-nav">
      <div className="site-nav-inner container">
        <Link href="/" className="site-nav-logo" onClick={closeMenu}>
          <span className="site-nav-mark" aria-hidden="true" />
          <span className="site-nav-title">MIVA LEGACY</span>
        </Link>

        <div className="site-nav-right">
          {badge && (
            <span className="verified-badge verified-badge-nav">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
              {badge}
            </span>
          )}

          <div className="site-nav-desktop">
            {links.map((link) =>
              link.href.startsWith("#") || link.href.includes("#") ? (
                <a key={link.href} href={link.href} className="site-nav-link">
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} href={link.href} className="site-nav-link">
                  {link.label}
                </Link>
              )
            )}
          </div>

          <button
            type="button"
            className="site-nav-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span className={`site-nav-toggle-bar ${open ? "is-open" : ""}`} />
            <span className={`site-nav-toggle-bar ${open ? "is-open" : ""}`} />
            <span className={`site-nav-toggle-bar ${open ? "is-open" : ""}`} />
          </button>
        </div>
      </div>

      {open && (
        <div className="site-nav-mobile">
          {links.map((link) =>
            link.href.startsWith("#") || link.href.includes("#") ? (
              <a key={link.href} href={link.href} className="site-nav-mobile-link" onClick={closeMenu}>
                {link.label}
              </a>
            ) : (
              <Link key={link.href} href={link.href} className="site-nav-mobile-link" onClick={closeMenu}>
                {link.label}
              </Link>
            )
          )}
        </div>
      )}
    </nav>
  );
}
