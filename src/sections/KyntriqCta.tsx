import { ArrowRight, Sparkles } from "lucide-react";
import Reveal from "../components/Reveal";
import { Link } from "react-router-dom";

export default function KyntriqCta() {
  return (
    <section className="kq-cta" aria-labelledby="kq-title">
      <div className="container kq-cta__inner">
        <Reveal>
          <p className="eyebrow" style={{ justifyContent: "center", color: "#7fd7d9" }}>
            Kyntriq Solutions
          </p>
          <h2 id="kq-title">Build a better digital healthcare experience.</h2>
          <p className="kq-cta__lead">
            Kyntriq Solutions builds AI, software and automation systems designed around how healthcare organizations
            operate.
          </p>
          <div className="btn-row kq-cta__actions">
            <Link to="/contact" className="btn btn--teal btn--lg">
              Talk to Kyntriq Solutions
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/services" className="btn btn--light btn--lg">
              <Sparkles size={17} aria-hidden="true" />
              Explore Healthcare Solutions
            </Link>
          </div>
          <p className="kq-cta__tagline">AI • Software • Automation • Business Systems</p>
        </Reveal>
      </div>
    </section>
  );
}
