import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useLocation, Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BottomNav from "./components/BottomNav";
import ScrollToTop from "./components/ScrollToTop";
import Toast from "./components/Toast";
import { AppointmentModal } from "./components/AppointmentFlow";
import EmergencyModal from "./components/EmergencyModal";
import { AiModal } from "./components/AiAssistant";
import { DemoUIProvider, useDemoUI } from "./context/DemoUI";
import Home from "./pages/Home";
import Seo from "./components/Seo";

const DoctorsPage = lazy(() => import("./pages/DoctorsPage"));
const DoctorProfile = lazy(() => import("./pages/DoctorProfile"));
const DepartmentsPage = lazy(() => import("./pages/DepartmentsPage"));
const DepartmentPage = lazy(() => import("./pages/DepartmentPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const PatientsPage = lazy(() => import("./pages/PatientsPage"));
const PatientPortalPage = lazy(() => import("./pages/PatientPortalPage"));
const AiHealthcarePage = lazy(() => import("./pages/AiHealthcarePage"));
const AppointmentPage = lazy(() => import("./pages/AppointmentPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

function Shell() {
  const { appointmentOpen, appointmentSeed, closeAppointment, emergencyOpen, closeEmergency, aiOpen, closeAi, toast } = useDemoUI();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) window.setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
    }
  }, [location.pathname, location.hash]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <ScrollToTop />
      <Header />
      <main id="main">
        <Suspense
          fallback={
            <div className="page-loader" role="status" aria-live="polite">
              <span className="page-loader__spinner" aria-hidden="true" />
              <span className="visually-hidden">Loading page…</span>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/doctors/:slug" element={<DoctorProfile />} />
            <Route path="/departments" element={<DepartmentsPage />} />
            <Route path="/departments/:slug" element={<DepartmentPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/patients" element={<PatientsPage />} />
            <Route path="/patient-portal" element={<PatientPortalPage />} />
            <Route path="/ai-healthcare" element={<AiHealthcarePage />} />
            <Route path="/appointment" element={<AppointmentPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <BottomNav />

      <AppointmentModal open={appointmentOpen} seed={appointmentSeed} onClose={closeAppointment} />
      <EmergencyModal open={emergencyOpen} onClose={closeEmergency} />
      <AiModal open={aiOpen} onClose={closeAi} />
      <Toast message={toast} />
    </>
  );
}

export default function App() {
  return (
    <DemoUIProvider>
      <Shell />
    </DemoUIProvider>
  );
}
