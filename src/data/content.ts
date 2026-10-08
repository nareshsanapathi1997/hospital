export const quickActions = [
  {
    title: "Book Appointment",
    description: "Find a specialist and choose a convenient time.",
    icon: "CalendarCheck",
    cta: "Start booking",
    to: "/appointment",
    tone: "navy" as const,
  },
  {
    title: "Find a Doctor",
    description: "Search doctors by speciality, experience and availability.",
    icon: "Search",
    cta: "Search doctors",
    to: "/doctors",
    tone: "blue" as const,
  },
  {
    title: "Departments",
    description: "Explore medical departments and services.",
    icon: "LayoutGrid",
    cta: "View departments",
    to: "/departments",
    tone: "teal" as const,
  },
  {
    title: "Emergency",
    description: "Get urgent-care information quickly.",
    icon: "Siren",
    cta: "Emergency info",
    to: "#emergency",
    tone: "red" as const,
  },
];

export const patientJourney = [
  { step: "01", title: "Find a Doctor", text: "Search by speciality, language, experience and availability." },
  { step: "02", title: "Choose Appointment", text: "Pick a date and time that works for the patient." },
  { step: "03", title: "Consult", text: "Meet the specialist in person or by video consultation." },
  { step: "04", title: "Diagnostics", text: "Book tests and scans with results delivered to the portal." },
  { step: "05", title: "Follow-up", text: "Receive reminders and schedule the next review visit." },
];

export const patientServices = [
  { title: "Appointments", icon: "CalendarCheck", text: "Book, reschedule and view visits in one place.", cta: "Book now", to: "/appointment" },
  { title: "Lab Reports", icon: "FlaskConical", text: "Access diagnostic reports through the patient portal.", cta: "View reports", to: "/patient-portal" },
  { title: "Pharmacy", icon: "Pill", text: "Pharmacy information, hours and prescription support.", cta: "Pharmacy info", to: "/services" },
  { title: "Health Packages", icon: "Package", text: "Demo preventive health check packages.", cta: "See packages", to: "/services#packages" },
  { title: "Insurance Support", icon: "ShieldCheck", text: "Documentation guidance for insurance claims.", cta: "Get support", to: "/contact" },
  { title: "Patient Portal", icon: "MonitorSmartphone", text: "Records, prescriptions, billing and messages.", cta: "Open portal", to: "/patient-portal" },
  { title: "Ambulance", icon: "Ambulance", text: "Emergency transport information and contacts.", cta: "Emergency info", to: "#emergency" },
  { title: "Blood Bank", icon: "Droplets", text: "Blood bank information and donation enquiries.", cta: "Enquire", to: "/contact" },
  { title: "Visitor Information", icon: "Info", text: "Visiting hours, directions and campus guidance.", cta: "Plan a visit", to: "/about" },
];

export const healthPackages = [
  {
    name: "Basic Health Check",
    price: "₹2,999",
    summary: "A starter profile for annual preventive screening.",
    tests: ["Complete blood count", "Blood sugar profile", "Lipid profile", "Liver & kidney function", "Urine routine", "Physician review"],
    popular: false,
  },
  {
    name: "Comprehensive Health Check",
    price: "₹5,999",
    summary: "A wider screening profile with specialist review.",
    tests: ["Everything in Basic", "Thyroid profile", "Vitamin D & B12", "ECG & chest X-ray", "Counselling session", "Dietician guidance"],
    popular: true,
  },
  {
    name: "Senior Wellness Check",
    price: "₹4,999",
    summary: "Designed for ongoing monitoring in later years.",
    tests: ["Cardiac risk profile", "Diabetes monitoring", "Bone & joint review", "Vision & hearing check", "Physician consult", "Follow-up planning"],
    popular: false,
  },
];

export const diagnostics = [
  { title: "Laboratory", icon: "FlaskConical", text: "Routine and specialised pathology testing with portal delivery." },
  { title: "Radiology", icon: "Scan", text: "X-ray, ultrasound and imaging reporting by radiologists." },
  { title: "MRI", icon: "ScanLine", text: "MRI scheduling, preparation guidance and report access." },
  { title: "CT Scan", icon: "Activity", text: "CT protocols coordinated with referring specialists." },
  { title: "Ultrasound", icon: "Waves", text: "General and targeted ultrasound appointments." },
  { title: "Health Checkups", icon: "ClipboardCheck", text: "Package-based preventive screening workflows." },
];

