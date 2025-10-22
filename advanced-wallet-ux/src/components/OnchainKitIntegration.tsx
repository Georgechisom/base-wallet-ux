'use client';

import { useState, useEffect } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { baseSepolia } from 'viem/chains';
import { provider } from '@/lib/base-account';

export default function OnchainKitIntegration() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({
    address: address as `0x${string}`,
    chainId: baseSepolia.id
  });
  const [subAccountBalance, setSubAccountBalance] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubAccountBalance = async () => {
      if (!isConnected || !address) return;

      try {
        // Get sub account for the connected address
        const response = await provider.request({
          method: 'wallet_getSubAccounts',
          params: [{
            account: address,
            domain: window.location.origin,
          }]
        }) as { subAccounts: Array<{ address: string }> };

        if (response.subAccounts.length > 0) {
          const subAccountAddress = response.subAccounts[0].address;
          
          // Get balance for sub account
          const subBalance = await provider.request({
            method: 'eth_getBalance',
            params: [subAccountAddress, 'latest']
          });

          const balanceInEth = (parseInt(subBalance as string, 16) / 1e18).toFixed(4);
          setSubAccountBalance(balanceInEth);
        }
      } catch (error) {
        console.error('Failed to fetch sub account balance:', error);
      }
    };

    fetchSubAccountBalance();
  }, [isConnected, address]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">OnchainKit + Wagmi Integration</h2>
      
      <div className="space-y-4">
        {isConnected && address ? (
          <>
            <div className="p-4 bg-gray-50 rounded-md">
              <p className="text-sm font-semibold mb-2">Account Details</p>
              <p className="text-xs text-gray-600 mb-1">
                <span className="font-medium">Address:</span> {address.slice(0, 6)}...{address.slice(-4)}
              </p>
              <p className="text-xs text-gray-600 mb-1">
                <span className="font-medium">Balance:</span> {balance?.formatted} {balance?.symbol}
              </p>
              
              {subAccountBalance && (
                <p className="text-xs text-gray-600">
                  <span className="font-medium">Sub Account Balance:</span> {subAccountBalance} ETH
                </p>
              )}
            </div>

            <div className="p-3 bg-green-50 rounded-md">
              <p className="text-sm font-semibold text-green-800">Integration Active</p>
              <p className="text-xs text-gray-600 mt-1">
                Wagmi hooks are working with Base Account. You can see both main and sub account balances above.
              </p>
              <p className="text-xs text-gray-600 mt-1">
                This demonstrates how OnchainKit and other Web3 libraries can interact with Sub Accounts.
              </p>
            </div>
          </>
        ) : (
          <div className="p-3 bg-yellow-50 rounded-md">
            <p className="text-sm font-semibold text-yellow-800">Connect Wallet</p>
            <p className="text-xs text-gray-600 mt-1">
              Connect your wallet using the Base Account connector above to see OnchainKit integration.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}