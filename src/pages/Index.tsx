
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSupabase } from "@/context/SupabaseContext";
import { Heart, Zap, Star, ArrowRight, Calendar, MessageSquare, Users } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";
import SectionTransition from "@/components/ui/section-transition";
import { Card } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah J.",
    text: "The balance exercises have made such a difference in my daily life. I'm much more confident and stable now!",
    role: "Client, Age 62"
  },
  {
    name: "Michael T.",
    text: "After just 8 weeks of coaching, I've seen remarkable improvements in my stability and overall strength.",
    role: "Client, Age 55"
  },
  {
    name: "Emily R.",
    text: "The personalized approach to my balance issues helped me regain my independence. Highly recommended!",
    role: "Client, Age 68"
  }
];

const features = [
  {
    icon: Calendar,
    title: "Personalized Programs",
    description: "Custom exercise routines tailored to your specific needs and goals"
  },
  {
    icon: MessageSquare,
    title: "Expert Guidance",
    description: "One-on-one coaching sessions with certified balance specialists"
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Join a supportive community of individuals on the same journey"
  }
];

const Index = () => {
  const navigate = useNavigate();
  const { user } = useSupabase();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 py-12 md:py-20">
          {user ? (
            // Authenticated user view
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-8"
            >
              <h1 className="text-4xl font-bold bg-gradient-to-r from-balance-blue to-balance-indigo bg-clip-text text-transparent">
                Welcome, {user.user_metadata?.name || "Friend"}
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Your personalized balance journey awaits. What would you like to focus on today?
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                {[
                  { icon: Heart, label: "Wellness", route: "/dashboard", color: "from-pink-500 to-rose-500" },
                  { icon: Zap, label: "Insights", route: "/insights", color: "from-amber-500 to-orange-500" },
                  { icon: Star, label: "Profile", route: "/profile", color: "from-balance-blue to-balance-indigo" }
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
                      className="h-36 w-36 flex-col gap-3 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300" 
                      onClick={() => navigate(item.route)}
                    >
                      <div className={`p-3 rounded-full bg-gradient-to-r ${item.color} text-white`}>
                        <item.icon size={24} className="group-hover:rotate-12 transition-transform" />
                      </div>
                      <span className="text-lg font-medium">{item.label}</span>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            // Public landing page
            <div>
              {/* Hero Section */}
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-20">
                <motion.div 
                  className="md:w-1/2"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, type: "spring" }}
                >
                  <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-balance-blue to-balance-indigo bg-clip-text text-transparent">Boost Your Balance,</span>
                    <br /> Enhance Your Life
                  </h1>
                  <p className="text-xl text-gray-600 mb-8 max-w-xl">
                    Helping individuals achieve better stability and prevent falls through personalized coaching and evidence-based exercise programs.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button 
                      onClick={() => navigate("/register")} 
                      size="lg"
                      className="bg-gradient-to-r from-balance-blue to-balance-indigo hover:brightness-110 transition-all text-white shadow-lg hover:shadow-xl"
                    >
                      Start Your Journey <ArrowRight className="ml-2" />
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => navigate("/login")}
                      size="lg"
                      className="border-balance-blue text-balance-blue hover:bg-balance-blue/10"
                    >
                      Sign In
                    </Button>
                  </div>
                </motion.div>
                <motion.div 
                  className="md:w-1/2 mt-8 md:mt-0"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="relative bg-gradient-to-br from-balance-blue/20 to-balance-indigo/20 rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src="/placeholder.svg" 
                      alt="Balance coaching session" 
                      className="w-full h-auto rounded-2xl object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                      <p className="text-white text-lg font-medium">
                        Personalized balance coaching for all ages
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Features Section */}
              <SectionTransition delay={0.4}>
                <div className="my-20">
                  <h2 className="text-3xl font-bold text-center mb-12">How We Can Help You</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                      <Card key={index} className="p-6 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="mb-4 p-3 rounded-full bg-balance-indigo/10 w-fit">
                          <feature.icon size={28} className="text-balance-indigo" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              </SectionTransition>

              {/* Testimonials Section */}
              <SectionTransition direction="right" delay={0.6}>
                <div className="my-20 py-16 bg-gradient-to-r from-balance-blue/5 to-balance-indigo/5 rounded-3xl">
                  <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
                    {testimonials.map((testimonial, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 * index, duration: 0.5 }}
                        className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
                      >
                        <div className="flex items-center mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                        <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-gray-500">{testimonial.role}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </SectionTransition>

              {/* CTA Section */}
              <SectionTransition direction="bottom" delay={0.8}>
                <div className="my-20 text-center">
                  <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Balance?</h2>
                  <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Join our community today and start your journey towards better stability, confidence, and overall well-being.
                  </p>
                  <Button 
                    onClick={() => navigate("/register")}
                    size="lg" 
                    className="bg-gradient-to-r from-balance-blue to-balance-indigo text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl hover:brightness-110 transition-all"
                  >
                    Get Started Now <ArrowRight className="ml-2" />
                  </Button>
                </div>
              </SectionTransition>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Index;
