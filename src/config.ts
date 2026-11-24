/**
 * Single source of truth for token, network, and launch values.
 */
export const TOKEN = {
  name: "Ashen",
  ticker: "ASHN",
  headline: "One light began to move.",
  tagline: "The light that left the line.",
  shortDescription:
    "A single light has left the long procession of hooded figures. It carries no instructions beyond the moment it was lit.",
  description:
    "Ashen is a single light that left the long procession of hooded figures moving through darkness. One light has begun to move on its own.",
  logo: "/ashen-logo.jpg",
  buyUrl:
    "https://testnet.numen.cash/token/0x6936624A6ca1D540E07CC7d84C7cC16c67EfCA5E",
  buyLabel: "Buy Now",
  contractAddress: "0x6936624A6ca1D540E07CC7d84C7cC16c67EfCA5E",
  contractStatus: "Live on GIWA Sepolia",
  contractNote: "Copy the address to view the token in your wallet or the explorer.",
  supply: "1,000,000,000",
  supplyNote: "Fixed at launch",
  decimals: "Platform-defined",
  decimalsNote: "Typically 18 — confirm at launch",
  launchMethod: "Numen Cash",
  launchNote: "Bonding curve → Ammora pool",
  ownership: "Ownerless",
  ownershipNote: "As described on the launchpad",
  contractLink:
    "https://sepolia-explorer.giwa.io/address/0x6936624A6ca1D540E07CC7d84C7cC16c67EfCA5E",
};

export const LAUNCH = {
  platform: "Numen Cash",
  handle: "@numencash",
  xUrl: "https://x.com/numencash",
  /** Drop the platform logo into /public and set its path here. */
  logo: "",
  quote: "ETH native",
  curveSupply: "793,100,000",
  poolSupply: "206,900,000",
  migrationAt: "0.05 ETH",
  curveFee: "1.00%",
  creatorShare: "20.00%",
  poolFee: "1.00%",
  antiSnipe: "On, ended",
  maxWallet: "None",
} as const;

export const NETWORK = {
  name: "GIWA Sepolia",
  chainId: 91342,
  nativeToken: "ETH",
  rpcUrl: "https://sepolia-rpc.giwa.io",
  explorerUrl: "https://sepolia-explorer.giwa.io",
  launchpadUrl: "https://testnet.numen.cash/",
  docsUrl: "https://docs.giwa.io",
} as const;
