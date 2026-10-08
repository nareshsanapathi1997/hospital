import { useLocation, useNavigate } from "react-router-dom";
import { Bot, CalendarPlus, Home, Menu, UserSearch } from "lucide-react";
import { useDemoUI } from "../context/DemoUI";

export default function BottomNav() {
  const { openAppointment, openAi, setMenuOpen } = useDemoUI();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const items = [
    { label: "Home", icon: Home, to: "/" },
    { label: "Doctors", icon: UserSearch, to: "/doctors" },
    { label: "AI", icon: Bot, to: null, action: openAi },
    { label: "Menu", icon: Menu, to: null, action: () => setMenuOpen(true) },
  ];

  return (
    <nav className="bottom-nav" aria-label="Quick mobile navigation">
      <ul className="bottom-nav__list">
        {items.slice(0, 2).map((it) => (
          <li key={it.label}>
            <button
              type="button"
              className="bottom-nav__item"
              aria-current={pathname === it.to ? "page" : undefined}
              onClick={() => navigate(it.to!)}
            >
              <it.icon size={19} strokeWidth={2} aria-hidden="true" />
              {it.label}
            </button>
          </li>
        ))}
        <li>
          <button type="button" className="bottom-nav__book" onClick={() => openAppointment()}>
            <CalendarPlus size={21} strokeWidth={2.1} aria-hidden="true" />
            Book
          </button>
        </li>
        {items.slice(2).map((it) => (
          <li key={it.label}>
            <button type="button" className="bottom-nav__item" onClick={() => it.action?.()}>
              <it.icon size={19} strokeWidth={2} aria-hidden="true" />
              {it.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
