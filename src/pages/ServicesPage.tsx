import { Link } from "react-router-dom";
import { ArrowRight, Check, Info } from "lucide-react";
import Seo from "../components/Seo";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import Icon from "../components/Icon";
import { DiagnosticsSection, PackagesSection, PatientServicesSection } from "../sections/ServicesBlocks";
import { patientServices, techIntegrations } from "../data/content";
import { useDemoUI } from "../context/DemoUI";

const HOSPITAL_SERVICES = [
  { title: "Outpatient Consultations", icon: "Stethoscope", text: "Specialist OPD visits with online slot selection and reminders." },
  { title: "Inpatient Care", icon: "Bed", text: "Ward and room workflows with admission and discharge coordination." },
  { title: "Emergency & Trauma", icon: "Siren", text: "Triage pathways, ambulance coordination and emergency information." },
  { title: "Surgery & OT", icon: "Scissors", text: "Pre-operative checks, theatre scheduling and post-op follow-up." },
  { title: "Critical Care", icon: "HeartPulse", text: "ICU workflows with monitoring, rounds and family updates." },
  { title: "Physiotherapy & Rehab", icon: "Activity", text: "Session scheduling, progress notes and home-programme handouts." },
  { title: "Nutrition & Dietetics", icon: "Apple", text: "Diet plans attached to the patient's care pathway." },
  { title: "Health Checks", icon: "ClipboardCheck", text: "Package-based preventive screening with physician review." },
  { title: "Occupational Health", icon: "Users", text: "Corporate health programmes and reporting for organisations." },
];

const SOLUTIONS = [
  { title: "Hospital Website", icon: "Globe", text: "Fast, accessible, SEO-ready hospital presence with department and doctor pages." },
  { title: "Appointment System", icon: "CalendarCheck", text: "Multi-step booking with availability rules, confirmations and reminders." },
  { title: "AI Assistant", icon: "Bot", text: "Navigation and scheduling support with strict no-diagnosis boundaries." },
  { title: "WhatsApp Automation", icon: "MessageCircle", text: "Confirmations, reminders and report notifications patients already read." },
  { title: "Patient Portal", icon: "MonitorSmartphone", text: "Records, prescriptions, reports, messages and billing in one place." },
  { title: "Doctor Console", icon: "Stethoscope", text: "Schedules, queues, consultation notes, reports and availability control." },
  { title: "Operations Dashboard", icon: "LayoutGrid", text: "Appointments, beds, diagnostics, staff and department performance." },
  { title: "Integrations & APIs", icon: "Code", text: "Connect HMS, EMR, labs, radiology, payments and messaging channels." },
];

export default function ServicesPage() {
  const { openAppointment, showToast } = useDemoUI();

  return (
    <>
      <Seo
        title="Services"
        description="Hospital services, diagnostics, health check packages and the digital healthcare solutions Kyntriq Solutions builds for healthcare organisations."
        path="/services"
      />
      <PageHeader
        eyebrow="Services"
        title="Care services and the technology that connects them."
        description="Clinical services, diagnostics and preventive packages on one side — the digital systems that tie them together on the other."
        crumbs={[{ label: "Services" }]}
      >
        <div className="btn-row" style={{ marginTop: 24 }}>
          <button type="button" className="btn btn--teal" onClick={() => openAppointment()}>
            <ArrowRight size={17} aria-hidden="true" />
            Book an appointment
          </button>
          <a href="#solutions" className="btn btn--light">
            Healthcare solutions
          </a>
        </div>
      </PageHeader>

      <section className="section" aria-labelledby="hosp-svc">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div className="section-head__text">
                <p className="eyebrow">Hospital services</p>
                <h2 id="hosp-svc">Clinical services, clearly organised.</h2>
                <p className="muted">Each service maps to a workflow in the hospital platform — not just a page on a website.</p>
              </div>
            </div>
          </Reveal>

          <div className="tech-grid">
            {HOSPITAL_SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={(i % 4) * 0.05}>
                <article className="tech-card">
                  <span className="card__icon">
                    <Icon name={s.icon} size={20} />
                  </span>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <DiagnosticsSection />
      <PackagesSection />
      <PatientServicesSection />

      <section className="section section-dark" id="solutions" aria-labelledby="sol-title">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div className="section-head__text">
                <p className="eyebrow">Kyntriq Solutions</p>
                <h2 id="sol-title">Digital healthcare solutions we build.</h2>
                <p className="muted" style={{ color: "#a9bed4" }}>
                  The same components demonstrated on this website, configured around how your hospital operates.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="sol-grid">
            {SOLUTIONS.map((s, i) => (
              <Reveal key={s.title} delay={(i % 4) * 0.05}>
                <article className="sol-card">
                  <span className="card__icon card__icon--navy">
                    <Icon name={s.icon} size={20} />
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <Link to="/contact" className="link-arrow link-arrow--light">
                    Explore the capability <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="sol-cta">
              <div>
                <h3 style={{ color: "#fff" }}>Want this configured for your hospital?</h3>
                <p style={{ color: "#a9bed4" }}>Talk to Kyntriq Solutions about scope, integrations and rollout.</p>
              </div>
              <div className="btn-row">
                <Link to="/contact" className="btn btn--teal">
                  Talk to Kyntriq Solutions
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <button type="button" className="btn btn--light" onClick={() => showToast("A demo walkthrough would be scheduled in a production build.")}>
                  Book a walkthrough
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div className="tech-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}>
            {techIntegrations.slice(0, 8).map((t) => (
              <span className="badge" key={t.title} style={{ justifyContent: "center", padding: "12px 16px" }}>
                <Check size={14} aria-hidden="true" /> {t.title}
              </span>
            ))}
          </div>
          <p className="demo-note" style={{ marginTop: 24 }}>
            <Info size={16} />
            <span>
              Capability list for demonstration purposes. Integration availability, compliance posture and delivery scope
              are agreed per engagement — no regulatory compliance is claimed here.
            </span>
          </p>
        </div>
      </section>
    </>
  );
}
