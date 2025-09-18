import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingDown, 
  Clock, 
  Car, 
  TrafficCone,
  AlertTriangle,
  Activity,
  Target,
  Zap
} from 'lucide-react';
import { mockMetrics } from '@/lib/mockData';

export default function TrafficMetrics() {
  const metrics = mockMetrics;
  
  const metricCards = [
    {
      title: 'Average Commute Time',
      value: `${metrics.averageCommuteTime} min`,
      change: '-2.3 min',
      changeType: 'positive',
      icon: Clock,
      color: 'blue'
    },
    {
      title: 'Time Reduction',
      value: `${metrics.reductionPercentage}%`,
      change: '+2.1%',
      changeType: 'positive',
      icon: TrendingDown,
      color: 'green'
    },
    {
      title: 'Active Vehicles',
      value: metrics.totalVehicles.toLocaleString(),
      change: '+147',
      changeType: 'neutral',
      icon: Car,
      color: 'purple'
    },
    {
      title: 'Active Signals',
      value: metrics.signalsActive.toString(),
      change: '100%',
      changeType: 'positive',
      icon: TrafficCone,
      color: 'orange'
    }
  ];

  const performanceData = [
    { label: 'Main Street Corridor', efficiency: 89, improvement: 15 },
    { label: 'Downtown District', efficiency: 76, improvement: 8 },
    { label: 'Business Quarter', efficiency: 92, improvement: 18 },
    { label: 'Residential Zone', efficiency: 84, improvement: 12 }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((metric, index) => {
          const Icon = metric.icon;
          const colorClasses = {
            blue: 'bg-blue-500 text-blue-400',
            green: 'bg-green-500 text-green-400',
            purple: 'bg-purple-500 text-purple-400',
            orange: 'bg-orange-500 text-orange-400'
          };
          
          return (
            <Card key={index} className="bg-slate-900 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${colorClasses[metric.color as keyof typeof colorClasses].split(' ')[0]} bg-opacity-20 rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${colorClasses[metric.color as keyof typeof colorClasses].split(' ')[1]}`} />
                  </div>
                  <Badge 
                    variant={metric.changeType === 'positive' ? 'default' : 'secondary'}
                    className={metric.changeType === 'positive' ? 'bg-green-500' : ''}
                  >
                    {metric.change}
                  </Badge>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white mb-1">{metric.value}</p>
                  <p className="text-sm text-slate-400">{metric.title}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance by Area */}
        <Card className="bg-slate-900 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Target className="w-5 h-5 text-green-400" />
              <span>Performance by Area</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {performanceData.map((area, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-white">{area.label}</span>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-green-400 border-green-400">
                      +{area.improvement}%
                    </Badge>
                    <span className="text-sm text-slate-400">{area.efficiency}%</span>
                  </div>
                </div>
                <Progress 
                  value={area.efficiency} 
                  className="h-2"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="bg-slate-900 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Activity className="w-5 h-5 text-blue-400" />
              <span>System Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">System Health</span>
                  <Badge className="bg-green-500">Optimal</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-lg font-bold text-white">98.7%</span>
                </div>
              </div>
              
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">Response Time</span>
                  <Badge variant="outline" className="text-blue-400 border-blue-400">Fast</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-blue-400" />
                  <span className="text-lg font-bold text-white">1.2s</span>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-white">Active Incidents</span>
                <Badge variant="destructive">{metrics.incidents}</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  <span className="text-slate-300">Traffic congestion on Broadway</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span className="text-slate-300">Camera offline at Main St</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-4 border border-blue-500/20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Optimization Impact</p>
                  <p className="text-xs text-slate-400">Commute times reduced by 12.3% this week</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}