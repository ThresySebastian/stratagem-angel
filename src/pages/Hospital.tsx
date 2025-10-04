import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Truck, Clock, AlertTriangle, Activity, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const incomingAmbulances = [
  {
    id: "AMB-002",
    status: "en-route",
    eta: "8 min",
    patient: "Emergency Case",
    severity: "critical",
    driver: "Sarah Johnson",
  },
  {
    id: "AMB-005",
    status: "en-route",
    eta: "15 min",
    patient: "Cardiac Arrest",
    severity: "critical",
    driver: "Mike Chen",
  },
  {
    id: "AMB-007",
    status: "en-route",
    eta: "22 min",
    patient: "Minor Injury",
    severity: "stable",
    driver: "Lisa Anderson",
  },
];

const risks = [
  { message: "AMB-002 experiencing heavy traffic on Route 5", severity: "medium" },
  { message: "Heavy rain affecting visibility in area", severity: "high" },
];

const Hospital = () => {
  const navigate = useNavigate();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-emergency";
      case "stable": return "bg-success";
      case "minor": return "bg-primary";
      default: return "bg-muted";
    }
  };

  const getRiskColor = (severity: string) => {
    switch (severity) {
      case "high": return "border-emergency";
      case "medium": return "border-warning";
      default: return "border-primary";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Building2 className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">Hospital Dashboard</h1>
                <p className="text-sm text-muted-foreground">Central Hospital</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4 mr-2" />
                Medical Admin
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
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Incoming Ambulances */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Truck className="w-5 h-5 text-primary" />
                  <span>Incoming Ambulances</span>
                </CardTitle>
                <CardDescription>Real-time ambulance tracking</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {incomingAmbulances.map((ambulance) => (
                  <div
                    key={ambulance.id}
                    className="p-5 rounded-lg bg-secondary border border-border hover:border-primary transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-3">
                          <span className="font-bold text-lg">{ambulance.id}</span>
                          <Badge className={getSeverityColor(ambulance.severity)}>
                            {ambulance.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{ambulance.patient}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 text-primary">
                          <Clock className="w-4 h-4" />
                          <span className="text-2xl font-bold">{ambulance.eta}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">ETA</p>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <User className="w-4 h-4 mr-2" />
                      Driver: {ambulance.driver}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Map View */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Live Tracking</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[350px] bg-secondary rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-success/10" />
                  <div className="text-center space-y-4 relative z-10">
                    <Activity className="w-16 h-16 mx-auto text-primary animate-pulse-slow" />
                    <div>
                      <p className="text-xl font-semibold">Ambulance Routes</p>
                      <p className="text-muted-foreground mt-2">
                        Real-time tracking of incoming vehicles
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Statistics */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Today's Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Arrivals</span>
                    <span className="text-2xl font-bold">24</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Critical Cases</span>
                    <span className="text-2xl font-bold text-emergency">8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Average ETA</span>
                    <span className="text-2xl font-bold text-success">12 min</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Risk Alerts */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  <span>Risk Alerts</span>
                </CardTitle>
                <CardDescription>Weather and traffic warnings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {risks.map((risk, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg bg-secondary border-2 ${getRiskColor(risk.severity)}`}
                  >
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-warning" />
                      <p className="text-sm">{risk.message}</p>
                    </div>
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

export default Hospital;
