import { Link } from "react-router-dom";
import { ArrowRight, Bot, CalendarCheck, Check, Clock, LayoutGrid, Search, Siren, Stethoscope, UserSearch } from "lucide-react";
import Reveal from "../components/Reveal";
import { useDemoUI } from "../context/DemoUI";

type Quick = {
  title: string;
  description: string;
  icon: typeof CalendarCheck;
  tone: "navy" | "blue" | "teal" | "red";
  to?: string;
  action?: "book" | "emergency";
};

const QUICK: Quick[] = [
  {
    title: "Book Appointment",
    description: "Find a specialist and choose a convenient time.",
    icon: CalendarCheck,
    tone: "navy",
    action: "book" as const,
  },
  {
    title: "Find a Doctor",
    description: "Search doctors by speciality, experience and availability.",
    icon: UserSearch,
    tone: "blue",
    to: "/doctors",
  },
  {
    title: "Departments",
    description: "Explore medical departments and services.",
    icon: LayoutGrid,
    tone: "teal",
    to: "/departments",
  },
  {
    title: "Emergency",
    description: "Get urgent-care information quickly.",
    icon: Siren,
    tone: "red",
    action: "emergency" as const,
  },
];

export default function Hero() {
  const { openAppointment, openEmergency, openAi } = useDemoUI();

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__bg" aria-hidden="true" />
        <div className="container hero__inner">
          <div className="hero__content">
            <Reveal>
              <p className="eyebrow">Multispeciality care • Digital healthcare</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 id="hero-title" className="hero__title">
                Healthcare that puts <span>patients first.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="hero__lead">
                Connect with experienced specialists, explore departments and book appointments through one simple
                healthcare experience.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="btn-row hero__actions">
                <button type="button" className="btn btn--primary btn--lg" onClick={() => openAppointment()}>
                  Book an Appointment
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
                <Link to="/doctors" className="btn btn--ghost btn--lg">
                  <Search size={17} aria-hidden="true" />
                  Find a Doctor
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.24}>
              <ul className="tick-row hero__ticks">
                {["Multiple Specialities", "Easy Appointment Booking", "Connected Patient Support"].map((t) => (
                  <li className="tick" key={t}>
                    <Check size={16} strokeWidth={2.6} aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="hero__disclosure">
                Demonstration concept by Kyntriq Solutions — not a real hospital. All profiles and data are fictional.
              </p>
            </Reveal>
          </div>

          <div className="hero__visual" aria-hidden="false">
            <Reveal delay={0.1}>
              <figure className="hero__photo">
                <img
                  src="/img/hero-hospital.webp"
                  alt="Modern hospital building exterior — demonstration imagery"
                  width={1100}
                  height={1650}
                  fetchPriority="high"
                  decoding="async"
                />
                <figcaption className="hero__photo-tag">
                  <span className="dot" aria-hidden="true" /> Aurelia Central Campus (demo)
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={0.28} className="hero__float hero__float--appt">
              <div className="float-card">
                <span className="float-card__icon">
                  <CalendarCheck size={17} aria-hidden="true" />
                </span>
                <div>
                  <p className="float-card__label">Next available</p>
                  <p className="float-card__value">
                    Dr. Aarav Mehta
                    <span className="float-card__time">10:30 AM</span>
                  </p>
                </div>
                <button type="button" className="btn btn--soft btn--sm" onClick={() => openAppointment({ doctorSlug: "dr-aarav-mehta" })}>
                  Book
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.36} className="hero__float hero__float--ai">
              <div className="float-card float-card--ai">
                <span className="float-card__icon float-card__icon--ai">
                  <Bot size={17} aria-hidden="true" />
                </span>
                <div>
                  <p className="float-card__label">Aurelia Assistant</p>
                  <p className="float-card__value">“I can help you find a specialist.”</p>
                </div>
                <button type="button" className="chip chip--dark" onClick={openAi}>
                  Try
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.44} className="hero__float hero__float--meta">
              <div className="float-card float-card--meta">
                <span className="float-card__icon float-card__icon--teal">
                  <Stethoscope size={17} aria-hidden="true" />
                </span>
                <div>
                  <p className="float-card__label">Departments</p>
                  <p className="float-card__value">12 specialities connected</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="quick-actions" aria-label="Quick actions">
        <div className="container">
          <ul className="quick-actions__grid">
            {QUICK.map((q, i) => (
              <li key={q.title}>
                <Reveal delay={i * 0.06}>
                  {q.to ? (
                    <Link to={q.to} className={`quick-card quick-card--${q.tone}`}>
                      <span className="quick-card__icon">
                        <q.icon size={22} strokeWidth={1.9} aria-hidden="true" />
                      </span>
                      <span className="quick-card__body">
                        <span className="quick-card__title">{q.title}</span>
                        <span className="quick-card__desc">{q.description}</span>
                      </span>
                      <span className="quick-card__arrow" aria-hidden="true">
                        <ArrowRight size={18} />
                      </span>
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className={`quick-card quick-card--${q.tone}`}
                      onClick={() => {
                        if (q.action === "book") openAppointment();
                        if (q.action === "emergency") openEmergency();
                      }}
                    >
                      <span className="quick-card__icon">
                        <q.icon size={22} strokeWidth={1.9} aria-hidden="true" />
                      </span>
                      <span className="quick-card__body">
                        <span className="quick-card__title">{q.title}</span>
                        <span className="quick-card__desc">{q.description}</span>
                      </span>
                      <span className="quick-card__arrow" aria-hidden="true">
                        <ArrowRight size={18} />
                      </span>
                    </button>
                  )}
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
