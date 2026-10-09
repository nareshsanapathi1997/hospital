import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Bot, CalendarPlus, Send, Sparkles, User, X, Shield } from "lucide-react";
import { departments } from "../data/departments";
import { doctors, Doctor } from "../data/doctors";
import { useDemoUI } from "../context/DemoUI";

type Cta = { label: string; kind: "book" | "doctors" | "emergency" | "portal" | "ai-page"; doctor?: string; speciality?: string };

type Msg = {
  id: number;
  from: "user" | "ai";
  text?: string;
  doctors?: Doctor[];
  chips?: string[];
  cta?: Cta;
  typing?: boolean;
};

const KEYWORDS: [RegExp, string][] = [
  [/cardiolog|heart|chest/i, "cardiology"],
  [/neurolog|brain|headache|migraine|stroke/i, "neurology"],
  [/ortho|bone|joint|knee|back pain|fracture/i, "orthopaedics"],
  [/gastro|stomach|liver|digest|acid/i, "gastroenterology"],
  [/paediatr|pediatr|child|baby|infant|kid/i, "paediatrics"],
  [/dermat|skin|hair|acne|allerg/i, "dermatology"],
  [/oncolog|cancer|tumour|chemo/i, "oncology"],
  [/gynae|gynec|women|pregnan|menstrual/i, "gynaecology"],
  [/ent|ear|nose|throat|sinus|hearing/i, "ent"],
  [/eye|vision|spectacl|ophthalm/i, "ophthalmology"],
  [/lung|asthma|breath|cough|pulmon/i, "pulmonology"],
  [/fever|general|diabet|thyroid|check[- ]?up/i, "general-medicine"],
];

const FALLBACK_CHIPS = [
  "I need a cardiologist for a consultation.",
  "What are the visiting hours?",
  "How do I book an appointment?",
  "Show my report status",
];

function answer(input: string): Omit<Msg, "id"> {
  const text = input.trim();

  if (/^(hi|hello|hey|namaste)\b/i.test(text)) {
    return {
      from: "ai",
      text: "Hello. I can help you navigate the hospital — finding specialists, checking availability, booking visits and locating services. What do you need?",
      chips: FALLBACK_CHIPS,
    };
  }

  const matched = KEYWORDS.find(([re]) => re.test(text));
  if (matched && /doctor|specialist|consult|need|find|show|available|cardio|neuro|ortho|gastro|paed|derm|onco|gynae|ent|eye|lung|fever/i.test(text)) {
    const slug = matched[1];
    const dept = departments.find((d) => d.slug === slug)!;
    const list = doctors.filter((d) => d.speciality === slug).slice(0, 2);
    return {
      from: "ai",
      text: `I can help you find a ${dept.name} specialist. Here are ${dept.name} doctors available in this demo — would you like me to open the booking flow for one of them?`,
      doctors: list,
      chips: ["Show all doctors", "What are visiting hours?", "Book for tomorrow"],
      cta: { label: `Explore ${dept.name} department`, kind: "doctors", speciality: slug },
    };
  }

  if (matched) {
    const dept = departments.find((d) => d.slug === matched[1])!;
    return {
      from: "ai",
      text: `The ${dept.name} department handles ${dept.conditions.slice(0, 3).join(", ").toLowerCase()} and more. Would you like to see the doctors in this department?`,
      chips: [`Show ${dept.name} doctors`, "General consultation", "Health check packages"],
      cta: { label: `Open ${dept.name}`, kind: "doctors", speciality: dept.slug },
    };
  }

  if (/hour|timing|visiting|open|close/i.test(text)) {
    return {
      from: "ai",
      text: "Outpatient hours in this demo are 8:00 AM – 8:00 PM, Monday to Saturday. Emergency services are shown as 24/7. These are placeholder timings for presentation purposes.",
      chips: ["Book an appointment", "Find a doctor", "Emergency information"],
    };
  }

  if (/book|appointment|slot|schedule|reserve/i.test(text)) {
    return {
      from: "ai",
      text: "I can start the booking flow — you choose the speciality, doctor, date, time and confirm patient details. It takes about a minute.",
      chips: ["Start booking", "I need a cardiologist", "Show departments"],
      cta: { label: "Book an appointment", kind: "book" },
    };
  }

  if (/report|lab|result|scan/i.test(text)) {
    return {
      from: "ai",
      text: "Lab reports appear in the patient portal once they are verified. In this demo the portal is a preview with sample data — no real reports exist.",
      chips: ["Open patient portal", "Diagnostic services", "Book a health check"],
      cta: { label: "Open patient portal preview", kind: "portal" },
    };
  }

  if (/emergenc|urgent|ambulance|108/i.test(text)) {
    return {
      from: "ai",
      text: "For urgent medical assistance, use the emergency information panel — it shows the demo emergency contact and guidance. In India, dial 108 for an ambulance.",
      chips: ["Emergency information", "Hospital location", "Book an appointment"],
      cta: { label: "Open emergency information", kind: "emergency" },
    };
  }

  if (/price|package|cost|charge|fee/i.test(text)) {
    return {
      from: "ai",
      text: "The demo shows three preventive health check packages starting at ₹2,999. All pricing shown on this site is sample data for presentation only.",
      chips: ["See health packages", "Book an appointment", "Diagnostics"],
    };
  }

  if (/where|address|location|direction|reach/i.test(text)) {
    return {
      from: "ai",
      text: "The demo address is 100 Aurelia Way, Central District. It is placeholder content — a production build would show the hospital's verified address with maps integration.",
      chips: ["Get directions", "Emergency information", "Contact the hospital"],
    };
  }

  if (/thank|thanks|ok|great/i.test(text)) {
    return { from: "ai", text: "You're welcome. Ask me anything about departments, doctors or booking.", chips: FALLBACK_CHIPS };
  }

  return {
    from: "ai",
    text: "I can help with navigation, scheduling and general hospital information — for example finding a specialist, checking availability or booking a visit. I do not provide medical diagnosis. Could you rephrase your request?",
    chips: FALLBACK_CHIPS,
  };
}

