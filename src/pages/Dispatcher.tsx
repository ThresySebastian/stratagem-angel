import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Activity, MapPin, Truck, AlertTriangle, Navigation, Clock, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ambulances = [
  { id: "AMB-001", status: "idle", distance: "2.3 km", eta: "5 min", driver: "John Smith" },
  { id: "AMB-002", status: "en-route", distance: "4.1 km", eta: "12 min", driver: "Sarah Johnson" },
  { id: "AMB-003", status: "on-scene", distance: "1.8 km", eta: "4 min", driver: "Mike Davis" },
];

const hazards = [
  { type: "Heavy Rain", location: "MG Road", severity: "high" },
  { type: "Traffic Jam", location: "Main Street", severity: "medium" },
  { type: "Fog", location: "Highway 45", severity: "low" },
];

const Dispatcher = () => {
  const navigate = useNavigate();
  const [emergencyLocation, setEmergencyLocation] = useState("");
  const [emergencyType, setEmergencyType] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "idle": return "bg-success";
      case "en-route": return "bg-warning";
      case "on-scene": return "bg-emergency";
      default: return "bg-muted";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-emergency";
      case "medium": return "bg-warning";
      case "low": return "bg-primary";
      default: return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Activity className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">Dispatcher Dashboard</h1>
                <p className="text-sm text-muted-foreground">Control Center</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4 mr-2" />
                Admin
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Map Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Emergency Input Panel */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-emergency" />
                  <span>New Emergency</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Emergency Location</label>
                    <Input
                      placeholder="Enter location or click on map"
                      value={emergencyLocation}
                      onChange={(e) => setEmergencyLocation(e.target.value)}
                      className="bg-input border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Emergency Type</label>
                    <Select value={emergencyType} onValueChange={setEmergencyType}>
                      <SelectTrigger className="bg-input border-border">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="accident">Traffic Accident</SelectItem>
                        <SelectItem value="cardiac">Cardiac Arrest</SelectItem>
                        <SelectItem value="fire">Fire Emergency</SelectItem>
                        <SelectItem value="medical">Medical Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="w-full bg-gradient-emergency shadow-glow-emergency">
                  <Navigation className="w-4 h-4 mr-2" />
                  Dispatch Nearest Ambulance
                </Button>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card className="border-border bg-card">
              <CardContent className="p-0">
                <div className="h-[500px] bg-secondary rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-emergency/10" />
                  <div className="text-center space-y-4 relative z-10">
                    <MapPin className="w-16 h-16 mx-auto text-primary animate-pulse-slow" />
                    <div>
                      <p className="text-xl font-semibold">Interactive Map View</p>
                      <p className="text-muted-foreground mt-2">
                        Map integration requires Mapbox API key
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Shows live ambulance positions, hazard overlays, and optimal routes
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Available Ambulances */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Truck className="w-5 h-5 text-primary" />
                  <span>Available Ambulances</span>
                </CardTitle>
                <CardDescription>Real-time vehicle status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {ambulances.map((ambulance) => (
                  <div
                    key={ambulance.id}
                    className="p-4 rounded-lg bg-secondary border border-border hover:border-primary transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">{ambulance.id}</span>
                      <Badge className={`${getStatusColor(ambulance.status)} capitalize`}>
                        {ambulance.status}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p className="flex items-center">
                        <User className="w-3 h-3 mr-2" />
                        {ambulance.driver}
                      </p>
                      <p className="flex items-center">
                        <MapPin className="w-3 h-3 mr-2" />
                        {ambulance.distance} away
                      </p>
                      <p className="flex items-center">
                        <Clock className="w-3 h-3 mr-2" />
                        ETA: {ambulance.eta}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Active Hazards */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  <span>Active Hazards</span>
                </CardTitle>
                <CardDescription>Weather and traffic alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {hazards.map((hazard, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-secondary border border-border"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{hazard.type}</span>
                      <Badge className={`${getSeverityColor(hazard.severity)} text-xs`}>
                        {hazard.severity}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {hazard.location}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dispatcher;
