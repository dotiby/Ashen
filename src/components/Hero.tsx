import { ArrowDown, ArrowUpRight } from "lucide-react";
import { TOKEN } from "../config";
import { TokenLogo } from "./TokenLogo";

export function Hero() {
  const buyControl = TOKEN.buyUrl ? (
    <a
      className="buy-button"
      href={TOKEN.buyUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      {TOKEN.buyLabel}
      <ArrowUpRight size={22} strokeWidth={2} aria-hidden="true" />
    </a>
  ) : (
    <>
      <button type="button" className="buy-button" aria-describedby="buy-link-note">
        {TOKEN.buyLabel}
        <ArrowUpRight size={22} strokeWidth={2} aria-hidden="true" />
      </button>
      <span id="buy-link-note" className="sr-only">
        Buy link coming soon.
      </span>
    </>
  );

  return (
    <section className="hero" id="top">
      <div className="container hero__grid">
        <div className="hero__copy">
          <div className="hero__identity">
            <TokenLogo className="hero__identity-logo" alt="" priority />
            <div className="hero__identity-text">
              <span className="hero__identity-name">Ashen</span>
              <span className="hero__identity-meta">ASHN · GIWA Sepolia</span>
            </div>
          </div>

          <p className="eyebrow eyebrow--line">
            <span className="eyebrow__line" aria-hidden="true" />
            {TOKEN.tagline}
          </p>

          <h1 className="hero__title">
            One light
            <br />
            began to <span className="hero__title-accent">move.</span>
          </h1>

          <p className="hero__lede">{TOKEN.shortDescription}</p>

          <div className="hero__actions">
            <a className="button button--ink" href="#procession">
              Join the procession
              <ArrowDown size={17} strokeWidth={2} aria-hidden="true" />
            </a>
            <a className="button button--ghost" href="#story">
              Read the story
              <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
            </a>
          </div>

          <ul className="hero__meta" aria-label="What is required">
            <li>No wallet</li>
            <li>No account</li>
            <li>Local only</li>
          </ul>
        </div>

        <aside className="hero__token" aria-label="Ashen token">
          <div className="token-card">
            <TokenLogo
              className="token-card__image"
              alt="Ashen token logo: a hooded figure standing before a burning procession."
              priority
            />
          </div>
          {buyControl}
        </aside>
      </div>
    </section>
  );
}
