import { useEffect, useLayoutEffect, useRef, useState, ElementType, ReactNode } from "react";

type Props = {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
  id?: string;
};

export default function Reveal({ children, as: Tag = "div", delay = 0, className = "", id }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(true);
  const [pending, setPending] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.96 && rect.bottom > 0) return;
    setPending(true);
    setVisible(false);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !pending || visible) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      setPending(false);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            setPending(false);
            io.disconnect();
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px 12% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [pending, visible]);

  return (
    <Tag
      id={id}
      ref={ref as never}
      className={`reveal ${pending && !visible ? "is-pending" : ""} ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={{ ["--reveal-delay" as string]: `${delay}s` }}
    >
      {children}
    </Tag>
  );
}
