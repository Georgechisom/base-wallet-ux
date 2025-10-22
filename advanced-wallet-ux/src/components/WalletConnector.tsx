'use client';

import { useState } from 'react';
import { provider } from '@/lib/base-account';

interface AccountInfo {
  universalAddress: string;
  subAccountAddress?: string;
}

export default function WalletConnector({
  onAccountConnected
}: {
  onAccountConnected: (info: AccountInfo) => void
}) {
  const [connected, setConnected] = useState(false);
  const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null);
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    setLoading(true);
    try {
      const accounts = await provider.request({
        method: 'eth_requestAccounts',
        params: []
      }) as string[];

      const universalAddress = accounts[0];
      const subAccountAddress = accounts[1]; // Sub account is second when auto-created

      const info = {
        universalAddress,
        subAccountAddress
      };
      setAccountInfo(info);
      setConnected(true);
      onAccountConnected(info);
    } catch (error) {
      console.error('Connection failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    setConnected(false);
    setAccountInfo(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Base Account Connection</h2>
      
      {!connected ? (
        <button
          onClick={connectWallet}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
          {loading ? 'Connecting...' : 'Connect Base Account'}
        </button>
      ) : (
        <div className="space-y-3">
          <div className="p-3 bg-gray-50 rounded-md">
            <p className="text-sm font-semibold">Universal Account:</p>
            <p className="text-xs text-gray-600 break-all">{accountInfo?.universalAddress}</p>
          </div>
          
          {accountInfo?.subAccountAddress && (
            <div className="p-3 bg-blue-50 rounded-md">
              <p className="text-sm font-semibold">Sub Account:</p>
              <p className="text-xs text-gray-600 break-all">{accountInfo.subAccountAddress}</p>
            </div>
          )}
          
          <button
            onClick={disconnectWallet}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}