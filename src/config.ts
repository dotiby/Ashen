/**
 * Single source of truth for token and network values.
 * Update this file once the launch parameters and contract address are final.
 */
export const TOKEN = {
  name: "Ashen",
  ticker: "ASHN",
  logo: "/ashen-logo.jpg",
  buyUrl: "",
  buyLabel: "Buy Now",
  headline: "One light began to move.",
  tagline: "The light that left the line.",
  shortDescription:
    "A single light has left the long procession of hooded figures. It carries no instructions beyond the moment it was lit.",
  description:
    "Ashen is a single light that left the line. In the long procession of hooded figures moving through darkness, most lights simply follow the one ahead. One light has begun to move on its own. It carries no instructions beyond the moment it was lit.",
  descriptionExtended:
    "On GIWA Sepolia it moves as a testnet token while its launch parameters are finalized. The light does not promise direction. It only continues.",
  supply: "Platform-defined",
  supplyNote: "Confirmed at launch",
  decimals: "Platform-defined",
  decimalsNote: "Typically 18 — confirm at launch",
  launchMethod: "Numen launchpad",
  launchNote: "Parameters confirmed at launch",
  ownership: "Pending",
  ownershipNote: "Contract permissions to be verified on-chain",
  contractAddress: "",
  contractStatus: "Pending deployment",
  contractNote: "The address will be published here after deployment.",
};

export const NETWORK = {
  name: "GIWA Sepolia",
  chainId: 91342,
  nativeToken: "ETH",
  rpcUrl: "https://sepolia-rpc.giwa.io",
  explorerUrl: "https://sepolia-explorer.giwa.io",
  launchpadUrl: "https://testnet.numen.cash/",
  docsUrl: "https://docs.giwa.io",
} as const;
