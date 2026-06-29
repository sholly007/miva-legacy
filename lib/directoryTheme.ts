export function getDirectoryTheme(isPostgraduate: boolean) {
  return {
    button: isPostgraduate ? "btn-card-blue" : "btn-card",
    accent: isPostgraduate ? "text-mid-blue" : "text-accent",
    border: isPostgraduate ? "border-mid-blue" : "border-accent",
    panel: isPostgraduate ? "panel-postgraduate" : "panel",
    alumniCard: isPostgraduate ? "alumni-card-postgraduate" : "alumni-card",
    verifiedBadge: isPostgraduate ? "verified-badge-blue" : "verified-badge",
    panelQuote: isPostgraduate ? "panel-quote-blue" : "panel-quote",
    paginationActive: isPostgraduate ? "pagination-number-active-blue" : "active",
    lightboxClose: isPostgraduate ? "lightbox-close-blue" : "lightbox-close",
    sectionLabel: isPostgraduate ? "section-label-blue" : "section-label",
    sectionTitle: isPostgraduate ? "section-title-blue" : "section-title",
    alumniCardPhoto: isPostgraduate ? "alumni-card-photo-blue" : "alumni-card-photo",
    alumniCardCohort: isPostgraduate ? "alumni-card-cohort-blue" : "alumni-card-cohort",
  };
}
