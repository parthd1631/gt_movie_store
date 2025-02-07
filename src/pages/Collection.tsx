import React, { useState } from 'react';
import { Search, Star, Filter } from 'lucide-react';
import { movies } from '../data/movies';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

export const Collection: React.FC = () => {
  const { addToCart } = useCart();
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const genres = Array.from(new Set(movies.map(movie => movie.genre)));

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = !selectedGenre || movie.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      {/* Header Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative h-[300px] bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center">
          <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-gray-900' : 'from-gray-50'} via-transparent to-transparent z-20`} />
          <div className="relative z-30 max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
              Movie Collection
            </h1>
            <p className="text-xl text-gray-200 text-center max-w-2xl mx-auto">
              Browse through our extensive collection of movies across all genres
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className={`${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-8 transition-colors duration-200`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 -mt-16 relative z-30 shadow-xl transition-colors duration-200`}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search movies..."
                  className={`w-full pl-12 pr-4 py-3 rounded-xl ${
                    isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
                  } placeholder-gray-400 border-2 ${
                    isDark ? 'border-gray-600' : 'border-gray-200'
                  } focus:border-blue-500 focus:outline-none transition-colors`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="relative min-w-[200px]">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  className={`w-full pl-12 pr-4 py-3 rounded-xl ${
                    isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
                  } border-2 ${
                    isDark ? 'border-gray-600' : 'border-gray-200'
                  } focus:border-blue-500 focus:outline-none appearance-none cursor-pointer transition-colors`}
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                >
                  <option value="">All Genres</option>
                  {genres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Movies Grid Section */}
      <div className={`${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-12 transition-colors duration-200`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredMovies.map(movie => (
              <div
                key={movie.id}
                className={`${
                  isDark ? 'bg-gray-800' : 'bg-white'
                } rounded-xl overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl`}
              >
                <div className="relative">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-gray-900' : 'from-gray-800'} to-transparent opacity-60`} />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {movie.genre}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                    {movie.title}
                  </h3>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-2 text-yellow-400 font-semibold">{movie.rating}</span>
                    </div>
                    <div className="ml-auto">
                      <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        ${movie.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart(movie)}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredMovies.length === 0 && (
            <div className="text-center py-12">
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-xl`}>
                No movies found matching your criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};