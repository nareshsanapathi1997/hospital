import { Link } from "react-router-dom";
import { ArrowRight, Lock, Quote, ShieldCheck } from "lucide-react";
import Reveal from "../components/Reveal";
import Icon from "../components/Icon";
import { demoTestimonials, facilities } from "../data/content";

export function TestimonialsSection() {
  return (
    <section className="section" id="testimonials" aria-labelledby="tst-title">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div className="section-head__text">
              <p className="eyebrow">Feedback</p>
              <h2 id="tst-title">What the experience is designed to feel like.</h2>
              <p className="muted">
                Because this is a demonstration, the quotes below are illustrative sample scenarios — not real patient
                testimonials, and not medical success stories.
              </p>
            </div>
            <span className="demo-tag">Demo testimonial — sample content</span>
          </div>
        </Reveal>

        <div className="tst-grid">
          {demoTestimonials.map((t, i) => (
            <Reveal key={t.author} delay={i * 0.07}>
              <figure className="tst-card">
                <Quote size={26} aria-hidden="true" className="tst-card__quote" />
                <blockquote>
                  <p>{t.quote}</p>
                </blockquote>
                <figcaption>
                  <strong>{t.author}</strong>
                  <span>{t.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FacilitiesSection() {
  return (
    <section className="section section-soft" id="facilities" aria-labelledby="fac-title">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div className="section-head__text">
              <p className="eyebrow">Facilities</p>
              <h2 id="fac-title">Built around the essentials of hospital care.</h2>
              <p className="muted">A visual tour of the facilities represented in this demonstration platform.</p>
            </div>
            <Link to="/about" className="link-arrow">
              About the hospital <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <div className="fac-grid">
          {facilities.map((f, i) => (
            <Reveal key={f.title} delay={(i % 4) * 0.05}>
              <article className={`fac-card ${f.image ? "" : "fac-card--plain"}`}>
                {f.image ? (
                  <img src={`/${f.image}`} alt={`${f.title} — demonstration imagery`} loading="lazy" decoding="async" width={640} height={420} />
                ) : (
                  <span className="fac-card__fallback" aria-hidden="true">
                    <Icon name={f.icon} size={38} />
                  </span>
                )}
                <span className="fac-card__overlay">
                  <span className="card__icon card__icon--navy">
                    <Icon name={f.icon} size={19} />
                  </span>
                  <span>
                    <strong>{f.title}</strong>
                    <em>{f.text}</em>
                  </span>
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PrivacySection() {
  return (
    <section className="section-sm" id="privacy" aria-labelledby="priv-title">
      <div className="container">
        <Reveal>
          <div className="privacy">
            <div className="privacy__icon">
              <Lock size={24} aria-hidden="true" />
            </div>
            <div className="privacy__copy">
              <h2 id="priv-title">Designed with privacy-conscious healthcare workflows in mind.</h2>
              <p>
                Every profile, record, price and dashboard on this website is dummy data. Nothing you type is transmitted,
                stored or analysed outside your browser session. No real medical information is collected anywhere in this
                demo.
              </p>
            </div>
            <ul className="privacy__points">
              <li>
                <ShieldCheck size={16} aria-hidden="true" /> No real patient data
              </li>
              <li>
                <ShieldCheck size={16} aria-hidden="true" /> No forms are transmitted
              </li>
              <li>
                <ShieldCheck size={16} aria-hidden="true" /> No compliance claims are made
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
