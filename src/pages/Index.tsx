
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Leaf, Star, DollarSign, HeartPulse, ArrowRight, MapPin, Users, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Index() {
  const { currentUser } = useAuth();

  const features = [
    {
      icon: <Leaf className="w-7 h-7 text-farm-600" />,
      title: 'Crop Disease Detection',
      desc: 'Upload crop images for instant disease analysis and solutions.'
    },
    {
      icon: <Star className="w-7 h-7 text-amber-500" />,
      title: 'Gamified Farming',
      desc: 'Complete tasks and earn rewards to stay motivated.'
    },
    {
      icon: <DollarSign className="w-7 h-7 text-farm-500" />,
      title: 'Finance Tracking',
      desc: 'Monitor your income, expenses, and plan your growth.'
    },
    {
      icon: <HeartPulse className="w-7 h-7 text-rose-500" />,
      title: 'Crop Health Tracker',
      desc: 'Daily crop monitoring with personalized tips.'
    }
  ];

  const steps = [
    {
      title: 'Register Your Farm',
      desc: 'Create your profile and add your farm details',
      icon: <MapPin className="w-5 h-5" />
    },
    {
      title: 'Upload Images',
      desc: 'Let our AI analyze your crop health',
      icon: <Leaf className="w-5 h-5" />
    },
    {
      title: 'Complete Tasks',
      desc: 'Follow personalized recommendations',
      icon: <CheckCircle className="w-5 h-5" />
    },
    {
      title: 'Grow & Earn',
      desc: 'Improve yield and earn rewards',
      icon: <Star className="w-5 h-5" />
    }
  ];

  const stats = [
    { value: '10K+', label: 'Active Farmers' },
    { value: '95%', label: 'Detection Accuracy' },
    { value: '30%', label: 'Average Yield Increase' },
    { value: '24/7', label: 'Support Available' },
  ];

  const testimonials = [
    {
      quote: "FarmAssist helped me identify a disease in my wheat crop before it spread. Saved me thousands in potential losses.",
      author: "Sarah Johnson",
      location: "Nebraska"
    },
    {
      quote: "The gamification aspect keeps me engaged. I've learned so much about sustainable farming practices.",
      author: "Miguel Rodriguez",
      location: "California"
    },
    {
      quote: "The financial tools helped me optimize my spending and increase profits by 25% in just one season.",
      author: "David Chen",
      location: "Iowa"
    }
  ];

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="bg-white text-gray-900 font-sans overflow-hidden">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-lg z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <Leaf className="w-8 h-8 text-farm-600 mr-2" />
            <span className="text-xl font-bold text-farm-800">FarmAssist</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-farm-600">Home</Link>
            <Link to="/features" className="text-gray-700 hover:text-farm-600">Features</Link>
            <Link to="/pricing" className="text-gray-700 hover:text-farm-600">Pricing</Link>
            {currentUser ? (
              <Button asChild className="bg-farm-600 hover:bg-farm-700">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Link to="/login" className="text-farm-600 hover:text-farm-700 font-medium">Login</Link>
                <Button asChild className="bg-farm-600 hover:bg-farm-700">
                  <Link to="/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>
          <button className="md:hidden text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 inset-x-0 h-[65%] bg-gradient-to-b from-farm-50 to-white -z-10"></div>
        <div className="absolute top-[-15%] left-[-10%] w-[40%] aspect-square rounded-full bg-farm-200/30 blur-3xl animate-pulse-slow -z-10"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[30%] aspect-square rounded-full bg-farm-100/40 blur-3xl animate-pulse-slow -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center gap-14">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-block px-3 py-1 rounded-full bg-farm-100 text-farm-700 font-medium text-sm mb-6">
              AI-Powered Smart Farming
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 tracking-tight text-gray-900">
              Grow Smarter with <span className="text-farm-600">FarmAssist</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              AI-powered tools for more sustainable and profitable agriculture. Detect diseases, track growth, and optimize your farming practices.
            </p>
            <div className="flex flex-wrap gap-4">
              {currentUser ? (
                <Button size="lg" asChild className="bg-farm-600 hover:bg-farm-700 text-lg h-12 px-8">
                  <Link to="/dashboard">
                    Go to Dashboard
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button size="lg" asChild className="bg-farm-600 hover:bg-farm-700 text-lg h-12 px-8">
                    <Link to="/register">
                      Get Started
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button size="lg" asChild variant="outline" className="border-farm-600 text-farm-600 hover:bg-farm-50 text-lg h-12 px-8">
                    <Link to="/login">Login</Link>
                  </Button>
                </>
              )}
            </div>
          </motion.div>
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.95, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative z-10">
              <img
                src="https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg"
                alt="Farmer in field"
                className="rounded-3xl shadow-2xl w-full aspect-[4/3] object-cover object-center"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3 bg-farm-50 p-3 rounded-xl">
                  <CheckCircle className="text-farm-600 w-10 h-10" />
                  <div>
                    <p className="font-bold text-gray-900">Disease Detected</p>
                    <p className="text-sm text-gray-500">98% Accuracy</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-farm-100/50 rounded-3xl blur-md"></div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                className="text-center"
                variants={fadeIn}
              >
                <p className="text-4xl md:text-5xl font-bold text-farm-600">{stat.value}</p>
                <p className="text-gray-600 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Powerful Features</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Everything you need to manage your farm more efficiently and increase your yields.
              </p>
            </motion.div>
          </div>
          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300"
                variants={fadeIn}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div className="bg-farm-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">How FarmAssist Works</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Simple steps to transform your farming experience with AI technology
              </p>
            </motion.div>
          </div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="relative"
                variants={fadeIn}
              >
                {i < steps.length - 1 && (
                  <div className="absolute top-9 left-[calc(50%+2rem)] w-full h-0.5 bg-farm-200 hidden lg:block"></div>
                )}
                <div className="bg-farm-50 border border-farm-100 p-6 rounded-2xl text-center hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 rounded-full bg-farm-100 text-farm-700 flex items-center justify-center font-bold text-xl mx-auto mb-5">
                    {i + 1}
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 mb-4">{step.desc}</p>
                  <div className="w-10 h-10 rounded-full bg-farm-600 text-white flex items-center justify-center mx-auto">
                    {step.icon}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-farm-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">What Farmers Say</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Join thousands of satisfied farmers who transformed their practices with FarmAssist
              </p>
            </motion.div>
          </div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                className="bg-white p-8 rounded-2xl shadow-md flex flex-col"
                variants={fadeIn}
              >
                <div className="mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="inline w-5 h-5 text-amber-400" fill="#FBBF24" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
                <div className="mt-auto">
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-gray-500 text-sm">{testimonial.location}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-farm-600 to-farm-700 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-farm-800 opacity-5 rounded-full blur-3xl"></div>
        
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Farm?</h2>
            <p className="text-xl text-farm-50 mb-10 max-w-3xl mx-auto">
              Join our community of forward-thinking farmers and start growing smarter with AI-powered insights.
            </p>
            
            {currentUser ? (
              <Button size="lg" asChild className="bg-white text-farm-700 hover:bg-farm-50 text-lg h-14 px-10">
                <Link to="/dashboard">
                  Go to Dashboard
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            ) : (
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild className="bg-white text-farm-700 hover:bg-farm-50 text-lg h-14 px-10">
                  <Link to="/register">
                    Start For Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" asChild variant="outline" className="border-white text-white hover:bg-white/10 text-lg h-14 px-10">
                  <Link to="/pricing">View Plans</Link>
                </Button>
              </div>
            )}
            <p className="text-farm-200 mt-6">No credit card required • Free 14-day trial</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-bold text-lg mb-4">FarmAssist</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link to="/features" className="text-gray-400 hover:text-white">Features</Link></li>
                <li><Link to="/pricing" className="text-gray-400 hover:text-white">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link to="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
                <li><Link to="/guides" className="text-gray-400 hover:text-white">Farm Guides</Link></li>
                <li><Link to="/webinars" className="text-gray-400 hover:text-white">Webinars</Link></li>
                <li><Link to="/help" className="text-gray-400 hover:text-white">Help Center</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
                <li><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/cookies" className="text-gray-400 hover:text-white">Cookie Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">hello@farmassist.com</li>
                <li className="text-gray-400">+1 (555) 123-4567</li>
              </ul>
              <div className="flex space-x-4 mt-4">
                {/* Social Icons */}
                <Link to="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </Link>
                <Link to="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </Link>
                <Link to="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} FarmAssist. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
