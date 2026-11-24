import { NETWORK } from "../config";

type NetworkBadgeProps = {
  showChainId?: boolean;
  onDark?: boolean;
};

export function NetworkBadge({ showChainId = false, onDark = false }: NetworkBadgeProps) {
  return (
    <span className="network-badge">
      <img
        className="network-badge__logo"
        src={onDark ? "/giwa-symbol.webp" : "/giwa-symbol-black.svg"}
        alt=""
        width="18"
        height="18"
        decoding="async"
      />
      <span>{NETWORK.name}</span>
      {showChainId ? (
        <span className="network-badge__chain">Chain {NETWORK.chainId}</span>
      ) : null}
    </span>
  );
}
