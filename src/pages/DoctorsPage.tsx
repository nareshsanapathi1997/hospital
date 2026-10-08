import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, X, SlidersHorizontal } from "lucide-react";
import Seo from "../components/Seo";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import DoctorCard from "../components/DoctorCard";
import { doctors } from "../data/doctors";
import { departments } from "../data/departments";

const LOCATIONS = ["All locations", "Central Campus", "North Annex", "Riverside Clinic"];
const AVAILABILITY = ["Any availability", "Today", "Tomorrow", "This week"];
const EXPERIENCE = ["Any experience", "10+ years", "15+ years", "20+ years"];

export default function DoctorsPage() {
  const [params, setParams] = useSearchParams();
  const initial = params.get("speciality");
  const initialDept = departments.find((d) => d.slug === initial)?.name ?? "All specialities";

  const [q, setQ] = useState("");
  const [speciality, setSpeciality] = useState(initialDept);
  const [location, setLocation] = useState(LOCATIONS[0]);
  const [availability, setAvailability] = useState(AVAILABILITY[0]);
  const [experience, setExperience] = useState(EXPERIENCE[0]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    return doctors.filter((d) => {
      const dept = departments.find((x) => x.slug === d.speciality);
      const matchesTerm =
        !term || [d.name, d.qualification, d.languages.join(" "), dept?.name ?? ""].join(" ").toLowerCase().includes(term);
      const matchesSpec = speciality === "All specialities" || dept?.name === speciality;
      const matchesLoc = location === LOCATIONS[0] || d.location.includes(location);
      const matchesAvail =
        availability === AVAILABILITY[0] ||
        (availability === "Today" && d.availability.status === "today") ||
        (availability === "Tomorrow" && d.availability.status === "tomorrow") ||
        (availability === "This week" && d.availability.status !== "today");
      const years = parseInt(experience, 10) || 0;
      return matchesTerm && matchesSpec && matchesLoc && matchesAvail && (experience === EXPERIENCE[0] || d.experience >= years);
    });
  }, [q, speciality, location, availability, experience]);

  const dirty = q || speciality !== "All specialities" || location !== LOCATIONS[0] || availability !== AVAILABILITY[0] || experience !== EXPERIENCE[0];

  function reset() {
    setQ("");
    setSpeciality("All specialities");
    setLocation(LOCATIONS[0]);
    setAvailability(AVAILABILITY[0]);
    setExperience(EXPERIENCE[0]);
    setParams({});
  }

  return (
    <>
      <Seo
        title="Find a Doctor"
        description="Search demo doctor profiles at Aurelia Multispeciality Hospital by speciality, language, experience and availability. Fictional demonstration profiles by Kyntriq Solutions."
        path="/doctors"
      />
      <PageHeader
        eyebrow="Our medical team"
        title="Find the right specialist for your care."
        description="Search fictional demonstration profiles by name, speciality or language — then filter by location, availability and experience."
        crumbs={[{ label: "Doctors" }]}
      >
        <div className="pill-group" style={{ marginTop: 22 }}>
          <span className="badge badge--teal">14 demo profiles</span>
          <span className="badge badge--neutral">12 specialities</span>
          <span className="badge badge--amber">Sample availability</span>
        </div>
      </PageHeader>

      <section className="section" aria-label="Doctor search results">
        <div className="container">
          <div className="doctor-search" role="search">
            <div className="doctor-search__bar">
              <div className="input-icon doctor-search__input">
                <Search size={18} aria-hidden="true" />
                <label htmlFor="doc-search" className="visually-hidden">
                  Search doctor, speciality or department
                </label>
                <input
                  id="doc-search"
                  className="input"
                  type="search"
                  placeholder="Search doctor, speciality or department"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
              </div>
              <p className="doctor-search__count" aria-live="polite">
                <strong>{results.length}</strong> {results.length === 1 ? "doctor" : "doctors"} found
              </p>
            </div>

            <div className="doctor-search__filters">
              <div className="field">
                <label htmlFor="d-spec">Speciality</label>
                <select id="d-spec" className="select" value={speciality} onChange={(e) => setSpeciality(e.target.value)}>
                  <option>All specialities</option>
                  {departments.map((d) => (
                    <option key={d.slug}>{d.name}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="d-loc">Location</label>
                <select id="d-loc" className="select" value={location} onChange={(e) => setLocation(e.target.value)}>
                  {LOCATIONS.map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="d-avail">Availability</label>
                <select id="d-avail" className="select" value={availability} onChange={(e) => setAvailability(e.target.value)}>
                  {AVAILABILITY.map((a) => (
                    <option key={a}>{a}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="d-exp">Experience</label>
                <select id="d-exp" className="select" value={experience} onChange={(e) => setExperience(e.target.value)}>
                  {EXPERIENCE.map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              </div>
              {dirty && (
                <button type="button" className="btn btn--ghost btn--sm doctor-search__clear" onClick={reset}>
                  <X size={15} aria-hidden="true" /> Clear
                </button>
              )}
            </div>
          </div>

          {results.length > 0 ? (
            <div className="doc-grid">
              {results.map((d, i) => (
                <Reveal key={d.slug} delay={(i % 3) * 0.05}>
                  <DoctorCard doctor={d} index={i} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="empty-state" role="status">
              <SlidersHorizontal size={26} aria-hidden="true" />
              <h3>No doctors match these filters</h3>
              <p className="muted">Try a different speciality, or reset the filters to see all demo profiles.</p>
              <button type="button" className="btn btn--soft" onClick={reset}>
                Reset filters
              </button>
            </div>
          )}

          <p className="demo-note" style={{ marginTop: 30 }}>
            <span className="demo-tag">Demo content</span>
            Every doctor profile on this website is fictional. Names, qualifications, availability and locations are
            sample content created for demonstration purposes and do not represent real practitioners.
          </p>
        </div>
      </section>
    </>
  );
}
