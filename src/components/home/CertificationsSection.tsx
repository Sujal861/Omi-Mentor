
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ShieldCheck } from 'lucide-react';

const CertificationsSection = () => {
  const organizations = [
    {
      name: "National Academy of Sports Medicine",
      logo: "/cert-logo-1.webp" 
    },
    {
      name: "American Council on Exercise",
      logo: "/cert-logo-2.webp"
    },
    {
      name: "International Sports Sciences Association",
      logo: "/cert-logo-3.webp"
    },
    {
      name: "Functional Aging Institute",
      logo: "/cert-logo-4.webp"
    }
  ];

  return (
    <div className="my-20">
      <h2 className="text-3xl font-bold text-center mb-4">Trusted & Certified</h2>
      <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
        Professionally accredited with industry-leading organizations
      </p>
      
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0 md:mr-8">
            <div className="flex items-center mb-4">
              <ShieldCheck size={24} className="text-green-500 mr-2" />
              <h3 className="text-xl font-bold">Secure & Trusted</h3>
            </div>
            <p className="text-gray-600">
              Your data is protected with bank-level security and encryption. We are fully GDPR compliant.
            </p>
          </div>
          
          <div className="flex space-x-3">
            <div className="p-2 border border-gray-200 rounded-md">
              <Shield size={24} className="text-gray-500" />
            </div>
            <div className="p-2 border border-gray-200 rounded-md">
              <img src="/ssl-badge.webp" alt="SSL Secured" className="h-6" loading="lazy" />
            </div>
            <div className="p-2 border border-gray-200 rounded-md">
              <img src="/gdpr-badge.webp" alt="GDPR Compliant" className="h-6" loading="lazy" />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {organizations.map((org, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="flex items-center justify-center p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all"
            >
              <img 
                src={org.logo} 
                alt={org.name} 
                className="h-12 object-contain grayscale hover:grayscale-0 transition-all"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CertificationsSection;
