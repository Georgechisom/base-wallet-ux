'use client';

import { useState, useEffect, useCallback } from 'react';
import { provider } from '@/lib/base-account';

interface SubAccount {
  address: string;
  factory?: string;
  factoryData?: string;
}

export default function SubAccountManager({ universalAddress }: { universalAddress: string }) {
  const [subAccount, setSubAccount] = useState<SubAccount | null>(null);
  const [loading, setLoading] = useState(false);

  const checkExistingSubAccount = useCallback(async () => {
    try {
      const response = await provider.request({
        method: 'wallet_getSubAccounts',
        params: [{
          account: universalAddress,
          domain: window.location.origin,
        }]
      }) as { subAccounts: SubAccount[] };

      if (response.subAccounts.length > 0) {
        setSubAccount(response.subAccounts[0]);
      }
    } catch (error) {
      console.error('Failed to check sub account:', error);
    }
  }, [universalAddress]);

  useEffect(() => {
    checkExistingSubAccount();
  }, [checkExistingSubAccount]);

  const createSubAccount = async () => {
    setLoading(true);
    try {
      const newSubAccount = await provider.request({
        method: 'wallet_addSubAccount',
        params: [{
          account: { type: 'create' }
        }]
      }) as SubAccount;
      
      setSubAccount(newSubAccount);
    } catch (error) {
      console.error('Failed to create sub account:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" rounded-lg shadow-md p-6 max-w-md mx-auto mt-6">
      <h2 className="text-xl text-black font-bold mb-4">Sub Account Management</h2>
      
      {subAccount ? (
        <div className="space-y-3">
          <div className="p-3 bg-green-50 rounded-md">
            <p className="text-sm font-semibold text-green-800">Sub Account Active</p>
            <p className="text-xs text-gray-600 break-all mt-1">{subAccount.address}</p>
          </div>
          <p className="text-sm text-gray-600">
            This sub account can automatically spend from your main Base Account balance.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            Create a sub account to enable frictionless transactions with automatic funding.
          </p>
          <button
            onClick={createSubAccount}
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:bg-gray-400 transition-colors"
          >
            {loading ? 'Creating...' : 'Create Sub Account'}
          </button>
        </div>
      )}
    </div>
  );
}