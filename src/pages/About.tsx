import React from 'react';
import { Film } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <Film className="h-16 w-16 mx-auto mb-4 text-blue-600" />
          <h1 className="text-4xl font-bold mb-4">About GT Movie Store</h1>
          <p className="text-xl text-gray-600">Your Premier Destination for Movie Entertainment</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2020, GT Movie Store has grown from a small local shop to become one of the leading online movie retailers. Our passion for cinema drives us to provide the best selection of movies to our customers.
            </p>
            <p className="text-gray-600">
              We believe that every movie tells a unique story, and we're here to help you build your perfect collection. From classic films to the latest releases, we carefully curate our selection to ensure the highest quality entertainment for our customers.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-4">Our Culture</h2>
            <ul className="space-y-4 text-gray-600">
              <li>
                <strong className="text-gray-800">Customer First:</strong> We prioritize our customers' satisfaction above all else.
              </li>
              <li>
                <strong className="text-gray-800">Quality:</strong> We only stock authentic, high-quality movies from reliable sources.
              </li>
              <li>
                <strong className="text-gray-800">Innovation:</strong> We continuously improve our platform to enhance your shopping experience.
              </li>
              <li>
                <strong className="text-gray-800">Community:</strong> We foster a community of movie enthusiasts through our social media channels and events.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Why Choose GT Movie Store?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
              <p className="text-gray-600">Thousands of titles across all genres</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
              <p className="text-gray-600">Quick and reliable delivery to your doorstep</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
              <p className="text-gray-600">Dedicated team to assist with your needs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};