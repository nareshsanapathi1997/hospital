import { useEffect, useRef } from "react";
import { Phone, X, Navigation, Siren, Info } from "lucide-react";
import { emergencyInfo } from "../data/content";
import { useDemoUI } from "../context/DemoUI";

export default function EmergencyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const { showToast } = useDemoUI();

  useEffect(() => {
    if (!open) return;
    lastFocused.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => dialogRef.current?.focus(), 40);
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
      <div className="modal modal--emergency" role="dialog" aria-modal="true" aria-labelledby="emg-title" ref={dialogRef} tabIndex={-1}>
        <div className="modal__head modal__head--emergency">
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <span className="card__icon card__icon--red">
              <Siren size={22} aria-hidden="true" />
            </span>
            <div>
              <p className="eyebrow" style={{ color: "#ffd7d3" }}>
                Emergency information
              </p>
              <h2 id="emg-title" style={{ fontSize: "1.35rem", marginTop: 6, color: "#fff" }}>
                Need urgent medical assistance?
              </h2>
            </div>
          </div>
          <button type="button" className="icon-btn icon-btn--emergency" onClick={onClose} aria-label="Close emergency information">
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="modal__body">
          <div className="emg-call">
            <span className="muted" style={{ fontSize: "0.82rem" }}>
              Demo contact — replace before production
            </span>
            <a href="tel:+910000000000" className="emg-call__number">
              <Phone size={20} aria-hidden="true" />
              {emergencyInfo.phone}
            </a>
            <p style={{ fontSize: "0.86rem", color: "var(--ink-2)" }}>
              In India, dial <strong>108</strong> for ambulance services in a real emergency.
            </p>
          </div>

          <ul className="emg-list">
            {emergencyInfo.services.map((s) => (
              <li key={s.title}>
                <strong>{s.title}</strong>
                <span>{s.text}</span>
              </li>
            ))}
          </ul>

          <div className="demo-note demo-note--warn" style={{ marginTop: 18 }}>
            <Info size={16} />
            <span>
              This website is a demonstration concept. Emergency numbers, addresses and response details shown here are
              placeholders and must be replaced with verified hospital information before production use.
            </span>
          </div>

          <div className="btn-row" style={{ marginTop: 18 }}>
            <button
              type="button"
              className="btn btn--danger"
              onClick={() => showToast("Demo only — no call was placed from this website.")}
            >
              <Phone size={16} aria-hidden="true" /> Emergency Information
            </button>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => showToast("Map integration is a placeholder in this demo.")}
            >
              <Navigation size={16} aria-hidden="true" /> Get Directions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
