import { ArrowRight, Check, MessageCircle, ShieldCheck } from "lucide-react";
import Reveal from "../components/Reveal";
import { whatsappUseCases, whatsappWorkflow } from "../data/content";
import { useDemoUI } from "../context/DemoUI";

export default function WhatsAppSection() {
  const { showToast } = useDemoUI();

  return (
    <section className="section whatsapp" id="whatsapp" aria-labelledby="wa-title">
      <div className="container">
        <div className="whatsapp__top">
          <Reveal>
            <div className="section-head__text">
              <p className="eyebrow">WhatsApp healthcare</p>
              <h2 id="wa-title">Healthcare support where your patients already are.</h2>
              <p className="muted">
                Conversational workflows keep patients informed across booking, confirmation, reminders and follow-up —
                without exposing personal health information in chat.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="whatsapp__badge">
              <span className="wa-logo" aria-hidden="true">
                <MessageCircle size={22} />
              </span>
              <div>
                <strong>Sample workflow</strong>
                <span>Illustrative scenario — no messages are actually sent.</span>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <ol className="wa-flow" aria-label="WhatsApp workflow">
            {whatsappWorkflow.map((step, i) => (
              <li key={step} className="wa-flow__node" style={{ ["--d" as string]: `${i * 0.12}s` }}>
                <span className="wa-flow__index">{String(i + 1).padStart(2, "0")}</span>
                <span className="wa-flow__label">{step}</span>
                {i < whatsappWorkflow.length - 1 && (
                  <span className="wa-flow__connector" aria-hidden="true">
                    <span className="wa-flow__pulse" />
                  </span>
                )}
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="wa-grid">
          {whatsappUseCases.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 0.06}>
              <article className="wa-card">
                <span className="card__icon card__icon--green">
                  <Check size={20} strokeWidth={2.4} aria-hidden="true" />
                </span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="whatsapp__foot">
            <p className="demo-note">
              <ShieldCheck size={16} />
              <span>
                Messages in a production build would be templated and privacy-conscious — no real patient information is
                used or stored anywhere in this demo.
              </span>
            </p>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => showToast("WhatsApp automation is demonstrated, not connected, in this demo.")}
            >
              See how it connects
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
