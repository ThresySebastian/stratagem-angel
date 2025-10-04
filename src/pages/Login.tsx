import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Truck, Users, Building2 } from "lucide-react";

const roles = [
  {
    id: "dispatcher",
    title: "Dispatcher",
    description: "Manage emergency responses and coordinate ambulances",
    icon: Activity,
    path: "/dispatcher",
    gradient: "bg-gradient-primary",
  },
  {
    id: "driver",
    title: "Driver",
    description: "Navigate routes and respond to emergencies",
    icon: Truck,
    path: "/driver",
    gradient: "bg-gradient-emergency",
  },
  {
    id: "citizen",
    title: "Citizen",
    description: "View alerts and report incidents",
    icon: Users,
    path: "/citizen",
    gradient: "bg-gradient-success",
  },
  {
    id: "hospital",
    title: "Hospital",
    description: "Monitor incoming ambulances and prepare for patients",
    icon: Building2,
    path: "/hospital",
    gradient: "bg-gradient-primary",
  },
];

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-6xl space-y-8 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Activity className="w-12 h-12 text-primary animate-pulse-slow" />
            <h1 className="text-5xl font-bold tracking-tight">Guardian Angel</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Saving Lives, One Route at a Time
          </p>
        </div>

        {/* Role Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <Card
                key={role.id}
                className="group cursor-pointer transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 border-border bg-card"
                onClick={() => navigate(role.path)}
              >
                <CardHeader className="space-y-4">
                  <div className={`w-16 h-16 rounded-lg ${role.gradient} flex items-center justify-center shadow-glow-primary group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{role.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {role.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center space-y-4 pt-8">
          <p className="text-sm text-muted-foreground">
            Smart Emergency Response System
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
