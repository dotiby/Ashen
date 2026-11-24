import { TokenLogo } from "./TokenLogo";

const links = [
  { href: "#procession", label: "Procession" },
  { href: "#story", label: "Story" },
  { href: "#token", label: "Token" },
];

export function Header() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a className="brand" href="#top">
          <TokenLogo className="brand__logo" alt="" priority />
          <span className="brand__name">Ashen</span>
          <span className="brand__ticker">ASHN</span>
        </a>
        <nav className="site-nav" aria-label="Primary">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
