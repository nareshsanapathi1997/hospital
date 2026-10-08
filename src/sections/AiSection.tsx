import { ArrowRight, Bot, CalendarCheck, Clock, Shield, Sparkles } from "lucide-react";
import Reveal from "../components/Reveal";
import AiAssistant from "../components/AiAssistant";
import { useDemoUI } from "../context/DemoUI";

const POINTS = [
  { icon: CalendarCheck, title: "Navigation & scheduling", text: "Helps patients reach the right department and start a booking." },
  { icon: Clock, title: "Available around the clock", text: "Answers common questions when the front desk is closed." },
  { icon: Shield, title: "No medical diagnosis", text: "Strictly limited to navigation, scheduling and general information." },
];

export default function AiSection() {
  const { openAi } = useDemoUI();

  return (
    <section className="section section-dark ai-section" id="ai-assistant" aria-labelledby="ai-title">
      <div className="container ai-section__inner">
        <div className="ai-section__copy">
          <Reveal>
            <p className="eyebrow">AI healthcare assistant</p>
            <h2 id="ai-title">Your hospital assistant, available whenever patients need help.</h2>
            <p className="lead" style={{ color: "#b6c8dc" }}>
              A conversational layer over the hospital website — finding specialists, checking availability and starting
              bookings. Ask it anything about departments or scheduling.
            </p>
          </Reveal>

          <ul className="ai-points">
            {POINTS.map((p, i) => (
              <Reveal as="li" key={p.title} delay={0.08 * i}>
                <span className="card__icon card__icon--navy">
                  <p.icon size={20} aria-hidden="true" />
                </span>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.2}>
            <div className="btn-row" style={{ marginTop: 30 }}>
              <button type="button" className="btn btn--teal" onClick={openAi}>
                <Sparkles size={17} aria-hidden="true" />
                Try AI Assistant
                <ArrowRight size={17} aria-hidden="true" />
              </button>
              <a href="#ai-disclaimer" className="btn btn--light">
                <Shield size={16} aria-hidden="true" /> How it stays safe
              </a>
            </div>
            <p className="ai-note" id="ai-disclaimer">
              <Bot size={15} aria-hidden="true" />
              AI assistance is for navigation, scheduling and general information. It does not provide medical diagnosis
              or emergency medical advice.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="ai-section__demo">
          <div className="ai-section__frame">
            <AiAssistant />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
