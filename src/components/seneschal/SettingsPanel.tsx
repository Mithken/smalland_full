import React from 'react';
import { Settings, Shield, Users, AlertTriangle, Image } from 'lucide-react';
import type { Nexus } from '../../types/nexus';

interface SettingsPanelProps {
  nexus: Nexus;
}

export function SettingsPanel({ nexus }: SettingsPanelProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-bold mb-4">Settings</h3>
      
      <div className="space-y-6">
        <button className="w-full text-left">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
            <div className="flex items-center">
              <Settings className="w-5 h-5 text-gray-600 mr-2" />
              <span>Restore Nexus Defaults</span>
            </div>
          </div>
        </button>

        <div>
          <h4 className="font-medium mb-3">Authority Settings</h4>
          <div className="space-y-2">
            <button className="w-full text-left">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-indigo-600 mr-2" />
                  <span>Mod Authority</span>
                </div>
              </div>
            </button>
            <button className="w-full text-left">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-yellow-600 mr-2" />
                  <span>Guild Authority</span>
                </div>
              </div>
            </button>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3">Content Settings</h4>
          <div className="space-y-2">
            <button className="w-full text-left">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                <div className="flex items-center">
                  <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                  <span>NSFW Settings</span>
                </div>
              </div>
            </button>
            <button className="w-full text-left">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                <div className="flex items-center">
                  <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                  <span>NSFL Settings</span>
                </div>
              </div>
            </button>
            <button className="w-full text-left">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                <div className="flex items-center">
                  <Image className="w-5 h-5 text-gray-600 mr-2" />
                  <span>Top Banner Settings</span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}