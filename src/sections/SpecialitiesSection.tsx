import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import Reveal from "../components/Reveal";
import Icon from "../components/Icon";
import { departments } from "../data/departments";

const HIGHLIGHTS = ["Specialist consultations", "Diagnostics", "Preventive care", "Follow-up", "Emergency support"];

export default function SpecialitiesSection() {
  const [active, setActive] = useState(departments[0].slug);
  const dept = departments.find((d) => d.slug === active)!;

  return (
    <>
      <section className="section" id="specialities" aria-labelledby="spec-title">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div className="section-head__text">
                <p className="eyebrow">Specialities</p>
                <h2 id="spec-title">Twelve specialities. One connected hospital.</h2>
                <p className="muted">Explore departments to see services, doctors, diagnostics and frequently asked questions.</p>
              </div>
              <Link to="/departments" className="link-arrow">
                All departments <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <div className="spec-grid">
            {departments.map((d, i) => (
              <Reveal key={d.slug} delay={(i % 4) * 0.05}>
                <Link to={`/departments/${d.slug}`} className="spec-card">
                  <span className={`card__icon card__icon--${d.accent === "navy" ? "navy" : d.accent}`}>
                    <Icon name={d.icon} size={22} />
                  </span>
                  <h3>{d.name}</h3>
                  <p>{d.tagline}</p>
                  <span className="link-arrow">
                    Explore <ArrowRight size={15} aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft" id="department-feature" aria-labelledby="dept-feature-title">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div className="section-head__text">
                <p className="eyebrow">Department explorer</p>
                <h2 id="dept-feature-title">A closer look at a department.</h2>
                <p className="muted">Select a department to preview how a department page presents care, diagnostics and follow-up.</p>
              </div>
            </div>
          </Reveal>

          <div className="tabs spec-tabs" role="tablist" aria-label="Select a department">
            {departments.map((d) => (
              <button
                key={d.slug}
                role="tab"
                type="button"
                className="tab"
                aria-selected={active === d.slug}
                onClick={() => setActive(d.slug)}
              >
                {d.name}
              </button>
            ))}
          </div>

          <div className="dept-feature" role="tabpanel" aria-label={`${dept.name} department preview`}>
            <div className="dept-feature__media">
              <img
                src={dept.image ? `/${dept.image}` : "/img/consultation.webp"}
                alt={`${dept.name} department — demonstration imagery`}
                width={1300}
                height={866}
                loading="lazy"
                decoding="async"
              />
              <span className="dept-feature__badge">
                <Icon name={dept.icon} size={18} /> {dept.name}
              </span>
            </div>
            <div className="dept-feature__body">
              <h3>{dept.name}</h3>
              <p className="lead">{dept.overview}</p>
              <ul className="check-list">
                {HIGHLIGHTS.map((h) => (
                  <li key={h}>
                    <Check size={17} strokeWidth={2.6} aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </ul>
              <div className="btn-row" style={{ marginTop: 26 }}>
                <Link to={`/departments/${dept.slug}`} className="btn btn--primary">
                  Explore {dept.name}
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <Link to={`/doctors?speciality=${dept.slug}`} className="btn btn--ghost">
                  View doctors
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
