'use client';

import { useState } from 'react';
import WalletConnector from '@/components/WalletConnector';
import SubAccountManager from '@/components/SubAccountManager';
import SpendPermissions from '@/components/SpendPermissions';
import TransactionSender from '@/components/TransactionSender';
import OnchainKitIntegration from '@/components/OnchainKitIntegration';

export default function Home() {
  const [accountInfo, setAccountInfo] = useState<{
    universalAddress: string;
    subAccountAddress?: string;
  } | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Advanced Wallet UX Demo
          </h1>
          <p className="text-black">
            Base Account Sub Accounts & Spend Permissions
          </p>
        </header>

        <main className="space-y-6 text-black">
          <WalletConnector onAccountConnected={setAccountInfo} />
          
          {accountInfo && (
            <>
              <SubAccountManager universalAddress={accountInfo.universalAddress} />
              
              {accountInfo.subAccountAddress && (
                <>
                  <SpendPermissions accountAddress={accountInfo.universalAddress} />
                  <TransactionSender subAccountAddress={accountInfo.subAccountAddress} />
                  <OnchainKitIntegration />
                </>
              )}
            </>
          )}
        </main>

        <footer className="text-center mt-12 text-sm text-gray-500">
          <p>Powered by Base Account SDK</p>
        </footer>
      </div>
    </div>
  );
}
