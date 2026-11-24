import { TOKEN } from "../config";

type TokenLogoProps = {
  className?: string;
  alt?: string;
  priority?: boolean;
};

/**
 * The official Ashen token artwork, used unmodified everywhere the brand appears.
 */
export function TokenLogo({
  className,
  alt = "Ashen token logo",
  priority = false,
}: TokenLogoProps) {
  return (
    <img
      className={className ? `token-logo ${className}` : "token-logo"}
      src={TOKEN.logo}
      alt={alt}
      width={507}
      height={571}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
    />
  );
}
