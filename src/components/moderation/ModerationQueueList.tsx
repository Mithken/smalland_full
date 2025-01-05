import React from 'react';
import { AlertTriangle, Check, X } from 'lucide-react';
import { UserAvatar } from '../user/UserAvatar';
import type { ModerationReport } from '../../types/moderation';

interface ModerationQueueListProps {
  reports: ModerationReport[];
  type: 'stories' | 'comments' | 'users' | 'projects';
  onAllow: (id: string) => void;
  onRemove: (id: string) => void;
}

export function ModerationQueueList({
  reports,
  type,
  onAllow,
  onRemove
}: ModerationQueueListProps) {
  if (reports.length === 0) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-500">No pending reports</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reports.map(report => (
        <div
          key={report.reportId}
          className="bg-white rounded-lg border border-gray-200 p-4"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-red-50 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">
                    {report.reportType.charAt(0).toUpperCase() + report.reportType.slice(1)} Report
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(report.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600 mt-1">{report.reason}</p>
                
                <div className="flex items-center mt-4 space-x-4">
                  <button
                    onClick={() => onAllow(report.reportId)}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Allow
                  </button>
                  <button
                    onClick={() => onRemove(report.reportId)}
                    className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="text-right">
                <p className="text-sm text-gray-500">Reported by</p>
                <p className="font-medium">Username</p>
              </div>
              <UserAvatar user={null} size="sm" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}