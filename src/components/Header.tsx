import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, Phone, Siren, X, CalendarCheck } from "lucide-react";
import { useDemoUI } from "../context/DemoUI";

export const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "Doctors", to: "/doctors" },
  { label: "Departments", to: "/departments" },
  { label: "Services", to: "/services" },
  { label: "Patients", to: "/patients" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="brand" aria-label="Aurelia Multispeciality Hospital — home">
      <span className="brand__mark" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M12 4.5v15M4.5 12h15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <circle cx="12" cy="12" r="9.25" stroke="currentColor" strokeWidth="1.4" opacity="0.5" />
        </svg>
      </span>
      {!compact && (
        <span className="brand__text">
          <span className="brand__name">Aurelia Multispeciality Hospital</span>
          <span className="brand__tag">Advanced Care. Connected Healthcare.</span>
        </span>
      )}
    </Link>
  );
}

function EmergencyStrip() {
  const { openEmergency } = useDemoUI();
  return (
    <div className="emergency-strip">
      <div className="container emergency-strip__inner">
        <p className="emergency-strip__msg">
          <span className="pulse-icon">
            <Siren size={15} strokeWidth={2.2} aria-hidden="true" />
          </span>
          <span className="hide-xs">Emergency?</span>
          <button type="button" className="emergency-strip__call" onClick={openEmergency}>
            Call 108 / Emergency Services
          </button>
        </p>
        <div className="emergency-strip__meta">
          <a href="tel:+910000000000" className="hide-sm">
            <Phone size={13} aria-hidden="true" style={{ display: "inline", verticalAlign: "-2px", marginRight: 6 }} />
            +91 XXX XXX XXXX
          </a>
          <span className="demo-pill">Demo concept</span>
          <span className="hide-sm">Not a real hospital</span>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const { openAppointment, menuOpen, setMenuOpen, openEmergency } = useDemoUI();
  const [stuck, setStuck] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, setMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <EmergencyStrip />
      <header className={`site-header ${stuck ? "is-stuck" : ""}`}>
        <div className="container site-header__inner">
          <Brand />

          <nav className="main-nav" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === "/"}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="header-actions">
            <button type="button" className="btn btn--primary btn--sm" onClick={() => openAppointment()}>
              <CalendarCheck size={15} aria-hidden="true" />
              Book Appointment
            </button>
          </div>

          <div className="header-mobile">
            <button type="button" className="icon-btn icon-btn--emergency header-emergency" onClick={openEmergency} aria-label="Emergency, call 108">
              <Siren size={19} aria-hidden="true" />
              <span className="header-emergency__label">108</span>
            </button>
            <button
              type="button"
              className="icon-btn"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-drawer"
            >
              <Menu size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <>
          <div className="drawer-backdrop" onClick={() => setMenuOpen(false)} aria-hidden="true" />
          <div className="drawer" id="mobile-drawer" role="dialog" aria-modal="true" aria-label="Site menu">
            <div className="drawer__head">
              <Brand />
              <button type="button" className="icon-btn" onClick={() => setMenuOpen(false)} aria-label="Close menu">
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <nav className="drawer__body" aria-label="Mobile navigation">
              {NAV_ITEMS.map((item) => (
                <NavLink key={item.to} to={item.to} end={item.to === "/"} className="drawer__link">
                  {item.label}
                  <Chevron />
                </NavLink>
              ))}
              <NavLink to="/ai-healthcare" className="drawer__link">
                AI Healthcare
                <Chevron />
              </NavLink>
              <NavLink to="/patient-portal" className="drawer__link">
                Patient Portal
                <Chevron />
              </NavLink>
              <NavLink to="/blog" className="drawer__link">
                Health Resources
                <Chevron />
              </NavLink>

              <div className="drawer__emergency">
                <strong>
                  <Siren size={15} aria-hidden="true" style={{ display: "inline", verticalAlign: "-2px", marginRight: 6 }} />
                  Emergency
                </strong>
                <span className="muted" style={{ fontSize: "0.82rem" }}>
                  Demo contact — replace before production.
                </span>
                <a href="tel:+910000000000" className="btn btn--danger btn--sm">
                  Call +91 XXX XXX XXXX
                </a>
              </div>
            </nav>
            <div className="drawer__foot">
              <button
                type="button"
                className="btn btn--primary btn--block"
                onClick={() => {
                  setMenuOpen(false);
                  openAppointment();
                }}
              >
                <CalendarCheck size={16} aria-hidden="true" />
                Book Appointment
              </button>
              <Link to="/doctors" className="btn btn--ghost btn--block" onClick={() => setMenuOpen(false)}>
                Find a Doctor
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function Chevron() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
