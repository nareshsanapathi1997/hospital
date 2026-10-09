import { Bot } from "lucide-react";
import { useDemoUI } from "../context/DemoUI";

export default function ChatLauncher() {
  const { openAi, aiOpen, appointmentOpen, emergencyOpen, menuOpen } = useDemoUI();
  if (aiOpen || appointmentOpen || emergencyOpen || menuOpen) return null;

  return (
    <button type="button" className="chat-launcher" onClick={openAi} aria-label="Open chat assistant">
      <Bot size={22} strokeWidth={2.1} aria-hidden="true" />
      <span>Chat</span>
    </button>
  );
}
