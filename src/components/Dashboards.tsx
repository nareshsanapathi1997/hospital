import type { ReactNode } from "react";
import {
  Activity,
  ArrowUpRight,
  Bell,
  Bed,
  Bot,
  CalendarCheck,
  ClipboardList,
  CreditCard,
  FlaskConical,
  FileText,
  MessageSquare,
  Pill,
  Stethoscope,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import { useDemoUI } from "../context/DemoUI";

function Frame({ title, badge, children, foot }: { title: string; badge?: string; children: ReactNode; foot?: string }) {
  return (
    <div className="dash">
      <div className="dash__bar">
        <span className="dash__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="dash__title">{title}</span>
        {badge && <span className="badge badge--neutral">{badge}</span>}
      </div>
      <div className="dash__body">{children}</div>
      {foot && <div className="dash__foot">{foot}</div>}
    </div>
  );
}

export function PatientDashboard({ compact = false }: { compact?: boolean }) {
  const { showToast } = useDemoUI();
  const tiles = [
    { label: "Reports", value: "3 new", icon: FileText, tone: "blue" },
    { label: "Prescriptions", value: "2 active", icon: Pill, tone: "teal" },
    { label: "Appointments", value: "1 upcoming", icon: CalendarCheck, tone: "green" },
    { label: "Messages", value: "1 unread", icon: MessageSquare, tone: "amber" },
    { label: "Billing", value: "₹0 due", icon: CreditCard, tone: "navy" },
    { label: "Health package", value: "Basic · demo", icon: FlaskConical, tone: "blue" },
  ];

  return (
    <Frame title="Patient portal — aurelia.demo" badge="Demo dashboard · sample data" foot="Dummy patient data only — no real records exist in this demo.">
      <div className="dash__patient">
        <span className="avatar avatar--sq">
          <User size={22} aria-hidden="true" />
        </span>
        <div>
          <h3>Demo Patient</h3>
          <p>ID AUR-DEMO-0021 · Central Campus</p>
        </div>
        <span className="badge badge--green">
          <span className="dot" aria-hidden="true" /> Verified demo record
        </span>
      </div>

      <div className="dash__cols">
        <div className="dash__main">
          <div className="dash-appt">
            <div className="dash-appt__head">
              <span className="badge badge--blue">
                <CalendarCheck size={13} aria-hidden="true" /> Upcoming appointment
              </span>
              <span className="badge badge--green">Confirmed (demo)</span>
            </div>
            <div className="dash-appt__body">
              <img className="avatar" src="/img/doctors/p12.webp" alt="" width={52} height={52} loading="lazy" />
              <div>
                <strong>Dr. Aarav Mehta</strong>
                <span>Cardiology · Central Campus</span>
                <span>Saturday, 18 October · 10:30 AM</span>
              </div>
            </div>
            <div className="dash-appt__actions">
              <button type="button" className="btn btn--primary btn--sm" onClick={() => showToast("Rescheduling is simulated in this demo.")}>
                Reschedule
              </button>
              <button type="button" className="btn btn--ghost btn--sm" onClick={() => showToast("Video consultation is a placeholder in this demo.")}>
                Join video
              </button>
              <button type="button" className="btn btn--ghost btn--sm" onClick={() => showToast("Directions are a placeholder in this demo.")}>
                Directions
              </button>
            </div>
          </div>

          {!compact && (
            <div className="dash-list">
              <div className="dash-list__head">
                <h4>Recent reports</h4>
                <span className="badge badge--neutral">Sample data</span>
              </div>
              {[
                ["Complete Blood Count", "12 Oct 2026", "Verified"],
                ["Lipid Profile", "12 Oct 2026", "Verified"],
                ["Chest X-ray PA view", "04 Oct 2026", "Reported"],
              ].map(([name, date, status]) => (
                <div className="dash-row" key={name}>
                  <span className="dash-row__icon">
                    <FileText size={16} aria-hidden="true" />
                  </span>
                  <span className="dash-row__label">
                    <strong>{name}</strong>
                    <em>{date}</em>
                  </span>
                  <span className="badge badge--green">{status}</span>
                  <button type="button" className="btn btn--ghost btn--sm" onClick={() => showToast("Downloads are simulated in this demo.")}>
                    View
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="dash__side">
          <div className="dash-tiles">
            {tiles.map((t) => (
              <button
                type="button"
                className="dash-tile"
                key={t.label}
                onClick={() => showToast(`${t.label} — preview tile in this demo.`)}
              >
                <span className={`card__icon card__icon--${t.tone}`}>
                  <t.icon size={17} aria-hidden="true" />
                </span>
                <span className="dash-tile__label">{t.label}</span>
                <span className="dash-tile__value">{t.value}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}

export function DoctorDashboard() {
  const { showToast } = useDemoUI();
  const queue = [
    { time: "09:30", name: "Demo Patient A", type: "New", status: "In consultation" },
    { time: "10:00", name: "Demo Patient B", type: "Follow-up", status: "Waiting" },
    { time: "10:30", name: "Demo Patient C", type: "New", status: "Waiting" },
    { time: "11:00", name: "Demo Patient D", type: "Video", status: "Scheduled" },
  ];

  return (
    <Frame title="Doctor workspace — aurelia.demo" badge="Demo dashboard · sample data" foot="Fictional patients and schedules generated for presentation.">
      <div className="dash__patient">
        <img className="avatar avatar--sq" src="/img/doctors/p12.webp" alt="" width={48} height={48} loading="lazy" />
        <div>
          <h3>Dr. Aarav Mehta</h3>
          <p>Cardiology · OPD 04 · Today's shift 09:00 – 17:00</p>
        </div>
        <span className="badge badge--green">
          <span className="dot" aria-hidden="true" /> Accepting patients
        </span>
      </div>

      <div className="doc-dash__stats">
        {[
          { label: "Today's appointments", value: "14", icon: CalendarCheck },
          { label: "Patients in queue", value: "3", icon: Users },
          { label: "Follow-ups due", value: "5", icon: Activity },
          { label: "Reports to review", value: "7", icon: ClipboardList },
        ].map((s) => (
          <div className="doc-stat" key={s.label}>
            <span className="card__icon">
              <s.icon size={17} aria-hidden="true" />
            </span>
            <div>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="dash__cols dash__cols--doctor">
        <div className="dash__main">
          <div className="dash-list">
            <div className="dash-list__head">
              <h4>Patient queue</h4>
              <span className="badge badge--neutral">Demo patients</span>
            </div>
            {queue.map((q) => (
              <div className="dash-row" key={q.time}>
                <span className="dash-row__time">{q.time}</span>
                <span className="dash-row__label">
                  <strong>{q.name}</strong>
                  <em>
                    {q.type} · {q.status}
                  </em>
                </span>
                <button
                  type="button"
                  className="btn btn--soft btn--sm"
                  onClick={() => showToast("Opening a chart is simulated in this demo.")}
                >
                  Open
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="dash__side">
          <div className="dash-panel">
            <div className="dash-list__head">
              <h4>Schedule</h4>
              <span className="badge badge--blue">OPD</span>
            </div>
            <ul className="schedule">
              <li>
                <span>09:00 – 11:00</span>
                <strong>OPD · Central Campus</strong>
              </li>
              <li>
                <span>11:00 – 12:30</span>
                <strong>Procedures</strong>
              </li>
              <li>
                <span>14:00 – 17:00</span>
                <strong>OPD · Review visits</strong>
              </li>
            </ul>
          </div>

          <div className="dash-panel">
            <div className="dash-list__head">
              <h4>Consultation notes</h4>
              <span className="badge badge--neutral">Draft</span>
            </div>
            <p className="dash-note">
              Sample note — patient advised follow-up in 4 weeks with repeat lipid profile. Demo content only.
            </p>
            <div className="dash-panel__actions">
              <button type="button" className="btn btn--ghost btn--sm" onClick={() => showToast("Note saving is simulated in this demo.")}>
                Save note
              </button>
              <button type="button" className="btn btn--soft btn--sm" onClick={() => showToast("Prescription flow is simulated in this demo.")}>
                <Pill size={14} aria-hidden="true" /> Prescribe
              </button>
            </div>
          </div>

          <div className="dash-panel dash-panel--row">
            <span className="badge badge--teal">
              <MessageSquare size={13} aria-hidden="true" /> 3 messages
            </span>
            <span className="badge badge--green">
              <Bell size={13} aria-hidden="true" /> 2 follow-ups
            </span>
            <span className="badge badge--blue">
              <Bot size={13} aria-hidden="true" /> Availability: on
            </span>
          </div>
        </div>
      </div>
    </Frame>
  );
}

export function AdminDashboard() {
  const { showToast } = useDemoUI();
  const kpis = [
    { label: "Appointments", value: "148", delta: "+12 today", icon: CalendarCheck, tone: "blue" },
    { label: "Patients", value: "1,326", delta: "+64 this week", icon: Users, tone: "teal" },
    { label: "Doctors on duty", value: "42", delta: "of 58", icon: Stethoscope, tone: "navy" },
    { label: "Departments", value: "12", delta: "all active", icon: ClipboardList, tone: "green" },
    { label: "Beds occupied", value: "184", delta: "of 240", icon: Bed, tone: "amber" },
    { label: "Diagnostics", value: "96", delta: "reports today", icon: FlaskConical, tone: "teal" },
    { label: "Revenue (demo)", value: "₹18.4L", delta: "sample figure", icon: TrendingUp, tone: "green" },
    { label: "Staff on shift", value: "510", delta: "across campus", icon: Users, tone: "blue" },
  ];

  const deptBars = [
    ["General Medicine", 92],
    ["Cardiology", 74],
    ["Orthopaedics", 61],
    ["Paediatrics", 55],
    ["Dermatology", 43],
    ["ENT", 36],
  ] as const;

  return (
    <Frame title="Hospital operations — aurelia.demo" badge="Demo dashboard — sample data" foot="All figures are fictional sample data for presentation purposes.">
      <div className="admin-kpis">
        {kpis.map((k) => (
          <button type="button" className="admin-kpi" key={k.label} onClick={() => showToast(`${k.label} — sample KPI tile.`)}>
            <span className={`card__icon card__icon--${k.tone}`}>
              <k.icon size={17} aria-hidden="true" />
            </span>
            <strong>{k.value}</strong>
            <span className="admin-kpi__label">{k.label}</span>
            <span className="admin-kpi__delta">{k.delta}</span>
          </button>
        ))}
      </div>

      <div className="dash__cols dash__cols--admin">
        <div className="dash__main">
          <div className="dash-panel">
            <div className="dash-list__head">
              <h4>Appointments by department</h4>
              <span className="badge badge--neutral">Today · sample data</span>
            </div>
            <ul className="bar-chart">
              {deptBars.map(([name, val]) => (
                <li key={name}>
                  <span className="bar-chart__label">{name}</span>
                  <span className="bar-chart__track">
                    <span className="bar-chart__fill" style={{ width: `${val}%` }} />
                  </span>
                  <span className="bar-chart__value">{val}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="dash__side">
          <div className="dash-panel">
            <div className="dash-list__head">
              <h4>Notifications</h4>
              <span className="badge badge--amber">7 new</span>
            </div>
            <ul className="notif">
              <li>
                <Bell size={15} aria-hidden="true" />
                <span>Bed allocation request pending approval</span>
              </li>
              <li>
                <FlaskConical size={15} aria-hidden="true" />
                <span>Lab batch 2214 released — 18 reports</span>
              </li>
              <li>
                <CreditCard size={15} aria-hidden="true" />
                <span>Package payment recorded (demo)</span>
              </li>
              <li>
                <Bot size={15} aria-hidden="true" />
                <span>Assistant handled 46 enquiries today</span>
              </li>
            </ul>
          </div>

          <div className="dash-panel">
            <div className="dash-list__head">
              <h4>Quick actions</h4>
            </div>
            <div className="dash-panel__actions">
              <button type="button" className="btn btn--ghost btn--sm" onClick={() => showToast("Reports are simulated in this demo.")}>
                <ArrowUpRight size={14} aria-hidden="true" /> View reports
              </button>
              <button type="button" className="btn btn--soft btn--sm" onClick={() => showToast("Roster editing is simulated in this demo.")}>
                Manage roster
              </button>
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}
