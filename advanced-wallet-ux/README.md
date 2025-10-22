# Advanced Wallet UX Demo

A Next.js application demonstrating Base Account Sub Accounts and Spend Permissions functionality.

## Features

- **Base Account Connection**: Connect to Base Account with automatic Sub Account creation
- **Sub Account Management**: Create and manage Sub Accounts for app-specific interactions
- **Spend Permissions**: Request and manage spending permissions for automated transactions
- **Transaction Sending**: Send transactions from Sub Accounts with auto-funding
- **OnchainKit Integration**: Demonstrates compatibility with OnchainKit and other Web3 libraries

## Tech Stack

- Next.js 15 with TypeScript
- Tailwind CSS for styling
- Base Account SDK for wallet functionality
- Wagmi and Viem for Web3 integration
- OnchainKit for enhanced Web3 components

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server (Express server for demo):
```bash
npm run dev:server
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

**Note**: The Next.js dev server (`npm run dev`) has system issues in this environment. Use `npm run dev:server` to run the demo successfully.

## Usage

1. **Connect Wallet**: Click "Connect Base Account" to connect your wallet
2. **Sub Account**: A Sub Account will be automatically created for app usage
3. **Spend Permissions**: Grant permissions for automated spending
4. **Send Transactions**: Test sending transactions from the Sub Account
5. **OnchainKit Integration**: See how OnchainKit works with Sub Accounts

## Key Components

- `WalletConnector`: Handles Base Account connection
- `SubAccountManager`: Manages Sub Account creation and status
- `SpendPermissions`: Handles spend permission requests
- `TransactionSender`: Sends transactions from Sub Accounts
- `OnchainKitIntegration`: Demonstrates OnchainKit + Wagmi integration

## Network Configuration

This demo uses Base Sepolia testnet by default. Make sure you have testnet ETH in your Base Account.

## Learn More

- [Base Account SDK Documentation](https://docs.base.org/base-account/)
- [Sub Accounts Guide](https://docs.base.org/base-account/improve-ux/sub-accounts/)
- [Spend Permissions Guide](https://docs.base.org/base-account/improve-ux/spend-permissions/)
