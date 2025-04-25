
import { useState } from "react";
import Navigation from "../components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  Calendar, 
  FileText, 
  ArrowRight, 
  Award, 
  DollarSign, 
  Tractor, 
  BookOpen,
  Filter,
  ChevronDown
} from "lucide-react";
import { toast } from "sonner";

interface Scheme {
  id: string;
  title: string;
  category: string;
  description: string;
  deadline: string;
  eligibility: string[];
  benefits: string;
  icon: JSX.Element;
}

const GovtSchemes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategory, setFilteredCategory] = useState<string | null>(null);

  const schemes: Scheme[] = [
    {
      id: "1",
      title: "Pradhan Mantri Fasal Bima Yojana",
      category: "Insurance",
      description: "Crop insurance scheme that aims to provide financial support to farmers suffering crop loss or damage due to unforeseen events.",
      deadline: "June 30, 2023",
      eligibility: ["All farmers growing notified crops", "Both loanee and non-loanee farmers", "Individual/Joint landowners"],
      benefits: "Insurance coverage and financial support to farmers in case of crop failure, stabilizing income and ensuring credit flow to the agriculture sector.",
      icon: <Award className="h-6 w-6 text-blue-500" />
    },
    {
      id: "2",
      title: "Kisan Credit Card",
      category: "Credit",
      description: "Provides farmers with affordable credit for their agricultural needs and other activities.",
      deadline: "Ongoing",
      eligibility: ["All farmers", "Sharecroppers", "Tenant farmers", "Self-Help Groups of farmers"],
      benefits: "Access to short-term loans for cultivation, post-harvest expenses, working capital for maintenance of farm assets, and more.",
      icon: <DollarSign className="h-6 w-6 text-green-500" />
    },
    {
      id: "3",
      title: "PM Kisan Samman Nidhi",
      category: "Financial Aid",
      description: "Direct income support to farmers for procuring various inputs to ensure proper crop health and appropriate yields.",
      deadline: "Ongoing",
      eligibility: ["Small and marginal farmers with cultivable land up to 2 hectares"],
      benefits: "₹6,000 per year transferred directly to the bank accounts of farmer families in three equal installments.",
      icon: <DollarSign className="h-6 w-6 text-green-500" />
    },
    {
      id: "4",
      title: "Agricultural Infrastructure Fund",
      category: "Infrastructure",
      description: "A financing facility for investment in agricultural infrastructure projects at farm-gate and aggregation points.",
      deadline: "December 31, 2023",
      eligibility: ["Farmers", "FPOs", "Agri-entrepreneurs", "Start-ups", "Central/State agencies"],
      benefits: "Interest subvention and credit guarantee support for post-harvest infrastructure and community farming assets.",
      icon: <Tractor className="h-6 w-6 text-orange-500" />
    },
    {
      id: "5",
      title: "National Mission for Sustainable Agriculture",
      category: "Sustainability",
      description: "Promotes sustainable farming practices to make agriculture more productive, sustainable, and climate resilient.",
      deadline: "Ongoing",
      eligibility: ["All farmers", "Particularly small and marginal farmers"],
      benefits: "Support for soil health management, water conservation, climate change adaptation strategies, and agroforestry.",
      icon: <BookOpen className="h-6 w-6 text-emerald-500" />
    }
  ];
  
  const categories = Array.from(new Set(schemes.map(scheme => scheme.category)));
  
  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filteredCategory ? scheme.category === filteredCategory : true;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl font-bold mb-6">Government Schemes</h1>
          
          <div className="grid md:grid-cols-12 gap-6 mb-8">
            <div className="md:col-span-7">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  placeholder="Search schemes by name or description..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="md:col-span-5 flex gap-2">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 flex-1"
                onClick={() => setFilteredCategory(null)}
              >
                <Filter className="h-4 w-4" />
                <span>All Categories</span>
              </Button>
              
              <div className="relative flex-1">
                <select
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 appearance-none"
                  value={filteredCategory || ""}
                  onChange={(e) => setFilteredCategory(e.target.value || null)}
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none text-gray-500" />
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            {filteredSchemes.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <FileText className="h-12 w-12 text-gray-300 mb-4" />
                  <p className="text-lg font-medium text-gray-500">No schemes found matching your criteria</p>
                  <p className="text-gray-400 mt-1">Try adjusting your search or filters</p>
                </CardContent>
              </Card>
            ) : (
              filteredSchemes.map(scheme => (
                <Card key={scheme.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="bg-gray-100 p-3 rounded-lg">
                          {scheme.icon}
                        </div>
                        <div>
                          <CardTitle>{scheme.title}</CardTitle>
                          <CardDescription className="mt-1">
                            <span className="inline-flex items-center rounded-full bg-farm-100 px-2.5 py-0.5 text-xs font-medium text-farm-700 mr-2">
                              {scheme.category}
                            </span>
                            <span className="inline-flex items-center text-xs text-gray-500">
                              <Calendar className="h-3 w-3 mr-1" /> Deadline: {scheme.deadline}
                            </span>
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">{scheme.description}</p>
                    
                    <div>
                      <h4 className="font-medium text-sm mb-2">Eligibility:</h4>
                      <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                        {scheme.eligibility.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm mb-2">Benefits:</h4>
                      <p className="text-sm text-gray-600">{scheme.benefits}</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center gap-2"
                      onClick={() => toast.info(`Details for ${scheme.title} will be available soon!`)}
                    >
                      Learn more and apply
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default GovtSchemes;
