import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, Stethoscope, User } from "lucide-react";
import Reveal from "../components/Reveal";
import { AdminDashboard, DoctorDashboard, PatientDashboard } from "../components/Dashboards";

const TABS = [
  { id: "patient", label: "Patient Portal", icon: User, blurb: "Appointments, reports, prescriptions, messages and billing in one place." },
  { id: "doctor", label: "Doctor Portal", icon: Stethoscope, blurb: "Today's schedule, patient queue, notes, reports and availability." },
  { id: "admin", label: "Hospital Admin", icon: Building2, blurb: "Appointments, beds, diagnostics, staff and department performance." },
];

export default function PortalsSection() {
  const [tab, setTab] = useState("patient");
  const active = TABS.find((t) => t.id === tab)!;

  return (
    <section className="section section-soft" id="portals" aria-labelledby="portals-title">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div className="section-head__text">
              <p className="eyebrow">Connected platforms</p>
              <h2 id="portals-title">Three connected views of the same hospital.</h2>
              <p className="muted">Patients, doctors and administrators each get the workflow they need — powered by the same data.</p>
            </div>
            <div className="tabs" role="tablist" aria-label="Portal previews">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  className="tab"
                  aria-selected={tab === t.id}
                  onClick={() => setTab(t.id)}
                >
                  <t.icon size={15} aria-hidden="true" style={{ display: "inline", verticalAlign: "-3px", marginRight: 7 }} />
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <p className="portals__blurb" aria-live="polite">
            {active.blurb}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="portals__frame">{tab === "patient" ? <PatientDashboard /> : tab === "doctor" ? <DoctorDashboard /> : <AdminDashboard />}</div>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="portals__foot">
            <span className="demo-tag">Demo dashboards — sample data</span>
            <div className="btn-row">
              <Link to="/patient-portal" className="btn btn--ghost btn--sm">
                Open patient portal preview <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <Link to="/patients" className="btn btn--ghost btn--sm">
                Explore hospital workflows
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