export default function AiAssistant({ onClose }: { onClose?: () => void }) {
  const { openAppointment, openEmergency, showToast } = useDemoUI();
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      id: 1,
      from: "ai",
      text: "Hi, I'm the Aurelia assistant — a demo AI for navigation and scheduling. How can I help you today?",
      chips: FALLBACK_CHIPS,
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(2);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  function send(text: string) {
    const value = text.trim();
    if (!value) return;
    setMsgs((m) => [...m, { id: idRef.current++, from: "user", text: value }]);
    setInput("");
    setTyping(true);
    const t = window.setTimeout(() => {
      const reply = answer(value);
      setTyping(false);
      setMsgs((m) => [...m, { ...reply, id: idRef.current++ }]);
    }, 750);
    timers.current.push(t);
  }

  function handleCta(cta: Cta) {
    if (cta.kind === "book") openAppointment(cta.speciality ? { speciality: cta.speciality } : undefined);
    if (cta.kind === "emergency") openEmergency();
    if (cta.kind === "portal") showToast("Patient portal preview is available from the Patients menu.");
    if (cta.kind === "doctors") onClose?.();
  }

  return (
    <div className="ai-assistant">
      <div className="ai-assistant__head">
        <span className="ai-avatar">
          <Bot size={20} aria-hidden="true" />
        </span>
        <div className="ai-assistant__title">
          <strong>Aurelia Assistant</strong>
          <span>
            <span className="dot" aria-hidden="true" /> Demo AI · always available
          </span>
        </div>
        <span className="badge badge--teal">
          <Sparkles size={12} aria-hidden="true" /> Demo
        </span>
        {onClose && (
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close assistant">
            <X size={18} aria-hidden="true" />
          </button>
        )}
      </div>

      <div className="ai-assistant__messages" ref={scrollRef} role="log" aria-live="polite" aria-label="Assistant conversation">
        {msgs.map((m) => (
          <div key={m.id} className={`msg msg--${m.from}`}>
            <span className="msg__avatar" aria-hidden="true">
              {m.from === "ai" ? <Bot size={15} /> : <User size={15} />}
            </span>
            <div className="msg__bubble">
              {m.text && <p>{m.text}</p>}

              {m.doctors && (
                <div className="msg__doctors">
                  {m.doctors.map((d) => (
                    <div className="msg-doctor" key={d.slug}>
                      <img src={`/${d.photo}`} alt="" className="avatar" width={42} height={42} loading="lazy" />
                      <div>
                        <strong>{d.name}</strong>
                        <span>
                          {departments.find((x) => x.slug === d.speciality)?.name} · {d.experience} yrs
                        </span>
                        <span>
                          <span className={`dot ${d.availability.status === "week" ? "dot--busy" : ""}`} aria-hidden="true" />{" "}
                          {d.availability.label}
                        </span>
                      </div>
                      <button type="button" className="btn btn--soft btn--sm" onClick={() => openAppointment({ doctorSlug: d.slug })}>
                        Book
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {m.cta && (
                <button type="button" className="btn btn--primary btn--sm" style={{ marginTop: 10 }} onClick={() => handleCta(m.cta!)}>
                  <CalendarPlus size={14} aria-hidden="true" />
                  {m.cta.label}
                </button>
              )}

              {m.chips && (
                <div className="msg__chips">
                  {m.chips.map((c) => (
                    <button key={c} type="button" className="chip" onClick={() => send(c)}>
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {typing && (
          <div className="msg msg--ai">
            <span className="msg__avatar" aria-hidden="true">
              <Bot size={15} />
            </span>
            <div className="msg__bubble msg__bubble--typing" aria-label="Assistant is typing">
              <span />
              <span />
              <span />
            </div>
          </div>
        )}
      </div>

      <form
        className="ai-assistant__input"
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <label htmlFor="ai-input" className="visually-hidden">
          Ask the demo assistant
        </label>
        <input
          id="ai-input"
          className="input"
          placeholder="Ask about doctors, departments or booking…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoComplete="off"
        />
        <button type="submit" className="btn btn--accent" aria-label="Send message">
          <Send size={17} aria-hidden="true" />
        </button>
      </form>

      <p className="ai-disclaimer">
        <Shield size={14} aria-hidden="true" />
        AI assistance is for navigation, scheduling and general information. It does not provide medical diagnosis or
        emergency medical advice.
      </p>
    </div>
  );
}

export function AiModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    lastFocused.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => ref.current?.focus(), 40);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
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
      <div className="modal modal--ai" role="dialog" aria-modal="true" aria-label="Demo AI healthcare assistant" ref={ref} tabIndex={-1}>
        <AiAssistant onClose={onClose} />
        <p className="modal--ai__foot">
          Prefer browsing? <Link to="/doctors" onClick={onClose}>Find a doctor</Link> or{" "}
          <Link to="/ai-healthcare" onClick={onClose}>
            learn about the AI assistant
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
