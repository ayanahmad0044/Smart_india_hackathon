import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { 
  TrafficCone, 
  Play, 
  Pause, 
  RotateCcw,
  Settings,
  Zap
} from 'lucide-react';
import { mockTrafficSignals } from '@/lib/mockData';

export default function TrafficSignalControl() {
  const [signals, setSignals] = useState(mockTrafficSignals);
  const [autoMode, setAutoMode] = useState(true);
  const [selectedSignal, setSelectedSignal] = useState(signals[0]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'green': return 'bg-green-500';
      case 'yellow': return 'bg-yellow-500';
      case 'red': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const updateSignalTiming = (timing: number, phase: 'green' | 'yellow' | 'red') => {
    setSelectedSignal(prev => ({
      ...prev,
      timing: { ...prev.timing, [phase]: timing }
    }));
  };

  const forceSignalChange = (signalId: string, newStatus: 'green' | 'yellow' | 'red') => {
    setSignals(prev => prev.map(signal => 
      signal.id === signalId ? { ...signal, status: newStatus } : signal
    ));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      {/* Signal Overview */}
      <Card className="bg-slate-900 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center space-x-2">
              <TrafficCone className="w-5 h-5 text-green-400" />
              <span>Traffic Signals</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-400">Auto Mode</span>
              <Switch 
                checked={autoMode} 
                onCheckedChange={setAutoMode}
                className="data-[state=checked]:bg-green-500"
              />
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {signals.map((signal) => (
            <div 
              key={signal.id}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                selectedSignal.id === signal.id 
                  ? 'bg-slate-800 border-blue-500' 
                  : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
              }`}
              onClick={() => setSelectedSignal(signal)}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-white">{signal.id}</h3>
                  <p className="text-sm text-slate-400">{signal.location}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(signal.status)} animate-pulse`}></div>
                  <Badge variant="outline" className="text-slate-300 border-slate-600">
                    {signal.status.toUpperCase()}
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Traffic Flow:</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all"
                      style={{ width: `${signal.traffic_flow}%` }}
                    ></div>
                  </div>
                  <span className="text-white font-medium">{signal.traffic_flow}%</span>
                </div>
              </div>
              
              {!autoMode && (
                <div className="flex space-x-2 mt-3">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex-1 text-green-400 border-green-400 hover:bg-green-400 hover:text-black"
                    onClick={(e) => {
                      e.stopPropagation();
                      forceSignalChange(signal.id, 'green');
                    }}
                  >
                    Green
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex-1 text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-black"
                    onClick={(e) => {
                      e.stopPropagation();
                      forceSignalChange(signal.id, 'yellow');
                    }}
                  >
                    Yellow
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex-1 text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      forceSignalChange(signal.id, 'red');
                    }}
                  >
                    Red
                  </Button>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
      
      {/* Signal Configuration */}
      <Card className="bg-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Settings className="w-5 h-5 text-blue-400" />
            <span>Signal Configuration</span>
          </CardTitle>
          <p className="text-sm text-slate-400">
            Configuring: {selectedSignal.id} - {selectedSignal.location}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Current Status Display */}
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <div className="flex items-center justify-center space-x-4">
              <div className="flex flex-col items-center space-y-2">
                <div className={`w-8 h-8 rounded-full ${
                  selectedSignal.status === 'red' ? 'bg-red-500 animate-pulse' : 'bg-slate-600'
                }`}></div>
                <span className="text-xs text-slate-400">RED</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className={`w-8 h-8 rounded-full ${
                  selectedSignal.status === 'yellow' ? 'bg-yellow-500 animate-pulse' : 'bg-slate-600'
                }`}></div>
                <span className="text-xs text-slate-400">YELLOW</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className={`w-8 h-8 rounded-full ${
                  selectedSignal.status === 'green' ? 'bg-green-500 animate-pulse' : 'bg-slate-600'
                }`}></div>
                <span className="text-xs text-slate-400">GREEN</span>
              </div>
            </div>
          </div>
          
          {/* Timing Controls */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-white">Green Phase</label>
                <span className="text-sm text-slate-400">{selectedSignal.timing.green}s</span>
              </div>
              <Slider
                value={[selectedSignal.timing.green]}
                onValueChange={(value) => updateSignalTiming(value[0], 'green')}
                max={120}
                min={10}
                step={5}
                className="w-full"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-white">Yellow Phase</label>
                <span className="text-sm text-slate-400">{selectedSignal.timing.yellow}s</span>
              </div>
              <Slider
                value={[selectedSignal.timing.yellow]}
                onValueChange={(value) => updateSignalTiming(value[0], 'yellow')}
                max={10}
                min={3}
                step={1}
                className="w-full"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-white">Red Phase</label>
                <span className="text-sm text-slate-400">{selectedSignal.timing.red}s</span>
              </div>
              <Slider
                value={[selectedSignal.timing.red]}
                onValueChange={(value) => updateSignalTiming(value[0], 'red')}
                max={90}
                min={15}
                step={5}
                className="w-full"
              />
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
              <Zap className="w-4 h-4 mr-2" />
              Apply Changes
            </Button>
            <Button variant="outline" className="text-slate-300 border-slate-600">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}