
import { useState, useEffect, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSupabase } from "@/context/SupabaseContext";
import { Heart, Zap, Star, ArrowRight, Calendar, MessageSquare, Users, Award, Check, CheckCircle2, Medal, BarChart2 } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";
import SectionTransition from "@/components/ui/section-transition";
import { Card } from "@/components/ui/card";
import AboutSection from "@/components/home/AboutSection";
import TestimonialCard from "@/components/home/TestimonialCard";
import FeatureCard from "@/components/home/FeatureCard";
import BalanceQuiz from "@/components/home/BalanceQuiz";

// Lazy load components that aren't immediately visible
const CertificationsSection = lazy(() => import("@/components/home/CertificationsSection"));
const BlogPreview = lazy(() => import("@/components/home/BlogPreview"));

const testimonials = [
  {
    name: "Sarah J.",
    text: "The balance exercises have made such a difference in my daily life. I'm much more confident and stable now!",
    role: "Client, Age 62",
    image: "/testimonial-1.webp"
  },
  {
    name: "Michael T.",
    text: "After just 8 weeks of coaching, I've seen remarkable improvements in my stability and overall strength.",
    role: "Client, Age 55",
    image: "/testimonial-2.webp"
  },
  {
    name: "Emily R.",
    text: "The personalized approach to my balance issues helped me regain my independence. Highly recommended!",
    role: "Client, Age 68",
    image: "/testimonial-3.webp"
  }
];

const features = [
  {
    icon: Calendar,
    title: "Personalized Programs",
    description: "Custom exercise routines tailored to your specific needs and goals",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: MessageSquare,
    title: "Expert Guidance",
    description: "One-on-one coaching sessions with certified balance specialists",
    color: "from-indigo-500 to-indigo-600"
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Join a supportive community of individuals on the same journey",
    color: "from-purple-500 to-purple-600"
  }
];

const benefits = [
  { 
    title: "Improved Stability", 
    icon: CheckCircle2,
    description: "Develop better balance and reduce fall risk" 
  },
  { 
    title: "Increased Confidence", 
    icon: Medal,
    description: "Feel more secure during daily activities" 
  },
  { 
    title: "Better Mobility", 
    icon: BarChart2,
    description: "Enhance your overall movement quality and range" 
  }
];

