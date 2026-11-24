import { ArrowUpRight } from "lucide-react";
import { NETWORK, TOKEN } from "../config";
import { NetworkBadge } from "./NetworkBadge";
import { TokenLogo } from "./TokenLogo";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <TokenLogo className="footer__logo" alt="" />
            <div>
              <p className="footer__name">
                Ashen <span aria-hidden="true">ASHN</span>
              </p>
              <p className="footer__tagline">{TOKEN.tagline}</p>
            </div>
          </div>

          <nav className="footer__links" aria-label="Footer">
            <a href={NETWORK.explorerUrl} target="_blank" rel="noopener noreferrer">
              Explorer
              <ArrowUpRight size={14} strokeWidth={1.9} aria-hidden="true" />
            </a>
            <a href={NETWORK.launchpadUrl} target="_blank" rel="noopener noreferrer">
              Launchpad
              <ArrowUpRight size={14} strokeWidth={1.9} aria-hidden="true" />
            </a>
            <a href={NETWORK.docsUrl} target="_blank" rel="noopener noreferrer">
              GIWA docs
              <ArrowUpRight size={14} strokeWidth={1.9} aria-hidden="true" />
            </a>
          </nav>
        </div>

        <div className="footer__rule" aria-hidden="true" />

        <p className="footer__disclaimer">
          Ashen is an unofficial experiment on GIWA Sepolia. It is not affiliated with or
          endorsed by GIWA, Dunamu, Upbit, or Numen. This site is a concept interface, not
          an offer or financial advice. Testnet assets have no real value.
        </p>

        <div className="footer__bottom">
          <p>© 2026 Ashen. The light that left the line.</p>
          <NetworkBadge showChainId onDark />
        </div>
      </div>
    </footer>
  );
}
