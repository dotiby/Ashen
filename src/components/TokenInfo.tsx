import { useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { NETWORK, TOKEN } from "../config";
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
              What is known, what is pending, and where to check. Unconfirmed parameters
              stay unconfirmed here.
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
                  <span className={hasAddress ? "mono" : "pending"}>
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
              href={NETWORK.explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
                <strong>GIWA explorer</strong>
                <span>sepolia-explorer.giwa.io</span>
              </span>
              <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
            </a>

            <a
              className="aside-link"
              href={NETWORK.launchpadUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
                <strong>Numen launchpad</strong>
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
              <p className="aside-note__label">Pending at launch</p>
              <p>
                Total supply, fee percentages, the graduation threshold, and the final
                contract address are defined by the Numen launch contract and confirmed at
                deployment.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
