
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  MessageSquare, 
  Gamepad2, 
  BarChart, 
  DollarSign, 
  LogOut, 
  User 
} from "lucide-react";
import { toast } from "sonner";

const Navigation = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  const navItems = [
    { name: "Home", href: "/", icon: <Home className="h-5 w-5" /> },
    { name: "Community", href: "/community", icon: <MessageSquare className="h-5 w-5" /> },
    { name: "Chatbot", href: "/chatbot", icon: <MessageSquare className="h-5 w-5" /> },
    { name: "Game", href: "/game", icon: <Gamepad2 className="h-5 w-5" /> },
    { name: "Govt Schemes", href: "/govt-schemes", icon: <BarChart className="h-5 w-5" /> },
    { name: "Finance Tracker", href: "/finance", icon: <DollarSign className="h-5 w-5" /> },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 sticky top-0 z-50 shadow-sm">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <Link to="/" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap text-farm-700">
            FarmAssist
          </span>
        </Link>
        
        <div className="flex items-center lg:order-2">
          {currentUser ? (
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center gap-2">
                <User className="h-5 w-5 text-farm-600" />
                <span className="text-sm text-gray-700">{currentUser.name}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden md:inline">Logout</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button asChild variant="outline" size="sm">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild size="sm" className="bg-farm-600 hover:bg-farm-700">
                <Link to="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>
        
        <div 
          className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
          id="mobile-menu-2"
        >
          <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-2 lg:mt-0">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-md text-sm transition-colors",
                    location.pathname === item.href
                      ? "bg-farm-100 text-farm-700 font-medium"
                      : "text-gray-700 hover:bg-farm-50 hover:text-farm-700"
                  )}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
