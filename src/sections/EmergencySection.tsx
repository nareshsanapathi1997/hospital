import { Navigation, Phone, Siren, Info } from "lucide-react";
import Reveal from "../components/Reveal";
import { emergencyInfo } from "../data/content";
import { useDemoUI } from "../context/DemoUI";

export default function EmergencySection() {
  const { openEmergency, showToast } = useDemoUI();

  return (
    <section className="emergency" id="emergency" aria-labelledby="emg-title">
      <div className="container emergency__inner">
        <Reveal className="emergency__copy">
          <p className="emergency__eyebrow">
            <Siren size={18} aria-hidden="true" /> Emergency
          </p>
          <h2 id="emg-title">Need urgent medical assistance?</h2>
          <p>
            Emergency services information for this demonstration hospital. Always use verified local emergency numbers
            in a real situation.
          </p>

          <div className="emergency__actions">
            <a href="tel:+910000000000" className="btn btn--danger btn--lg">
              <Phone size={18} aria-hidden="true" />
              {emergencyInfo.phone}
            </a>
            <button type="button" className="btn btn--light btn--lg" onClick={openEmergency}>
              Emergency Information
            </button>
            <button
              type="button"
              className="btn btn--light btn--lg"
              onClick={() => showToast("Map integration is a placeholder in this demo.")}
            >
              <Navigation size={17} aria-hidden="true" />
              Get Directions
            </button>
          </div>

          <p className="emergency__label">
            <span className="demo-tag">Demo contact — replace before production</span>
          </p>
        </Reveal>

        <Reveal delay={0.1} className="emergency__panel">
          <div className="emergency__card">
            <h3>When you arrive</h3>
            <ul>
              {emergencyInfo.guidance.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
            <p className="emergency__note">
              <Info size={15} aria-hidden="true" />
              No response times or outcomes are claimed on this website — those statements require verified hospital
              data before publication.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
