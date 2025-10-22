import { createConfig, http } from 'wagmi';
import { base, baseSepolia } from 'viem/chains';

export const config = createConfig({
  chains: [baseSepolia, base],
  connectors: [],
  transports: {
    [baseSepolia.id]: http(),
    [base.id]: http(),
  },
});