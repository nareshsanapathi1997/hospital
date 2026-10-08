import { Link } from "react-router-dom";
import { ArrowRight, Check, Info } from "lucide-react";
import Reveal from "../components/Reveal";
import Icon from "../components/Icon";
import { diagnostics, diagnosticsWorkflow, healthPackages, patientServices } from "../data/content";
import { useDemoUI } from "../context/DemoUI";

export function PatientServicesSection() {
  return (
    <section className="section section-soft" id="patient-services" aria-labelledby="ps-title">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div className="section-head__text">
              <p className="eyebrow">Patient services</p>
              <h2 id="ps-title">Everything patients need, in one place.</h2>
              <p className="muted">From appointments and reports to pharmacy and visitor information.</p>
            </div>
            <Link to="/patients" className="link-arrow">
              All patient services <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <div className="service-grid">
          {patientServices.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.05}>
              <article className="service-card">
                <span className="card__icon">
                  <Icon name={s.icon} size={21} />
                </span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <Link to={s.to} className="link-arrow">
                  {s.cta} <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PackagesSection() {
  const { openAppointment } = useDemoUI();
  return (
    <section className="section" id="packages" aria-labelledby="pkg-title">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div className="section-head__text">
              <p className="eyebrow">Health check packages</p>
              <h2 id="pkg-title">Preventive check-ups, clearly presented.</h2>
              <p className="muted">A sample of how package pricing and inclusions can be shown to patients.</p>
            </div>
            <span className="demo-tag">Demo pricing — for presentation purposes only</span>
          </div>
        </Reveal>

        <div className="pkg-grid">
          {healthPackages.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.07}>
              <article className={`pkg-card ${p.popular ? "pkg-card--popular" : ""}`}>
                {p.popular && <span className="pkg-card__ribbon">Most selected</span>}
                <h3>{p.name}</h3>
                <p className="pkg-card__price">
                  {p.price} <span>per person</span>
                </p>
                <p className="pkg-card__summary">{p.summary}</p>
                <ul className="check-list">
                  {p.tests.map((t) => (
                    <li key={t}>
                      <Check size={16} strokeWidth={2.6} aria-hidden="true" />
                      {t}
                    </li>
                  ))}
                </ul>
                <button type="button" className={`btn ${p.popular ? "btn--primary" : "btn--ghost"} btn--block`} onClick={() => openAppointment({ speciality: "general-medicine" })}>
                  Request this package
                </button>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="demo-note demo-note--warn" style={{ marginTop: 26 }}>
          <Info size={16} />
          <span>
            <strong>Demo pricing — for presentation purposes only.</strong> These packages, prices and inclusions are
            fictional sample content and do not represent an actual hospital's offerings.
          </span>
        </p>
      </div>
    </section>
  );
}

export function DiagnosticsSection() {
  return (
    <section className="section diagnostics" id="diagnostics" aria-labelledby="dx-title">
      <div className="container">
        <div className="diagnostics__grid">
          <div className="diagnostics__copy">
            <Reveal>
              <p className="eyebrow">Diagnostics</p>
              <h2 id="dx-title">Diagnostics connected to the patient journey.</h2>
              <p className="lead">
                Lab and imaging workflows that link booking, processing, reporting and the patient portal — so results
                reach patients without chasing paper.
              </p>
            </Reveal>

            <div className="dx-services">
              {diagnostics.map((d, i) => (
                <Reveal key={d.title} delay={i * 0.05}>
                  <article className="dx-card">
                    <span className="card__icon card__icon--teal">
                      <Icon name={d.icon} size={20} />
                    </span>
                    <div>
                      <h3>{d.title}</h3>
                      <p>{d.text}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.15}>
              <Link to="/services#diagnostics" className="btn btn--primary" style={{ marginTop: 26 }}>
                Explore Diagnostics
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="diagnostics__flow">
            <div className="dx-flow-card">
              <div className="dx-flow-card__head">
                <span className="badge badge--teal">Report workflow</span>
                <span className="badge badge--neutral">Demo data</span>
              </div>
              <ol className="dx-flow">
                {diagnosticsWorkflow.map((s, i) => (
                  <li key={s.step}>
                    <span className="dx-flow__num">{s.step}</span>
                    <div>
                      <h4>{s.title}</h4>
                      <p>{s.text}</p>
                    </div>
                    {i < diagnosticsWorkflow.length - 1 && <span className="dx-flow__bar" aria-hidden="true" />}
                  </li>
                ))}
              </ol>
              <div className="dx-flow-card__foot">
                <span className="dot" aria-hidden="true" />
                Sample report delivered to the patient portal — demo only.
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
