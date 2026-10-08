import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock, Info, Tag } from "lucide-react";
import Seo from "../components/Seo";
import { Breadcrumbs } from "../components/PageHeader";
import Reveal from "../components/Reveal";
import NotFound from "./NotFound";
import { blogPosts } from "../data/content";

type Block = { heading?: string; paras: string[]; bullets?: string[] };

const BODIES: Record<string, Block[]> = {
  "connected-healthcare-experience": [
    {
      paras: [
        "Most hospital journeys break in the handoff: a patient reads a website, calls a number, repeats their story at the desk, then waits for a report that arrives through a different channel. A connected experience removes those seams.",
        "The idea is simple. The information a patient enters once should follow them through the journey — search, booking, visit, report and follow-up — without asking them to re-enter it.",
      ],
    },
    {
      heading: "One entry point, one record",
      paras: [
        "Search and booking are the front door. When the appointment system knows the speciality, doctor, date and time, the rest of the platform can prepare: queue positions, forms to carry, reminders to send.",
        "The portal then becomes the patient's single reference point — upcoming visits, prescriptions, reports and billing, each attached to the visit that produced it.",
      ],
      bullets: [
        "Search leads to a booking, not a phone tag",
        "Confirmation carries what to bring and when to arrive",
        "Reminders reference the actual date, doctor and location",
        "Reports land against the visit, dated and labelled",
      ],
    },
    {
      heading: "Where the handoffs usually fail",
      paras: [
        "Missed confirmations, unclear arrival instructions and reports that arrive without context are the most common friction points. Each is a workflow problem more than a technology problem — which is why configuration matters more than features.",
      ],
    },
    {
      heading: "What this demonstration shows",
      paras: [
        "The website you are on demonstrates this shape end to end: doctor discovery, a six-step booking flow, WhatsApp-style reminders, patient and doctor portals, and an operations dashboard reading the same sample data.",
        "Everything is fictional and runs locally — the point is to make the shape of the experience discussable before anything is built for real.",
      ],
    },
  ],
  "before-you-book-a-specialist": [
    {
      paras: [
        "A little preparation turns a specialist consultation from a rushed ten minutes into a useful one. This checklist is general information, not medical advice.",
      ],
    },
    {
      heading: "1. Write down your timeline",
      paras: [
        "When did the concern start, what makes it better or worse, and has it changed over time? A clear timeline is more useful to a clinician than a long list of keywords.",
      ],
    },
    {
      heading: "2. Bring the evidence you already have",
      paras: [
        "Previous prescriptions, recent reports, imaging discs or downloads, and a list of medicines with doses. If reports are old, bring them anyway — context still helps.",
      ],
    },
    {
      heading: "3. Know your history summary",
      paras: ["Major conditions, past surgeries, allergies and family history, written down if you do not remember it under pressure."],
    },
    {
      heading: "4. Prepare three questions",
      paras: [
        "Most consultations end before the last question is asked. Writing your top three keeps the visit focused — causes to rule out, tests that matter, and what happens next.",
      ],
    },
    {
      heading: "5. Confirm the practical details",
      paras: [
        "Location and floor, reporting time, whether fasting is required, payment method and how you will receive the prescription and reports.",
        "In this demonstration, the booking flow surfaces these details at confirmation — a pattern worth copying.",
      ],
      bullets: ["Doctor name and department", "Date, time and arrival buffer", "Documents to carry", "How reports will be delivered"],
    },
  ],
  "preventive-health-checks-explained": [
    {
      paras: [
        "Health check packages bundle common screening tests into one scheduled visit. Choosing one is mostly about matching the package to your age, history and risk factors — a conversation best had with a physician.",
      ],
    },
    {
      heading: "What a package usually contains",
      paras: [
        "Basic packages typically cover a blood count, sugar profile, lipid profile, liver and kidney function, thyroid screening and a urinalysis, followed by a physician review. Advanced packages may add imaging or cardiac screening.",
      ],
      bullets: ["Complete blood count", "Blood sugar and HbA1c", "Lipid profile", "Liver and kidney function", "Thyroid profile", "Physician review"],
    },
    {
      heading: "Reading the results",
      paras: [
        "Results come with reference ranges, but a number outside the range is not a diagnosis. Values are read against your history, symptoms and repeat tests where needed.",
        "The useful output of a health check is the follow-up: what to retest, what to change, and what to discuss with your doctor.",
      ],
    },
    {
      heading: "When to follow up",
      paras: [
        "If a flagged value persists, is accompanied by symptoms, or relates to a risk factor you already have, book a consultation rather than waiting for the next annual cycle.",
      ],
    },
  ],
  "ai-in-hospital-workflows": [
    {
      paras: [
        "The useful question is not whether a hospital should use AI, but which jobs it should be trusted with. In our experience of hospital workflows, the safe list is short and the unsafe list is short — and the difference is about authority, not intelligence.",
      ],
    },
    {
      heading: "Strong use cases",
      paras: [
        "Navigation and scheduling are the sweet spots: helping a patient find the right department, understand visiting hours, choose a slot and remember an appointment. Summarising documents for staff review, with a human confirming before anything is recorded, is another.",
      ],
      bullets: [
        "Explaining departments and services",
        "Finding doctors by criteria and availability",
        "Booking, rescheduling and reminders",
        "Drafting internal summaries a human approves",
      ],
    },
    {
      heading: "Where it should stop",
      paras: [
        "Diagnosis, triage, medicine suggestions and interpreting results belong to qualified professionals. An assistant that guesses confidently in these areas creates risk for the patient and liability for the hospital.",
        "That is why the assistant in this demo refuses clinical questions outright, and escalates urgent requests to emergency options instead of answering them.",
      ],
    },
    {
      heading: "Designing the boundary",
      paras: [
        "Boundaries work best when they are visible: an assistant that says what it will not do is easier to trust than one that appears to do everything. Escalation paths, clear response expectations and human handoff are part of the same design.",
      ],
    },
  ],
  "hospital-updates-demo-platform": [
    {
      paras: ["A changelog-style update for the Kyntriq Solutions demonstration platform — what shipped recently and why it matters."],
    },
    {
      heading: "Department pages",
      paras: [
        "Every speciality now follows one template: overview, conditions treated, services, doctors, diagnostics, facilities and FAQs. The consistency makes the content reviewable and the layout predictable for patients.",
      ],
    },
    {
      heading: "Doctor profiles",
      paras: [
        "Profiles gained education timelines, languages, consultation types, sample availability and related doctors — while deliberately avoiding awards, outcome statistics and testimonials that could not be verified.",
      ],
    },
    {
      heading: "Portals preview",
      paras: [
        "Patient, doctor and admin dashboards are now reachable from the homepage and their own routes, all reading the same fictional sample data so the handoffs between roles are visible.",
      ],
    },
    {
      heading: "What's next",
      paras: [
        "Remaining work focuses on performance passes, content review hooks and an accessibility audit — the unglamorous list that decides whether a demo becomes a product.",
      ],
    },
  ],
  "reducing-missed-appointments": [
    {
      paras: [
        "No-shows are rarely caused by forgetfulness alone. Unclear instructions, awkward timing and no easy way to reschedule all contribute — and each has a workflow fix.",
      ],
    },
    {
      heading: "The reminder ladder",
      paras: [
        "A simple sequence covers most cases: a confirmation when booking, a reminder a day before, and a final nudge a few hours ahead. Each message should carry the specifics, not just a generic prompt.",
      ],
      bullets: ["At booking: doctor, date, time, location, what to carry", "24 hours before: same details plus reschedule link", "3–4 hours before: arrival time and floor", "After the visit: report availability and follow-up"],
    },
    {
      heading: "Make rescheduling effortless",
      paras: [
        "Patients who can move an appointment in two taps usually do — rather than abandoning it entirely. Self-service rescheduling with clear cut-off rules reduces friction on both sides.",
      ],
    },
    {
      heading: "Channels matter",
      paras: [
        "WhatsApp and SMS reach patients who do not open email; email carries the detail. Using all three for the same appointment keeps the record consistent.",
        "The WhatsApp workflow demonstrated on this site follows exactly this pattern, with fictional scenarios only.",
      ],
    },
  ],
};

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <NotFound />;
  const blocks = BODIES[post.slug] ?? [{ paras: [post.excerpt] }];
  const others = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <Seo
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        type="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          datePublished: post.date,
          description: post.excerpt,
          author: { "@type": "Organization", name: "Kyntriq Solutions (demo)" },
        }}
      />

      <article className="article">
        <div className="container container--narrow">
          <Breadcrumbs items={[{ label: "Blog", to: "/blog" }, { label: post.title }]} />

          <div className="article__meta">
            <span className="badge badge--teal">
              <Tag size={12} aria-hidden="true" /> {post.category}
            </span>
            <span className="muted" style={{ fontSize: "0.8rem" }}>
              {post.date}
            </span>
            <span className="muted" style={{ fontSize: "0.8rem", display: "inline-flex", gap: 6, alignItems: "center" }}>
              <Clock size={13} aria-hidden="true" /> {post.readTime}
            </span>
          </div>

          <h1 className="article__title">{post.title}</h1>
          <p className="lead article__lead">{post.excerpt}</p>

          <figure className="article__hero">
            <img src={`/${post.image}`} alt="" width={1300} height={866} loading="eager" decoding="async" />
          </figure>

          <div className="demo-note" style={{ marginTop: 24 }}>
            <Info size={16} />
            <span>Educational demonstration content — not medical advice. Consult a qualified healthcare professional for medical guidance.</span>
          </div>

          <div className="article__body">
            {blocks.map((b, i) => (
              <Reveal key={i} delay={0.03 * i}>
                <section>
                  {b.heading && <h2>{b.heading}</h2>}
                  {b.paras.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                  {b.bullets && (
                    <ul>
                      {b.bullets.map((li) => (
                        <li key={li}>{li}</li>
                      ))}
                    </ul>
                  )}
                </section>
              </Reveal>
            ))}
          </div>

          <div className="article__foot">
            <Link to="/blog" className="btn btn--ghost">
              <ArrowLeft size={16} aria-hidden="true" /> All articles
            </Link>
            <Link to="/appointment" className="btn btn--primary">
              Book an appointment <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </article>

      <section className="section section-soft" aria-labelledby="more-reading">
        <div className="container">
          <div className="section-head">
            <div className="section-head__text">
              <p className="eyebrow">Keep reading</p>
              <h2 id="more-reading">More from the blog</h2>
            </div>
          </div>
          <div className="blog-grid blog-grid--compact">
            {others.map((p) => (
              <Reveal key={p.slug}>
                <article className="blog-card">
                  <Link to={`/blog/${p.slug}`} className="blog-card__media" tabIndex={-1} aria-hidden="true">
                    <img src={`/${p.image}`} alt="" width={1300} height={866} loading="lazy" decoding="async" />
                  </Link>
                  <div className="blog-card__body">
                    <span className="muted" style={{ fontSize: "0.78rem" }}>
                      {p.category}
                    </span>
                    <h3 className="blog-card__title">
                      <Link to={`/blog/${p.slug}`}>{p.title}</Link>
                    </h3>
                    <Link to={`/blog/${p.slug}`} className="link-arrow">
                      Read <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
