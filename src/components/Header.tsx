
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 transition-all duration-300',
        isScrolled ? 'glass-morphism' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-medium tracking-tight">
          <span className="font-semibold">blog</span>
          <span className="text-muted-foreground">folio</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          {['/', '/create', '/about'].map((path) => {
            const label = path === '/' ? 'Home' : path === '/create' ? 'New Post' : 'About';
            return (
              <Link 
                key={path} 
                to={path}
                className={cn(
                  'relative text-sm font-medium transition-colors duration-200 hover:text-primary',
                  location.pathname === path ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {label}
                {location.pathname === path && (
                  <motion.div 
                    layoutId="navigation-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-sm text-muted-foreground hidden md:inline-block">
                Hello, {user.name}
              </span>
              <button 
                onClick={logout}
                className="text-sm font-medium px-4 py-2 rounded-md border border-input hover:bg-accent transition-colors duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <Link 
              to="/login"
              className="text-sm font-medium px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
