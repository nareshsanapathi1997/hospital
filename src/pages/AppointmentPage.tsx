import Seo from "../components/Seo";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import AppointmentFlow from "../components/AppointmentFlow";
import { Clock3, Info, MapPin, Phone } from "lucide-react";

const NEED = [
  "A speciality or doctor you would like to see",
  "A date and time that suits you",
  "Contact details so the demo flow can confirm",
];

export default function AppointmentPage() {
  return (
    <>
      <Seo
        title="Book an Appointment"
        description="Six-step demo appointment booking — speciality, doctor, date, time, patient details and confirmation. Nothing is submitted or stored."
        path="/appointment"
      />
      <PageHeader
        eyebrow="Appointments"
        title="Book an appointment in six steps."
        description="Speciality → doctor → date → time → details → confirmation. This is a working demonstration: no data leaves your browser."
        crumbs={[{ label: "Appointment" }]}
      />

      <section className="section">
        <div className="container booking-layout">
          <div className="booking-layout__main">
            <Reveal>
              <AppointmentFlow />
            </Reveal>
          </div>

          <aside className="booking-layout__side">
            <Reveal delay={0.06}>
              <div className="card card--pad">
                <p className="eyebrow">What you need</p>
                <ul className="check-list" style={{ marginTop: 14 }}>
                  {NEED.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="card card--pad" style={{ marginTop: 16 }}>
                <h3 style={{ fontSize: "1.05rem" }}>Prefer to speak to someone?</h3>
                <ul className="contact-list" style={{ marginTop: 14 }}>
                  <li>
                    <Phone size={16} aria-hidden="true" />
                    <span>
                      <strong>+91 XXX XXX XXXX</strong>
                      <br />
                      <em>Demo contact — replace before production</em>
                    </span>
                  </li>
                  <li>
                    <Clock3 size={16} aria-hidden="true" />
                    <span>OPD hours: 08:00 – 20:00, all days (sample)</span>
                  </li>
                  <li>
                    <MapPin size={16} aria-hidden="true" />
                    <span>Central Campus, North Annex, Riverside Clinic</span>
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="demo-note" style={{ marginTop: 16 }}>
                <Info size={16} />
                <span>
                  Submissions are simulated in the browser only. No appointment is created and no information is sent to
                  any server.
                </span>
              </p>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
