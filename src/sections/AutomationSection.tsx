import { ArrowRight, Check } from "lucide-react";
import Reveal from "../components/Reveal";
import Icon from "../components/Icon";
import { techIntegrations, technologyShowcase, whyKyntriq } from "../data/content";

export function AutomationSection() {
  return (
    <section className="section section-dark automation" id="automation" aria-labelledby="auto-title">
      <div className="container">
        <Reveal>
          <div className="section-head center">
            <div className="section-head__text">
              <p className="eyebrow" style={{ justifyContent: "center" }}>
                AI + hospital automation
              </p>
              <h2 id="auto-title">Connect the entire hospital workflow.</h2>
              <p className="muted" style={{ color: "#a9bed4" }}>
                One continuous path from the patient's first visit to follow-up — each system handing off cleanly to the
                next.
              </p>
            </div>
          </div>
        </Reveal>

        <ol className="flow-chain">
          {technologyShowcase.map((s, i) => (
            <Reveal as="li" key={s.label} delay={Math.min(i * 0.06, 0.4)} className="flow-chain__node">
              <span className="flow-chain__index">{String(i + 1).padStart(2, "0")}</span>
              <span className="flow-chain__icon">
                <Icon name={s.icon} size={20} />
              </span>
              <span className="flow-chain__label">{s.label}</span>
              {i < technologyShowcase.length - 1 && (
                <span className="flow-chain__arrow" aria-hidden="true">
                  <ArrowRight size={15} />
                </span>
              )}
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.15}>
          <div className="automation__summary">
            {[
              "Website captures the enquiry",
              "Assistant handles navigation and scheduling",
              "Appointment system writes into hospital CRM",
              "Doctor and diagnostics stay in sync",
              "Portal and WhatsApp close the loop",
            ].map((t) => (
              <span key={t}>
                <Check size={15} strokeWidth={2.8} aria-hidden="true" />
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function TechnologySection() {
  return (
    <section className="section" id="technology" aria-labelledby="tech-title">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div className="section-head__text">
              <p className="eyebrow">Hospital technology</p>
              <h2 id="tech-title">Integrates with the systems hospitals already run.</h2>
              <p className="muted">Clean, documented connections across the stack — shown here as a capability map.</p>
            </div>
          </div>
        </Reveal>

        <div className="tech-grid">
          {techIntegrations.map((t, i) => (
            <Reveal key={t.title} delay={(i % 4) * 0.05}>
              <article className="tech-card">
                <span className="card__icon">
                  <Icon name={t.icon} size={20} />
                </span>
                <div>
                  <h3>{t.title}</h3>
                  <p>{t.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyKyntriqSection() {
  return (
    <section className="section section-soft" id="why-kyntriq" aria-labelledby="why-title">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div className="section-head__text">
              <p className="eyebrow">Why Kyntriq Solutions</p>
              <h2 id="why-title">A technology partner for healthcare operations.</h2>
              <p className="muted">
                Kyntriq Solutions designs AI, software and automation systems around how healthcare organisations
                actually operate — then connects them into one ecosystem.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="why-grid">
          {whyKyntriq.map((w, i) => (
            <Reveal key={w.title} delay={(i % 3) * 0.06}>
              <article className={`why-card ${i === 0 ? "why-card--lead" : ""}`}>
                <span className="card__icon card__icon--navy">
                  <Icon name={w.icon} size={21} />
                </span>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="demo-note" style={{ marginTop: 28 }}>
          <span className="demo-tag">Honest positioning</span>
          <span>
            This demo avoids unsupported claims — no guarantees about security outcomes, response times or medical
            results are made anywhere on this site.
          </span>
        </p>
      </div>
    </section>
  );
}
