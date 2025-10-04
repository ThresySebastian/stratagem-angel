import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation, MapPin, AlertTriangle, Building2, LogOut, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Driver = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"idle" | "en-route" | "on-scene" | "returning">("en-route");
  const [destination] = useState("Central Hospital");

  const getStatusColor = () => {
    switch (status) {
      case "idle": return "bg-muted";
      case "en-route": return "bg-warning";
      case "on-scene": return "bg-emergency";
      case "returning": return "bg-success";
      default: return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Navigation className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">Driver Navigation</h1>
                <Badge className={`${getStatusColor()} mt-1 capitalize`}>
                  {status}
                </Badge>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Destination Card */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-primary" />
                <span>Destination: {destination}</span>
              </span>
              <span className="text-2xl font-bold text-primary">4 min</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>1.2 km away</span>
            </div>
          </CardContent>
        </Card>

        {/* Hazard Alerts */}
        <Card className="border-border bg-card border-warning">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-1" />
              <div className="space-y-1">
                <p className="font-semibold">Hazard Alert: Heavy Rain</p>
                <p className="text-sm text-muted-foreground">
                  Reduced visibility on Main Street. Drive carefully and reduce speed.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Map View */}
        <Card className="border-border bg-card">
          <CardContent className="p-0">
            <div className="h-[450px] bg-secondary rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-success/10" />
              <div className="text-center space-y-4 relative z-10">
                <MapPin className="w-16 h-16 mx-auto text-primary animate-pulse-slow" />
                <div>
                  <p className="text-xl font-semibold">Turn-by-Turn Navigation</p>
                  <p className="text-muted-foreground mt-2">
                    GPS navigation with hazard overlays
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            size="lg"
            variant={status === "on-scene" ? "default" : "outline"}
            onClick={() => setStatus("on-scene")}
            className="h-20"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            On Scene
          </Button>
          <Button
            size="lg"
            variant={status === "en-route" ? "default" : "outline"}
            onClick={() => setStatus("en-route")}
            className="h-20"
          >
            <Navigation className="w-5 h-5 mr-2" />
            En Route to Hospital
          </Button>
          <Button
            size="lg"
            variant={status === "returning" ? "default" : "outline"}
            onClick={() => setStatus("returning")}
            className="h-20 bg-gradient-success"
          >
            <Building2 className="w-5 h-5 mr-2" />
            Patient Delivered
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Driver;
