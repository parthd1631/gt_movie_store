import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <p className="flex items-center"><Phone className="h-5 w-5 mr-2" /> (555) 123-4567</p>
              <p className="flex items-center"><Mail className="h-5 w-5 mr-2" /> contact@gtmoviestore.com</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300"><Facebook className="h-6 w-6" /></a>
              <a href="#" className="hover:text-gray-300"><Twitter className="h-6 w-6" /></a>
              <a href="#" className="hover:text-gray-300"><Instagram className="h-6 w-6" /></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Address</h3>
            <p>123 Movie Street</p>
            <p>Hollywood, CA 90028</p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; 2024 GT Movie Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};