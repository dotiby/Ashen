import { useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { LAUNCH, NETWORK, TOKEN } from "../config";
import { NetworkBadge } from "./NetworkBadge";
import { TokenLogo } from "./TokenLogo";

function SpecRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="spec-row">
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="launch-fact">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

export function TokenInfo() {
  const [copied, setCopied] = useState(false);
  const hasAddress = TOKEN.contractAddress.length > 0;

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timer = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    if (!hasAddress) {
      return;
    }

    try {
      await navigator.clipboard.writeText(TOKEN.contractAddress);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="section token" id="token" aria-labelledby="token-title">
      <div className="container">
        <div className="section-head token__head">
          <div className="section-head__copy">
            <p className="eyebrow">
              <span className="eyebrow__dot" aria-hidden="true" />
              Token · GIWA Sepolia
            </p>
            <h2 id="token-title">Ashen, on the record.</h2>
            <p className="section-lead">
              Supply, contract, and launch parameters — confirmed against the live
              launchpad listing.
            </p>
          </div>
          <div className="token__seal" aria-hidden="true">
            <TokenLogo className="token__seal-image" alt="" />
          </div>
        </div>

        <div className="token-panel">
          <div className="token-panel__specs">
            <dl className="specs">
              <SpecRow label="Name">Ashen</SpecRow>
              <SpecRow label="Ticker">ASHN</SpecRow>
              <SpecRow label="Network">
                <NetworkBadge />
              </SpecRow>
              <SpecRow label="Chain ID">
                <span className="mono">{NETWORK.chainId}</span>
              </SpecRow>
              <SpecRow label="Total supply">
                {TOKEN.supply}
                <span className="spec-note">{TOKEN.supplyNote}</span>
              </SpecRow>
              <SpecRow label="Launch">
                {TOKEN.launchMethod}
                <span className="spec-note">{TOKEN.launchNote}</span>
              </SpecRow>
              <SpecRow label="Ownership">
                {TOKEN.ownership}
                <span className="spec-note">{TOKEN.ownershipNote}</span>
              </SpecRow>
              <SpecRow label="Contract">
                <span className="contract-line">
                  <span className={hasAddress ? "mono contract-address" : "pending"}>
                    {hasAddress ? TOKEN.contractAddress : TOKEN.contractStatus}
                  </span>
                  <button
                    type="button"
                    className="copy-button"
                    onClick={handleCopy}
                    disabled={!hasAddress}
                    aria-label={
                      hasAddress
                        ? "Copy Ashen contract address"
                        : "Copy contract address — pending deployment"
                    }
                  >
                    {copied ? (
                      <Check size={14} strokeWidth={1.9} aria-hidden="true" />
                    ) : (
                      <Copy size={14} strokeWidth={1.9} aria-hidden="true" />
                    )}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </span>
                <span className="spec-note">{TOKEN.contractNote}</span>
              </SpecRow>
            </dl>
          </div>

          <aside className="token-panel__aside" aria-label="Verify token information">
            <p className="aside-label">Verify at the source</p>

            <a
              className="aside-link"
              href={TOKEN.contractLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
                <strong>View contract</strong>
                <span>sepolia-explorer.giwa.io</span>
              </span>
              <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
            </a>

            <a
              className="aside-link"
              href={TOKEN.buyUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
                <strong>Buy ASHN</strong>
                <span>testnet.numen.cash</span>
              </span>
              <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
            </a>

            <a
              className="aside-link"
              href={NETWORK.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
                <strong>GIWA documentation</strong>
                <span>docs.giwa.io</span>
              </span>
              <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
            </a>

            <div className="aside-note">
              <p className="aside-note__label">From the launchpad</p>
              <p>
                Ashen trades as an ownerless token on a bonding curve and can graduate
                to an Ammora pool. Launch parameters shown here are taken from the live
                listing.
              </p>
            </div>
          </aside>
        </div>

        <div className="launch-card">
          <div className="launch-card__head">
            <div className="launch-platform">
              {LAUNCH.logo ? (
                <img
                  className="launch-platform__logo"
                  src={LAUNCH.logo}
                  alt=""
                  width="48"
                  height="48"
                />
              ) : (
                <span className="launch-platform__mark" aria-hidden="true">
                  N
                </span>
              )}
              <div className="launch-platform__text">
                <strong>{LAUNCH.platform}</strong>
                <span>Launchpad · {LAUNCH.handle}</span>
              </div>
            </div>
            <div className="launch-card__links">
              <a href={NETWORK.launchpadUrl} target="_blank" rel="noopener noreferrer">
                Launchpad
                <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
              </a>
              <a href={LAUNCH.xUrl} target="_blank" rel="noopener noreferrer">
                {LAUNCH.handle} on X
                <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
              </a>
            </div>
          </div>

          <dl className="launch-facts">
            <Fact label="Total supply" value={TOKEN.supply} />
            <Fact label="On the curve" value={LAUNCH.curveSupply} />
            <Fact label="To the pool" value={LAUNCH.poolSupply} />
            <Fact label="Ammora migration" value={LAUNCH.migrationAt} />
            <Fact label="Curve fee" value={LAUNCH.curveFee} />
            <Fact label="Creator share" value={LAUNCH.creatorShare} />
            <Fact label="Pool fee" value={LAUNCH.poolFee} />
            <Fact label="Quote asset" value={LAUNCH.quote} />
          </dl>

          <div className="launch-card__foot">
            <span>Anti-snipe: {LAUNCH.antiSnipe}</span>
            <span>Max wallet: {LAUNCH.maxWallet}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
