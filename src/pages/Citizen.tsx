import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, MapPin, Users, LogOut, Navigation } from "lucide-react";
import { useNavigate } from "react-router-dom";

const alerts = [
  {
    type: "Road Closure",
    location: "MG Road",
    severity: "high",
    message: "Flooding reported. Avoid this route.",
    time: "5 min ago",
  },
  {
    type: "Traffic Congestion",
    location: "Main Street intersection",
    severity: "medium",
    message: "Heavy traffic due to accident. Expect delays.",
    time: "12 min ago",
  },
  {
    type: "Ambulance Alert",
    location: "Highway 45",
    severity: "medium",
    message: "Ambulance approaching. Give way to emergency vehicle.",
    time: "20 min ago",
  },
];

const safeRoutes = [
  { from: "Downtown", to: "Airport", route: "via Highway 12", duration: "25 min" },
  { from: "Central Plaza", to: "Hospital", route: "via Park Avenue", duration: "15 min" },
];

const Citizen = () => {
  const navigate = useNavigate();

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
              <Users className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">Citizen Portal</h1>
                <p className="text-sm text-muted-foreground">Stay informed and safe</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map View */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Area Map & Hazards</CardTitle>
                <CardDescription>View traffic and weather conditions</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[400px] bg-secondary rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-warning/10" />
                  <div className="text-center space-y-4 relative z-10">
                    <MapPin className="w-16 h-16 mx-auto text-primary animate-pulse-slow" />
                    <div>
                      <p className="text-xl font-semibold">Interactive Area Map</p>
                      <p className="text-muted-foreground mt-2">
                        Real-time hazard and traffic information
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alert Feed */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  <span>Active Alerts</span>
                </CardTitle>
                <CardDescription>Latest safety and traffic notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {alerts.map((alert, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-secondary border border-border hover:border-primary transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-warning" />
                        <span className="font-semibold">{alert.type}</span>
                      </div>
                      <Badge className={`${getSeverityColor(alert.severity)} text-xs`}>
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      <MapPin className="w-3 h-3 inline mr-1" />
                      {alert.location}
                    </p>
                    <p className="text-sm mb-2">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Report Incident */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Report Incident</CardTitle>
                <CardDescription>Help others by reporting hazards</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-gradient-emergency shadow-glow-emergency">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Report Hazard
                </Button>
              </CardContent>
            </Card>

            {/* Safe Routes */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Navigation className="w-5 h-5 text-success" />
                  <span>Suggested Safe Routes</span>
                </CardTitle>
                <CardDescription>Recommended alternative routes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {safeRoutes.map((route, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-secondary border border-border"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{route.from} → {route.to}</span>
                      <Badge className="bg-success text-xs">{route.duration}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <Navigation className="w-3 h-3 mr-1" />
                      {route.route}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Safety Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• Always give way to emergency vehicles</p>
                <p>• Check alerts before traveling</p>
                <p>• Report hazards to help others</p>
                <p>• Follow traffic advisories</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Citizen;
