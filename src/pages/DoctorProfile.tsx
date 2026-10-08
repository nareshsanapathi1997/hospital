import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarPlus, Clock, Languages, MapPin, Video, GraduationCap, Info } from "lucide-react";
import Seo from "../components/Seo";
import { Breadcrumbs } from "../components/PageHeader";
import Reveal from "../components/Reveal";
import DoctorCard from "../components/DoctorCard";
import { doctorBySlug, doctors } from "../data/doctors";
import { departmentBySlug } from "../data/departments";
import { useDemoUI } from "../context/DemoUI";

export default function DoctorProfile() {
  const { slug } = useParams();
  const doctor = doctorBySlug(slug);
  const { openAppointment } = useDemoUI();

  if (!doctor) {
    return (
      <section className="section container center">
        <Seo title="Doctor not found" description="This demo doctor profile does not exist." path="/doctors" />
        <h1 style={{ margin: "20px 0 12px" }}>Doctor profile not found</h1>
        <p className="lead" style={{ maxWidth: 520, margin: "0 auto 24px" }}>
          The profile you are looking for is not part of this demonstration.
        </p>
        <Link to="/doctors" className="btn btn--primary">
          Browse all doctors
        </Link>
      </section>
    );
  }

  const dept = departmentBySlug(doctor.speciality);
  const others = doctors.filter((d) => d.speciality === doctor.speciality && d.slug !== doctor.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: doctor.name,
    medicalSpecialty: dept?.name,
    description: doctor.bio,
    worksFor: { "@type": "Hospital", name: "Aurelia Multispeciality Hospital (demo)" },
  };

  return (
    <>
      <Seo
        title={`${doctor.name} — ${dept?.name}`}
        description={`Demo profile of ${doctor.name}, ${dept?.name} specialist with ${doctor.experience} years of experience. Fictional demonstration content by Kyntriq Solutions.`}
        path={`/doctors/${doctor.slug}`}
        jsonLd={jsonLd}
      />

      <header className="profile-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: "Doctors", to: "/doctors" }, { label: doctor.name }]} />

          <div className="profile-hero__inner">
            <img className="profile-hero__photo" src={`/${doctor.photo}`} alt={`Portrait of ${doctor.name}`} width={180} height={180} />

            <div className="profile-hero__info">
              <p className="eyebrow">{dept?.name}</p>
              <h1>{doctor.name}</h1>
              <p className="profile-hero__qual">{doctor.qualification}</p>

              <div className="pill-group" style={{ marginTop: 16 }}>
                <span className="badge badge--blue">
                  <Clock size={13} aria-hidden="true" /> {doctor.experience} years experience
                </span>
                <span className="badge badge--teal">
                  <Languages size={13} aria-hidden="true" /> {doctor.languages.join(", ")}
                </span>
                <span className="badge badge--green">
                  <span className="dot" aria-hidden="true" /> {doctor.availability.label}
                </span>
                <span className="badge badge--amber">Demo profile</span>
              </div>

              <div className="btn-row" style={{ marginTop: 22 }}>
                <button type="button" className="btn btn--primary btn--lg" onClick={() => openAppointment({ doctorSlug: doctor.slug })}>
                  <CalendarPlus size={17} aria-hidden="true" />
                  Book Appointment
                </button>
                <Link to="/doctors" className="btn btn--ghost btn--lg">
                  <ArrowLeft size={16} aria-hidden="true" /> Back to search
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container profile-grid">
          <div className="profile-main">
            <Reveal>
              <article className="card card--pad">
                <h2>About {doctor.name}</h2>
                <p className="lead" style={{ marginTop: 12 }}>
                  {doctor.bio}
                </p>
                <p className="muted" style={{ marginTop: 14, fontSize: "0.9rem" }}>
                  This profile is fictional demonstration content. No awards, certifications or outcome claims are shown
                  because they would not be verifiable.
                </p>
              </article>
            </Reveal>

            <Reveal delay={0.06}>
              <article className="card card--pad" style={{ marginTop: 20 }}>
                <h2>
                  <GraduationCap size={20} aria-hidden="true" style={{ display: "inline", verticalAlign: "-4px", marginRight: 8 }} />
                  Education & training
                </h2>
                <ul className="timeline-list">
                  {doctor.education.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </article>
            </Reveal>

            <Reveal delay={0.1}>
              <article className="card card--pad" style={{ marginTop: 20 }}>
                <h2>Consultation & availability</h2>
                <div className="profile-facts">
                  <div>
                    <span className="profile-facts__label">Consultation types</span>
                    <ul className="check-list">
                      {doctor.consultationTypes.map((c) => (
                        <li key={c}>
                          {c.includes("Video") ? <Video size={16} aria-hidden="true" /> : <Clock size={16} aria-hidden="true" />}
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="profile-facts__label">Next available slots</span>
                    <div className="pill-group" style={{ marginTop: 8 }}>
                      {doctor.availability.slots.map((s) => (
                        <span className="chip" key={s}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="profile-facts__label">Hospital location</span>
                    <p className="profile-facts__value">
                      <MapPin size={15} aria-hidden="true" style={{ display: "inline", verticalAlign: "-3px", marginRight: 6 }} />
                      {doctor.location}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="demo-note" style={{ marginTop: 20 }}>
                <Info size={16} />
                <span>
                  Availability, locations and credentials on this page are generated sample data for the Kyntriq Solutions
                  demonstration and must be replaced with verified hospital information before production use.
                </span>
              </div>
            </Reveal>
          </div>

          <aside className="profile-side">
            <Reveal delay={0.08}>
              <div className="card card--pad profile-book">
                <p className="eyebrow">Book a visit</p>
                <h3 style={{ marginTop: 12 }}>Choose a convenient time</h3>
                <p className="muted" style={{ fontSize: "0.88rem", marginTop: 8 }}>
                  Six-step demo booking — speciality, doctor, date, time, details, confirmation.
                </p>
                <button
                  type="button"
                  className="btn btn--primary btn--block"
                  style={{ marginTop: 16 }}
                  onClick={() => openAppointment({ doctorSlug: doctor.slug })}
                >
                  <CalendarPlus size={16} aria-hidden="true" />
                  Book Appointment
                </button>
                <Link to={`/departments/${dept?.slug}`} className="btn btn--ghost btn--block" style={{ marginTop: 10 }}>
                  About the {dept?.name} department
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="card card--pad" style={{ marginTop: 18 }}>
                <h3 style={{ fontSize: "1rem" }}>Preparing for your visit</h3>
                <ul className="check-list" style={{ marginTop: 12 }}>
                  <li>Carry previous prescriptions and reports</li>
                  <li>Note your symptoms with their timeline</li>
                  <li>Arrive 15 minutes before your slot</li>
                  <li>Bring a valid photo identity document</li>
                </ul>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      {others.length > 0 && (
        <section className="section section-soft" aria-labelledby="related-title">
          <div className="container">
            <div className="section-head">
              <div className="section-head__text">
                <p className="eyebrow">Same department</p>
                <h2 id="related-title">More {dept?.name} specialists</h2>
              </div>
            </div>
            <div className="doc-grid">
              {others.map((d, i) => (
                <Reveal key={d.slug} delay={i * 0.05}>
                  <DoctorCard doctor={d} index={i} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
