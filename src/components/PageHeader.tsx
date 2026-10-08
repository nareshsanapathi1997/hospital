import { ReactNode } from "react";
import { Link } from "react-router-dom";

export type Crumb = { label: string; to?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="breadcrumbs">
        <li>
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
        </li>
        {items.map((c, i) => (
          <li key={c.label}>
            {c.to && i < items.length - 1 ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
            {i < items.length - 1 && <span aria-hidden="true">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default function PageHeader({
  eyebrow,
  title,
  description,
  crumbs,
  children,
  dark = true,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
  dark?: boolean;
}) {
  return (
    <header className={`page-header ${dark ? "page-header--dark" : ""}`}>
      <div className="container page-header__inner">
        {crumbs && (
          <div style={{ marginBottom: 20 }}>
            <Breadcrumbs items={crumbs} />
          </div>
        )}
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {description && <p className="page-header__desc">{description}</p>}
        {children}
      </div>
    </header>
  );
}
