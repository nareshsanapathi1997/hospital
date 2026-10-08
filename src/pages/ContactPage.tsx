import { useState } from "react";
import { Clock3, Mail, MapPin, Phone, Send, CheckCircle2, Info, MessageSquare } from "lucide-react";
import Seo from "../components/Seo";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import { useDemoUI } from "../context/DemoUI";

type FormState = { name: string; email: string; phone: string; topic: string; message: string };
type Errors = Partial<Record<keyof FormState, string>>;

const EMPTY: FormState = { name: "", email: "", phone: "", topic: "General enquiry", message: "" };

export default function ContactPage() {
  const { showToast, openAi } = useDemoUI();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function set<K extends keyof FormState>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email address.";
    if (!/^[+\d][\d\s-]{7,}$/.test(form.phone)) next.phone = "Enter a valid phone number.";
    if (form.message.trim().length < 10) next.message = "Please add a little more detail (10+ characters).";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const first = document.querySelector<HTMLElement>("[data-invalid='true']");
      first?.focus();
      showToast("Please fix the highlighted fields.");
      return;
    }
    setSent(true);
    showToast("Demo enquiry recorded locally — nothing was sent.");
  }

  return (
    <>
      <Seo
        title="Contact"
        description="Contact details and enquiry form for the Aurelia demonstration hospital website. Fictional contact information by Kyntriq Solutions."
        path="/contact"
      />
      <PageHeader
        eyebrow="Contact"
        title="Talk to us — or talk to the assistant."
        description="Demo contact details and a working enquiry form. Submission is simulated in your browser."
        crumbs={[{ label: "Contact" }]}
      />

      <section className="section">
        <div className="container contact-layout">
          <Reveal>
            <div className="card card--pad contact-card">
              <h2>Send an enquiry</h2>

              {sent ? (
                <div className="form-success" role="status">
                  <CheckCircle2 size={26} aria-hidden="true" />
                  <div>
                    <h3>Thanks — your demo enquiry is ready.</h3>
                    <p className="muted">
                      Nothing was transmitted or stored. In a production build, this would be routed to the hospital's
                      helpdesk with a ticket number.
                    </p>
                    <button
                      type="button"
                      className="btn btn--soft btn--sm"
                      style={{ marginTop: 14 }}
                      onClick={() => {
                        setForm(EMPTY);
                        setSent(false);
                      }}
                    >
                      Send another
                    </button>
                  </div>
                </div>
              ) : (
                <form className="form-grid" onSubmit={submit} noValidate>
                  <div className={`field ${errors.name ? "field--error" : ""}`}>
                    <label htmlFor="c-name">Full name</label>
                    <input
                      id="c-name"
                      className="input"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      data-invalid={errors.name ? "true" : undefined}
                      aria-invalid={errors.name ? "true" : undefined}
                      aria-describedby={errors.name ? "c-name-err" : undefined}
                      onChange={(e) => set("name", e.target.value)}
                    />
                    {errors.name && (
                      <p className="field__error" id="c-name-err">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className={`field ${errors.email ? "field--error" : ""}`}>
                    <label htmlFor="c-email">Email</label>
                    <input
                      id="c-email"
                      className="input"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      data-invalid={errors.email ? "true" : undefined}
                      aria-invalid={errors.email ? "true" : undefined}
                      aria-describedby={errors.email ? "c-email-err" : undefined}
                      onChange={(e) => set("email", e.target.value)}
                    />
                    {errors.email && (
                      <p className="field__error" id="c-email-err">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className={`field ${errors.phone ? "field--error" : ""}`}>
                    <label htmlFor="c-phone">Phone</label>
                    <input
                      id="c-phone"
                      className="input"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+91 XXX XXX XXXX"
                      value={form.phone}
                      data-invalid={errors.phone ? "true" : undefined}
                      aria-invalid={errors.phone ? "true" : undefined}
                      aria-describedby={errors.phone ? "c-phone-err" : undefined}
                      onChange={(e) => set("phone", e.target.value)}
                    />
                    {errors.phone && (
                      <p className="field__error" id="c-phone-err">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="field">
                    <label htmlFor="c-topic">Topic</label>
                    <select id="c-topic" className="select" value={form.topic} onChange={(e) => set("topic", e.target.value)}>
                      <option>General enquiry</option>
                      <option>Appointments</option>
                      <option>Reports & records</option>
                      <option>Feedback</option>
                      <option>Kyntriq Solutions — website or platform</option>
                    </select>
                  </div>

                  <div className={`field field--full ${errors.message ? "field--error" : ""}`}>
                    <label htmlFor="c-msg">Message</label>
                    <textarea
                      id="c-msg"
                      className="input textarea"
                      rows={5}
                      value={form.message}
                      data-invalid={errors.message ? "true" : undefined}
                      aria-invalid={errors.message ? "true" : undefined}
                      aria-describedby={errors.message ? "c-msg-err" : undefined}
                      onChange={(e) => set("message", e.target.value)}
                    />
                    {errors.message && (
                      <p className="field__error" id="c-msg-err">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="field field--full">
                    <button type="submit" className="btn btn--primary btn--lg">
                      <Send size={16} aria-hidden="true" />
                      Send enquiry
                    </button>
                    <p className="muted" style={{ fontSize: "0.8rem", marginTop: 10 }}>
                      Demo form — nothing is transmitted. Do not enter real personal or medical information.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </Reveal>

          <div className="contact-side">
            <Reveal delay={0.06}>
              <div className="card card--pad">
                <h3 style={{ fontSize: "1.05rem" }}>Hospital contact</h3>
                <ul className="contact-list" style={{ marginTop: 14 }}>
                  <li>
                    <MapPin size={17} aria-hidden="true" />
                    <span>
                      Aurelia Multispeciality Hospital
                      <br />
                      12 Meridian Avenue, Bengaluru
                      <br />
                      <em>Demo address — not a real location</em>
                    </span>
                  </li>
                  <li>
                    <Phone size={17} aria-hidden="true" />
                    <span>
                      <strong>+91 XXX XXX XXXX</strong>
                      <br />
                      <em>Demo contact — replace before production</em>
                    </span>
                  </li>
                  <li>
                    <Mail size={17} aria-hidden="true" />
                    <span>
                      hello@aurelia.example
                      <br />
                      <em>Demonstration mailbox</em>
                    </span>
                  </li>
                  <li>
                    <Clock3 size={17} aria-hidden="true" />
                    <span>
                      OPD: 08:00 – 20:00 daily
                      <br />
                      Emergency: 24 × 7
                    </span>
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="card card--pad" style={{ marginTop: 16 }}>
                <h3 style={{ fontSize: "1.05rem" }}>
                  <MessageSquare size={18} aria-hidden="true" style={{ display: "inline", verticalAlign: "-4px", marginRight: 8 }} />
                  Quick answers
                </h3>
                <p className="muted" style={{ fontSize: "0.9rem", marginTop: 10 }}>
                  The assistant can explain departments, doctors and booking steps without waiting for a reply.
                </p>
                <button type="button" className="btn btn--soft btn--block" style={{ marginTop: 14 }} onClick={openAi}>
                  Ask the AI assistant
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="demo-note" style={{ marginTop: 16 }}>
                <Info size={16} />
                <span>
                  For a medical emergency, contact your local emergency service — 108 in India. This demo website does not
                  dispatch help.
                </span>
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
