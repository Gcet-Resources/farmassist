
import { useState } from "react";
import Navigation from "../components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  User, 
  Activity,
  Star,
  Gift
} from "lucide-react";
import { toast } from "sonner";

interface Task {
  id: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
  category: 'daily' | 'crop' | 'community';
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  maxProgress: number;
  completed: boolean;
  reward: number;
}

const Game = () => {
  const [userPoints, setUserPoints] = useState(450);
  const [userLevel, setUserLevel] = useState(3);
  const [levelProgress, setLevelProgress] = useState(70);
  
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Log crop health data",
      description: "Record the health status of your crops today",
      points: 10,
      completed: false,
      category: 'daily'
    },
    {
      id: "2",
      title: "Upload crop image",
      description: "Upload an image of your crop for AI analysis",
      points: 15,
      completed: false,
      category: 'daily'
    },
    {
      id: "3",
      title: "Update financial records",
      description: "Log your farm income and expenses for the day",
      points: 10,
      completed: false,
      category: 'daily'
    },
    {
      id: "4",
      title: "Identify 5 plant diseases",
      description: "Successfully identify 5 different plant diseases",
      points: 50,
      completed: true,
      category: 'crop'
    },
    {
      id: "5",
      title: "Monitor crop health for 7 days",
      description: "Consecutively log crop health data for a week",
      points: 30,
      completed: false,
      category: 'crop'
    },
    {
      id: "6",
      title: "Answer a community question",
      description: "Help another farmer by answering their question",
      points: 15,
      completed: false,
      category: 'community'
    },
  ]);

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: "1",
      title: "Disease Detective",
      description: "Identify 10 crop diseases using the AI detection tool",
      progress: 6,
      maxProgress: 10,
      completed: false,
      reward: 100
    },
    {
      id: "2",
      title: "Financial Wizard",
      description: "Track your farm finances for 30 consecutive days",
      progress: 22,
      maxProgress: 30,
      completed: false,
      reward: 150
    },
    {
      id: "3",
      title: "Community Pillar",
      description: "Help 5 farmers by answering their questions",
      progress: 5,
      maxProgress: 5,
      completed: true,
      reward: 75
    }
  ]);
  
  const [leaderboard, setLeaderboard] = useState([
    { id: "1", name: "Maria Garcia", points: 1240, avatar: "🧑‍🌾" },
    { id: "2", name: "John Smith", points: 980, avatar: "👩‍🌾" },
    { id: "3", name: "User", points: 450, avatar: "🧑‍🌾", isCurrentUser: true },
    { id: "4", name: "Aisha Khan", points: 430, avatar: "👩‍🌾" },
    { id: "5", name: "Carlos Rodriguez", points: 410, avatar: "🧑‍🌾" },
    { id: "6", name: "Sarah Johnson", points: 390, avatar: "👩‍🌾" },
    { id: "7", name: "Li Wei", points: 350, avatar: "🧑‍🌾" },
    { id: "8", name: "Raj Patel", points: 320, avatar: "👩‍🌾" },
  ]);

  const completeTask = (taskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId && !task.completed) {
        // Add points to user
        setUserPoints(prevPoints => prevPoints + task.points);
        
        // Update level progress
        const newProgress = levelProgress + (task.points / 2);
        if (newProgress >= 100) {
          setUserLevel(prevLevel => prevLevel + 1);
          setLevelProgress(newProgress - 100);
          toast.success(`Level up! You're now level ${userLevel + 1}`);
        } else {
          setLevelProgress(newProgress);
        }
        
        toast.success(`Task completed! +${task.points} points`);
        return { ...task, completed: true };
      }
      return task;
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl font-bold mb-6">Farm Game Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Points</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <div className="text-2xl font-bold flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-2" /> 
                  {userPoints}
                </div>
                <p className="text-sm text-gray-500">Farm Tokens</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Level</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-2xl font-bold">{userLevel}</div>
                <div className="w-full space-y-1">
                  <Progress value={levelProgress} className="h-2" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Progress to Level {userLevel + 1}</span>
                    <span>{levelProgress}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Streak</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center">
                <Calendar className="h-5 w-5 text-farm-600 mr-2" />
                <div>
                  <div className="text-2xl font-bold">7 Days</div>
                  <p className="text-xs text-gray-500">Keep it up!</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Challenges</CardTitle>
                  <CardDescription>
                    Complete tasks to earn points and rewards
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="daily">
                    <TabsList className="mb-4">
                      <TabsTrigger value="daily">Daily Tasks</TabsTrigger>
                      <TabsTrigger value="crop">Crop Health</TabsTrigger>
                      <TabsTrigger value="community">Community</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="daily">
                      <div className="space-y-4">
                        {tasks.filter(task => task.category === 'daily').map(task => (
                          <div 
                            key={task.id}
                            className={`border p-4 rounded-lg ${
                              task.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200'
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex items-start space-x-3">
                                <div className={`mt-0.5 ${task.completed ? 'text-green-500' : 'text-gray-400'}`}>
                                  <CheckCircle2 className="h-5 w-5" />
                                </div>
                                <div>
                                  <h4 className={`font-medium ${task.completed ? 'text-gray-500' : 'text-gray-900'}`}>
                                    {task.title}
                                  </h4>
                                  <p className="text-sm text-gray-500">{task.description}</p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <div className="mr-3">
                                  <span className="text-sm font-medium text-farm-600">+{task.points}</span>
                                </div>
                                <Button 
                                  size="sm" 
                                  variant={task.completed ? "outline" : "default"}
                                  className={task.completed ? "pointer-events-none" : "bg-farm-600 hover:bg-farm-700"}
                                  disabled={task.completed}
                                  onClick={() => completeTask(task.id)}
                                >
                                  {task.completed ? "Completed" : "Complete"}
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="crop">
                      <div className="space-y-4">
                        {tasks.filter(task => task.category === 'crop').map(task => (
                          <div 
                            key={task.id}
                            className={`border p-4 rounded-lg ${
                              task.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200'
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex items-start space-x-3">
                                <div className={`mt-0.5 ${task.completed ? 'text-green-500' : 'text-gray-400'}`}>
                                  <CheckCircle2 className="h-5 w-5" />
                                </div>
                                <div>
                                  <h4 className={`font-medium ${task.completed ? 'text-gray-500' : 'text-gray-900'}`}>
                                    {task.title}
                                  </h4>
                                  <p className="text-sm text-gray-500">{task.description}</p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <div className="mr-3">
                                  <span className="text-sm font-medium text-farm-600">+{task.points}</span>
                                </div>
                                <Button 
                                  size="sm" 
                                  variant={task.completed ? "outline" : "default"}
                                  className={task.completed ? "pointer-events-none" : "bg-farm-600 hover:bg-farm-700"}
                                  disabled={task.completed}
                                  onClick={() => completeTask(task.id)}
                                >
                                  {task.completed ? "Completed" : "Complete"}
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="community">
                      <div className="space-y-4">
                        {tasks.filter(task => task.category === 'community').map(task => (
                          <div 
                            key={task.id}
                            className={`border p-4 rounded-lg ${
                              task.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200'
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex items-start space-x-3">
                                <div className={`mt-0.5 ${task.completed ? 'text-green-500' : 'text-gray-400'}`}>
                                  <CheckCircle2 className="h-5 w-5" />
                                </div>
                                <div>
                                  <h4 className={`font-medium ${task.completed ? 'text-gray-500' : 'text-gray-900'}`}>
                                    {task.title}
                                  </h4>
                                  <p className="text-sm text-gray-500">{task.description}</p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <div className="mr-3">
                                  <span className="text-sm font-medium text-farm-600">+{task.points}</span>
                                </div>
                                <Button 
                                  size="sm" 
                                  variant={task.completed ? "outline" : "default"}
                                  className={task.completed ? "pointer-events-none" : "bg-farm-600 hover:bg-farm-700"}
                                  disabled={task.completed}
                                  onClick={() => completeTask(task.id)}
                                >
                                  {task.completed ? "Completed" : "Complete"}
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>
                    Unlock achievements to earn special rewards
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {achievements.map(achievement => (
                      <div key={achievement.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-full ${
                              achievement.completed ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-500'
                            }`}>
                              <Trophy className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-medium">{achievement.title}</h4>
                              <p className="text-sm text-gray-500">{achievement.description}</p>
                            </div>
                          </div>
                          <div className="text-sm font-medium text-farm-600">
                            {achievement.completed ? (
                              <div className="flex items-center gap-1">
                                <Gift className="h-4 w-4" />
                                <span>+{achievement.reward} points</span>
                              </div>
                            ) : (
                              <span>{achievement.progress}/{achievement.maxProgress}</span>
                            )}
                          </div>
                        </div>
                        
                        {!achievement.completed && (
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-farm-600 h-2 rounded-full" 
                              style={{ width: `${Math.round((achievement.progress / achievement.maxProgress) * 100)}%` }}
                            ></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Leaderboard</CardTitle>
                  <CardDescription>
                    Top farmers in your community
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] pr-3">
                    <div className="space-y-4">
                      {leaderboard.map((farmer, i) => (
                        <div 
                          key={farmer.id}
                          className={`flex items-center justify-between p-3 rounded-lg ${
                            farmer.isCurrentUser ? 'bg-farm-50 border border-farm-100' : ''
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full">
                              <span className="text-lg">{farmer.avatar}</span>
                            </div>
                            <div>
                              <p className={`font-medium ${farmer.isCurrentUser ? 'text-farm-700' : ''}`}>
                                {farmer.name} {farmer.isCurrentUser ? '(You)' : ''}
                              </p>
                              <div className="flex items-center text-xs text-gray-500">
                                <Star className="h-3 w-3 text-yellow-500 mr-1" />
                                {farmer.points} points
                              </div>
                            </div>
                          </div>
                          <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-700">{i + 1}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => toast.info("Invite feature coming soon!")}
                  >
                    Invite Friends
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Game;
