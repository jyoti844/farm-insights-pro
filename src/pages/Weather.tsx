import { useState } from 'react';
import { ArrowLeft, Search, Cloud, Thermometer, Droplets, Wind, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Weather = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [weatherData] = useState({
    location: 'Mumbai, Maharashtra',
    temperature: 28,
    humidity: 68,
    windSpeed: 12,
    rainfall: 2.5,
    forecast: [
      { day: 'Today', temp: 28, condition: 'Partly Cloudy', rain: 20 },
      { day: 'Tomorrow', temp: 30, condition: 'Sunny', rain: 5 },
      { day: 'Day 3', temp: 26, condition: 'Rainy', rain: 80 },
      { day: 'Day 4', temp: 25, condition: 'Cloudy', rain: 45 },
      { day: 'Day 5', temp: 29, condition: 'Sunny', rain: 10 }
    ]
  });

  const handleSearch = () => {
    // In a real app, this would fetch weather data for the location
    console.log('Searching weather for:', location);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-accent to-accent-light text-accent-foreground">
        <div className="container py-6">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="text-accent-foreground hover:bg-white/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Weather & Climate</h1>
              <p className="text-accent-foreground/80">Real-time weather data powered by IMD APIs</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex gap-2 max-w-md">
            <Input
              placeholder="Enter state, city, village, or town..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-white/20 border-white/30 text-accent-foreground placeholder:text-accent-foreground/60"
            />
            <Button onClick={handleSearch} variant="secondary" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Current Weather */}
        <Card className="mb-8 bg-gradient-card shadow-large">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Cloud className="h-6 w-6" />
              Current Weather - {weatherData.location}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <Thermometer className="h-8 w-8 text-warning mx-auto mb-2" />
                <div className="text-3xl font-bold text-warning">{weatherData.temperature}°C</div>
                <p className="text-sm text-muted-foreground">Temperature</p>
              </div>
              <div className="text-center">
                <Droplets className="h-8 w-8 text-accent mx-auto mb-2" />
                <div className="text-3xl font-bold text-accent">{weatherData.humidity}%</div>
                <p className="text-sm text-muted-foreground">Humidity</p>
              </div>
              <div className="text-center">
                <Wind className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-3xl font-bold text-primary">{weatherData.windSpeed} km/h</div>
                <p className="text-sm text-muted-foreground">Wind Speed</p>
              </div>
              <div className="text-center">
                <Cloud className="h-8 w-8 text-success mx-auto mb-2" />
                <div className="text-3xl font-bold text-success">{weatherData.rainfall} mm</div>
                <p className="text-sm text-muted-foreground">Rainfall (24h)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weather Tabs */}
        <Tabs defaultValue="daily" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="daily">Daily Forecast</TabsTrigger>
            <TabsTrigger value="hourly">Hourly Data</TabsTrigger>
            <TabsTrigger value="alerts">Weather Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="daily">
            <Card>
              <CardHeader>
                <CardTitle>5-Day Weather Forecast</CardTitle>
                <CardDescription>Extended weather outlook for farming decisions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weatherData.forecast.map((day, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover-lift">
                      <div className="flex items-center gap-4">
                        <Sun className="h-6 w-6 text-warning" />
                        <div>
                          <p className="font-semibold">{day.day}</p>
                          <p className="text-sm text-muted-foreground">{day.condition}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">{day.temp}°C</p>
                        <p className="text-sm text-accent">{day.rain}% rain</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hourly">
            <Card>
              <CardHeader>
                <CardTitle>Hourly Weather Data</CardTitle>
                <CardDescription>Detailed hourly breakdown for precise planning</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Cloud className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Hourly weather data would be displayed here</p>
                  <p className="text-sm text-muted-foreground mt-2">Including temperature, humidity, and precipitation by hour</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts">
            <Card>
              <CardHeader>
                <CardTitle>Weather Alerts & Advisories</CardTitle>
                <CardDescription>Important weather warnings and farming advisories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-warning/10 border border-warning/30 rounded-lg">
                    <h4 className="font-semibold text-warning mb-2">Heavy Rainfall Advisory</h4>
                    <p className="text-sm">Expected heavy rainfall in the next 48 hours. Consider postponing field activities and ensure proper drainage.</p>
                  </div>
                  <div className="p-4 bg-success/10 border border-success/30 rounded-lg">
                    <h4 className="font-semibold text-success mb-2">Favorable Conditions</h4>
                    <p className="text-sm">Optimal temperature and humidity levels for crop spraying activities this week.</p>
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

export default Weather;