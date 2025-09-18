import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Camera, 
  Play, 
  Pause, 
  RotateCcw, 
  Maximize2,
  Eye,
  Activity
} from 'lucide-react';

export default function OpenCVViewer() {
  const [isRecording, setIsRecording] = useState(true);
  const [detectedVehicles, setDetectedVehicles] = useState(0);
  const [detectedPedestrians, setDetectedPedestrians] = useState(0);
  const [frameRate, setFrameRate] = useState(30);

  // Simulate real-time detection updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDetectedVehicles(Math.floor(Math.random() * 15) + 5);
      setDetectedPedestrians(Math.floor(Math.random() * 8) + 2);
      setFrameRate(28 + Math.random() * 4);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-slate-900 border-slate-700 h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center space-x-2">
            <Camera className="w-5 h-5 text-blue-400" />
            <span>OpenCV Traffic Analysis</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant={isRecording ? "default" : "secondary"} className="bg-red-500">
              <Activity className="w-3 h-3 mr-1" />
              {isRecording ? 'LIVE' : 'PAUSED'}
            </Badge>
            <Badge variant="outline" className="text-green-400 border-green-400">
              {frameRate.toFixed(1)} FPS
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Simulated Camera Feed */}
        <div className="relative bg-black rounded-lg overflow-hidden aspect-video border border-slate-700">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
            {/* Simulated Traffic Scene */}
            <div className="relative w-full h-full">
              {/* Road lines */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-yellow-400 opacity-60 transform -translate-y-1/2"></div>
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white opacity-40 transform -translate-y-1/2" style={{backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 20px, white 20px, white 40px)'}}></div>
              
              {/* Simulated vehicles with detection boxes */}
              <div className="absolute top-1/3 left-1/4 w-12 h-6 bg-blue-500 rounded-sm opacity-80">
                <div className="absolute -top-1 -left-1 -right-1 -bottom-1 border-2 border-green-400 rounded animate-pulse"></div>
                <div className="absolute -top-6 left-0 text-xs text-green-400 font-mono bg-black px-1 rounded">CAR</div>
              </div>
              
              <div className="absolute top-2/3 right-1/3 w-10 h-5 bg-red-500 rounded-sm opacity-80">
                <div className="absolute -top-1 -left-1 -right-1 -bottom-1 border-2 border-green-400 rounded animate-pulse"></div>
                <div className="absolute -top-6 left-0 text-xs text-green-400 font-mono bg-black px-1 rounded">CAR</div>
              </div>
              
              <div className="absolute bottom-1/4 left-1/2 w-8 h-4 bg-yellow-500 rounded-sm opacity-80">
                <div className="absolute -top-1 -left-1 -right-1 -bottom-1 border-2 border-green-400 rounded animate-pulse"></div>
                <div className="absolute -top-6 left-0 text-xs text-green-400 font-mono bg-black px-1 rounded">CAR</div>
              </div>
              
              {/* Pedestrians */}
              <div className="absolute top-1/4 right-1/4 w-2 h-4 bg-orange-400 rounded-full opacity-80">
                <div className="absolute -top-1 -left-1 -right-1 -bottom-1 border-2 border-blue-400 rounded animate-pulse"></div>
                <div className="absolute -top-6 -left-2 text-xs text-blue-400 font-mono bg-black px-1 rounded">PED</div>
              </div>
              
              {/* Traffic light simulation */}
              <div className="absolute top-4 right-4 w-3 h-8 bg-slate-800 rounded-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full mx-auto mt-5 animate-pulse"></div>
              </div>
            </div>
          </div>
          
          {/* Overlay Info */}
          <div className="absolute top-4 left-4 space-y-2">
            <div className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded font-mono">
              Camera ID: CAM_001
            </div>
            <div className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded font-mono">
              Location: Main St & 1st Ave
            </div>
            <div className="bg-black bg-opacity-70 text-green-400 text-xs px-2 py-1 rounded font-mono">
              AI Detection: ACTIVE
            </div>
          </div>
        </div>
        
        {/* Detection Statistics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Vehicles Detected</p>
                <p className="text-2xl font-bold text-white">{detectedVehicles}</p>
              </div>
              <div className="w-10 h-10 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-blue-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Pedestrians</p>
                <p className="text-2xl font-bold text-white">{detectedPedestrians}</p>
              </div>
              <div className="w-10 h-10 bg-orange-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-orange-400" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Control Buttons */}
        <div className="flex space-x-2">
          <Button
            variant={isRecording ? "destructive" : "default"}
            size="sm"
            onClick={() => setIsRecording(!isRecording)}
            className="flex-1"
          >
            {isRecording ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isRecording ? 'Pause' : 'Resume'}
          </Button>
          
          <Button variant="outline" size="sm" className="text-slate-300 border-slate-600">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          
          <Button variant="outline" size="sm" className="text-slate-300 border-slate-600">
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}