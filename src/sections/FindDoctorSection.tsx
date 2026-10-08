import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, SlidersHorizontal, X, ArrowRight } from "lucide-react";
import Reveal from "../components/Reveal";
import DoctorCard from "../components/DoctorCard";
import { doctors } from "../data/doctors";
import { departments } from "../data/departments";

const LOCATIONS = ["All locations", "Central Campus", "North Annex", "Riverside Clinic"];
const AVAILABILITY = ["Any availability", "Today", "Tomorrow", "This week"];
const EXPERIENCE = ["Any experience", "10+ years", "15+ years", "20+ years"];

export default function FindDoctorSection() {
  const [q, setQ] = useState("");
  const [speciality, setSpeciality] = useState("All specialities");
  const [location, setLocation] = useState(LOCATIONS[0]);
  const [availability, setAvailability] = useState(AVAILABILITY[0]);
  const [experience, setExperience] = useState(EXPERIENCE[0]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    return doctors.filter((d) => {
      const dept = departments.find((x) => x.slug === d.speciality);
      const matchesTerm =
        !term ||
        [d.name, d.qualification, d.languages.join(" "), dept?.name ?? ""].join(" ").toLowerCase().includes(term);
      const matchesSpec = speciality === "All specialities" || dept?.name === speciality;
      const matchesLoc = location === LOCATIONS[0] || d.location.includes(location);
      const matchesAvail =
        availability === AVAILABILITY[0] ||
        (availability === "Today" && d.availability.status === "today") ||
        (availability === "Tomorrow" && d.availability.status === "tomorrow") ||
        (availability === "This week" && d.availability.status !== "today");
      const years = parseInt(experience, 10) || 0;
      const matchesExp = experience === EXPERIENCE[0] || d.experience >= years;
      return matchesTerm && matchesSpec && matchesLoc && matchesAvail && matchesExp;
    });
  }, [q, speciality, location, availability, experience]);

  const active = q || speciality !== "All specialities" || location !== LOCATIONS[0] || availability !== AVAILABILITY[0] || experience !== EXPERIENCE[0];

  function reset() {
    setQ("");
    setSpeciality("All specialities");
    setLocation(LOCATIONS[0]);
    setAvailability(AVAILABILITY[0]);
    setExperience(EXPERIENCE[0]);
  }

  return (
    <section className="section section-soft" id="find-doctor" aria-labelledby="find-doctor-title">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div className="section-head__text">
              <p className="eyebrow">Find a doctor</p>
              <h2 id="find-doctor-title">Find the right specialist for your care.</h2>
              <p className="muted">
                Search demo profiles by name, speciality or language, then filter by availability and experience.
              </p>
            </div>
            <Link to="/doctors" className="link-arrow">
              Browse all doctors <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="doctor-search" role="search" aria-label="Doctor search">
            <div className="doctor-search__bar">
              <div className="input-icon doctor-search__input">
                <Search size={18} aria-hidden="true" />
                <label htmlFor="home-doc-search" className="visually-hidden">
                  Search doctor, speciality or department
                </label>
                <input
                  id="home-doc-search"
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
                <label htmlFor="f-spec">Speciality</label>
                <select id="f-spec" className="select" value={speciality} onChange={(e) => setSpeciality(e.target.value)}>
                  <option>All specialities</option>
                  {departments.map((d) => (
                    <option key={d.slug}>{d.name}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="f-loc">Location</label>
                <select id="f-loc" className="select" value={location} onChange={(e) => setLocation(e.target.value)}>
                  {LOCATIONS.map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="f-avail">Availability</label>
                <select id="f-avail" className="select" value={availability} onChange={(e) => setAvailability(e.target.value)}>
                  {AVAILABILITY.map((a) => (
                    <option key={a}>{a}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="f-exp">Experience</label>
                <select id="f-exp" className="select" value={experience} onChange={(e) => setExperience(e.target.value)}>
                  {EXPERIENCE.map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              </div>
              {active && (
                <button type="button" className="btn btn--ghost btn--sm doctor-search__clear" onClick={reset}>
                  <X size={15} aria-hidden="true" /> Clear
                </button>
              )}
            </div>
          </div>
        </Reveal>

        {results.length > 0 ? (
          <div className="doc-grid">
            {results.slice(0, 6).map((d, i) => (
              <Reveal key={d.slug} delay={0.04 * i}>
                <DoctorCard doctor={d} index={i} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="empty-state" role="status">
            <SlidersHorizontal size={26} aria-hidden="true" />
            <h3>No doctors match these filters</h3>
            <p className="muted">Try clearing a filter or searching for a different speciality.</p>
            <button type="button" className="btn btn--soft" onClick={reset}>
              Reset filters
            </button>
          </div>
        )}

        <p className="demo-note" style={{ marginTop: 26 }}>
          <span className="demo-tag">Demo content</span>
          All doctor profiles, availability and credentials shown on this website are fictional and created for
          demonstration purposes only.
        </p>
      </div>
    </section>
  );
}
