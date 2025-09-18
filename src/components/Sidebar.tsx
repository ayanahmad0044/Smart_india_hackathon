import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, 
  TrafficCone, 
  Camera, 
  BarChart3, 
  Settings, 
  AlertTriangle,
  MapPin
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'signals', label: 'Traffic Signals', icon: TrafficCone },
    { id: 'cameras', label: 'Camera Feeds', icon: Camera },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'map', label: 'City Map', icon: MapPin },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle, badge: 3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 h-full flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <TrafficCone className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">TrafficFlow</h1>
            <p className="text-sm text-slate-400">Control Center</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "secondary" : "ghost"}
              className={`w-full justify-start text-left h-12 ${
                isActive 
                  ? 'bg-slate-800 text-white border border-slate-700' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
              onClick={() => onSectionChange(item.id)}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <Badge variant="destructive" className="ml-2">
                  {item.badge}
                </Badge>
              )}
            </Button>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center space-x-3 text-slate-400">
          <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium">TA</span>
          </div>
          <div className="text-sm">
            <p className="font-medium text-white">Traffic Admin</p>
            <p className="text-xs">System Operator</p>
          </div>
        </div>
      </div>
    </div>
  );
}