export const diagnosticsWorkflow = [
  { step: "01", title: "Test Booking", text: "Book from the portal, front desk or a doctor's consultation." },
  { step: "02", title: "Sample / Scan", text: "Check-in with a reference number — no paper slips needed." },
  { step: "03", title: "Processing", text: "Status updates flow through the laboratory system." },
  { step: "04", title: "Report", text: "Verified reports are released to the reporting system." },
  { step: "05", title: "Patient Portal", text: "Reports appear in the patient portal with reminders." },
];

export const whatsappWorkflow = ["Patient", "WhatsApp", "AI Assistant", "Appointment", "Confirmation", "Reminder", "Follow-up"];

export const whatsappUseCases = [
  { title: "Appointment booking", text: "Patients start a booking inside the chat and receive confirmation." },
  { title: "Appointment reminders", text: "Automated reminders reduce avoidable missed visits." },
  { title: "Doctor availability", text: "Share OPD timings and available slots on request." },
  { title: "Lab report notifications", text: "Notify patients when a report is ready in the portal." },
  { title: "Hospital information", text: "Answer visiting hours, directions and department queries." },
  { title: "Follow-up reminders", text: "Scheduled nudges for review visits and care plans." },
];

export const facilities = [
  { title: "Emergency Care", icon: "Siren", text: "24/7 emergency triage area with dedicated staff.", image: "img/ambulance.webp" },
  { title: "ICU", icon: "HeartPulse", text: "Critical care units with continuous monitoring.", image: "img/icu.webp" },
  { title: "Operation Theatres", icon: "Scissors", text: "Modular theatres for planned and emergency surgery.", image: "img/operating-theatre.webp" },
  { title: "Diagnostics", icon: "Scan", text: "Imaging and pathology under one connected workflow.", image: "img/mri.webp" },
  { title: "Pharmacy", icon: "Pill", text: "In-house pharmacy with prescription support.", image: "img/pharmacy.webp" },
  { title: "Blood Bank", icon: "Droplets", text: "Storage and cross-match coordination information.", image: "" },
  { title: "Ambulance", icon: "Ambulance", text: "Emergency transport coordination information.", image: "img/ambulance.webp" },
  { title: "24/7 Support", icon: "Headset", text: "Round-the-clock helpdesk and patient support.", image: "" },
];

export const techIntegrations = [
  { title: "CRM", icon: "Users", text: "Patient enquiries, campaigns and follow-up tracking." },
  { title: "Hospital Management", icon: "Building2", text: "ADT, scheduling and department workflows." },
  { title: "EMR / EHR", icon: "ClipboardList", text: "Consultation notes, prescriptions and history." },
  { title: "Laboratory", icon: "FlaskConical", text: "Orders, statuses and verified reports." },
  { title: "Radiology", icon: "Scan", text: "Imaging orders, schedules and radiologist reports." },
  { title: "Payments", icon: "CreditCard", text: "Consultation, package and diagnostics payments." },
  { title: "WhatsApp", icon: "MessageCircle", text: "Notifications, reminders and conversational support." },
  { title: "Email", icon: "Mail", text: "Confirmations, invoices and health resources." },
  { title: "SMS", icon: "MessageSquare", text: "Appointment and report delivery notifications." },
  { title: "APIs", icon: "Code", text: "REST endpoints for custom hospital systems." },
  { title: "Cloud", icon: "Cloud", text: "Scalable hosting with monitoring and backups." },
];

export const whyKyntriq = [
  { title: "Connected Systems", icon: "Workflow", text: "One connected healthcare ecosystem instead of disconnected tools." },
  { title: "AI Assistance", icon: "Bot", text: "Automate repetitive patient workflows and routine questions." },
  { title: "Better Patient Experience", icon: "HandHeart", text: "Make healthcare interactions easier to start and finish." },
  { title: "Operational Efficiency", icon: "Gauge", text: "Reduce unnecessary manual processes across departments." },
  { title: "Scalable Technology", icon: "Layers", text: "Build systems that can grow with the organisation." },
  { title: "Secure Architecture", icon: "ShieldCheck", text: "Design security and privacy into the system from day one." },
];

