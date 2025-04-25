
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { 
  Leaf, 
  Star, 
  DollarSign, 
  HeartPulse,
  Upload,
  MessageSquare,
  Sprout,
  Zap
} from "lucide-react";
import Navigation from "../components/Navigation";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { currentUser } = useAuth();

  const features = [
    {
      icon: <Leaf className="w-6 h-6 text-green-500" />,
      title: "Crop Disease Detection",
      desc: "Upload crop images for instant disease analysis and solutions."
    },
    {
      icon: <Star className="w-6 h-6 text-yellow-400" />,
      title: "Gamified Farming",
      desc: "Complete tasks and earn rewards to stay motivated."
    },
    {
      icon: <DollarSign className="w-6 h-6 text-emerald-500" />,
      title: "Finance Tracking",
      desc: "Monitor your income, expenses, and plan your growth."
    },
    {
      icon: <HeartPulse className="w-6 h-6 text-red-500" />,
      title: "Crop Health Tracker",
      desc: "Daily crop monitoring with personalized tips."
    }
  ];

  const steps = [
    {
      icon: <Upload className="w-6 h-6 text-farm-600" />,
      text: "Upload crop images for AI analysis"
    },
    {
      icon: <Leaf className="w-6 h-6 text-farm-600" />,
      text: "Get disease detection and treatment recommendations"
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-farm-600" />,
      text: "Connect with community and expert advisors"
    },
    {
      icon: <Sprout className="w-6 h-6 text-farm-600" />,
      text: "Track crop health and financial progress"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-farm-50 to-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-gray-900">
              Smart Farming with <span className="text-farm-600">FarmAssist</span>
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              AI-powered tools for smarter, more sustainable agriculture. Detect crop diseases, 
              track finances, and join a community of forward-thinking farmers.
            </p>
            <div className="flex flex-wrap gap-4">
              {currentUser ? (
                <Button asChild size="lg" className="bg-farm-600 hover:bg-farm-700">
                  <Link to="/dashboard">Go to Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button asChild size="lg" className="bg-farm-600 hover:bg-farm-700">
                    <Link to="/register">Get Started</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/login">Log In</Link>
                  </Button>
                </>
              )}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src="public/lovable-uploads/home-img.jpeg"
              alt="Farm tech illustration"
              className="rounded-2xl shadow-xl w-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our comprehensive suite of tools helps farmers increase productivity and sustainability
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="bg-farm-50 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-5">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-xl mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-farm-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              FarmAssist streamlines your farming process with these simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="bg-white border border-farm-100 rounded-full w-16 h-16 flex items-center justify-center shadow-md mb-4">
                  <div className="relative">
                    {step.icon}
                    <div className="absolute -top-2 -right-2 bg-farm-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium">
                      {i + 1}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-farm-700 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Farming?</h2>
          <p className="text-farm-50 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of farmers who are already using FarmAssist to improve yields and reduce costs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {currentUser ? (
              <Button asChild size="lg" variant="outline" className="bg-white text-farm-700 hover:bg-farm-50 border-white">
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            ) : (
              <Button asChild size="lg" variant="outline" className="bg-white text-farm-700 hover:bg-farm-50 border-white">
                <Link to="/register">Get Started Today</Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <h3 className="font-semibold text-farm-700 text-lg mb-3">FarmAssist</h3>
              <p className="text-gray-500 text-sm">
                AI-powered tools for smart, sustainable farming
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-3">Features</h4>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li>Disease Detection</li>
                <li>Crop Health Tracker</li>
                <li>Finance Management</li>
                <li>Farm Community</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Resources</h4>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li>Support</li>
                <li>Knowledge Base</li>
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Contact</h4>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li>support@farmassist.com</li>
                <li>+1 (555) 123-4567</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} FarmAssist. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
