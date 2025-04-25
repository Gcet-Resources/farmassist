
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navigation from "../components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Upload,
  MessageSquare, 
  Gamepad2,
  DollarSign,
  Leaf,
  HeartPulse,
  Trophy,
  ArrowRight
} from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [progress, setProgress] = useState(65);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          {/* Welcome Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, {currentUser?.name || 'Farmer'}!
                </h1>
                <p className="text-gray-600 mt-1">
                  Here's a summary of your farm's performance
                </p>
              </div>
              <Button 
                onClick={() => toast.info("Refreshing dashboard data...")}
                variant="outline"
                size="sm"
              >
                Refresh Data
              </Button>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card 
              className="hover:shadow-md transition cursor-pointer"
              onClick={() => toast.info("Navigating to image upload...")}
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-farm-100 p-3 rounded-full mb-3">
                  <Upload className="h-6 w-6 text-farm-600" />
                </div>
                <h3 className="font-medium">Upload Image</h3>
                <p className="text-sm text-gray-500 mt-1">Diagnose crop issues</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition cursor-pointer">
              <Link to="/game">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-farm-100 p-3 rounded-full mb-3">
                    <Gamepad2 className="h-6 w-6 text-farm-600" />
                  </div>
                  <h3 className="font-medium">Farm Game</h3>
                  <p className="text-sm text-gray-500 mt-1">Daily challenges</p>
                </CardContent>
              </Link>
            </Card>

            <Card className="hover:shadow-md transition cursor-pointer">
              <Link to="/finance">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-farm-100 p-3 rounded-full mb-3">
                    <DollarSign className="h-6 w-6 text-farm-600" />
                  </div>
                  <h3 className="font-medium">Finance</h3>
                  <p className="text-sm text-gray-500 mt-1">Track expenses</p>
                </CardContent>
              </Link>
            </Card>

            <Card className="hover:shadow-md transition cursor-pointer">
              <Link to="/community">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-farm-100 p-3 rounded-full mb-3">
                    <MessageSquare className="h-6 w-6 text-farm-600" />
                  </div>
                  <h3 className="font-medium">Community</h3>
                  <p className="text-sm text-gray-500 mt-1">Connect with farmers</p>
                </CardContent>
              </Link>
            </Card>
          </div>

          {/* Progress and Status */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Crop Health</CardTitle>
                <CardDescription>Overall health status of your crops</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <HeartPulse className="h-5 w-5 text-farm-600" />
                      <span>Tomato Field</span>
                    </div>
                    <span className="text-sm font-medium">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <HeartPulse className="h-5 w-5 text-farm-600" />
                      <span>Corn Field</span>
                    </div>
                    <span className="text-sm font-medium">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <HeartPulse className="h-5 w-5 text-farm-600" />
                      <span>Wheat Field</span>
                    </div>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
                <CardDescription>Your farming milestones and rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Trophy className="h-6 w-6 text-yellow-500" />
                      <div>
                        <p className="font-medium">Disease Master</p>
                        <p className="text-sm text-gray-500">Successfully identified 10 plant diseases</p>
                      </div>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs py-1 px-2 rounded-full font-medium">
                      +150 points
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Trophy className="h-6 w-6 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-600">Budget Expert</p>
                        <p className="text-sm text-gray-500">Track finances for 30 days straight</p>
                      </div>
                    </div>
                    <span className="bg-gray-100 text-gray-800 text-xs py-1 px-2 rounded-full font-medium">
                      In progress
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Trophy className="h-6 w-6 text-yellow-500" />
                      <div>
                        <p className="font-medium">Community Helper</p>
                        <p className="text-sm text-gray-500">Helped 5 farmers with advice</p>
                      </div>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs py-1 px-2 rounded-full font-medium">
                      +75 points
                    </span>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-1 mt-3">
                    View all achievements
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
