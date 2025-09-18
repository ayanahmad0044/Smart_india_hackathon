import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import OpenCVViewer from '@/components/OpenCVViewer';
import TrafficSignalControl from '@/components/TrafficSignalControl';
import TrafficMetrics from '@/components/TrafficMetrics';
import UrbanMap from '@/components/UrbanMap';
import AlertPanel from '@/components/AlertPanel';

export default function Index() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderMainContent = () => {
    switch (activeSection) {
      case 'signals':
        return <TrafficSignalControl />;
      case 'cameras':
        return (
          <div className="h-full">
            <OpenCVViewer />
          </div>
        );
      case 'analytics':
        return <TrafficMetrics />;
      case 'map':
        return (
          <div className="h-full">
            <UrbanMap />
          </div>
        );
      case 'alerts':
        return <AlertPanel />;
      case 'settings':
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-slate-400">
              <h2 className="text-2xl font-bold mb-4">Settings</h2>
              <p>System configuration panel coming soon...</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            {/* Dashboard Overview */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-white mb-2">Traffic Management Dashboard</h1>
              <p className="text-slate-400">Real-time monitoring and control of urban traffic systems</p>
            </div>
            
            {/* Key Metrics */}
            <TrafficMetrics />
            
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-96">
              {/* OpenCV Viewer - Central Component */}
              <div className="lg:col-span-1">
                <OpenCVViewer />
              </div>
              
              {/* Urban Map */}
              <div className="lg:col-span-1">
                <UrbanMap />
              </div>
            </div>
            
            {/* Traffic Signal Overview */}
            <div className="h-96">
              <TrafficSignalControl />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {renderMainContent()}
        </div>
      </div>
    </div>
  );
}