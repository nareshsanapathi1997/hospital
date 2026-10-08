import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from "react";

export type AppointmentRequest = { doctorSlug?: string; speciality?: string; date?: string };

type Ctx = {
  appointmentOpen: boolean;
  appointmentSeed: AppointmentRequest | null;
  openAppointment: (seed?: AppointmentRequest) => void;
  closeAppointment: () => void;
  emergencyOpen: boolean;
  openEmergency: () => void;
  closeEmergency: () => void;
  aiOpen: boolean;
  openAi: () => void;
  closeAi: () => void;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  toast: string | null;
  showToast: (msg: string) => void;
};

const DemoUIContext = createContext<Ctx | null>(null);

export function DemoUIProvider({ children }: { children: ReactNode }) {
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [appointmentSeed, setAppointmentSeed] = useState<AppointmentRequest | null>(null);
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 4200);
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      appointmentOpen,
      appointmentSeed,
      openAppointment: (seed) => {
        setAppointmentSeed(seed ?? null);
        setAppointmentOpen(true);
      },
      closeAppointment: () => setAppointmentOpen(false),
      emergencyOpen,
      openEmergency: () => setEmergencyOpen(true),
      closeEmergency: () => setEmergencyOpen(false),
      aiOpen,
      openAi: () => setAiOpen(true),
      closeAi: () => setAiOpen(false),
      menuOpen,
      setMenuOpen,
      toast,
      showToast,
    }),
    [appointmentOpen, appointmentSeed, emergencyOpen, aiOpen, menuOpen, toast, showToast]
  );

  return <DemoUIContext.Provider value={value}>{children}</DemoUIContext.Provider>;
}

export function useDemoUI() {
  const ctx = useContext(DemoUIContext);
  if (!ctx) throw new Error("useDemoUI must be used inside DemoUIProvider");
  return ctx;
}
