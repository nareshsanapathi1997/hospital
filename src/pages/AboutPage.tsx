import { Link } from "react-router-dom";
import { ArrowRight, Accessibility, FileCheck2, HeartHandshake, Image as ImageIcon, Info, Lightbulb, Lock, Sparkles, Telescope } from "lucide-react";
import Seo from "../components/Seo";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import { FacilitiesSection } from "../sections/TrustSection";
import { WhyKyntriqSection } from "../sections/AutomationSection";
import imageCredits from "../data/imageCredits.json";
import { departments } from "../data/departments";

const PHILOSOPHY = [
  {
    icon: HeartHandshake,
    title: "Care first",
    text: "Every screen is designed around what a patient actually needs to do next — find, understand, book, arrive.",
  },
  {
    icon: Lightbulb,
    title: "Clarity over clutter",
    text: "Plain language, visible pricing expectations and no jargon patients have to decode.",
  },
  {
    icon: Telescope,
    title: "Continuous follow-up",
    text: "Care doesn't end at the door: reminders, reports, prescriptions and next steps stay connected.",
  },
  {
    icon: Sparkles,
    title: "Technology in support",
    text: "Automation handles repetition so clinical teams spend attention on people, not paperwork.",
  },
];

const PILLARS = [
  { icon: FileCheck2, title: "Accreditation-ready documentation", text: "Structured workflows and record trails that support quality programmes." },
  { icon: Lock, title: "Consent-led data handling", text: "Access is explicit and reversible; sharing is always deliberate." },
  { icon: Accessibility, title: "Accessible by default", text: "Keyboard navigation, readable contrast and reduced-motion support throughout." },
];

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About Us"
        description="Mission, vision, care philosophy and the technology behind the Aurelia demonstration hospital platform by Kyntriq Solutions."
        path="/about"
      />
      <PageHeader
        eyebrow="About us"
        title="A demonstration hospital platform by Kyntriq Solutions."
        description="Aurelia Multispeciality Hospital is fictional. It exists to show how a modern hospital website, portals and automation can work together."
        crumbs={[{ label: "About" }]}
      />

      <section className="section" aria-labelledby="mission">
        <div className="container about-grid">
          <Reveal>
            <article className="card card--pad about-card">
              <p className="eyebrow">Mission</p>
              <h2 id="mission" style={{ marginTop: 14 }}>
                Make the path to care obvious.
              </h2>
              <p className="lead" style={{ marginTop: 14 }}>
                To demonstrate a hospital experience where a patient can find the right specialist, understand what
                happens next and book without friction — on any device, at any hour.
              </p>
            </article>
          </Reveal>
          <Reveal delay={0.06}>
            <article className="card card--pad about-card">
              <p className="eyebrow">Vision</p>
              <h2 style={{ marginTop: 14 }}>
                Hospital journeys that feel connected.
              </h2>
              <p className="lead" style={{ marginTop: 14 }}>
                Websites, portals, messaging and automation behaving like one system — so information is entered once and
                used consistently everywhere.
              </p>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="section section-soft" aria-labelledby="philosophy">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div className="section-head__text">
                <p className="eyebrow">Care philosophy</p>
                <h2 id="philosophy">Four ideas behind every screen.</h2>
              </div>
            </div>
          </Reveal>
          <div className="philosophy-grid">
            {PHILOSOPHY.map((p, i) => (
              <Reveal key={p.title} delay={(i % 4) * 0.05}>
                <article className="philosophy-card">
                  <p.icon size={22} aria-hidden="true" />
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FacilitiesSection />
      <WhyKyntriqSection />

      <section className="section" aria-labelledby="medical-team">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div className="section-head__text">
                <p className="eyebrow">Medical team</p>
                <h2 id="medical-team">Specialists across {departments.length} departments.</h2>
                <p className="muted">Fictional demonstration profiles — credentials and availability are sample data.</p>
              </div>
              <Link to="/doctors" className="link-arrow">
                Meet the doctors <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
          <div className="pillar-grid">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 0.05}>
                <article className="pillar-card">
                  <p.icon size={20} aria-hidden="true" />
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft" aria-labelledby="disclosure">
        <div className="container legal">
          <Reveal>
            <div className="demo-note demo-note--wide">
              <Info size={20} />
              <div>
                <h3 id="disclosure" style={{ fontSize: "1.05rem", marginBottom: 6 }}>
                  Demonstration disclosure
                </h3>
                <p className="muted" style={{ margin: 0 }}>
                  Aurelia Multispeciality Hospital, its doctors, testimonials, statistics and content are fictional. This
                  site is a product demonstration by Kyntriq Solutions. It collects no data, makes no medical claims and
                  claims no regulatory compliance.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="legal-grid">
            <Reveal delay={0.05}>
              <article className="card card--pad" id="privacy">
                <h3>
                  <Lock size={18} aria-hidden="true" /> Privacy
                </h3>
                <p className="muted" style={{ fontSize: "0.9rem", marginTop: 12 }}>
                  This demo does not collect, transmit or store personal information. Forms, bookings and chat replies run
                  entirely in your browser. In a production build, a hospital would publish its own privacy notice covering
                  purpose, retention, consent and patient rights.
                </p>
              </article>
            </Reveal>

            <Reveal delay={0.08}>
              <article className="card card--pad" id="terms">
                <h3>
                  <FileCheck2 size={18} aria-hidden="true" /> Terms of use
                </h3>
                <p className="muted" style={{ fontSize: "0.9rem", marginTop: 12 }}>
                  Content is provided for demonstration only and is not medical advice. Nothing here creates a
                  doctor–patient relationship. For a medical emergency, contact your local emergency service (108 in
                  India) or the demo number listed on the emergency page.
                </p>
              </article>
            </Reveal>

            <Reveal delay={0.11}>
              <article className="card card--pad" id="accessibility">
                <h3>
                  <Accessibility size={18} aria-hidden="true" /> Accessibility
                </h3>
                <p className="muted" style={{ fontSize: "0.9rem", marginTop: 12 }}>
                  The site targets keyboard navigation, visible focus states, labelled controls, semantic landmarks,
                  reduced-motion support and responsive text. Encountering a barrier? The demo contact form is the route
                  to report it.
                </p>
              </article>
            </Reveal>
          </div>

          <Reveal delay={0.14}>
            <article className="card card--pad" id="credits" style={{ marginTop: 20 }}>
              <h3>
                <ImageIcon size={18} aria-hidden="true" /> Image credits
              </h3>
              <p className="muted" style={{ fontSize: "0.9rem", marginTop: 10 }}>
                Photography is used from Wikimedia Commons under the licences below, converted to WebP for performance.
                Doctor portraits are generated placeholder avatars.
              </p>
              <ul className="credits-list">
                {imageCredits.map((c) => (
                  <li key={c.file}>
                    <span className="credits-list__file">{c.file.replace("img/", "")}</span>
                    <span>{c.title.replace(/^File:/, "").replace(/\.[a-zA-Z]+$/, "")}</span>
                    <span className="credits-list__meta">
                      {c.creator} · {c.license}
                    </span>
                    <a href={c.source} target="_blank" rel="noopener noreferrer">
                      Source
                    </a>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </section>
    </>
  );
}
