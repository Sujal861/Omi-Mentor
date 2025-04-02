
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSupabase } from "@/context/SupabaseContext";
import { Heart, Zap, Star } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useSupabase();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          {user ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-6"
            >
              <h1 className="text-4xl font-bold text-balance-indigo vibrant-gradient p-2 rounded-xl inline-block">
                Welcome, {user.user_metadata?.name || "Friend"}
              </h1>
              <div className="flex justify-center space-x-4 mt-8">
                {[
                  { icon: Heart, label: "Wellness", route: "/dashboard" },
                  { icon: Zap, label: "Insights", route: "/insights" },
                  { icon: Star, label: "Profile", route: "/profile" }
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: index * 0.2, 
                      type: "spring", 
                      stiffness: 300 
                    }}
                  >
                    <Button 
                      variant="outline" 
                      className="pulse-hover vibrant-shadow group" 
                      onClick={() => navigate(item.route)}
                    >
                      <item.icon className="mr-2 text-balance-blue group-hover:rotate-12 transition-transform" />
                      {item.label}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-5xl font-bold mb-6 text-balance-indigo">
                Omi Mentor
              </h1>
              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                Your personal wellness companion, designed to help you track, understand, and improve your health.
              </p>
              <div className="flex justify-center space-x-4">
                <Button 
                  onClick={() => navigate("/login")} 
                  className="pulse-hover vibrant-gradient vibrant-shadow"
                >
                  Sign In
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/register")}
                  className="pulse-hover vibrant-shadow"
                >
                  Create Account
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Index;
