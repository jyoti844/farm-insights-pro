import { useState } from 'react';
import { ArrowLeft, TestTube, FileText, Download, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SoilProperties = () => {
  const navigate = useNavigate();
  const [farmerID, setFarmerID] = useState('');
  
  const [soilHealthData] = useState({
    farmerId: 'MH/2023/FID/000123',
    location: 'Pune District, Maharashtra',
    testDate: '2024-01-15',
    ph: 6.8,
    ec: 0.45,
    organicCarbon: 0.62,
    nutrients: {
      nitrogen: 280,
      phosphorus: 18,
      potassium: 295,
      sulfur: 12,
      zinc: 1.2,
      iron: 4.8,
      manganese: 8.5,
      copper: 1.1,
      boron: 0.8
    },
    recommendations: [
      'Apply 20 kg/acre Zinc Sulfate to address zinc deficiency',
      'Increase organic matter through compost application',
      'Maintain current phosphorus levels through balanced fertilization',
      'Monitor soil pH - consider lime application if pH drops below 6.5'
    ]
  });

  const getNutrientStatus = (nutrient: string, value: number) => {
    const ranges = {
      nitrogen: { low: 250, medium: 300, high: 400 },
      phosphorus: { low: 15, medium: 25, high: 40 },
      potassium: { low: 250, medium: 350, high: 500 },
      sulfur: { low: 10, medium: 20, high: 30 },
      zinc: { low: 0.8, medium: 1.5, high: 3.0 },
      iron: { low: 3.0, medium: 6.0, high: 10.0 },
      manganese: { low: 5.0, medium: 10.0, high: 20.0 },
      copper: { low: 0.8, medium: 1.5, high: 3.0 },
      boron: { low: 0.5, medium: 1.0, high: 2.0 }
    };

    const range = ranges[nutrient as keyof typeof ranges];
    if (value < range.low) return { status: 'Low', color: 'destructive', percentage: (value / range.low) * 33 };
    if (value < range.medium) return { status: 'Medium', color: 'warning', percentage: 33 + ((value - range.low) / (range.medium - range.low)) * 34 };
    if (value < range.high) return { status: 'Good', color: 'success', percentage: 67 + ((value - range.medium) / (range.high - range.medium)) * 33 };
    return { status: 'High', color: 'success', percentage: 100 };
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-success to-success/80 text-success-foreground">
        <div className="container py-6">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="text-success-foreground hover:bg-white/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Soil Properties</h1>
              <p className="text-success-foreground/80">Soil Health Card Scheme - Ministry of Agriculture</p>
            </div>
          </div>

          {/* Farmer ID Search */}
          <div className="flex gap-2 max-w-md">
            <Input
              placeholder="Enter Farmer ID or Aadhaar number..."
              value={farmerID}
              onChange={(e) => setFarmerID(e.target.value)}
              className="bg-white/20 border-white/30 text-success-foreground placeholder:text-success-foreground/60"
            />
            <Button variant="secondary" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Soil Health Card Info */}
        <Card className="mb-8 bg-gradient-card shadow-large">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-success" />
                Soil Health Card Details
              </div>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Farmer ID</p>
                <p className="font-semibold">{soilHealthData.farmerId}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-semibold">{soilHealthData.location}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Test Date</p>
                <p className="font-semibold">{soilHealthData.testDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Soil Properties Tabs */}
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Properties</TabsTrigger>
            <TabsTrigger value="macro">Macro Nutrients</TabsTrigger>
            <TabsTrigger value="micro">Micro Nutrients</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="hover-lift">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Soil pH</CardTitle>
                  <CardDescription>Acidity/Alkalinity Level</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary mb-2">{soilHealthData.ph}</div>
                  <p className="text-sm text-muted-foreground mb-3">Optimal range: 6.0 - 7.5</p>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div 
                      className="bg-primary h-3 rounded-full"
                      style={{ width: `${((soilHealthData.ph - 5) / 3) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-success mt-2">✓ Good for crop growth</p>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Electrical Conductivity</CardTitle>
                  <CardDescription>Salinity Level (dS/m)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-accent mb-2">{soilHealthData.ec}</div>
                  <p className="text-sm text-muted-foreground mb-3">Optimal: &lt; 1.0 dS/m</p>
                  <Progress value={(1 - soilHealthData.ec) * 100} className="mb-2" />
                  <p className="text-xs text-success">✓ Low salinity - Excellent</p>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Organic Carbon</CardTitle>
                  <CardDescription>Soil Organic Matter (%)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary-dark mb-2">{soilHealthData.organicCarbon}%</div>
                  <p className="text-sm text-muted-foreground mb-3">Good level: &gt; 0.5%</p>
                  <Progress value={soilHealthData.organicCarbon * 100} className="mb-2" />
                  <p className="text-xs text-success">✓ Good organic matter content</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="macro">
            <Card>
              <CardHeader>
                <CardTitle>Macro Nutrients (NPK + S)</CardTitle>
                <CardDescription>Primary nutrients essential for plant growth</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {Object.entries(soilHealthData.nutrients)
                    .filter(([key]) => ['nitrogen', 'phosphorus', 'potassium', 'sulfur'].includes(key))
                    .map(([nutrient, value]) => {
                      const status = getNutrientStatus(nutrient, value);
                      return (
                        <div key={nutrient} className="p-4 bg-gradient-card rounded-lg hover-lift">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold capitalize">{nutrient} ({nutrient === 'nitrogen' ? 'N' : nutrient === 'phosphorus' ? 'P' : nutrient === 'potassium' ? 'K' : 'S'})</h4>
                            <TestTube className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div className="text-2xl font-bold mb-1">{value} kg/ha</div>
                          <Progress value={status.percentage} className="mb-2" />
                          <span className={`text-sm font-medium ${
                            status.color === 'destructive' ? 'text-destructive' :
                            status.color === 'warning' ? 'text-warning' : 'text-success'
                          }`}>
                            {status.status}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="micro">
            <Card>
              <CardHeader>
                <CardTitle>Micro Nutrients</CardTitle>
                <CardDescription>Essential trace elements for plant health</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {Object.entries(soilHealthData.nutrients)
                    .filter(([key]) => ['zinc', 'iron', 'manganese', 'copper', 'boron'].includes(key))
                    .map(([nutrient, value]) => {
                      const status = getNutrientStatus(nutrient, value);
                      return (
                        <div key={nutrient} className="p-4 bg-gradient-card rounded-lg hover-lift">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold capitalize">{nutrient} ({
                              nutrient === 'zinc' ? 'Zn' : 
                              nutrient === 'iron' ? 'Fe' : 
                              nutrient === 'manganese' ? 'Mn' :
                              nutrient === 'copper' ? 'Cu' : 'B'
                            })</h4>
                            <TestTube className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div className="text-xl font-bold mb-1">{value} ppm</div>
                          <Progress value={status.percentage} className="mb-2" />
                          <span className={`text-sm font-medium ${
                            status.color === 'destructive' ? 'text-destructive' :
                            status.color === 'warning' ? 'text-warning' : 'text-success'
                          }`}>
                            {status.status}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations">
            <Card>
              <CardHeader>
                <CardTitle>Fertilizer Recommendations</CardTitle>
                <CardDescription>Based on soil test results and crop requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {soilHealthData.recommendations.map((recommendation, index) => (
                    <div key={index} className="p-4 bg-muted/50 rounded-lg border-l-4 border-primary">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mt-0.5">
                          {index + 1}
                        </div>
                        <p className="text-foreground">{recommendation}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-primary/10 rounded-lg border border-primary/30">
                  <h4 className="font-semibold text-primary mb-3">Government Scheme Benefits</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Subsidy available on recommended fertilizers through DBT
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Free soil testing at government centers
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Technical support from agricultural extension officers
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Quality assured fertilizers through authorized dealers
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SoilProperties;