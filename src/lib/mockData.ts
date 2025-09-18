export interface TrafficSignal {
  id: string;
  location: string;
  status: 'green' | 'yellow' | 'red';
  coordinates: { x: number; y: number };
  timing: {
    green: number;
    yellow: number;
    red: number;
  };
  traffic_flow: number;
}

export interface TrafficMetrics {
  averageCommuteTime: number;
  reductionPercentage: number;
  totalVehicles: number;
  signalsActive: number;
  incidents: number;
}

export const mockTrafficSignals: TrafficSignal[] = [
  {
    id: 'TL001',
    location: 'Main St & 1st Ave',
    status: 'green',
    coordinates: { x: 120, y: 80 },
    timing: { green: 45, yellow: 5, red: 30 },
    traffic_flow: 85
  },
  {
    id: 'TL002',
    location: 'Broadway & 2nd St',
    status: 'red',
    coordinates: { x: 200, y: 150 },
    timing: { green: 40, yellow: 5, red: 35 },
    traffic_flow: 92
  },
  {
    id: 'TL003',
    location: 'Park Ave & 3rd St',
    status: 'yellow',
    coordinates: { x: 300, y: 200 },
    timing: { green: 50, yellow: 5, red: 25 },
    traffic_flow: 78
  },
  {
    id: 'TL004',
    location: 'Oak St & 4th Ave',
    status: 'green',
    coordinates: { x: 180, y: 280 },
    timing: { green: 35, yellow: 5, red: 40 },
    traffic_flow: 67
  }
];

export const mockMetrics: TrafficMetrics = {
  averageCommuteTime: 18.5,
  reductionPercentage: 12.3,
  totalVehicles: 2847,
  signalsActive: 24,
  incidents: 2
};

export const mockAlerts = [
  {
    id: 1,
    type: 'warning',
    message: 'Heavy traffic detected on Main St',
    timestamp: new Date(Date.now() - 300000),
    severity: 'medium'
  },
  {
    id: 2,
    type: 'success',
    message: 'Signal TL003 timing optimized',
    timestamp: new Date(Date.now() - 600000),
    severity: 'low'
  },
  {
    id: 3,
    type: 'error',
    message: 'Camera offline at Broadway & 2nd St',
    timestamp: new Date(Date.now() - 900000),
    severity: 'high'
  }
];