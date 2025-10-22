'use client';

import { useState } from 'react';
import { provider } from '@/lib/base-account';

export default function TransactionSender({ subAccountAddress }: { subAccountAddress: string }) {
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sendTransaction = async () => {
    setLoading(true);
    setError(null);
    setTxHash(null);

    try {
      const tx = await provider.request({
        method: 'eth_sendTransaction',
        params: [{
          from: subAccountAddress,
          to: '0x4bbfd120d9f352a0bed7a014bd67913a2007a878', // Example contract
          data: '0x9846cd9e', // Example function selector
          value: '0x0',
        }]
      });

      setTxHash(tx as string);
    } catch (error) {
      console.error('Transaction failed:', error);
      setError(error instanceof Error ? error.message : 'Transaction failed');
    } finally {
      setLoading(false);
    }
  };

  const sendCalls = async () => {
    setLoading(true);
    setError(null);
    setTxHash(null);

    try {
      const callsId = await provider.request({
        method: 'wallet_sendCalls',
        params: [{
          version: '2.0',
          atomicRequired: true,
          chainId: '0x14a33', // Base Sepolia in hex
          from: subAccountAddress,
          calls: [{
            to: '0x4bbfd120d9f352a0bed7a014bd67913a2007a878',
            data: '0x9846cd9e',
            value: '0x0',
          }],
        }]
      });

      setTxHash(callsId as string);
    } catch (error) {
      console.error('Calls failed:', error);
      setError(error instanceof Error ? error.message : 'Calls failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Transaction Sender</h2>
      
      <div className="space-y-3">
        <p className="text-sm text-gray-600">
          Send transactions from your sub account. The sub account will automatically request funds from the main account if needed.
        </p>
        
        <div className="space-y-2">
          <button
            onClick={sendTransaction}
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 disabled:bg-gray-400 transition-colors"
          >
            {loading ? 'Sending...' : 'Send Single Transaction'}
          </button>
          
          <button
            onClick={sendCalls}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-gray-400 transition-colors"
          >
            {loading ? 'Sending...' : 'Send Batch Calls'}
          </button>
        </div>

        {txHash && (
          <div className="p-3 bg-green-50 rounded-md">
            <p className="text-sm font-semibold text-green-800">Transaction Sent!</p>
            <p className="text-xs text-gray-600 break-all mt-1">Hash: {txHash}</p>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 rounded-md">
            <p className="text-sm font-semibold text-red-800">Error</p>
            <p className="text-xs text-gray-600 mt-1">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}