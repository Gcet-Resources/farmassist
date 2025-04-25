
import { useState } from "react";
import Navigation from "../components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { User, Bot, Send, RefreshCw, Leaf, Bug } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm FarmBot, your AI farming assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputMessage("");
    
    // Bot is "typing"
    setIsTyping(true);
    
    // Simulate bot response
    setTimeout(() => {
      let botResponse = "";
      
      // Simple keyword-based responses
      const lowerCaseMessage = inputMessage.toLowerCase();
      
      if (lowerCaseMessage.includes("disease") || lowerCaseMessage.includes("pest") || lowerCaseMessage.includes("insect")) {
        botResponse = "If you're dealing with crop diseases or pests, I recommend uploading an image of the affected plant to our disease detection feature. This will provide a more accurate diagnosis and treatment plan. Would you like me to guide you there?";
      } else if (lowerCaseMessage.includes("fertilizer") || lowerCaseMessage.includes("nutrient")) {
        botResponse = "For optimal plant nutrition, it's important to understand your soil composition first. Have you conducted a soil test recently? This can help determine the specific nutrients your crops need and prevent over-fertilization.";
      } else if (lowerCaseMessage.includes("weather") || lowerCaseMessage.includes("rain") || lowerCaseMessage.includes("forecast")) {
        botResponse = "Weather conditions are crucial for planning farm activities. Based on recent forecasts for common farming regions, we're expecting moderate rainfall over the next week. I recommend checking your local forecast for more precise information.";
      } else if (lowerCaseMessage.includes("price") || lowerCaseMessage.includes("market") || lowerCaseMessage.includes("sell")) {
        botResponse = "Current market trends show steady prices for most staple crops. Would you like me to provide more specific information about particular crop prices or connect you to the market price dashboard?";
      } else if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi") || lowerCaseMessage.includes("hey")) {
        botResponse = "Hello! I'm here to help with any farming questions you might have. Feel free to ask about crop diseases, fertilizers, weather conditions, market prices, or farming techniques!";
      } else {
        botResponse = "Thank you for your question. To provide more specific guidance, could you share more details about your crop type, growing region, and specific concerns? This will help me give you more tailored advice.";
      }
      
      const newBotMessage: Message = {
        id: messages.length + 2,
        content: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, newBotMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      
      <main className="flex-1 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl font-bold mb-6">AI Farm Assistant</h1>
          
          <Card className="h-[calc(100vh-220px)] flex flex-col">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="bg-farm-100 p-2 rounded-full">
                  <Bot className="h-6 w-6 text-farm-600" />
                </div>
                <div>
                  <CardTitle>FarmBot</CardTitle>
                  <CardDescription>AI-powered farming assistant</CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 overflow-hidden">
              <ScrollArea className="h-full pr-4">
                <div className="space-y-4">
                  {messages.map(message => (
                    <div 
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender === 'user' 
                            ? 'bg-farm-600 text-white rounded-tr-none'
                            : 'bg-white border border-gray-200 rounded-tl-none'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {message.sender === 'bot' && (
                            <Avatar className="h-8 w-8 bg-farm-100 flex items-center justify-center">
                              <Bot className="h-4 w-4 text-farm-600" />
                            </Avatar>
                          )}
                          <div className="space-y-1">
                            <p>{message.content}</p>
                            <p className={`text-xs ${message.sender === 'user' ? 'text-farm-100' : 'text-gray-500'}`}>
                              {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </p>
                          </div>
                          {message.sender === 'user' && (
                            <Avatar className="h-8 w-8 bg-farm-800 flex items-center justify-center">
                              <User className="h-4 w-4 text-white" />
                            </Avatar>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] p-3 rounded-lg bg-white border border-gray-200 rounded-tl-none">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8 bg-farm-100 flex items-center justify-center">
                            <Bot className="h-4 w-4 text-farm-600" />
                          </Avatar>
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                            <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
            
            <CardFooter className="border-t pt-3">
              <div className="w-full flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => toast.info("Refreshing chatbot context...")}
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => {
                      setInputMessage("How do I identify common crop diseases?");
                      setTimeout(() => sendMessage(), 100);
                    }}
                  >
                    <Bug className="h-4 w-4" />
                    <span>Crop Diseases</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => {
                      setInputMessage("How can I improve soil fertility naturally?");
                      setTimeout(() => sendMessage(), 100);
                    }}
                  >
                    <Leaf className="h-4 w-4" />
                    <span>Soil Tips</span>
                  </Button>
                </div>
                
                <div className="relative flex-1">
                  <Input
                    placeholder="Type your message..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="pr-10"
                  />
                  <Button
                    className="absolute right-1 top-1 h-8 w-8 p-0"
                    onClick={sendMessage}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Chatbot;
