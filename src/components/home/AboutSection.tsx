
import React from 'react';
import { motion } from 'framer-motion';
import { Award, GraduationCap, Heart } from 'lucide-react';

const AboutSection = () => {
  return (
    <div className="my-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-balance-blue/10 rounded-full"></div>
          <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-balance-indigo/10 rounded-full"></div>
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl border border-gray-100">
            <img 
              src="/about-coach.webp" 
              alt="Balance Coach Profile" 
              className="w-full h-auto object-cover"
              width="600"
              height="800"
              loading="lazy"
            />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-6">About Me</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            With over 10 years of experience as a certified balance specialist, I've helped hundreds of clients regain their confidence and stability through personalized training programs.
          </p>
          <p className="text-gray-700 mb-8 leading-relaxed">
            My approach combines evidence-based techniques with compassionate coaching to create a supportive environment where clients of all ages can achieve their balance goals.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="p-2 bg-balance-blue/10 rounded-full mr-4">
                <Award className="text-balance-blue" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Certified Balance Specialist</h3>
                <p className="text-gray-600">National Academy of Sports Medicine (NASM)</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="p-2 bg-balance-blue/10 rounded-full mr-4">
                <GraduationCap className="text-balance-blue" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Master's in Exercise Science</h3>
                <p className="text-gray-600">University of Physical Education</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="p-2 bg-balance-blue/10 rounded-full mr-4">
                <Heart className="text-balance-blue" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Specialized in Fall Prevention</h3>
                <p className="text-gray-600">Focus on seniors and rehabilitation patients</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection;
