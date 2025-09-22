import { useNavigate } from 'react-router-dom';
import { Leaf, CloudRain, Bug, TestTube, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    id: 'soil-health',
    title: 'Soil & Crop Health',
    description: 'Monitor soil health and crop conditions using satellite hyperspectral data',
    icon: Leaf,
    gradient: 'from-primary to-primary-light',
    path: '/soil-health'
  },
  {
    id: 'weather-climate',
    title: 'Weather & Climate',
    description: 'Access real-time weather data, forecasts, and climate information using IMD APIs',
    icon: CloudRain,
    gradient: 'from-accent to-accent-light',
    path: '/weather'
  },
  {
    id: 'pest-disease',
    title: 'Pest & Disease Info',
    description: 'Get AgroMet advisories, crop-specific weather alerts, and early warning systems',
    icon: Bug,
    gradient: 'from-warning to-warning/80',
    path: '/pest-disease'
  },
  {
    id: 'soil-properties',
    title: 'Soil Properties',
    description: 'Access soil health card data including pH, EC, organic carbon, and nutrient levels',
    icon: TestTube,
    gradient: 'from-success to-success/80',
    path: '/soil-properties'
  },
  {
    id: 'market-info',
    title: 'Market Information',
    description: 'Find nearby markets, price trends, and agricultural trading opportunities',
    icon: MapPin,
    gradient: 'from-primary-dark to-primary',
    path: '/market'
  }
];

const FeatureCards = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Comprehensive Farming Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Access cutting-edge agricultural technology and data to make informed decisions 
            and optimize your farming operations for maximum yield and sustainability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            
            return (
              <Card 
                key={feature.id}
                className="group bg-gradient-card border-border/50 hover-lift cursor-pointer shadow-soft hover:shadow-medium transition-smooth"
                onClick={() => navigate(feature.path)}
              >
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-medium group-hover:shadow-glow transition-smooth`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-foreground group-hover:text-primary transition-smooth">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                  <div className="mt-6 flex items-center text-primary font-medium text-sm group-hover:translate-x-2 transition-smooth">
                    Learn More →
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;