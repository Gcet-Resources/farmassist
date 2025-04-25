
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Upload, X, CheckCircle2, XCircle, Leaf, ThermometerSnow } from "lucide-react";

const ImageAnalysis = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<{
    diseaseDetected: boolean;
    diseaseName?: string;
    confidence?: number;
    treatment?: string[];
    preventionTips?: string[];
  } | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setFileName("");
    setAnalysisResult(null);
  };

  const handleAnalyzeImage = () => {
    setIsAnalyzing(true);
    toast.info("Analyzing image...");
    
    // Simulate analysis with timeout
    setTimeout(() => {
      // Mock result - in a real app this would come from an API
      const mockResult = {
        diseaseDetected: Math.random() > 0.5, // Randomly decide if disease is detected
      };
      
      if (mockResult.diseaseDetected) {
        setAnalysisResult({
          diseaseDetected: true,
          diseaseName: "Early Blight",
          confidence: 92,
          treatment: [
            "Remove and destroy infected plant parts",
            "Apply approved fungicide as directed",
            "Ensure proper spacing between plants for air circulation"
          ],
          preventionTips: [
            "Use disease-resistant varieties",
            "Practice crop rotation",
            "Keep leaves dry by using drip irrigation",
            "Maintain proper nutrition to strengthen plants"
          ]
        });
        toast.success("Analysis complete! Disease detected.");
      } else {
        setAnalysisResult({
          diseaseDetected: false,
          preventionTips: [
            "Continue good cultivation practices",
            "Maintain adequate watering schedule",
            "Monitor for changes in plant appearance",
            "Apply balanced fertilizers as needed"
          ]
        });
        toast.success("Analysis complete! No disease detected.");
      }
      
      setIsAnalyzing(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Crop Disease Detection</h1>
            <Button variant="outline" onClick={() => navigate("/dashboard")}>
              Back to Dashboard
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Upload Crop Image</CardTitle>
                <CardDescription>
                  Upload a clear image of your crop for disease detection
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!image ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <div className="flex flex-col items-center">
                        <Upload className="h-10 w-10 text-farm-500 mb-3" />
                        <p className="font-medium text-gray-700 mb-1">Click to upload an image</p>
                        <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={image}
                      alt="Uploaded crop"
                      className="w-full h-auto rounded-lg"
                    />
                    <button
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                      onClick={handleRemoveImage}
                    >
                      <X className="h-5 w-5 text-gray-500" />
                    </button>
                    <p className="mt-2 text-sm text-gray-500">
                      {fileName}
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  onClick={handleAnalyzeImage} 
                  disabled={!image || isAnalyzing}
                  className="bg-farm-600 hover:bg-farm-700"
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze Image"}
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Analysis Results</CardTitle>
                <CardDescription>
                  {analysisResult 
                    ? "AI-powered analysis of your crop image" 
                    : "Upload and analyze an image to see results"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!analysisResult ? (
                  <div className="text-center py-12 text-gray-500">
                    <Leaf className="h-12 w-12 mx-auto mb-3 opacity-30" />
                    <p>No analysis results yet</p>
                    <p className="text-sm mt-2">Upload an image and click "Analyze Image"</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className={`p-4 rounded-lg ${analysisResult.diseaseDetected ? 'bg-red-50' : 'bg-green-50'}`}>
                      <div className="flex items-center gap-3">
                        {analysisResult.diseaseDetected ? (
                          <XCircle className="h-6 w-6 text-red-500" />
                        ) : (
                          <CheckCircle2 className="h-6 w-6 text-green-600" />
                        )}
                        <div>
                          <p className="font-medium">
                            {analysisResult.diseaseDetected 
                              ? `Disease detected: ${analysisResult.diseaseName}` 
                              : "No disease detected"}
                          </p>
                          {analysisResult.diseaseDetected && analysisResult.confidence && (
                            <p className="text-sm text-gray-600">
                              Confidence: {analysisResult.confidence}%
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {analysisResult.diseaseDetected && analysisResult.treatment && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                          <ThermometerSnow className="h-5 w-5 text-blue-600" />
                          Treatment Recommendations
                        </h4>
                        <ul className="space-y-1 list-disc list-inside text-gray-700 text-sm">
                          {analysisResult.treatment.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                        <Leaf className="h-5 w-5 text-green-600" />
                        Prevention Tips
                      </h4>
                      <ul className="space-y-1 list-disc list-inside text-gray-700 text-sm">
                        {analysisResult.preventionTips?.map((tip, i) => (
                          <li key={i}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ImageAnalysis;
