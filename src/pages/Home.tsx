import React from 'react';
import { Star, Play, Award, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { movies } from '../data/movies';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

export const Home: React.FC = () => {
  const { addToCart } = useCart();
  const { theme } = useTheme();
  const featuredMovies = movies.filter(movie => movie.topSeller).slice(0, 3);
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative h-[600px] bg-[url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center">
          <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-gray-900' : 'from-gray-50'} via-transparent to-transparent z-20`} />
          <div className="relative z-30 max-w-7xl mx-auto px-4 h-full flex flex-col justify-center items-start">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Your Gateway to <span className="text-blue-500">Cinema Magic</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl">
              Discover an extensive collection of timeless classics and latest blockbusters. 
              Start your movie journey with GT Movie Store today.
            </p>
            <Link 
              to="/collection" 
              className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className={`${isDark ? 'bg-gray-900' : 'bg-gray-100'} py-16 transition-colors duration-200`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl text-center shadow-lg transition-colors duration-200`}>
              <Play className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                Instant Access
              </h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Get immediate access to your favorite movies after purchase
              </p>
            </div>
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl text-center shadow-lg transition-colors duration-200`}>
              <Award className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                Premium Quality
              </h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Experience movies in stunning high definition quality
              </p>
            </div>
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl text-center shadow-lg transition-colors duration-200`}>
              <Truck className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                Fast Delivery
              </h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Quick shipping for physical copies worldwide
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Movies Section */}
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} py-16 transition-colors duration-200`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
              Featured Movies
            </h2>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-lg`}>
              Our hand-picked selection of must-watch films
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredMovies.map(movie => (
              <div 
                key={movie.id} 
                className={`${isDark ? 'bg-gray-900' : 'bg-gray-100'} rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 shadow-lg`}
              >
                <div className="relative">
                  <img 
                    src={movie.image} 
                    alt={movie.title} 
                    className="w-full h-64 object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-gray-900' : 'from-gray-800'} to-transparent opacity-60`} />
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                    {movie.title}
                  </h3>
                  <div className="flex items-center mb-4">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-2 text-yellow-400">{movie.rating}</span>
                    <span className={`ml-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>| {movie.genre}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      ${movie.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => addToCart(movie)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/collection" 
              className="inline-flex items-center text-blue-500 hover:text-blue-400 transition-colors duration-300"
            >
              View All Movies
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};