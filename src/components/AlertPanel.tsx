import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock,
  Eye,
  X
} from 'lucide-react';
import { mockAlerts } from '@/lib/mockData';

export default function AlertPanel() {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'success': return CheckCircle;
      case 'error': return XCircle;
      case 'warning': return AlertTriangle;
      default: return AlertTriangle;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-400 bg-green-500';
      case 'error': return 'text-red-400 bg-red-500';
      case 'warning': return 'text-yellow-400 bg-yellow-500';
      default: return 'text-blue-400 bg-blue-500';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-900 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Active Alerts</p>
                <p className="text-2xl font-bold text-white">3</p>
              </div>
              <div className="w-10 h-10 bg-red-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-900 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Resolved Today</p>
                <p className="text-2xl font-bold text-white">12</p>
              </div>
              <div className="w-10 h-10 bg-green-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-900 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Avg Response</p>
                <p className="text-2xl font-bold text-white">4.2m</p>
              </div>
              <div className="w-10 h-10 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Alerts */}
      <Card className="bg-slate-900 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              <span>Active Alerts</span>
            </CardTitle>
            <Button variant="outline" size="sm" className="text-slate-300 border-slate-600">
              <Eye className="w-4 h-4 mr-2" />
              View All
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {mockAlerts.map((alert) => {
            const Icon = getAlertIcon(alert.type);
            const colorClasses = getAlertColor(alert.type);
            
            return (
              <div 
                key={alert.id}
                className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 ${colorClasses.split(' ')[1]} bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-5 h-5 ${colorClasses.split(' ')[0]}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={getSeverityBadge(alert.severity)}>
                          {alert.severity.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-slate-400">
                          {formatTimeAgo(alert.timestamp)}
                        </span>
                      </div>
                      <p className="text-white font-medium mb-1">{alert.message}</p>
                      <p className="text-sm text-slate-400">
                        Alert ID: #{alert.id.toString().padStart(4, '0')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="text-slate-300 border-slate-600">
                      View
                    </Button>
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Action Buttons for specific alert types */}
                {alert.type === 'error' && (
                  <div className="mt-3 pt-3 border-t border-slate-700">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-black">
                        Restart Camera
                      </Button>
                      <Button size="sm" variant="outline" className="text-slate-300 border-slate-600">
                        Send Technician
                      </Button>
                    </div>
                  </div>
                )}
                
                {alert.type === 'warning' && (
                  <div className="mt-3 pt-3 border-t border-slate-700">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-black">
                        Optimize Signals
                      </Button>
                      <Button size="sm" variant="outline" className="text-slate-300 border-slate-600">
                        Monitor
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Clock className="w-5 h-5 text-blue-400" />
            <span>Recent Activity</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-3">
            {[
              { time: '2 min ago', action: 'Signal TL001 timing updated', user: 'System Auto' },
              { time: '5 min ago', action: 'Traffic flow optimized on Main St', user: 'AI Controller' },
              { time: '12 min ago', action: 'Alert #0003 resolved', user: 'Admin User' },
              { time: '18 min ago', action: 'Camera CAM_002 came back online', user: 'System Auto' },
              { time: '25 min ago', action: 'Emergency override activated', user: 'Traffic Admin' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-slate-800 last:border-b-0">
                <div>
                  <p className="text-sm text-white">{activity.action}</p>
                  <p className="text-xs text-slate-400">by {activity.user}</p>
                </div>
                <span className="text-xs text-slate-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}