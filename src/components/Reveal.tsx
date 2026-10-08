import { useEffect, useRef, useState, ElementType, ReactNode } from "react";

type Props = {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
  id?: string;
};

export default function Reveal({ children, as: Tag = "div", delay = 0, className = "", id }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      id={id}
      ref={ref as never}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={{ ["--reveal-delay" as string]: `${delay}s` }}
    >
      {children}
    </Tag>
  );
}