export const demoTestimonials = [
  {
    quote:
      "The demo shows how a patient could search for a specialist and confirm a slot in a couple of steps — the kind of experience we would want to offer.",
    author: "Sample patient feedback",
    role: "Illustrative scenario — demo content",
  },
  {
    quote:
      "A single place for appointments, reports and reminders would make front-desk coordination much simpler for our teams.",
    author: "Sample operations feedback",
    role: "Illustrative scenario — demo content",
  },
  {
    quote:
      "Having the assistant answer visiting hours and availability questions would help our call volume during peak hours.",
    author: "Sample helpdesk feedback",
    role: "Illustrative scenario — demo content",
  },
];

export const technologyShowcase = [
  { label: "Patient", icon: "User" },
  { label: "Website", icon: "Globe" },
  { label: "AI Assistant", icon: "Bot" },
  { label: "Appointment System", icon: "CalendarCheck" },
  { label: "Hospital CRM", icon: "Users" },
  { label: "Doctor", icon: "Stethoscope" },
  { label: "Diagnostics", icon: "FlaskConical" },
  { label: "Patient Portal", icon: "MonitorSmartphone" },
  { label: "WhatsApp Follow-up", icon: "MessageCircle" },
];

export const blogPosts = [
  {
    slug: "connected-healthcare-experience",
    title: "What a connected healthcare experience actually looks like",
    category: "Technology in Healthcare",
    excerpt:
      "A practical walkthrough of how a hospital website, appointment system, diagnostics and patient portal work together for one patient journey.",
    date: "12 March 2026",
    readTime: "6 min read",
    image: "img/reception.webp",
  },
  {
    slug: "before-you-book-a-specialist",
    title: "Five things to check before you book a specialist",
    category: "Patient Guides",
    excerpt:
      "A short, practical checklist for preparing for a specialist consultation — from reports and medication lists to questions worth writing down.",
    date: "04 March 2026",
    readTime: "4 min read",
    image: "img/consultation.webp",
  },
  {
    slug: "preventive-health-checks-explained",
    title: "Preventive health checks, explained simply",
    category: "Preventive Care",
    excerpt:
      "What a health check package usually covers, how to read the profiles inside one, and when to follow up with a physician.",
    date: "26 February 2026",
    readTime: "5 min read",
    image: "img/laboratory.webp",
  },
  {
    slug: "ai-in-hospital-workflows",
    title: "Where AI helps in hospital workflows — and where it should not",
    category: "Technology in Healthcare",
    excerpt:
      "Navigation, scheduling and summaries are strong use cases. Diagnosis is not. A clear boundary makes assistants safer and more useful.",
    date: "18 February 2026",
    readTime: "7 min read",
    image: "img/mri.webp",
  },
  {
    slug: "hospital-updates-demo-platform",
    title: "Demo platform update: department pages and doctor profiles",
    category: "Hospital Updates",
    excerpt:
      "A changelog-style update covering the newest templates in this demonstration platform built by Kyntriq Solutions.",
    date: "10 February 2026",
    readTime: "3 min read",
    image: "img/campus.webp",
  },
  {
    slug: "reducing-missed-appointments",
    title: "Reminders, reminders, reminders: reducing avoidable no-shows",
    category: "Preventive Care",
    excerpt:
      "How multi-channel reminders through WhatsApp, SMS and email fit into an appointment workflow — demonstrated with sample scenarios.",
    date: "02 February 2026",
    readTime: "5 min read",
    image: "img/stethoscope.webp",
  },
];

export const emergencyInfo = {
  phone: "+91 XXX XXX XXXX",
  services: [
    { title: "Emergency Department", text: "24/7 triage for urgent medical needs. Demo contact — replace before production." },
    { title: "Ambulance Coordination", text: "Request transport through the hospital dispatch desk. Demo information only." },
    { title: "National Helpline", text: "In India, dial 108 for ambulance services in an emergency." },
  ],
  guidance: [
    "Call ahead when it is safe to do so so the team can prepare.",
    "Carry identification, current medication lists and past reports.",
    "Follow the direction of emergency personnel on arrival.",
  ],
};
