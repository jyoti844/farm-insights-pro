import { useState } from 'react';
import { ArrowLeft, Bug, AlertTriangle, Shield, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const PestDisease = () => {
  const navigate = useNavigate();
  
  const [alerts] = useState([
    {
      type: 'urgent',
      title: 'Brown Planthopper Alert',
      crop: 'Rice',
      region: 'Maharashtra',
      description: 'High risk of brown planthopper infestation in rice fields. Immediate preventive measures recommended.',
      action: 'Apply approved insecticides and monitor fields daily'
    },
    {
      type: 'moderate',
      title: 'Late Blight Warning',
      crop: 'Potato',
      region: 'Punjab',
      description: 'Weather conditions favorable for late blight development in potato crops.',
      action: 'Increase field monitoring and prepare fungicide applications'
    }
  ]);

  const [advisories] = useState([
    {
      crop: 'Wheat',
      weather: 'High humidity, moderate temperature',
      advisory: 'Monitor for rust diseases. Apply preventive fungicide if humidity remains above 80% for 3+ days.',
      priority: 'medium'
    },
    {
      crop: 'Cotton',
      weather: 'Hot and dry conditions',
      advisory: 'Favorable for bollworm activity. Check for egg laying and apply bio-pesticides as prevention.',
      priority: 'high'
    },
    {
      crop: 'Tomato',
      weather: 'Warm days, cool nights',
      advisory: 'Perfect conditions for healthy growth. Maintain regular watering schedule.',
      priority: 'low'
    }
  ]);

  const [commonPests] = useState([
    {
      name: 'Aphids',
      crops: ['Cotton', 'Wheat', 'Mustard'],
      symptoms: 'Yellowing leaves, sticky honeydew, stunted growth',
      treatment: 'Neem oil spray, ladybug introduction, systemic insecticides',
      severity: 'Medium'
    },
    {
      name: 'Bollworm',
      crops: ['Cotton', 'Tomato', 'Chickpea'],
      symptoms: 'Holes in bolls/fruits, frass near feeding sites',
      treatment: 'Pheromone traps, Bt spray, crop rotation',
      severity: 'High'
    },
    {
      name: 'Blast Disease',
      crops: ['Rice'],
      symptoms: 'Diamond-shaped lesions on leaves, neck rot',
      treatment: 'Resistant varieties, proper spacing, fungicide application',
      severity: 'High'
    }
  ]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-warning to-warning/80 text-warning-foreground">
        <div className="container py-6">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="text-warning-foreground hover:bg-white/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Pest & Disease Information</h1>
              <p className="text-warning-foreground/80">AgroMet advisories and early warning alerts</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Active Alerts */}
        <div className="mb-8 space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            Active Alerts
          </h2>
          
          {alerts.map((alert, index) => (
            <Alert key={index} className={`${
              alert.type === 'urgent' ? 'border-destructive bg-destructive/5' : 'border-warning bg-warning/5'
            }`}>
              <AlertTriangle className={`h-4 w-4 ${
                alert.type === 'urgent' ? 'text-destructive' : 'text-warning'
              }`} />
              <AlertTitle className="flex items-center gap-2">
                {alert.title}
                <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                  {alert.crop} • {alert.region}
                </span>
              </AlertTitle>
              <AlertDescription className="mt-2">
                <p className="mb-2">{alert.description}</p>
                <p className="font-semibold text-primary">Recommended Action: {alert.action}</p>
              </AlertDescription>
            </Alert>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="advisories" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="advisories">Weather Advisories</TabsTrigger>
            <TabsTrigger value="pests">Common Pests</TabsTrigger>
            <TabsTrigger value="identify">Pest Identification</TabsTrigger>
            <TabsTrigger value="prevention">Prevention Guide</TabsTrigger>
          </TabsList>

          <TabsContent value="advisories">
            <Card>
              <CardHeader>
                <CardTitle>Crop-Specific Weather-Based Advisories</CardTitle>
                <CardDescription>Customized recommendations based on current weather conditions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {advisories.map((item, index) => (
                    <div key={index} className="p-4 bg-gradient-card rounded-lg border border-border/50 hover-lift">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-semibold text-foreground">{item.crop}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.priority === 'high' ? 'bg-destructive/20 text-destructive' :
                          item.priority === 'medium' ? 'bg-warning/20 text-warning' :
                          'bg-success/20 text-success'
                        }`}>
                          {item.priority.toUpperCase()} PRIORITY
                        </span>
                      </div>
                      <div className="mb-2">
                        <span className="text-sm text-muted-foreground">Weather Conditions: </span>
                        <span className="text-sm font-medium">{item.weather}</span>
                      </div>
                      <p className="text-foreground">{item.advisory}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pests">
            <Card>
              <CardHeader>
                <CardTitle>Common Pests & Diseases Database</CardTitle>
                <CardDescription>Comprehensive information about agricultural pests and their management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {commonPests.map((pest, index) => (
                    <div key={index} className="p-6 bg-gradient-card rounded-lg border border-border/50 hover-lift">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-foreground mb-2">{pest.name}</h3>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {pest.crops.map((crop, cropIndex) => (
                              <span key={cropIndex} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                                {crop}
                              </span>
                            ))}
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          pest.severity === 'High' ? 'bg-destructive/20 text-destructive' :
                          pest.severity === 'Medium' ? 'bg-warning/20 text-warning' :
                          'bg-success/20 text-success'
                        }`}>
                          {pest.severity} Risk
                        </span>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-muted-foreground mb-1">Symptoms:</h4>
                          <p className="text-sm">{pest.symptoms}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-muted-foreground mb-1">Treatment:</h4>
                          <p className="text-sm">{pest.treatment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="identify">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Pest & Disease Identification
                </CardTitle>
                <CardDescription>Upload photos for AI-powered pest and disease identification</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Bug className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">AI-Powered Identification</h3>
                  <p className="text-muted-foreground mb-6">
                    Take a photo of affected plants to get instant pest and disease identification
                  </p>
                  <Button size="lg" className="bg-gradient-primary">
                    <Camera className="h-5 w-5 mr-2" />
                    Upload Photo for Analysis
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prevention">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Prevention & Management Guide
                </CardTitle>
                <CardDescription>Best practices for pest and disease prevention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 bg-success/10 rounded-lg border border-success/30">
                    <h4 className="font-semibold text-success mb-2">Integrated Pest Management (IPM)</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Use resistant crop varieties when available</li>
                      <li>• Practice crop rotation to break pest cycles</li>
                      <li>• Encourage beneficial insects and natural predators</li>
                      <li>• Monitor fields regularly for early detection</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/30">
                    <h4 className="font-semibold text-primary mb-2">Cultural Practices</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Maintain proper plant spacing for air circulation</li>
                      <li>• Remove infected plant debris promptly</li>
                      <li>• Use clean, certified seeds and planting material</li>
                      <li>• Implement proper irrigation management</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-accent/10 rounded-lg border border-accent/30">
                    <h4 className="font-semibold text-accent-foreground mb-2">Biological Control</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Release beneficial insects like ladybugs and parasitoids</li>
                      <li>• Use microbial pesticides (Bt, fungi, bacteria)</li>
                      <li>• Plant trap crops to attract pests away from main crops</li>
                      <li>• Create habitat for natural enemies</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PestDisease;