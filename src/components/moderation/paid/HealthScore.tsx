import React from 'react';
import { Shield } from 'lucide-react';

interface HealthScoreProps {
  score: number;
  metrics: Array<{
    label: string;
    value: number;
  }>;
}

export function HealthScore({ score, metrics }: HealthScoreProps) {
  const getScoreColor = (value: number) => {
    if (value >= 80) return 'text-green-600';
    if (value >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (value: number) => {
    if (value >= 80) return 'bg-green-100';
    if (value >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="space-y-6">
      <div className={`p-6 ${getScoreBackground(score)} rounded-lg text-center`}>
        <Shield className={`w-12 h-12 mx-auto mb-2 ${getScoreColor(score)}`} />
        <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
          {score}
        </div>
        <div className="text-sm text-gray-600 mt-1">Community Health Score</div>
      </div>

      <div className="space-y-4">
        {metrics.map(({ label, value }) => (
          <div key={label}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">{label}</span>
              <span className={getScoreColor(value)}>{value}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${getScoreBackground(value)}`}
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}