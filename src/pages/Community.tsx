
import { useState } from "react";
import Navigation from "../components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { TabsContent, TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  MessageSquare,
  User,
  ThumbsUp,
  MessageCircle,
  Send,
  Search,
  Filter,
  Users,
} from "lucide-react";
import { toast } from "sonner";

interface Post {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
  liked: boolean;
}

const Community = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      user: {
        name: "Maria Garcia",
        avatar: "MG",
      },
      content: "Just discovered this amazing natural pesticide for my tomato plants. It's a mixture of neem oil and dish soap diluted in water. It's been working great for me. Has anyone else tried this?",
      image: "https://images.unsplash.com/photo-1471194402529-8e0f5a675de6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      likes: 24,
      comments: 8,
      timestamp: "2 hours ago",
      liked: false
    },
    {
      id: 2,
      user: {
        name: "John Smith",
        avatar: "JS",
      },
      content: "My corn seedlings are showing yellow leaves with brown spots. Has anyone encountered this before? Any advice on what this might be and how to treat it?",
      likes: 12,
      comments: 15,
      timestamp: "5 hours ago",
      liked: false
    },
    {
      id: 3,
      user: {
        name: "Sarah Johnson",
        avatar: "SJ",
      },
      content: "Just got my soil test results back! pH is 6.8, nitrogen is a bit low but phosphorus and potassium look good. Any recommendations for organic nitrogen supplements?",
      likes: 18,
      comments: 6,
      timestamp: "Yesterday",
      liked: true
    },
    {
      id: 4,
      user: {
        name: "Raj Patel",
        avatar: "RP",
      },
      content: "Check out my new irrigation system! It's saving me hours of work every week and ensuring more consistent watering.",
      image: "https://images.unsplash.com/photo-1513425295881-74de37c4c00a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      likes: 32,
      comments: 9,
      timestamp: "2 days ago",
      liked: false
    },
  ]);
  
  const [newPost, setNewPost] = useState("");
  
  const handleLikePost = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
          liked: !post.liked
        };
      }
      return post;
    }));
  };
  
  const handleSubmitPost = () => {
    if (!newPost.trim()) {
      toast.error("Post cannot be empty");
      return;
    }
    
    const post: Post = {
      id: Date.now(),
      user: {
        name: "You",
        avatar: "YO",
      },
      content: newPost,
      likes: 0,
      comments: 0,
      timestamp: "Just now",
      liked: false
    };
    
    setPosts([post, ...posts]);
    setNewPost("");
    toast.success("Post shared with the community!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      
      <main className="flex-1 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Farmer Community</h1>
          </div>
          
          <div className="grid md:grid-cols-7 gap-6">
            <div className="md:col-span-5">
              <Tabs defaultValue="feed">
                <div className="flex justify-between items-center mb-4">
                  <TabsList>
                    <TabsTrigger value="feed">Feed</TabsTrigger>
                    <TabsTrigger value="trending">Trending</TabsTrigger>
                    <TabsTrigger value="questions">Questions</TabsTrigger>
                  </TabsList>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <Card className="mb-6">
                  <CardContent className="pt-6">
                    <div className="flex gap-3">
                      <Avatar className="h-10 w-10">
                        <div className="bg-farm-200 text-farm-600 h-full w-full rounded-full flex items-center justify-center font-medium">
                          YO
                        </div>
                      </Avatar>
                      <div className="flex-1">
                        <Input
                          placeholder="Share something with the community..."
                          value={newPost}
                          onChange={(e) => setNewPost(e.target.value)}
                          className="mb-4"
                        />
                        <div className="flex justify-end">
                          <Button 
                            onClick={handleSubmitPost}
                            className="bg-farm-600 hover:bg-farm-700"
                          >
                            <Send className="h-4 w-4 mr-2" /> Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <TabsContent value="feed" className="space-y-6 mt-0">
                  {posts.map(post => (
                    <Card key={post.id}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10">
                            <div className="bg-farm-200 text-farm-600 h-full w-full rounded-full flex items-center justify-center font-medium">
                              {post.user.avatar}
                            </div>
                          </Avatar>
                          <div>
                            <CardTitle className="text-base">{post.user.name}</CardTitle>
                            <p className="text-xs text-gray-500">{post.timestamp}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <p className="whitespace-pre-wrap">{post.content}</p>
                        {post.image && (
                          <img 
                            src={post.image} 
                            alt="Post attachment" 
                            className="mt-3 rounded-lg w-full object-cover max-h-80"
                          />
                        )}
                      </CardContent>
                      <CardFooter className="pt-0">
                        <div className="w-full border-t pt-3">
                          <div className="flex justify-between">
                            <Button 
                              variant="ghost" 
                              className="flex items-center gap-1 text-gray-500"
                              onClick={() => handleLikePost(post.id)}
                            >
                              <ThumbsUp className={`h-4 w-4 ${post.liked ? 'text-farm-600 fill-farm-600' : ''}`} />
                              <span className={post.liked ? 'text-farm-600' : ''}>{post.likes}</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              className="flex items-center gap-1 text-gray-500"
                              onClick={() => toast.info("Comments feature coming soon!")}
                            >
                              <MessageCircle className="h-4 w-4" />
                              <span>{post.comments}</span>
                            </Button>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="trending" className="space-y-6 mt-0">
                  <div className="text-center py-8 text-gray-500">
                    <MessageSquare className="mx-auto h-8 w-8 opacity-30 mb-2" />
                    <p>Trending topics will appear here</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="questions" className="space-y-6 mt-0">
                  <div className="text-center py-8 text-gray-500">
                    <MessageSquare className="mx-auto h-8 w-8 opacity-30 mb-2" />
                    <p>Questions from the community will appear here</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Community Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-farm-600 mr-2" />
                      <span className="text-sm text-gray-700">Members</span>
                    </div>
                    <span className="font-medium text-gray-900">3,542</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MessageSquare className="h-4 w-4 text-farm-600 mr-2" />
                      <span className="text-sm text-gray-700">Posts today</span>
                    </div>
                    <span className="font-medium text-gray-900">148</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-farm-600 mr-2" />
                      <span className="text-sm text-gray-700">Online now</span>
                    </div>
                    <span className="font-medium text-gray-900">87</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Top Contributors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <div className="bg-farm-200 text-farm-600 h-full w-full rounded-full flex items-center justify-center font-medium">
                        MG
                      </div>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Maria Garcia</p>
                      <p className="text-xs text-gray-500">Tomato Expert</p>
                    </div>
                    <div className="text-xs font-medium bg-farm-100 text-farm-700 px-2 py-1 rounded">
                      542 pts
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <div className="bg-farm-200 text-farm-600 h-full w-full rounded-full flex items-center justify-center font-medium">
                        JS
                      </div>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">John Smith</p>
                      <p className="text-xs text-gray-500">Irrigation Specialist</p>
                    </div>
                    <div className="text-xs font-medium bg-farm-100 text-farm-700 px-2 py-1 rounded">
                      487 pts
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <div className="bg-farm-200 text-farm-600 h-full w-full rounded-full flex items-center justify-center font-medium">
                        SJ
                      </div>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Sarah Johnson</p>
                      <p className="text-xs text-gray-500">Organic Farming</p>
                    </div>
                    <div className="text-xs font-medium bg-farm-100 text-farm-700 px-2 py-1 rounded">
                      421 pts
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => toast.info("View all contributors feature coming soon!")}>
                    View All
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

export default Community;
