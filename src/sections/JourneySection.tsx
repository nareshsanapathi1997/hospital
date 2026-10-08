import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../components/Reveal";
import { patientJourney } from "../data/content";

export default function JourneySection() {
  return (
    <section className="section journey" id="how-it-works" aria-labelledby="journey-title">
      <div className="container">
        <Reveal>
          <div className="section-head center">
            <div className="section-head__text">
              <p className="eyebrow" style={{ justifyContent: "center" }}>
                How it works
              </p>
              <h2 id="journey-title">A simple patient journey, end to end.</h2>
              <p className="muted">From the first search to follow-up care — every step stays connected.</p>
            </div>
          </div>
        </Reveal>

        <Reveal as="ol" className="journey__track">
          <span className="journey__line" aria-hidden="true">
            <span className="journey__line-fill" />
          </span>
          {patientJourney.map((s, i) => (
            <Reveal as="li" key={s.step} delay={i * 0.1} className="journey__step">
              <span className="journey__node" aria-hidden="true">
                <span className="journey__num">{s.step}</span>
              </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              {i < patientJourney.length - 1 && (
                <span className="journey__arrow" aria-hidden="true">
                  <ArrowRight size={16} />
                </span>
              )}
            </Reveal>
          ))}
        </Reveal>

        <Reveal delay={0.2}>
          <div className="journey__cta">
            <p className="muted">Try the full flow yourself — it takes about a minute.</p>
            <Link to="/appointment" className="btn btn--primary">
              Start the demo booking flow
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
