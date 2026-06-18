"use client";

import Link from "next/link";
import { useState } from "react";

type NavLink = {
  href: string;
  label: string;
};

type SiteNavProps = {
  links: NavLink[];
  tagline?: string;
};

export function SiteNav({ links, tagline }: SiteNavProps) {
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <nav className="site-nav">
      <div className="site-nav-inner">
        <Link href="/" className="site-nav-logo" onClick={closeMenu}>
          <span className="site-nav-mark" aria-hidden="true" />
          <span className="site-nav-title">MIVA LEGACY</span>
        </Link>

        {tagline && <span className="site-nav-tagline">{tagline}</span>}

        <div className="site-nav-desktop">
          {links.map((link) =>
            link.href.startsWith("#") ? (
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

      {open && (
        <div className="site-nav-mobile">
          {links.map((link) =>
            link.href.startsWith("#") ? (
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
