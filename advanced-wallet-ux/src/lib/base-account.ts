import { createBaseAccountSDK } from '@base-org/account';
import { baseSepolia } from 'viem/chains';

export const sdk = createBaseAccountSDK({
  appName: 'Advanced Wallet UX Demo',
  appLogoUrl: 'https://base.org/logo.png',
  appChainIds: [baseSepolia.id], // Using testnet for demo
  subAccounts: {
    creation: 'on-connect', // Auto-create sub accounts
    defaultAccount: 'sub',  // Use sub accounts by default
  }
});

export const provider = sdk.getProvider();