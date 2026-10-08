import { Link } from "react-router-dom";
import { CalendarPlus, Clock, Languages } from "lucide-react";
import { Doctor } from "../data/doctors";
import { departments } from "../data/departments";
import { useDemoUI } from "../context/DemoUI";

export default function DoctorCard({ doctor, index = 0 }: { doctor: Doctor; index?: number }) {
  const { openAppointment } = useDemoUI();
  const dept = departments.find((d) => d.slug === doctor.speciality);

  return (
    <article className="doc-card" style={{ ["--i" as string]: index }}>
      <div className="doc-card__top">
        <img className="doc-card__photo" src={doctor.photo} alt={`Portrait of ${doctor.name}`} width={96} height={96} loading="lazy" />
        <div className="doc-card__head">
          <h3 className="doc-card__name">{doctor.name}</h3>
          <p className="doc-card__spec">{dept?.name}</p>
          <p className="doc-card__qual">{doctor.qualification}</p>
        </div>
      </div>

      <ul className="doc-card__facts">
        <li>
          <Clock size={14} aria-hidden="true" />
          <span>{doctor.experience} years experience</span>
        </li>
        <li>
          <Languages size={14} aria-hidden="true" />
          <span>{doctor.languages.join(", ")}</span>
        </li>
        <li>
          <span className={`dot ${doctor.availability.status === "week" ? "dot--busy" : ""}`} aria-hidden="true" />
          <span>{doctor.availability.label}</span>
        </li>
      </ul>

      <div className="doc-card__actions">
        <Link to={`/doctors/${doctor.slug}`} className="btn btn--ghost btn--sm">
          View Profile
        </Link>
        <button type="button" className="btn btn--primary btn--sm" onClick={() => openAppointment({ doctorSlug: doctor.slug })}>
          <CalendarPlus size={15} aria-hidden="true" />
          Book Appointment
        </button>
      </div>
    </article>
  );
}