const Index = () => {
  const navigate = useNavigate();
  const { user } = useSupabase();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

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
              {/* Hero Section with Clear Value Proposition */}
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-16">
                <motion.div 
                  className="md:w-1/2"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, type: "spring" }}
                >
                  <h1 className="text-4xl md:text-5xl font-bold mb-3 leading-tight">
                    <span className="bg-gradient-to-r from-balance-blue to-balance-indigo bg-clip-text text-transparent">Boost Your Balance,</span>
                    <br /> Enhance Your Life
                  </h1>
                  <p className="text-xl text-gray-700 font-medium mb-4">
                    Certified Balance Coach & Fall Prevention Specialist
                  </p>
                  <p className="text-lg text-gray-600 mb-8 max-w-xl">
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
                      onClick={() => setShowQuiz(true)}
                      size="lg"
                      className="border-balance-blue text-balance-blue hover:bg-balance-blue/10"
                    >
                      Take Balance Quiz
                    </Button>
                  </div>
                  <div className="mt-8 flex items-center space-x-2">
                    <div className="flex -space-x-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-10 w-10 rounded-full border-2 border-white overflow-hidden">
                          <img 
                            src={`/avatar-${i}.webp`} 
                            alt="Client"
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">
                      <span className="font-bold text-balance-blue">100+ clients</span> achieved better balance
                    </p>
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
                      src="/balance-coach-hero.webp" 
                      alt="Balance coaching session"
                      width="800"
                      height="600" 
                      className="w-full h-auto rounded-2xl object-cover transform hover:scale-105 transition-transform duration-500"
                      loading="eager"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                      <p className="text-white text-lg font-medium">
                        Personalized balance coaching for all ages
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Quiz Modal */}
              {showQuiz && <BalanceQuiz onClose={() => setShowQuiz(false)} />}

              {/* About Section */}
              <SectionTransition delay={0.3}>
                <AboutSection />
              </SectionTransition>

              {/* Benefits Section */}
              <SectionTransition delay={0.4}>
                <div className="my-20">
                  <h2 className="text-3xl font-bold text-center mb-4">Benefits of Balance Training</h2>
                  <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
                    Our evidence-based approach delivers sustainable improvements to your balance and overall wellbeing
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                        className="bg-white p-8 rounded-xl shadow-xl border border-gray-100"
                      >
                        <div className="bg-balance-blue/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                          <benefit.icon size={24} className="text-balance-blue" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                        <p className="text-gray-600">{benefit.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </SectionTransition>

              {/* Features Section */}
              <SectionTransition delay={0.4} direction="right">
                <div className="my-20">
                  <h2 className="text-3xl font-bold text-center mb-12">How We Can Help You</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                      <FeatureCard 
                        key={index}
                        feature={feature}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              </SectionTransition>

              {/* Testimonials Section */}
              <SectionTransition direction="right" delay={0.6}>
                <div className="my-20 py-16 bg-gradient-to-r from-balance-blue/5 to-balance-indigo/5 rounded-3xl">
                  <h2 className="text-3xl font-bold text-center mb-4">Success Stories</h2>
                  <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
                    Hear from clients who have transformed their balance and regained confidence
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
                    {testimonials.map((testimonial, index) => (
                      <TestimonialCard 
                        key={index}
                        testimonial={testimonial}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              </SectionTransition>

              {/* Certifications & Trust Signals */}
              <Suspense fallback={<div className="min-h-[200px] flex items-center justify-center">Loading credentials...</div>}>
                <SectionTransition delay={0.8}>
                  <CertificationsSection />
                </SectionTransition>
              </Suspense>

              {/* Blog Preview */}
              <Suspense fallback={<div className="min-h-[200px] flex items-center justify-center">Loading blog content...</div>}>
                <SectionTransition delay={1.0}>
                  <BlogPreview />
                </SectionTransition>
              </Suspense>

              {/* Pricing Section */}
              <SectionTransition direction="left" delay={0.7}>
                <div className="my-20">
                  <h2 className="text-3xl font-bold text-center mb-4">Transparent Pricing</h2>
                  <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
                    Choose the program that fits your needs and budget
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                      {
                        name: "Starter",
                        price: "$99",
                        description: "Perfect for beginners looking to improve basic balance",
                        features: ["Initial assessment", "4 one-on-one sessions", "Basic exercise plan", "Email support"],
                        popular: false
                      },
                      {
                        name: "Advanced",
                        price: "$249",
                        description: "Our most popular comprehensive balance program",
                        features: ["Detailed assessment", "10 personalized sessions", "Custom exercise program", "Priority support", "Progress tracking", "Community access"],
                        popular: true
                      },
                      {
                        name: "Premium",
                        price: "$449",
                        description: "Elite coaching for maximum results",
                        features: ["Complete assessment", "20 one-on-one sessions", "Personalized program", "24/7 support", "Mobile app access", "Video reviews", "Weekly check-ins"],
                        popular: false
                      }
                    ].map((plan, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 + 0.4 }}
                        className={`relative rounded-2xl overflow-hidden ${plan.popular ? 'shadow-xl border-2 border-balance-blue transform scale-105 z-10' : 'shadow-lg border border-gray-200'}`}
                      >
                        {plan.popular && (
                          <div className="absolute top-0 right-0 bg-balance-blue text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                            MOST POPULAR
                          </div>
                        )}
                        <div className="bg-white p-8">
                          <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                          <div className="mb-4">
                            <span className="text-4xl font-bold">{plan.price}</span>
                            <span className="text-gray-600"> / package</span>
                          </div>
                          <p className="text-gray-600 mb-6">{plan.description}</p>
                          <ul className="space-y-3 mb-8">
                            {plan.features.map((feature, j) => (
                              <li key={j} className="flex items-center text-gray-700">
                                <Check className="text-green-500 mr-2" size={18} />
                                {feature}
                              </li>
                            ))}
                          </ul>
                          <Button 
                            className={`w-full ${plan.popular ? 'bg-balance-blue hover:bg-balance-indigo' : 'bg-gray-700 hover:bg-gray-800'} text-white`}
                            onClick={() => navigate("/register")}
                          >
                            Get Started
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-center text-gray-500 mt-8">All packages include a 14-day satisfaction guarantee</p>
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
                  <p className="mt-4 text-gray-500">
                    Or <span className="text-balance-blue cursor-pointer hover:underline" onClick={() => navigate("/login")}>log in</span> if you already have an account
                  </p>
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
