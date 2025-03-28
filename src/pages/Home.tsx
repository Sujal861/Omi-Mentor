
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ExternalLink } from 'lucide-react';
import PageTransition from '@/components/layout/PageTransition';

// Mock data representing omi.me products
const omiProducts = [
  {
    id: 1,
    name: "Omi Balance App",
    description: "Digital wellness app with meditation and breathwork practices",
    price: "$9.99/month",
    imageUrl: "https://placehold.co/400x300/e2e8f0/475569?text=Balance+App"
  },
  {
    id: 2,
    name: "Omi Breath",
    description: "Guided breathwork sessions for enhanced physical and mental wellbeing",
    price: "$7.99/month",
    imageUrl: "https://placehold.co/400x300/e2e8f0/475569?text=Omi+Breath"
  },
  {
    id: 3,
    name: "Omi Meditation",
    description: "Mindfulness and meditation practices for daily relaxation",
    price: "$6.99/month",
    imageUrl: "https://placehold.co/400x300/e2e8f0/475569?text=Meditation"
  },
  {
    id: 4,
    name: "Omi Sleep",
    description: "Sleep stories and sounds to help you get better rest",
    price: "$5.99/month",
    imageUrl: "https://placehold.co/400x300/e2e8f0/475569?text=Sleep+Aid"
  },
  {
    id: 5,
    name: "Omi Move",
    description: "Guided movement sessions to enhance your physical wellbeing",
    price: "$8.99/month",
    imageUrl: "https://placehold.co/400x300/e2e8f0/475569?text=Movement"
  },
  {
    id: 6,
    name: "Omi Complete Bundle",
    description: "Access to all Omi wellness products at a discounted price",
    price: "$19.99/month",
    imageUrl: "https://placehold.co/400x300/e2e8f0/475569?text=Complete+Bundle",
    featured: true
  }
];

const Home = () => {
  const [products, setProducts] = useState(omiProducts);

  return (
    <PageTransition>
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">Welcome to Omi</h1>
          <p className="text-gray-600">Discover our wellness products designed to improve your health and wellbeing</p>
        </div>
        
        {/* Featured product */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <ShoppingBag className="mr-2 text-silver-500" size={24} />
            Featured Product
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="omi-card overflow-hidden bg-gradient-to-br from-silver-50 to-white border-silver-200">
              <div className="grid md:grid-cols-2 gap-6 p-6">
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src="https://placehold.co/600x400/e2e8f0/475569?text=Complete+Bundle" 
                    alt="Omi Complete Bundle" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-4 text-gray-800">Omi Complete Bundle</CardTitle>
                    <p className="text-gray-600 mb-4">Experience the full range of Omi wellness tools with our complete bundle. Access to all Omi products at a discounted price.</p>
                    <div className="bg-silver-100 text-silver-800 font-medium rounded-full px-3 py-1 text-sm inline-block mb-4">Most Popular</div>
                    <p className="text-2xl font-bold text-silver-700 mb-4">$19.99/month</p>
                    <ul className="space-y-2 text-gray-600 mb-4">
                      <li>✓ Full access to all Omi products</li>
                      <li>✓ Premium content updates</li>
                      <li>✓ Priority customer support</li>
                      <li>✓ Save 40% compared to individual subscriptions</li>
                    </ul>
                  </div>
                  <div className="mt-4">
                    <Button className="w-full bg-silver-600 hover:bg-silver-700 text-white">
                      Get Started
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
        
        {/* All products */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <ShoppingBag className="mr-2 text-silver-500" size={24} />
            All Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.filter(p => !p.featured).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="omi-card h-full flex flex-col">
                  <div className="h-48 overflow-hidden rounded-t-lg">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="flex-grow pt-6">
                    <CardTitle className="text-xl mb-2 text-gray-800">{product.name}</CardTitle>
                    <p className="text-gray-600 mb-3">{product.description}</p>
                    <p className="font-bold text-lg text-silver-600">{product.price}</p>
                  </CardContent>
                  <CardFooter className="pt-0 pb-6">
                    <Button className="w-full bg-silver-600 hover:bg-silver-700 text-white">
                      Learn More
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="https://www.omi.me/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-silver-600 hover:text-silver-800"
          >
            Visit the official Omi website <ExternalLink className="ml-1" size={16} />
          </a>
        </div>
      </div>
    </PageTransition>
  );
};

export default Home;
