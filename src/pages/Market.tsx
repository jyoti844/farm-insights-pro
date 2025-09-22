import { useState } from 'react';
import { ArrowLeft, MapPin, TrendingUp, DollarSign, Navigation, Map } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Market = () => {
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState<string>('');
  const [nearbyMarkets] = useState([
    {
      name: 'APMC Vashi Market',
      distance: '5.2 km',
      crops: ['Rice', 'Wheat', 'Vegetables'],
      avgPrices: { rice: 2850, wheat: 2200, onion: 3500 },
      rating: 4.5
    },
    {
      name: 'Turbhe Agricultural Market', 
      distance: '8.7 km',
      crops: ['Fruits', 'Vegetables', 'Pulses'],
      avgPrices: { mango: 8500, tomato: 4200, lentils: 7500 },
      rating: 4.2
    },
    {
      name: 'Kalamboli Farmers Market',
      distance: '12.3 km', 
      crops: ['Grains', 'Spices', 'Oil Seeds'],
      avgPrices: { turmeric: 12000, groundnut: 6800, mustard: 5500 },
      rating: 4.7
    }
  ]);

  const [priceData] = useState([
    { crop: 'Rice', currentPrice: 2850, change: +5.2, trend: 'up' },
    { crop: 'Wheat', currentPrice: 2200, change: -2.1, trend: 'down' },
    { crop: 'Onion', currentPrice: 3500, change: +12.8, trend: 'up' },
    { crop: 'Tomato', currentPrice: 4200, change: -8.5, trend: 'down' },
    { crop: 'Turmeric', currentPrice: 12000, change: +15.3, trend: 'up' }
  ]);

  const handleLocationRequest = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation(`${position.coords.latitude}, ${position.coords.longitude}`);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-dark to-primary text-primary-foreground">
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
              <h1 className="text-3xl font-bold">Market Information</h1>
              <p className="text-primary-foreground/80">Find nearby markets and track agricultural prices</p>
            </div>
          </div>

          {/* Location Request */}
          <div className="flex items-center gap-4 p-4 bg-white/10 rounded-lg">
            <MapPin className="h-5 w-5" />
            <div className="flex-1">
              <p className="font-semibold">Share your location for nearby markets</p>
              <p className="text-sm text-primary-foreground/80">Get accurate distance and directions to agricultural markets</p>
            </div>
            <Button onClick={handleLocationRequest} variant="secondary">
              <Navigation className="h-4 w-4 mr-2" />
              Get Location
            </Button>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Price Trends */}
        <Card className="mb-8 shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Today's Market Prices
            </CardTitle>
            <CardDescription>Current market rates per quintal (100kg)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {priceData.map((item, index) => (
                <div key={index} className="p-4 bg-gradient-card rounded-lg hover-lift">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{item.crop}</h4>
                    <div className={`flex items-center gap-1 text-sm ${
                      item.trend === 'up' ? 'text-success' : 'text-destructive'
                    }`}>
                      <TrendingUp className={`h-3 w-3 ${item.trend === 'down' ? 'rotate-180' : ''}`} />
                      {item.change > 0 ? '+' : ''}{item.change}%
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-2xl font-bold">₹{item.currentPrice.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">per quintal</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Interactive Map Placeholder */}
        <Card className="mb-8 shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Map className="h-5 w-5" />
              Market Locations Map
            </CardTitle>
            <CardDescription>Interactive map showing nearby agricultural markets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
              <div className="text-center">
                <Map className="h-16 w-16 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground font-semibold">Interactive Map View</p>
                <p className="text-sm text-muted-foreground">Google Maps integration would be displayed here</p>
                <p className="text-xs text-muted-foreground mt-2">Showing market locations, routes, and directions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Nearby Markets */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Nearby Agricultural Markets</CardTitle>
            <CardDescription>Markets in your area with current information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {nearbyMarkets.map((market, index) => (
                <div key={index} className="p-6 bg-gradient-card rounded-lg hover-lift border border-border/50">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{market.name}</h3>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{market.distance} away</span>
                        <span className="text-accent">★ {market.rating}</span>
                      </div>
                    </div>
                    <Button size="sm" className="bg-primary hover:bg-primary-dark">
                      Get Directions
                    </Button>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Available Crops:</p>
                    <div className="flex flex-wrap gap-2">
                      {market.crops.map((crop, cropIndex) => (
                        <span key={cropIndex} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                          {crop}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Sample Prices:</p>
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(market.avgPrices).map(([crop, price], priceIndex) => (
                        <div key={priceIndex} className="text-center">
                          <p className="text-xs text-muted-foreground capitalize">{crop}</p>
                          <p className="font-semibold">₹{price}/quintal</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Market;