import { Link } from "react-router-dom";
import { ArrowRight, Ban, Compass, Info, MessageSquare, ShieldAlert, Sparkles, CalendarCheck } from "lucide-react";
import Seo from "../components/Seo";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import AiAssistant from "../components/AiAssistant";
import WhatsAppSection from "../sections/WhatsAppSection";
import { AutomationSection } from "../sections/AutomationSection";
import { useDemoUI } from "../context/DemoUI";

const CAN_DO = [
  "Explain departments and what each speciality covers",
  "Help you find a doctor by speciality, language or availability",
  "Guide you through the six-step appointment flow",
  "Share visiting hours, locations and contact routes",
  "Point you to the emergency options when you ask for urgent help",
];

const CANNOT_DO = [
  "Diagnose a condition or interpret your symptoms",
  "Recommend medicines, doses or treatment changes",
  "Replace a doctor, nurse or emergency service",
  "Provide certainty about any medical question",
  "Handle real patient records in this demonstration",
];

export default function AiHealthcarePage() {
  const { openAi, openAppointment } = useDemoUI();

  return (
    <>
      <Seo
        title="AI Healthcare Assistant"
        description="A rule-based hospital AI assistant demonstration for navigation, scheduling and hospital information — with explicit boundaries against medical advice."
        path="/ai-healthcare"
      />
      <PageHeader
        eyebrow="AI healthcare"
        title="An assistant that helps — without pretending to be a doctor."
        description="Kyntriq's hospital assistant is designed for navigation, scheduling and hospital information. Medical advice always stays with a qualified professional."
        crumbs={[{ label: "AI healthcare" }]}
      >
        <div className="btn-row" style={{ marginTop: 24 }}>
          <button type="button" className="btn btn--teal" onClick={openAi}>
            <Sparkles size={17} aria-hidden="true" />
            Chat with the assistant
          </button>
          <button type="button" className="btn btn--light" onClick={() => openAppointment()}>
            <CalendarCheck size={17} aria-hidden="true" />
            Book appointment
          </button>
        </div>
      </PageHeader>

      <section className="section" aria-labelledby="assistant-demo">
        <div className="container ai-layout">
          <div>
            <Reveal>
              <p className="eyebrow">Interactive demo</p>
              <h2 id="assistant-demo" style={{ marginTop: 14 }}>
                Ask it something.
              </h2>
              <p className="lead" style={{ marginTop: 12, maxWidth: 560 }}>
                Try “find a cardiologist”, “book an appointment”, “what are the visiting hours” or “I need emergency
                help”. Replies are scripted, keyword-driven and intentionally limited.
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="card card--pad ai-demo-frame">
                <AiAssistant />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="ai-boundaries">
              <article className="boundary boundary--do">
                <h3>
                  <Compass size={18} aria-hidden="true" />
                  What it does
                </h3>
                <ul className="check-list">
                  {CAN_DO.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </article>
              <article className="boundary boundary--dont">
                <h3>
                  <Ban size={18} aria-hidden="true" />
                  What it refuses to do
                </h3>
                <ul className="check-list">
                  {CANNOT_DO.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </article>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-soft" aria-labelledby="ai-rules">
        <div className="container">
          <Reveal>
            <div className="demo-note demo-note--wide">
              <ShieldAlert size={20} />
              <div>
                <h3 id="ai-rules" style={{ fontSize: "1.05rem", marginBottom: 8 }}>
                  Safety rules built into the design
                </h3>
                <ul className="check-list">
                  <li>
                    <MessageSquare size={15} aria-hidden="true" /> No diagnosis, triage or symptom interpretation — ever.
                  </li>
                  <li>
                    <Compass size={15} aria-hidden="true" /> Urgent requests route to emergency options immediately.
                  </li>
                  <li>
                    <Info size={15} aria-hidden="true" /> Every reply can be escalated to a human team.
                  </li>
                  <li>
                    <Sparkles size={15} aria-hidden="true" /> In this demo, answers are scripted — no model or patient data
                    is involved.
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <p className="muted" style={{ maxWidth: 720, marginTop: 20 }}>
              In a production build, the assistant would be configured with your hospital's approved content, escalation
              numbers and response policy. Clinical accuracy would be reviewed by your medical team before launch.{" "}
              <Link to="/about#privacy" className="link-arrow">
                Privacy approach <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      <WhatsAppSection />
      <AutomationSection />
    </>
  );
}
