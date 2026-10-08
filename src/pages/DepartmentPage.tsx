import { Link, useParams } from "react-router-dom";
import { ArrowRight, CalendarPlus, Check, ChevronDown, Info } from "lucide-react";
import Seo from "../components/Seo";
import { Breadcrumbs } from "../components/PageHeader";
import Reveal from "../components/Reveal";
import Icon from "../components/Icon";
import DoctorCard from "../components/DoctorCard";
import NotFound from "./NotFound";
import { departmentBySlug, departments } from "../data/departments";
import { doctorsByDepartment } from "../data/doctors";
import { diagnostics, facilities } from "../data/content";
import { useDemoUI } from "../context/DemoUI";

export default function DepartmentPage() {
  const { slug } = useParams();
  const dept = departmentBySlug(slug);
  const { openAppointment } = useDemoUI();

  if (!dept) return <NotFound />;
  const deptDoctors = doctorsByDepartment(dept.slug);
  const related = departments.filter((d) => d.slug !== dept.slug).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: `${dept.name} — Aurelia Multispeciality Hospital (demo)`,
    description: dept.overview,
  };

  return (
    <>
      <Seo
        title={`${dept.name} Department`}
        description={`${dept.name} at Aurelia Multispeciality Hospital (demo): ${dept.tagline} Explore services, doctors and FAQs.`}
        path={`/departments/${dept.slug}`}
        jsonLd={jsonLd}
      />

      <header className="dept-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: "Departments", to: "/departments" }, { label: dept.name }]} />
          <div className="dept-hero__inner">
            <div className="dept-hero__copy">
              <span className={`card__icon card__icon--${dept.accent === "navy" ? "navy" : dept.accent}`}>
                <Icon name={dept.icon} size={24} />
              </span>
              <p className="eyebrow" style={{ marginTop: 18 }}>
                Department
              </p>
              <h1>{dept.name}</h1>
              <p className="lead" style={{ marginTop: 14 }}>
                {dept.overview}
              </p>
              <div className="btn-row" style={{ marginTop: 24 }}>
                <button type="button" className="btn btn--primary" onClick={() => openAppointment({ speciality: dept.slug })}>
                  <CalendarPlus size={17} aria-hidden="true" />
                  Book a {dept.name} appointment
                </button>
                <a href="#dept-doctors" className="btn btn--ghost">
                  Meet the doctors
                </a>
              </div>
            </div>
            <figure className="dept-hero__media">
              <img
                src={dept.image ? `/${dept.image}` : "/img/consultation.webp"}
                alt={`${dept.name} department — demonstration imagery`}
                width={1300}
                height={866}
                loading="eager"
                decoding="async"
              />
            </figure>
          </div>
        </div>
      </header>

      <section className="section" aria-labelledby="dept-overview">
        <div className="container dept-body">
          <div className="dept-body__main">
            <Reveal>
              <h2 id="dept-overview">Overview</h2>
              <p className="lead" style={{ marginTop: 12 }}>
                {dept.tagline} The {dept.name} department brings consultations, diagnostics and follow-up into one
                coordinated pathway so patients always know the next step.
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="dept-block">
                <h2>Conditions we commonly see</h2>
                <div className="pill-group" style={{ marginTop: 14 }}>
                  {dept.conditions.map((c) => (
                    <span className="chip" key={c}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="dept-block">
                <h2>Services</h2>
                <div className="svc-mini-grid">
                  {dept.services.map((s) => (
                    <div className="svc-mini" key={s}>
                      <Check size={16} strokeWidth={2.6} aria-hidden="true" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="dept-block" id="dept-doctors">
                <div className="section-head" style={{ marginBottom: 20 }}>
                  <div className="section-head__text">
                    <h2>Doctors in this department</h2>
                    <p className="muted">Fictional demonstration profiles.</p>
                  </div>
                  <Link to="/doctors" className="link-arrow">
                    All doctors <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
                <div className="doc-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
                  {deptDoctors.map((d, i) => (
                    <DoctorCard key={d.slug} doctor={d} index={i} />
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="dept-block">
                <h2>Diagnostics & facilities</h2>
                <div className="dept-cols">
                  <div>
                    <p className="profile-facts__label" style={{ marginBottom: 10 }}>
                      Diagnostics
                    </p>
                    <ul className="check-list">
                      {diagnostics.slice(0, 4).map((d) => (
                        <li key={d.title}>{d.title}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="profile-facts__label" style={{ marginBottom: 10 }}>
                      Hospital facilities
                    </p>
                    <ul className="check-list">
                      {facilities.slice(0, 4).map((f) => (
                        <li key={f.title}>{f.title}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="dept-block">
                <h2>Frequently asked questions</h2>
                <div className="faq-list">
                  {dept.faqs.map((f) => (
                    <details key={f.q} className="faq">
                      <summary>
                        {f.q}
                        <ChevronDown size={18} aria-hidden="true" />
                      </summary>
                      <p>{f.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            </Reveal>

            <p className="demo-note">
              <Info size={16} />
              <span>
                Educational content only — this page does not offer medical advice. Consult a qualified healthcare
                professional for medical guidance.
              </span>
            </p>
          </div>

          <aside className="dept-body__side">
            <Reveal delay={0.08}>
              <div className="card card--pad">
                <p className="eyebrow">Next step</p>
                <h3 style={{ marginTop: 12, fontSize: "1.1rem" }}>Request an appointment</h3>
                <p className="muted" style={{ fontSize: "0.88rem", marginTop: 8 }}>
                  Choose a doctor, date and time in six steps. This demo records nothing.
                </p>
                <button
                  type="button"
                  className="btn btn--primary btn--block"
                  style={{ marginTop: 14 }}
                  onClick={() => openAppointment({ speciality: dept.slug })}
                >
                  Book appointment
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="card card--pad" style={{ marginTop: 16 }}>
                <h3 style={{ fontSize: "1rem" }}>Explore other departments</h3>
                <ul className="side-links">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link to={`/departments/${r.slug}`}>
                        <Icon name={r.icon} size={16} />
                        {r.name}
                        <ArrowRight size={14} aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
