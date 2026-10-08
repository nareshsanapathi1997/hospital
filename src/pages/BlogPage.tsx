import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Tag } from "lucide-react";
import Seo from "../components/Seo";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import { blogPosts } from "../data/content";

const CATEGORIES = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

export default function BlogPage() {
  const [cat, setCat] = useState("All");
  const posts = useMemo(() => (cat === "All" ? blogPosts : blogPosts.filter((p) => p.category === cat)), [cat]);

  return (
    <>
      <Seo
        title="Blog"
        description="Demo articles on patient guides, preventive care, hospital technology and platform updates from the Kyntriq Solutions demonstration hospital."
        path="/blog"
      />
      <PageHeader
        eyebrow="Blog"
        title="Guides, updates and healthcare technology notes."
        description="Sample editorial content for a hospital blog — written as demonstration copy, with no medical advice."
        crumbs={[{ label: "Blog" }]}
      />

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="tabs" role="tablist" aria-label="Filter articles by category">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={cat === c}
                  className={`tab ${cat === c ? "tab--active" : ""}`}
                  onClick={() => setCat(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="blog-grid">
            {posts.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.05}>
                <article className="blog-card">
                  <Link to={`/blog/${p.slug}`} className="blog-card__media" tabIndex={-1} aria-hidden="true">
                    <img src={`/${p.image}`} alt="" width={1300} height={866} loading="lazy" decoding="async" />
                  </Link>
                  <div className="blog-card__body">
                    <div className="blog-card__meta">
                      <span className="badge badge--teal">
                        <Tag size={12} aria-hidden="true" /> {p.category}
                      </span>
                      <span className="muted" style={{ fontSize: "0.78rem" }}>
                        {p.date}
                      </span>
                    </div>
                    <h2 className="blog-card__title">
                      <Link to={`/blog/${p.slug}`}>{p.title}</Link>
                    </h2>
                    <p className="blog-card__excerpt">{p.excerpt}</p>
                    <div className="blog-card__foot">
                      <span className="muted" style={{ fontSize: "0.78rem", display: "inline-flex", gap: 6, alignItems: "center" }}>
                        <Clock size={13} aria-hidden="true" /> {p.readTime}
                      </span>
                      <Link to={`/blog/${p.slug}`} className="link-arrow">
                        Read article <ArrowRight size={15} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="empty-state" role="status">
              <h3>No articles in this category yet</h3>
              <button type="button" className="btn btn--soft" onClick={() => setCat("All")}>
                Show all articles
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
