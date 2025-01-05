import React from 'react';

interface MetricCardProps {
  label: string;
  value: number;
  subValue: string;
}

export function MetricCard({ label, value, subValue }: MetricCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      <div className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</div>
      <div className="text-sm text-indigo-600">{subValue}</div>
    </div>
  );
}