export type Department = {
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  overview: string;
  conditions: string[];
  services: string[];
  faqs: { q: string; a: string }[];
  image?: string;
  accent: "blue" | "teal" | "green" | "red" | "amber" | "navy";
};

export const departments: Department[] = [
  {
    slug: "cardiology",
    name: "Cardiology",
    icon: "HeartPulse",
    tagline: "Heart diagnostics, consultations and coordinated cardiac follow-up.",
    overview:
      "Comprehensive cardiac care supported by experienced specialists, diagnostics and coordinated follow-up — from first consultation through investigation, treatment planning and review.",
    conditions: ["Chest discomfort", "High blood pressure", "Heart rhythm concerns", "High cholesterol", "Post-procedure review", "Preventive cardiac screening"],
    services: ["Specialist consultation", "ECG & echocardiography", "Treadmill testing", "2D echo reporting", "Preventive cardiology", "Follow-up review"],
    faqs: [
      { q: "Do I need a referral for a cardiology consultation?", a: "No referral is needed for a first consultation in this demo. In a live deployment the hospital can configure referral rules per department." },
      { q: "Are diagnostics available on the same day?", a: "Same-day diagnostics can be enabled depending on slot availability. The demo booking flow shows how this is surfaced to patients." },
      { q: "Can I book a video consultation?", a: "Yes. Video consultation can be offered as a consultation type wherever the hospital enables it." },
    ],
    image: "img/cardiology.webp",
    accent: "red",
  },
  {
    slug: "neurology",
    name: "Neurology",
    icon: "Brain",
    tagline: "Evaluation and management of brain, spine and nerve conditions.",
    overview:
      "Neurology consultations covering headaches, memory concerns, stroke follow-up and nerve-related conditions, supported by imaging and rehabilitation pathways.",
    conditions: ["Persistent headaches", "Stroke follow-up", "Nerve pain", "Memory concerns", "Seizure evaluation", "Movement disorders"],
    services: ["Neurology consultation", "Neuro-imaging review", "EEG coordination", "Stroke follow-up", "Rehabilitation planning", "Second opinion"],
    faqs: [
      { q: "What should I bring to a neurology consultation?", a: "Carry previous prescriptions, scan reports and a short note of your symptoms with their timeline." },
      { q: "Is imaging arranged during the visit?", a: "Imaging can be scheduled from the diagnostics team during or after the consultation." },
      { q: "Are video consultations available?", a: "Yes, where the hospital has enabled remote consultations for the department." },
    ],
    accent: "blue",
  },
  {
    slug: "orthopaedics",
    name: "Orthopaedics",
    icon: "Bone",
    tagline: "Bone, joint and mobility care with rehabilitation planning.",
    overview:
      "Orthopaedic care for joint pain, sports injuries and mobility issues, with imaging, conservative management and surgical planning where required.",
    conditions: ["Joint pain", "Back pain", "Sports injuries", "Arthritis", "Fracture care", "Mobility assessment"],
    services: ["Orthopaedic consultation", "Digital X-ray review", "Joint injection planning", "Physiotherapy referral", "Sports injury care", "Post-op follow-up"],
    faqs: [
      { q: "Do you see sports injuries?", a: "Yes, sports injuries are part of the orthopaedic outpatient workflow in this demo." },
      { q: "Is physiotherapy available in-house?", a: "Rehabilitation can be coordinated with in-house or partner physiotherapy services." },
      { q: "How soon can I get an appointment?", a: "Availability depends on the selected doctor and date in the booking flow." },
    ],
    accent: "teal",
  },
  {
    slug: "gastroenterology",
    name: "Gastroenterology",
    icon: "Activity",
    tagline: "Digestive health, liver care and endoscopy pathways.",
    overview:
      "Assessment and management of digestive and liver conditions with diagnostics, dietary guidance and procedural pathways where clinically indicated.",
    conditions: ["Acid reflux", "Abdominal pain", "Liver concerns", "Digestive disorders", "Nutrition issues", "Endoscopy evaluation"],
    services: ["Gastro consultation", "Endoscopy coordination", "Liver function review", "Dietary guidance", "Diagnostic imaging", "Follow-up care"],
    faqs: [
      { q: "Do I need to fast before an endoscopy?", a: "Your care team will share preparation instructions when a procedure is scheduled." },
      { q: "Are diet and nutrition consultations available?", a: "Nutrition support can be added to the care plan where the hospital offers it." },
      { q: "Can reports be viewed online?", a: "Yes — reports can be delivered to the patient portal in a live deployment." },
    ],
    accent: "amber",
  },
  {
    slug: "paediatrics",
    name: "Paediatrics",
    icon: "Baby",
    tagline: "Child and infant care with vaccination and growth support.",
    overview:
      "Paediatric consultations for infants, children and adolescents, including routine check-ups, vaccination planning and growth monitoring.",
    conditions: ["Fever & infections", "Growth monitoring", "Vaccination planning", "Allergies", "Newborn care", "Nutrition advice"],
    services: ["Paediatric consultation", "Vaccination planning", "Growth monitoring", "Newborn review", "Allergy assessment", "Parent guidance"],
    faqs: [
      { q: "Can I book for my newborn?", a: "Yes — select Paediatrics and choose an available slot for the child." },
      { q: "Are vaccination reminders supported?", a: "Reminders can be sent through WhatsApp or SMS workflows in a live deployment." },
      { q: "Do you offer video consultations?", a: "Video consultations can be enabled for follow-up visits." },
    ],
    accent: "blue",
  },
  {
    slug: "dermatology",
    name: "Dermatology",
    icon: "Sparkles",
    tagline: "Skin, hair and nail consultations with treatment plans.",
    overview:
      "Dermatology care for everyday skin, hair and nail concerns, with clear treatment plans and follow-up review.",
    conditions: ["Skin allergies", "Acne", "Hair & scalp concerns", "Eczema", "Nail disorders", "Skin checks"],
    services: ["Dermatology consultation", "Skin analysis", "Procedure planning", "Allergy guidance", "Follow-up review", "Phototherapy coordination"],
    faqs: [
      { q: "Should I stop skincare products before my visit?", a: "Bring a list of products you use; your doctor will advise during the consultation." },
      { q: "Are procedures done on the same day?", a: "Minor procedures may be scheduled during the visit where appropriate." },
      { q: "Is teleconsultation available?", a: "Video consultation is suitable for many follow-up reviews." },
    ],
    accent: "teal",
  },
  {
    slug: "oncology",
    name: "Oncology",
    icon: "Ribbon",
    tagline: "Coordinated cancer care pathways and second opinions.",
    overview:
      "Multidisciplinary oncology consultations, diagnostics coordination and treatment planning with a dedicated care coordinator for each patient journey.",
    conditions: ["Second opinions", "Screening results", "Treatment planning", "Chemotherapy review", "Post-treatment follow-up", "Palliative support"],
    services: ["Oncology consultation", "Tumour board review", "Chemotherapy planning", "Radiation coordination", "Nutrition support", "Palliative care"],
    faqs: [
      { q: "Can I request a second opinion?", a: "Yes. Select Oncology in the booking flow and mention 'second opinion' in your notes." },
      { q: "Do you support international patients?", a: "A live deployment can add international patient coordination to the workflow." },
      { q: "Is counselling available?", a: "Support and counselling services can be integrated into the care pathway." },
    ],
    accent: "navy",
  },
  {
    slug: "gynaecology",
    name: "Gynaecology",
    icon: "HandHeart",
    tagline: "Women's health consultations across life stages.",
    overview:
      "Women's health consultations covering routine screening, pregnancy-related care coordination and specialist advice across life stages.",
    conditions: ["Routine screening", "Menstrual concerns", "Pregnancy care coordination", "Menopause support", "PCOS evaluation", "Preventive health"],
    services: ["Gynaecology consultation", "Antenatal coordination", "Screening & tests", "Hormonal evaluation", "Mineral & nutrition review", "Follow-up care"],
    faqs: [
      { q: "Can I book a consultation online?", a: "Yes — choose Gynaecology, pick a doctor, date and time in the booking flow." },
      { q: "Are antenatal packages available?", a: "Health packages can be attached to the appointment in a live deployment." },
      { q: "Is privacy respected during visits?", a: "Privacy-conscious workflows are designed into the demo experience." },
    ],
    accent: "red",
  },
  {
    slug: "general-medicine",
    name: "General Medicine",
    icon: "Stethoscope",
    tagline: "Everyday health concerns, check-ups and referrals.",
    overview:
      "The first point of contact for most health concerns — general physicians assess, advise and refer to specialists when needed.",
    conditions: ["Fever & infections", "Diabetes review", "Thyroid concerns", "Lifestyle advice", "General check-ups", "Referrals to specialists"],
    services: ["General consultation", "Health check review", "Prescription renewal", "Diagnostic ordering", "Specialist referral", "Follow-up"],
    faqs: [
      { q: "Should I start with a general physician?", a: "For most new concerns, a general physician is a good starting point." },
      { q: "Can I collect medicines on site?", a: "Pharmacy services can be integrated with the visit workflow." },
      { q: "Do you offer annual health checks?", a: "Yes — see the demo health check packages section." },
    ],
    accent: "green",
  },
  {
    slug: "ent",
    name: "ENT",
    icon: "Ear",
    tagline: "Ear, nose and throat care for all age groups.",
    overview:
      "ENT consultations for hearing concerns, sinus problems, throat conditions and related assessments, with procedural support where required.",
    conditions: ["Hearing concerns", "Sinus problems", "Throat issues", "Tinnitus", "Vertigo evaluation", "Allergic rhinitis"],
    services: ["ENT consultation", "Nasal endoscopy", "Audiometry coordination", "Hearing assessment", "Allergy management", "Follow-up"],
    faqs: [
      { q: "Do I need a hearing test before the visit?", a: "Your doctor will advise if an audiometry assessment is needed." },
      { q: "Are procedures available on site?", a: "Minor procedures can usually be scheduled during the visit." },
      { q: "Can children be seen?", a: "Yes, ENT consultations are available for children as well." },
    ],
    accent: "blue",
  },
  {
    slug: "ophthalmology",
    name: "Ophthalmology",
    icon: "Eye",
    tagline: "Vision care, screening and eye health consultations.",
    overview:
      "Eye consultations covering vision changes, screening for common eye conditions and post-procedure follow-up with diagnostic support.",
    conditions: ["Vision changes", "Dry eyes", "Cataract evaluation", "Screening", "Post-procedure review", "Digital eye strain"],
    services: ["Eye consultation", "Vision testing", "Retinal screening", "IOP measurement", "Procedure planning", "Follow-up"],
    faqs: [
      { q: "Should I bring my current glasses?", a: "Yes — bring your current spectacles or contact lens details." },
      { q: "Is dilatation required?", a: "Your doctor will advise during the consultation based on the examination." },
      { q: "Do you offer vision screening camps?", a: "Screening programmes can be managed through the hospital campaign workflow." },
    ],
    accent: "teal",
  },
  {
    slug: "pulmonology",
    name: "Pulmonology",
    icon: "Wind",
    tagline: "Respiratory care, sleep and lung function support.",
    overview:
      "Respiratory consultations for asthma, chronic cough and sleep-related concerns, supported by lung function testing and imaging.",
    conditions: ["Asthma", "Chronic cough", "Breathlessness", "Sleep issues", "Allergic respiratory issues", "Smoking cessation"],
    services: ["Pulmonology consultation", "Spirometry", "Sleep assessment", "Imaging review", "Nebulisation support", "Follow-up"],
    faqs: [
      { q: "Do I need prior lung function tests?", a: "Tests can be arranged during or after your consultation." },
      { q: "Is asthma management ongoing?", a: "Yes — follow-up visits and reminders can be scheduled in the portal." },
      { q: "Are video consultations available?", a: "Follow-up reviews can be conducted by video where enabled." },
    ],
    accent: "amber",
  },
];

export const departmentBySlug = (slug?: string) => departments.find((d) => d.slug === slug);
