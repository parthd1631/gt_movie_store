import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Film, Sun, Moon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

export const Navbar: React.FC = () => {
  const { cart } = useCart();
  const { theme, toggleTheme } = useTheme();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800 shadow-md'} transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Film className="h-8 w-8" />
            <span className="text-xl font-bold">GT Movie Store</span>
          </Link>
          
          <div className="flex items-center space-x-8">
            <Link to="/collection" className="hover:text-blue-500 transition-colors">Collection</Link>
            <Link to="/about" className="hover:text-blue-500 transition-colors">About Us</Link>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-700/10 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <Link to="/cart" className="relative hover:text-blue-500 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};