import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Map, 
  ZoomIn, 
  ZoomOut, 
  Locate,
  Navigation,
  MapPin
} from 'lucide-react';
import { mockTrafficSignals } from '@/lib/mockData';

export default function UrbanMap() {
  const [selectedSignal, setSelectedSignal] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'green': return 'bg-green-500 border-green-400';
      case 'yellow': return 'bg-yellow-500 border-yellow-400';
      case 'red': return 'bg-red-500 border-red-400';
      default: return 'bg-gray-500 border-gray-400';
    }
  };

  return (
    <Card className="bg-slate-900 border-slate-700 h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center space-x-2">
            <Map className="w-5 h-5 text-purple-400" />
            <span>Urban Traffic Map</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="text-slate-300 border-slate-600">
              <Locate className="w-4 h-4 mr-2" />
              Center
            </Button>
            <div className="flex items-center space-x-1">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-slate-300 border-slate-600"
                onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.25))}
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-slate-300 border-slate-600"
                onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.25))}
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="h-full">
        <div className="relative bg-slate-800 rounded-lg overflow-hidden h-96 border border-slate-700">
          {/* Map Background */}
          <div 
            className="absolute inset-0 transition-transform duration-300"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {/* Street Grid */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
              {/* Horizontal Streets */}
              <line x1="0" y1="75" x2="400" y2="75" stroke="#475569" strokeWidth="3" />
              <line x1="0" y1="150" x2="400" y2="150" stroke="#475569" strokeWidth="4" />
              <line x1="0" y1="225" x2="400" y2="225" stroke="#475569" strokeWidth="3" />
              
              {/* Vertical Streets */}
              <line x1="100" y1="0" x2="100" y2="300" stroke="#475569" strokeWidth="3" />
              <line x1="200" y1="0" x2="200" y2="300" stroke="#475569" strokeWidth="4" />
              <line x1="300" y1="0" x2="300" y2="300" stroke="#475569" strokeWidth="3" />
              
              {/* Street Names */}
              <text x="50" y="70" fill="#94a3b8" fontSize="8" fontFamily="monospace">1st Ave</text>
              <text x="50" y="145" fill="#94a3b8" fontSize="10" fontFamily="monospace">Main St</text>
              <text x="50" y="220" fill="#94a3b8" fontSize="8" fontFamily="monospace">3rd Ave</text>
              
              <text x="95" y="20" fill="#94a3b8" fontSize="8" fontFamily="monospace" transform="rotate(-90 95 20)">Broadway</text>
              <text x="195" y="20" fill="#94a3b8" fontSize="8" fontFamily="monospace" transform="rotate(-90 195 20)">Park Ave</text>
              <text x="295" y="20" fill="#94a3b8" fontSize="8" fontFamily="monospace" transform="rotate(-90 295 20)">Oak St</text>
              
              {/* Traffic Flow Indicators */}
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#22d3ee" />
                </marker>
              </defs>
              
              {/* Flow arrows */}
              <line x1="120" y1="150" x2="180" y2="150" stroke="#22d3ee" strokeWidth="2" markerEnd="url(#arrowhead)" opacity="0.7" />
              <line x1="220" y1="150" x2="280" y2="150" stroke="#22d3ee" strokeWidth="2" markerEnd="url(#arrowhead)" opacity="0.7" />
              <line x1="200" y1="95" x2="200" y2="135" stroke="#22d3ee" strokeWidth="2" markerEnd="url(#arrowhead)" opacity="0.7" />
              <line x1="200" y1="165" x2="200" y2="205" stroke="#22d3ee" strokeWidth="2" markerEnd="url(#arrowhead)" opacity="0.7" />
            </svg>
            
            {/* Traffic Signals */}
            {mockTrafficSignals.map((signal) => (
              <div
                key={signal.id}
                className={`absolute w-4 h-4 rounded-full border-2 cursor-pointer transition-all transform -translate-x-2 -translate-y-2 ${
                  getStatusColor(signal.status)
                } ${selectedSignal === signal.id ? 'scale-150 ring-4 ring-white ring-opacity-50' : 'hover:scale-125'}`}
                style={{
                  left: `${signal.coordinates.x}px`,
                  top: `${signal.coordinates.y}px`,
                }}
                onClick={() => setSelectedSignal(selectedSignal === signal.id ? null : signal.id)}
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <div className="bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded font-mono">
                    {signal.id}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Traffic Density Heatmap Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              {/* High traffic areas */}
              <div className="absolute top-32 left-16 w-32 h-8 bg-red-500 opacity-20 rounded-full blur-sm"></div>
              <div className="absolute top-60 left-48 w-24 h-6 bg-yellow-500 opacity-15 rounded-full blur-sm"></div>
              <div className="absolute top-48 left-72 w-20 h-10 bg-green-500 opacity-10 rounded-full blur-sm"></div>
            </div>
          </div>
          
          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 rounded-lg p-3 space-y-2">
            <h4 className="text-white text-sm font-semibold mb-2">Legend</h4>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-white">Green Signal</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-xs text-white">Yellow Signal</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-xs text-white">Red Signal</span>
            </div>
            <div className="flex items-center space-x-2">
              <Navigation className="w-3 h-3 text-cyan-400" />
              <span className="text-xs text-white">Traffic Flow</span>
            </div>
          </div>
          
          {/* Zoom Level Indicator */}
          <div className="absolute top-4 right-4 bg-black bg-opacity-75 rounded-lg px-3 py-1">
            <span className="text-white text-sm font-mono">{Math.round(zoomLevel * 100)}%</span>
          </div>
        </div>
        
        {/* Selected Signal Info */}
        {selectedSignal && (
          <div className="mt-4 bg-slate-800 rounded-lg p-4 border border-slate-700">
            {(() => {
              const signal = mockTrafficSignals.find(s => s.id === selectedSignal);
              if (!signal) return null;
              
              return (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-white">{signal.id}</h3>
                      <p className="text-sm text-slate-400">{signal.location}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(signal.status).split(' ')[0]} animate-pulse`}></div>
                      <Badge variant="outline" className="text-slate-300 border-slate-600">
                        {signal.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-slate-400">Green:</span>
                      <span className="text-white ml-2">{signal.timing.green}s</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Yellow:</span>
                      <span className="text-white ml-2">{signal.timing.yellow}s</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Red:</span>
                      <span className="text-white ml-2">{signal.timing.red}s</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm text-slate-400">Traffic Flow:</span>
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
                </div>
              );
            })()}
          </div>
        )}
      </CardContent>
    </Card>
  );
}