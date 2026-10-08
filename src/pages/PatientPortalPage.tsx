import { Link } from "react-router-dom";
import { ArrowRight, CalendarCheck, FileText, Info, Lock, MessageSquare, ShieldCheck } from "lucide-react";
import Seo from "../components/Seo";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import { PatientDashboard, DoctorDashboard } from "../components/Dashboards";
import { useDemoUI } from "../context/DemoUI";

const FEATURES = [
  {
    icon: CalendarCheck,
    title: "Appointments & visits",
    text: "Upcoming visits, past consultations, one-tap reschedule and cancellation with clear rules.",
  },
  {
    icon: FileText,
    title: "Prescriptions & reports",
    text: "Dated prescriptions, lab and imaging reports attached to the right visit, ready to download.",
  },
  {
    icon: MessageSquare,
    title: "Messages",
    text: "Non-urgent messaging with the care team, with clear response expectations — never emergency chat.",
  },
  {
    icon: ShieldCheck,
    title: "Consent & privacy",
    text: "Every record access is explicit, auditable and reversible. Nothing is shared without consent.",
  },
];

export default function PatientPortalPage() {
  const { showToast } = useDemoUI();

  return (
    <>
      <Seo
        title="Patient Portal"
        description="Demo patient portal and console preview — appointments, records, messages and billing. Fictional data by Kyntriq Solutions."
        path="/patient-portal"
      />
      <PageHeader
        eyebrow="Portals"
        title="Patient portal — your care, in one view."
        description="A working preview of the logged-in patient experience. All records shown are fictional sample data."
        crumbs={[{ label: "Patient portal" }]}
      >
        <div className="btn-row" style={{ marginTop: 24 }}>
          <button
            type="button"
            className="btn btn--teal"
            onClick={() => showToast("Sign-in is disabled in this demonstration — explore the preview below.")}
          >
            <Lock size={16} aria-hidden="true" />
            Sign in
          </button>
          <Link to="/appointment" className="btn btn--light">
            Book an appointment
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </PageHeader>

      <section className="section" aria-labelledby="portal-preview">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div className="section-head__text">
                <p className="eyebrow">Live preview</p>
                <h2 id="portal-preview">What a patient sees after login.</h2>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <PatientDashboard />
          </Reveal>
        </div>
      </section>

      <section className="section section-soft" aria-labelledby="portal-features">
        <div className="container">
          <div className="portal-layout">
            <div>
              <Reveal>
                <p className="eyebrow">Capabilities</p>
                <h2 id="portal-features" style={{ marginTop: 14 }}>
                  Built around consent, clarity and continuity.
                </h2>
              </Reveal>
              <div className="feature-list">
                {FEATURES.map((f, i) => (
                  <Reveal key={f.title} delay={0.04 * i}>
                    <div className="feature-row">
                      <f.icon size={20} aria-hidden="true" />
                      <div>
                        <h3>{f.title}</h3>
                        <p>{f.text}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal delay={0.1}>
              <div className="card card--pad portal-note">
                <h3 style={{ fontSize: "1.05rem" }}>
                  <ShieldCheck size={18} aria-hidden="true" style={{ display: "inline", verticalAlign: "-4px", marginRight: 8 }} />
                  Privacy by design
                </h3>
                <p className="muted" style={{ fontSize: "0.9rem", marginTop: 10 }}>
                  Portals show role-based access, consent prompts and audit trails as design principles. This demo makes no
                  claims about real regulatory compliance — those are assessed per deployment.
                </p>
                <ul className="check-list" style={{ marginTop: 14 }}>
                  <li>Consent before record sharing</li>
                  <li>Role-based staff access</li>
                  <li>Audit log of views and changes</li>
                  <li>Export and delete requests supported</li>
                </ul>
                <Link to="/about#privacy" className="link-arrow" style={{ marginTop: 16 }}>
                  Read the privacy approach <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="staff-console">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div className="section-head__text">
                <p className="eyebrow">Staff side</p>
                <h2 id="staff-console">The console your team uses.</h2>
                <p className="muted">Doctors get the queue, schedule and notes view that feeds the same patient record.</p>
              </div>
              <Link to="/ai-healthcare" className="link-arrow">
                See the AI assistant <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <DoctorDashboard />
          </Reveal>

          <p className="demo-note" style={{ marginTop: 28 }}>
            <Info size={16} />
            <span>
              Sign-in, messaging and record storage are simulated for this Kyntriq Solutions demonstration. No personal
              or medical data is collected, transmitted or stored by this website.
            </span>
          </p>
        </div>
      </section>
    </>
  );
}
