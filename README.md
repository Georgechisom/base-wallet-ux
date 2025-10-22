# Advanced Wallet UX Demo

A Next.js application demonstrating Base Account Sub Accounts and Spend Permissions functionality with modern Web3 integration.

## 🌟 Features

- **Base Account Connection**: Connect to Base Account with automatic Sub Account creation
- **Sub Account Management**: Create and manage Sub Accounts for app-specific interactions
- **Spend Permissions**: Request and manage spending permissions for automated transactions
- **Transaction Sending**: Send transactions from Sub Accounts with auto-funding
- **OnchainKit Integration**: Demonstrates compatibility with OnchainKit and other Web3 libraries
- **Session-based Access**: Sub Accounts act as session-based wallets with hierarchical permissions
- **Auto-funding**: Sub Accounts automatically request funds when needed

## 🛠 Tech Stack

- **Next.js 15** with TypeScript
- **Tailwind CSS** for styling
- **Base Account SDK** for wallet functionality
- **Wagmi and Viem** for Web3 integration
- **OnchainKit** for enhanced Web3 components
- **React Query** for data fetching

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- Base Account on Base Sepolia testnet
- Testnet ETH in your Base Account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/baseTask4.git
cd baseTask4/advanced-wallet-ux
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev:server
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

**Note**: The Next.js dev server (`npm run dev`) may have system issues in some environments. Use `npm run dev:server` to run the demo successfully.

## 📖 Usage

1. **Connect Wallet**: Click "Connect Base Account" to connect your wallet
2. **Sub Account**: A Sub Account will be automatically created for app usage
3. **Spend Permissions**: Grant permissions for automated spending
4. **Send Transactions**: Test sending transactions from the Sub Account
5. **OnchainKit Integration**: See how OnchainKit works with Sub Accounts

## 🏗 Project Structure

```
advanced-wallet-ux/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # App layout with Wagmi providers
│   │   ├── page.tsx            # Main page with all components
│   │   └── providers.tsx       # Wagmi and React Query providers
│   ├── components/
│   │   ├── WalletConnector.tsx     # Base Account connection
│   │   ├── SubAccountManager.tsx   # Sub Account management
│   │   ├── SpendPermissions.tsx    # Spend permissions lifecycle
│   │   ├── TransactionSender.tsx   # Transaction sending
│   │   └── OnchainKitIntegration.tsx # OnchainKit demo
│   └── lib/
│       ├── base-account.ts     # Base Account SDK config
│       └── wagmi.ts           # Wagmi configuration
├── demo.html             # Standalone demo (no build required)
├── README.md             # This file
├── IMPLEMENTATION_SUMMARY.md  # Detailed feature list
└── DEPLOYMENT_GUIDE.md   # Deployment instructions
```

## 🔧 Key Components

- **WalletConnector**: Handles Base Account connection and displays account information
- **SubAccountManager**: Manages Sub Account creation and status tracking
- **SpendPermissions**: Handles spend permission requests, usage, and revocation
- **TransactionSender**: Sends transactions from Sub Accounts with auto-funding
- **OnchainKitIntegration**: Demonstrates OnchainKit + Wagmi integration

## 🌐 Network Configuration

This demo uses Base Sepolia testnet by default. Make sure you have testnet ETH in your Base Account.

## 🎯 Key Concepts Demonstrated

1. **Session-based access**: Sub Accounts act as session-based wallets
2. **Delegate permissions**: Spend Permissions safely delegate spending authority
3. **Sub-account system**: Hierarchical account structure with spend limits
4. **Auto-funding**: Sub Accounts automatically request funds when needed
5. **Library compatibility**: Shows how OnchainKit and other libraries work with Sub Accounts

## 📚 Learn More

- [Base Account SDK Documentation](https://docs.base.org/base-account/)
- [Sub Accounts Guide](https://docs.base.org/base-account/improve-ux/sub-accounts/)
- [Spend Permissions Guide](https://docs.base.org/base-account/improve-ux/spend-permissions/)
- [OnchainKit Documentation](https://onchainkit.coinbase.com/)

## 🚀 Deployment

### Deploy to Vercel (recommended)

```bash
npx vercel
```

### Deploy to Netlify

```bash
npm run build
# Upload the .next folder to Netlify
```

### Manual Deployment

1. Build the project
2. Deploy the built files to any static hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔍 Code Quality

- ✅ TypeScript compilation passes without errors
- ✅ Clean, maintainable code structure
- ✅ Proper error handling throughout
- ✅ Responsive UI with Tailwind CSS
- ✅ Modern React patterns with hooks

## 🐛 Troubleshooting

### Bus Error Issues
If you encounter "Bus error (core dumped)" when running `npm run dev`, this is likely a system-level issue with Node.js. Try using `npm run dev:server` instead, or run the demo on a different system.

### Connection Issues
- Ensure you have a Base Account on Base Sepolia testnet
- Make sure you have testnet ETH in your account
- Check that your wallet is properly configured

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the [Implementation Summary](advanced-wallet-ux/IMPLEMENTATION_SUMMARY.md) for detailed feature information
2. Review the [Deployment Guide](advanced-wallet-ux/DEPLOYMENT_GUIDE.md) for deployment-specific issues
3. Open an issue in the GitHub repository

---

**Built with ❤️ for the Base ecosystem**