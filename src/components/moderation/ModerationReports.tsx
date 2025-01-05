import React from 'react';
import { AlertTriangle, MessageSquare, User } from 'lucide-react';
import { UserAvatar } from '../user/UserAvatar';
import type { ModerationReport } from '../../types/moderation';

interface ModerationReportsProps {
  nexusId: string;
}

export function ModerationReports({ nexusId }: ModerationReportsProps) {
  // In a real app, fetch reports from API
  const reports: ModerationReport[] = [];

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
                {report.reportType === 'story' && (
                  <MessageSquare className="w-5 h-5 text-red-600" />
                )}
                {report.reportType === 'comment' && (
                  <MessageSquare className="w-5 h-5 text-red-600" />
                )}
                {report.reportType === 'user' && (
                  <User className="w-5 h-5 text-red-600" />
                )}
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
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    Take Action
                  </button>
                  <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
                    Dismiss
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