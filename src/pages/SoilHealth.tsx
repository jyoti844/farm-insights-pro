import { useState, useEffect } from 'react';
import { ArrowLeft, Leaf, TrendingUp, Activity, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const SoilHealth = () => {
  const navigate = useNavigate();
  const [soilData, setSoilData] = useState({
    healthScore: 85,
    moisture: 72,
    ph: 6.8,
    nitrogen: 65,
    phosphorus: 58,
    potassium: 78
  });

  const [cropRecommendations] = useState([
    { name: 'Wheat', suitability: 92, reason: 'Optimal soil conditions for wheat cultivation' },
    { name: 'Rice', suitability: 78, reason: 'Good moisture levels support rice growth' },
    { name: 'Corn', suitability: 85, reason: 'Balanced nutrient levels ideal for corn' }
  ]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground">
        <div className="container py-6">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="text-primary-foreground hover:bg-white/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Soil & Crop Health</h1>
              <p className="text-primary-foreground/80">Monitor your soil conditions with satellite hyperspectral data</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Overall Health Score */}
        <Card className="mb-8 bg-gradient-card shadow-medium">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              <Leaf className="h-6 w-6 text-success" />
              Overall Soil Health
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-6xl font-bold text-success mb-2">{soilData.healthScore}%</div>
            <p className="text-muted-foreground">Excellent soil conditions detected</p>
            <Progress value={soilData.healthScore} className="mt-4 h-3" />
          </CardContent>
        </Card>

        {/* Soil Parameters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Soil Moisture</CardTitle>
              <Activity className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{soilData.moisture}%</div>
              <p className="text-xs text-muted-foreground">Optimal range: 60-80%</p>
              <Progress value={soilData.moisture} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">pH Level</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{soilData.ph}</div>
              <p className="text-xs text-muted-foreground">Ideal range: 6.0-7.5</p>
              <div className="mt-2 bg-muted h-2 rounded-full">
                <div 
                  className="bg-primary h-full rounded-full" 
                  style={{ width: `${((soilData.ph - 5) / 3) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nitrogen (N)</CardTitle>
              <AlertCircle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{soilData.nitrogen}%</div>
              <p className="text-xs text-muted-foreground">Needs attention</p>
              <Progress value={soilData.nitrogen} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Phosphorus (P)</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{soilData.phosphorus}%</div>
              <p className="text-xs text-muted-foreground">Good levels</p>
              <Progress value={soilData.phosphorus} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Potassium (K)</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{soilData.potassium}%</div>
              <p className="text-xs text-muted-foreground">Excellent levels</p>
              <Progress value={soilData.potassium} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Crop Recommendations */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="text-xl">Recommended Crops</CardTitle>
            <CardDescription>
              Based on current soil conditions and satellite analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cropRecommendations.map((crop, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{crop.name}</h4>
                    <p className="text-sm text-muted-foreground">{crop.reason}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-success">{crop.suitability}%</div>
                    <p className="text-xs text-muted-foreground">Suitability</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Satellite Data Video Placeholder */}
        <Card className="mt-8 shadow-medium">
          <CardHeader>
            <CardTitle>Satellite Imagery Analysis</CardTitle>
            <CardDescription>
              Real-time hyperspectral data from satellite monitoring
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Leaf className="h-16 w-16 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Interactive satellite data visualization would be displayed here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SoilHealth;