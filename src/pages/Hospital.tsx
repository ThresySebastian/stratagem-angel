import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, Truck, AlertTriangle, Activity, Clock, User, LogOut, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthGuard } from "@/components/AuthGuard";
import { useAuth } from "@/hooks/useAuth";
import { useEmergencies } from "@/hooks/useEmergencies";
import { useHazards } from "@/hooks/useHazards";

const Hospital = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { emergencies, loading: emergenciesLoading } = useEmergencies();
  const { hazards, loading: hazardsLoading } = useHazards();

  const incomingAmbulances = emergencies
    .filter(e => e.status === 'en_route' || e.status === 'assigned')
    .map(emergency => ({
      id: emergency.id,
      status: emergency.status,
      eta: emergency.eta_minutes ? `${emergency.eta_minutes} min` : 'Calculating...',
      patientCondition: emergency.severity,
      location: emergency.location_address,
    }));

  const todayStats = {
    totalArrivals: emergencies.filter(e => e.status === 'completed').length,
    criticalCases: emergencies.filter(e => e.severity === 'critical').length,
    avgEta: emergencies
      .filter(e => e.eta_minutes)
      .reduce((acc, e) => acc + (e.eta_minutes || 0), 0) / 
      (emergencies.filter(e => e.eta_minutes).length || 1),
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-emergency";
      case "high": return "bg-emergency";
      case "medium": return "bg-warning";
      case "stable": return "bg-success";
      case "low": return "bg-primary";
      default: return "bg-muted";
    }
  };

  const getRiskColor = (severity: string) => {
    return severity === "high" ? "border-emergency" : severity === "medium" ? "border-warning" : "border-primary";
  };

  if (emergenciesLoading || hazardsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        {/* Top Navigation */}
        <header className="border-b border-border bg-card shadow-card">
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
                <Button variant="ghost" size="sm" onClick={handleLogout}>
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
              <Card className="border-border bg-card shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Truck className="w-5 h-5 text-primary" />
                    <span>Incoming Ambulances</span>
                  </CardTitle>
                  <CardDescription>Real-time ambulance tracking</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {incomingAmbulances.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">No incoming ambulances</p>
                  ) : (
                    incomingAmbulances.map((ambulance) => (
                      <div
                        key={ambulance.id}
                        className="p-5 rounded-lg bg-secondary border border-border hover:border-primary transition-all duration-200"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-3">
                              <span className="font-bold text-lg">{ambulance.id.substring(0, 8)}</span>
                              <Badge className={`${getSeverityColor(ambulance.patientCondition)} capitalize`}>
                                {ambulance.patientCondition}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{ambulance.location}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-2 text-primary">
                              <Clock className="w-4 h-4" />
                              <span className="text-2xl font-bold">{ambulance.eta}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">ETA</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>

              {/* Map View */}
              <Card className="border-border bg-card shadow-card">
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
              <Card className="border-border bg-card shadow-card">
                <CardHeader>
                  <CardTitle>Today's Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Total Arrivals</span>
                      <span className="text-2xl font-bold">{todayStats.totalArrivals}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Critical Cases</span>
                      <span className="text-2xl font-bold text-emergency">{todayStats.criticalCases}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Average ETA</span>
                      <span className="text-2xl font-bold text-success">{Math.round(todayStats.avgEta)} min</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Risk Alerts */}
              <Card className="border-border bg-card shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-warning" />
                    <span>Risk Alerts</span>
                  </CardTitle>
                  <CardDescription>Weather and traffic warnings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {hazards.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">No active hazards</p>
                  ) : (
                    hazards.slice(0, 5).map((hazard) => (
                      <div
                        key={hazard.id}
                        className={`p-4 rounded-lg border-l-4 ${getRiskColor(hazard.severity)} bg-secondary`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-2">
                            <AlertTriangle className="w-4 h-4 text-warning mt-0.5" />
                            <p className="text-sm capitalize">
                              <span className="font-semibold">{hazard.hazard_type}:</span> {hazard.description || 'Active in area'}
                            </p>
                          </div>
                          <Badge className={`${getSeverityColor(hazard.severity)} text-xs capitalize`}>
                            {hazard.severity}
                          </Badge>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default Hospital;
