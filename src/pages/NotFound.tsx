import { Link } from "react-router-dom";
import Seo from "../components/Seo";

export default function NotFound() {
  return (
    <section className="section container center" style={{ minHeight: "52vh" }}>
      <Seo title="Page not found" description="This page could not be found on the Aurelia demo hospital website." path="/404" />
      <p className="eyebrow" style={{ justifyContent: "center" }}>
        404
      </p>
      <h1 style={{ margin: "16px 0 12px" }}>This page isn't part of the demo.</h1>
      <p className="lead" style={{ maxWidth: 520, margin: "0 auto 26px" }}>
        The link may be outdated. Head back to the homepage or continue exploring the demonstration platform.
      </p>
      <div className="btn-row" style={{ justifyContent: "center" }}>
        <Link to="/" className="btn btn--primary">
          Back to home
        </Link>
        <Link to="/doctors" className="btn btn--ghost">
          Find a doctor
        </Link>
      </div>
    </section>
  );
}
