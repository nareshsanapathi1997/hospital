import { Link } from "react-router-dom";
import { Siren } from "lucide-react";
import { useDemoUI } from "../context/DemoUI";
import { Brand } from "./Header";

const cols = [
  {
    title: "Departments",
    links: [
      ["Cardiology", "/departments/cardiology"],
      ["Neurology", "/departments/neurology"],
      ["Orthopaedics", "/departments/orthopaedics"],
      ["Paediatrics", "/departments/paediatrics"],
      ["All departments", "/departments"],
    ],
  },
  {
    title: "Patients",
    links: [
      ["Find a Doctor", "/doctors"],
      ["Book Appointment", "/appointment"],
      ["Patient Portal", "/patient-portal"],
      ["AI Assistant", "/ai-healthcare"],
      ["Health Resources", "/blog"],
    ],
  },
  {
    title: "Hospital",
    links: [
      ["Services", "/services"],
      ["About", "/about"],
      ["Contact", "/contact"],
      ["Emergency", "#emergency"],
    ],
  },
];

export default function Footer() {
  const { openEmergency, openAppointment } = useDemoUI();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Brand />
            <p>
              A demonstration multispeciality hospital platform — showing how patients, doctors, diagnostics and hospital
              operations can be connected through one digital experience.
            </p>
            <div className="footer-emergency">
              <strong>
                <Siren size={15} aria-hidden="true" style={{ display: "inline", verticalAlign: "-2px", marginRight: 6 }} />
                Emergency
              </strong>
              <span style={{ fontSize: "0.8rem", color: "#c9a6a2" }}>Demo contact — replace before production</span>
              <a href="tel:+910000000000">+91 XXX XXX XXXX</a>
              <button type="button" className="btn btn--sm btn--light" onClick={openEmergency} style={{ marginTop: 8, alignSelf: "flex-start" }}>
                Emergency information
              </button>
            </div>
          </div>

          {cols.map((col) => (
            <div className="footer-col" key={col.title}>
              <h3>{col.title}</h3>
              <ul>
                {col.links.map(([label, to]) =>
                  to === "#emergency" ? (
                    <li key={label}>
                      <button type="button" onClick={openEmergency} style={{ color: "inherit" }}>
                        {label}
                      </button>
                    </li>
                  ) : (
                    <li key={label}>
                      <Link to={to}>{label}</Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Aurelia Multispeciality Hospital — demonstration concept. All doctor profiles,
            packages, pricing and testimonials on this site are fictional sample content.
          </p>
          <ul>
            <li>
              <Link to="/about#privacy">Privacy</Link>
            </li>
            <li>
              <Link to="/about#terms">Terms</Link>
            </li>
            <li>
              <Link to="/about#accessibility">Accessibility</Link>
            </li>
            <li>
              <Link to="/about#credits">Image credits</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="kyntriq-bar">
        <div className="container kyntriq-bar__inner">
          <div className="kyntriq-bar__brand">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#kq)" />
              <path d="M8 16V8l8 8V8" stroke="#2ec5c8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <defs>
                <linearGradient id="kq" x1="2" y1="2" x2="22" y2="22">
                  <stop stopColor="#10263f" />
                  <stop offset="1" stopColor="#17324f" />
                </linearGradient>
              </defs>
            </svg>
            Powered by <span>Kyntriq Solutions</span>
          </div>
          <p className="kyntriq-bar__positioning">AI • Software • Automation • Business Systems</p>
          <button type="button" className="btn btn--sm btn--light" onClick={() => openAppointment({ speciality: "general-medicine" })}>
            Book a demo walkthrough
          </button>
        </div>
      </div>
    </footer>
  );
}
