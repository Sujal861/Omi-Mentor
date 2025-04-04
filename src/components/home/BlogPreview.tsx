
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BlogPreview = () => {
  const blogPosts = [
    {
      title: "5 Simple Exercises to Improve Your Balance Today",
      excerpt: "Learn these easy-to-follow exercises that you can do at home to enhance your stability immediately.",
      date: "May 15, 2023",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y29hY2hpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      category: "Exercises"
    },
    {
      title: "The Science Behind Balance Training and Fall Prevention",
      excerpt: "Discover how specialized balance training can significantly reduce your risk of falls as you age.",
      date: "April 22, 2023",
      image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGJhbGFuY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      category: "Research"
    },
    {
      title: "Balance Training for Seniors: A Comprehensive Guide",
      excerpt: "A complete walkthrough of effective balance techniques specially designed for older adults.",
      date: "March 10, 2023",
      image: "https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHNlbmlvciUyMGV4ZXJjaXNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      category: "Senior Health"
    }
  ];

  return (
    <div className="my-20">
      <h2 className="text-3xl font-bold text-center mb-4">Latest from the Blog</h2>
      <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
        Expert insights and practical tips to improve your balance and overall health
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="h-48 overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-semibold bg-balance-blue/10 text-balance-blue px-2 py-1 rounded">
                  {post.category}
                </span>
                <span className="text-xs text-gray-500">{post.date}</span>
              </div>
              <h3 className="text-lg font-bold mb-2 line-clamp-2">{post.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
              <Button variant="ghost" className="text-balance-blue hover:text-balance-indigo hover:bg-balance-blue/5 p-0">
                Read More <ArrowRight size={16} className="ml-1" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="text-center mt-10">
        <Button variant="outline" className="border-balance-blue text-balance-blue hover:bg-balance-blue/5">
          View All Articles <ArrowRight size={16} className="ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default BlogPreview;
