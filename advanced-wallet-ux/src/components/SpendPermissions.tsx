'use client';

import { useState } from 'react';
import {
  requestSpendPermission,
  prepareSpendCallData,
  requestRevoke,
  fetchPermissions
} from '@base-org/account/spend-permission';
import { provider } from '@/lib/base-account';

type SpendPermission = {
  createdAt?: number;
  permissionHash?: string;
  signature: string;
  chainId?: number;
  permission: {
    account: string;
    spender: string;
    token: string;
    allowance: string;
    period: number;
    start: number;
    end: number;
    salt: string;
    extraData: string;
  };
};

export default function SpendPermissions({ accountAddress }: { accountAddress: string }) {
  const [permission, setPermission] = useState<SpendPermission | null>(null);
  const [loading, setLoading] = useState(false);
  const [spending, setSpending] = useState(false);
  const [revoking, setRevoking] = useState(false);

  const requestPermission = async () => {
    setLoading(true);
    try {
      const newPermission = await requestSpendPermission({
        account: accountAddress,
        spender: '0x0000000000000000000000000000000000000000', // Example spender
        token: '0x0000000000000000000000000000000000000000', // Native ETH
        chainId: 84532, // Base Sepolia testnet
        allowance: BigInt('1000000000000000000'), // 1 ETH
        periodInDays: 30,
        provider,
      });
      
      setPermission(newPermission);
    } catch (error) {
      console.error('Failed to request permission:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  const formatAllowance = (allowance: string) => {
    return (Number(allowance) / 1e18).toFixed(4);
  };

  const usePermission = async () => {
    if (!permission) return;
    
    setSpending(true);
    try {
      const spendCalls = await prepareSpendCallData(
        permission,
        BigInt('100000000000000000') // 0.1 ETH
      );

      const callsId = await provider.request({
        method: 'wallet_sendCalls',
        params: [{
          version: '2.0',
          atomicRequired: true,
          from: permission.permission.spender,
          calls: spendCalls,
        }]
      });

      alert(`Spent 0.1 ETH using permission! Calls ID: ${callsId}`);
    } catch (error) {
      console.error('Failed to use permission:', error);
      alert('Failed to use permission');
    } finally {
      setSpending(false);
    }
  };

  const revokePermission = async () => {
    if (!permission) return;
    
    setRevoking(true);
    try {
      await requestRevoke({
        provider,
        permission
      });
      setPermission(null);
      alert('Permission revoked successfully!');
    } catch (error) {
      console.error('Failed to revoke permission:', error);
      alert('Failed to revoke permission');
    } finally {
      setRevoking(false);
    }
  };

  const refreshPermissions = async () => {
    try {
      const permissions = await fetchPermissions({
        account: accountAddress,
        chainId: 84532,
        spender: '0x0000000000000000000000000000000000000000',
        provider,
      });
      
      if (permissions.length > 0) {
        setPermission(permissions[0]);
      }
    } catch (error) {
      console.error('Failed to fetch permissions:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Spend Permissions</h2>
      
      {permission ? (
        <div className="space-y-3">
          <div className="p-3 bg-blue-50 rounded-md">
            <p className="text-sm font-semibold text-blue-800">Permission Active</p>
            <div className="mt-2 space-y-1">
              <p className="text-xs text-gray-600">
                <span className="font-medium">Allowance:</span> {formatAllowance(permission.permission.allowance)} ETH
              </p>
              <p className="text-xs text-gray-600">
                <span className="font-medium">Period:</span> {permission.permission.period / 86400} days
              </p>
              <p className="text-xs text-gray-600">
                <span className="font-medium">Valid Until:</span> {formatDate(permission.permission.end)}
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <button
              onClick={usePermission}
              disabled={spending}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:bg-gray-400 transition-colors"
            >
              {spending ? 'Spending...' : 'Use Permission (Spend 0.1 ETH)'}
            </button>
            
            <button
              onClick={revokePermission}
              disabled={revoking}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 disabled:bg-gray-400 transition-colors"
            >
              {revoking ? 'Revoking...' : 'Revoke Permission'}
            </button>
          </div>
          
          <p className="text-sm text-gray-600">
            This permission allows automated spending without repeated approvals.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            Grant spend permissions to enable automated transactions and recurring payments.
          </p>
          
          <div className="space-y-2">
            <button
              onClick={requestPermission}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
            >
              {loading ? 'Requesting...' : 'Request Spend Permission'}
            </button>
            
            <button
              onClick={refreshPermissions}
              className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
            >
              Refresh Permissions
            </button>
          </div>
        </div>
      )}
    </div>
  );
}