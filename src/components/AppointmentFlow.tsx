import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, CalendarCheck, Check, Clock, MapPin, X } from "lucide-react";
import { departments } from "../data/departments";
import { doctors, doctorBySlug } from "../data/doctors";
import Icon from "./Icon";
import type { AppointmentRequest } from "../context/DemoUI";

const STEPS = ["Speciality", "Doctor", "Date", "Time", "Details", "Confirmation"];

const SLOT_GROUPS = [
  { label: "Morning", slots: ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"] },
  { label: "Afternoon", slots: ["12:00 PM", "12:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM"] },
  { label: "Evening", slots: ["04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM"] },
];

function nextDays(count: number) {
  const days: { iso: string; day: string; date: string; month: string; weekday: string }[] = [];
  const now = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    days.push({
      iso: d.toISOString().slice(0, 10),
      day: String(d.getDate()).padStart(2, "0"),
      date: d.getDate().toString(),
      month: d.toLocaleString("en-GB", { month: "short" }),
      weekday: d.toLocaleString("en-GB", { weekday: "short" }),
    });
  }
  return days;
}

type Errors = Partial<Record<"name" | "phone" | "email" | "reason", string>>;

export default function AppointmentFlow({
  seed,
  onFinished,
}: {
  seed?: AppointmentRequest | null;
  onFinished?: () => void;
}) {
  const [step, setStep] = useState(0);
  const [speciality, setSpeciality] = useState<string | undefined>(seed?.speciality);
  const [doctorSlug, setDoctorSlug] = useState<string | undefined>(seed?.doctorSlug);
  const [date, setDate] = useState<string | undefined>(seed?.date);
  const [time, setTime] = useState<string | undefined>();
  const [form, setForm] = useState({ name: "", phone: "", email: "", reason: "", visit: "New consultation" });
  const [errors, setErrors] = useState<Errors>({});
  const [ref, setRef] = useState("");
  const topRef = useRef<HTMLDivElement>(null);

  const days = useMemo(() => nextDays(14), []);
  const doctor = doctorBySlug(doctorSlug);
  const doctorList = useMemo(
    () => (speciality ? doctors.filter((d) => d.speciality === speciality) : doctors),
    [speciality]
  );

  useEffect(() => {
    if (doctorSlug && !speciality) setSpeciality(doctorBySlug(doctorSlug)?.speciality);
  }, [doctorSlug, speciality]);

  const canNext =
    (step === 0 && !!speciality) ||
    (step === 1 && !!doctorSlug) ||
    (step === 2 && !!date) ||
    (step === 3 && !!time) ||
    (step === 4 && true) ||
    step === 5;

  function validate() {
    const e: Errors = {};
    if (form.name.trim().length < 2) e.name = "Please enter the patient's full name.";
    if (!/^[0-9]{10}$/.test(form.phone.replace(/\D/g, "").slice(-10))) e.phone = "Enter a 10-digit mobile number.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (form.reason.trim().length < 4) e.reason = "Briefly describe the reason for the visit.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (step === 4 && !validate()) return;
    if (step === 4) {
      setRef(`AUR-DEMO-${Math.floor(100000 + Math.random() * 899999)}`);
    }
    setStep((s) => Math.min(5, s + 1));
    topRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }

  function back() {
    setStep((s) => Math.max(0, s - 1));
    topRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }

  function reset() {
    setStep(0);
    setSpeciality(undefined);
    setDoctorSlug(undefined);
    setDate(undefined);
    setTime(undefined);
    setForm({ name: "", phone: "", email: "", reason: "", visit: "New consultation" });
    setErrors({});
  }

  const dateLabel = days.find((d) => d.iso === date);

  return (
    <div className="booking" ref={topRef}>
      <p className="booking__now">
        <span>
          Step {step + 1} of {STEPS.length}
        </span>
        <span className="booking__now-name">{STEPS[step]}</span>
      </p>
      <ol className="booking__steps" aria-label="Booking progress">
        {STEPS.map((label, i) => (
          <li
            key={label}
            className={`booking__step ${i === step ? "is-current" : ""} ${i < step ? "is-done" : ""}`}
            aria-current={i === step ? "step" : undefined}
          >
            <span className="booking__step-dot">{i < step ? <Check size={13} strokeWidth={3} /> : i + 1}</span>
            <span className="booking__step-label">{label}</span>
          </li>
        ))}
      </ol>

      <div className="booking__panel">
        {step === 0 && (
          <section aria-labelledby="bk-h0">
            <h3 id="bk-h0" className="booking__title">
              Choose a speciality
            </h3>
            <p className="muted booking__sub">Select the department you would like to visit.</p>
            <div className="booking__grid">
              {departments.map((d) => (
                <button
                  key={d.slug}
                  type="button"
                  className={`pick-card ${speciality === d.slug ? "is-selected" : ""}`}
                  onClick={() => {
                    setSpeciality(d.slug);
                    setDoctorSlug(undefined);
                  }}
                  aria-pressed={speciality === d.slug}
                >
                  <span className="card__icon">
                    <Icon name={d.icon} size={21} />
                  </span>
                  <span className="pick-card__title">{d.name}</span>
                  <span className="pick-card__meta">{doctors.filter((x) => x.speciality === d.slug).length} doctors</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {step === 1 && (
          <section aria-labelledby="bk-h1">
            <h3 id="bk-h1" className="booking__title">
              Choose your doctor
            </h3>
            <p className="muted booking__sub">
              {speciality ? `Showing ${departments.find((d) => d.slug === speciality)?.name} specialists` : "All demo specialists"}
            </p>
            <div className="booking__doctor-list">
              {doctorList.map((d) => (
                <button
                  key={d.slug}
                  type="button"
                  className={`doc-pick ${doctorSlug === d.slug ? "is-selected" : ""}`}
                  onClick={() => setDoctorSlug(d.slug)}
                  aria-pressed={doctorSlug === d.slug}
                >
                  <img className="avatar" src={`/${d.photo}`} alt="" width={54} height={54} loading="lazy" />
                  <span className="doc-pick__body">
                    <span className="doc-pick__name">{d.name}</span>
                    <span className="doc-pick__meta">
                      {departments.find((x) => x.slug === d.speciality)?.name} · {d.experience} yrs experience
                    </span>
                    <span className="doc-pick__meta">
                      <span className={`dot ${d.availability.status === "week" ? "dot--busy" : ""}`} /> {d.availability.label}
                    </span>
                  </span>
                  <span className="doc-pick__check" aria-hidden="true">
                    {doctorSlug === d.slug && <Check size={16} strokeWidth={3} />}
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}

        {step === 2 && (
          <section aria-labelledby="bk-h2">
            <h3 id="bk-h2" className="booking__title">
              Choose a date
            </h3>
            <p className="muted booking__sub">Demo availability — dates are generated for presentation purposes.</p>
            <div className="date-strip" role="group" aria-label="Select a date">
              {days.map((d) => (
                <button
                  key={d.iso}
                  type="button"
                  className={`date-chip ${date === d.iso ? "is-selected" : ""}`}
                  onClick={() => setDate(d.iso)}
                  aria-pressed={date === d.iso}
                >
                  <span className="date-chip__wd">{d.weekday}</span>
                  <span className="date-chip__d">{d.date}</span>
                  <span className="date-chip__mo">{d.month}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {step === 3 && (
          <section aria-labelledby="bk-h3">
            <h3 id="bk-h3" className="booking__title">
              Choose a time
            </h3>
            <p className="muted booking__sub">
              {dateLabel ? `${dateLabel.weekday}, ${dateLabel.date} ${dateLabel.month}` : ""} · demo slots
            </p>
            <div className="slot-groups">
              {SLOT_GROUPS.map((g) => (
                <div key={g.label} className="slot-group">
                  <h4 className="slot-group__label">{g.label}</h4>
                  <div className="slot-group__slots" role="group" aria-label={`${g.label} slots`}>
                    {g.slots.map((s, idx) => {
                      const disabled = idx === 1 && (date ?? "").charCodeAt(0) % 3 === 0;
                      return (
                        <button
                          key={s}
                          type="button"
                          disabled={disabled}
                          className={`slot ${time === s ? "is-selected" : ""}`}
                          onClick={() => setTime(s)}
                          aria-pressed={time === s}
                        >
                          <Clock size={13} aria-hidden="true" />
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {step === 4 && (
          <section aria-labelledby="bk-h4">
            <h3 id="bk-h4" className="booking__title">
              Patient details
            </h3>
            <p className="muted booking__sub">Demo form — information entered here is never sent or stored.</p>
            <div className="form-grid" style={{ marginTop: 18 }}>
              <div className="field">
                <label htmlFor="bk-name">
                  Patient name <span className="req">*</span>
                </label>
                <input
                  id="bk-name"
                  className="input"
                  value={form.name}
                  autoComplete="off"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "bk-name-err" : undefined}
                  placeholder="e.g. Demo Patient"
                />
                {errors.name && (
                  <span id="bk-name-err" className="field-error" role="alert">
                    {errors.name}
                  </span>
                )}
              </div>
              <div className="field">
                <label htmlFor="bk-phone">
                  Mobile number <span className="req">*</span>
                </label>
                <input
                  id="bk-phone"
                  className="input"
                  inputMode="numeric"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "bk-phone-err" : undefined}
                  placeholder="10-digit mobile number"
                />
                {errors.phone && (
                  <span id="bk-phone-err" className="field-error" role="alert">
                    {errors.phone}
                  </span>
                )}
              </div>
              <div className="field">
                <label htmlFor="bk-email">Email (optional)</label>
                <input
                  id="bk-email"
                  className="input"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "bk-email-err" : undefined}
                  placeholder="name@example.com"
                />
                {errors.email && (
                  <span id="bk-email-err" className="field-error" role="alert">
                    {errors.email}
                  </span>
                )}
              </div>
              <div className="field">
                <label htmlFor="bk-visit">Visit type</label>
                <select
                  id="bk-visit"
                  className="select"
                  value={form.visit}
                  onChange={(e) => setForm({ ...form, visit: e.target.value })}
                >
                  <option>New consultation</option>
                  <option>Follow-up visit</option>
                  <option>Video consultation</option>
                </select>
              </div>
              <div className="field field--full">
                <label htmlFor="bk-reason">
                  Reason for visit <span className="req">*</span>
                </label>
                <textarea
                  id="bk-reason"
                  className="textarea"
                  style={{ minHeight: 96 }}
                  value={form.reason}
                  onChange={(e) => setForm({ ...form, reason: e.target.value })}
                  aria-invalid={!!errors.reason}
                  aria-describedby={errors.reason ? "bk-reason-err" : undefined}
                  placeholder="Briefly describe the concern so the team can prepare."
                />
                {errors.reason && (
                  <span id="bk-reason-err" className="field-error" role="alert">
                    {errors.reason}
                  </span>
                )}
              </div>
            </div>
            <div className="demo-note" style={{ marginTop: 16 }}>
              <Icon name="Info" size={16} />
              <span>
                This is a demo interaction. No appointment is actually booked and no medical information is transmitted or
                stored.
              </span>
            </div>
          </section>
        )}

        {step === 5 && (
          <section aria-labelledby="bk-h5">
            <div className="confirm-hero">
              <span className="confirm-hero__icon">
                <Check size={26} strokeWidth={3} />
              </span>
              <h3 id="bk-h5">Demo appointment created successfully.</h3>
              <p className="muted">
                Your appointment request has been recorded in this demo session only. Nothing was sent to a hospital system.
              </p>
            </div>

            <dl className="summary">
              <div>
                <dt>Reference</dt>
                <dd className="mono">{ref}</dd>
              </div>
              <div>
                <dt>Doctor</dt>
                <dd>{doctor?.name}</dd>
              </div>
              <div>
                <dt>Speciality</dt>
                <dd>{departments.find((d) => d.slug === speciality)?.name}</dd>
              </div>
              <div>
                <dt>Date & time</dt>
                <dd>
                  {dateLabel ? `${dateLabel.weekday}, ${dateLabel.date} ${dateLabel.month}` : "—"} · {time}
                </dd>
              </div>
              <div>
                <dt>Patient</dt>
                <dd>{form.name}</dd>
              </div>
              <div>
                <dt>Visit</dt>
                <dd>{form.visit}</dd>
              </div>
            </dl>

            <div className="summary__actions">
              <button type="button" className="btn btn--ghost" onClick={reset}>
                Book another
              </button>
              <Link to="/patient-portal" className="btn btn--soft" onClick={onFinished}>
                Open patient portal preview
              </Link>
            </div>

            <p className="muted" style={{ fontSize: "0.8rem", marginTop: 14 }}>
              Demo reference — for presentation purposes only.{" "}
              <Link to="/doctors" style={{ textDecoration: "underline" }}>
                Back to doctor search
              </Link>
            </p>
          </section>
        )}
      </div>

      {step < 5 && (
        <div className="booking__footer">
          <div className="booking__footer-info">
            <span className="badge">
              <MapPin size={13} aria-hidden="true" /> Central Campus (demo)
            </span>
            {doctor && (
              <span className="badge badge--blue">
                <CalendarCheck size={13} aria-hidden="true" /> {doctor.name}
              </span>
            )}
          </div>
          <div className="btn-row">
            <button type="button" className="btn btn--ghost" onClick={back} disabled={step === 0}>
              <ArrowLeft size={16} aria-hidden="true" /> Back
            </button>
            <button type="button" className="btn btn--primary" onClick={next} disabled={!canNext}>
              {step === 4 ? "Confirm demo appointment" : "Continue"}
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function AppointmentModal({
  open,
  seed,
  onClose,
}: {
  open: boolean;
  seed?: AppointmentRequest | null;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    lastFocused.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => dialogRef.current?.focus(), 40);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && dialogRef.current) {
        const nodes = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      window.clearTimeout(t);
      lastFocused.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal-root" role="presentation">
      <div className="modal-backdrop" onClick={onClose} aria-hidden="true" />
      <div
        className="modal modal--booking"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        ref={dialogRef}
        tabIndex={-1}
      >
        <div className="modal__head">
          <div>
            <p className="eyebrow">Book an appointment</p>
            <h2 id="booking-title" style={{ fontSize: "1.4rem", marginTop: 8 }}>
              Reserve a visit
            </h2>
          </div>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close booking">
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <div className="modal__body">
          <AppointmentFlow seed={seed} onFinished={onClose} />
        </div>
      </div>
    </div>
  );
}
