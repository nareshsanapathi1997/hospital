import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Clock3, CalendarCheck, FileText, Bell, CreditCard } from "lucide-react";
import Seo from "../components/Seo";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import JourneySection from "../sections/JourneySection";
import { PatientServicesSection } from "../sections/ServicesBlocks";
import EmergencySection from "../sections/EmergencySection";
import { useDemoUI } from "../context/DemoUI";

const PORTAL_PERKS = [
  { icon: CalendarCheck, title: "Appointments", text: "Book, reschedule and see upcoming visits in one list." },
  { icon: FileText, title: "Records & reports", text: "Prescriptions, lab results and imaging reports, dated and searchable." },
  { icon: Bell, title: "Reminders", text: "Visit and medication reminders delivered in-app or on WhatsApp." },
  { icon: CreditCard, title: "Billing", text: "Itemised bills, payment status and downloadable receipts." },
  { icon: ShieldCheck, title: "Consent-first", text: "Record access is explicit, logged and revocable — demo only." },
  { icon: Clock3, title: "24/7 access", text: "Your information stays available when you need to check it." },
];

const ICON_ACCENTS = ["", " card__icon--teal", " card__icon--green", " card__icon--amber", " card__icon--navy", " card__icon--red"];

export default function PatientsPage() {
  const { openAppointment } = useDemoUI();

  return (
    <>
      <Seo
        title="For Patients"
        description="Patient information, care journey, portal benefits and hospital services on the Aurelia demonstration hospital website."
        path="/patients"
      />
      <PageHeader
        eyebrow="For patients & families"
        title="Everything you need before, during and after a visit."
        description="Find a specialist, understand the next step, book in minutes and keep your records close."
        crumbs={[{ label: "Patients" }]}
      >
        <div className="btn-row" style={{ marginTop: 24 }}>
          <button type="button" className="btn btn--teal" onClick={() => openAppointment()}>
            <CalendarCheck size={17} aria-hidden="true" />
            Book appointment
          </button>
          <Link to="/patient-portal" className="btn btn--light">
            Open patient portal
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </PageHeader>

      <section className="section" aria-labelledby="perks">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div className="section-head__text">
                <p className="eyebrow">Your care, organised</p>
                <h2 id="perks">Patient essentials in one place.</h2>
                <p className="muted">Demonstration of the patient-facing capabilities in the Kyntriq hospital platform.</p>
              </div>
            </div>
          </Reveal>

          <div className="portals-grid">
            {PORTAL_PERKS.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 0.05}>
                <article className="portal-card">
                  <span className={`card__icon${ICON_ACCENTS[i % ICON_ACCENTS.length]}`}>
                    <p.icon size={20} aria-hidden="true" />
                  </span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                  <Link to="/patient-portal" className="link-arrow portal-card__foot">
                    Explore the portal <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <PatientServicesSection />
      <JourneySection />
      <EmergencySection />
    </>
  );
}
