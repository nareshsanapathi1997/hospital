import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Seo from "../components/Seo";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import Icon from "../components/Icon";
import { departments } from "../data/departments";
import { doctorsByDepartment } from "../data/doctors";

export default function DepartmentsPage() {
  return (
    <>
      <Seo
        title="Departments & Specialities"
        description="Explore twelve demonstration departments at Aurelia Multispeciality Hospital — services, doctors, diagnostics and FAQs. Demo content by Kyntriq Solutions."
        path="/departments"
      />
      <PageHeader
        eyebrow="Departments"
        title="Twelve specialities, one connected hospital."
        description="Each department follows the same template: overview, conditions treated, services, doctors, diagnostics, facilities and FAQs."
        crumbs={[{ label: "Departments" }]}
      />

      <section className="section">
        <div className="container">
          <div className="dept-list">
            {departments.map((d, i) => (
              <Reveal key={d.slug} delay={(i % 3) * 0.05}>
                <Link to={`/departments/${d.slug}`} className="dept-row">
                  <span className={`card__icon card__icon--${d.accent === "navy" ? "navy" : d.accent}`}>
                    <Icon name={d.icon} size={22} />
                  </span>
                  <span className="dept-row__body">
                    <span className="dept-row__title">{d.name}</span>
                    <span className="dept-row__desc">{d.tagline}</span>
                    <span className="dept-row__meta">
                      {doctorsByDepartment(d.slug).length} doctors · {d.services.length} services
                    </span>
                  </span>
                  <span className="dept-row__cta">
                    Explore
                    <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <p className="demo-note" style={{ marginTop: 30 }}>
            <span className="demo-tag">Demo content</span>
            Departments, services and clinical descriptions shown here are illustrative and must be reviewed by qualified
            healthcare professionals before publication.
          </p>
        </div>
      </section>
    </>
  );
}
