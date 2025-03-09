
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import Button from '@/components/Button';

type FormMode = 'login' | 'register';

const Login = () => {
  const [mode, setMode] = useState<FormMode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        if (name.trim().length < 2) {
          throw new Error('Name must be at least 2 characters');
        }
        await register(name, email, password);
      }
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-28 pb-20 px-4 md:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </h1>
            <p className="text-muted-foreground mt-2">
              {mode === 'login' 
                ? 'Welcome back! Please enter your details.' 
                : 'Create an account to get started.'}
            </p>
          </div>
          
          <div className="bg-card border rounded-lg p-6 md:p-8 shadow-sm">
            {error && (
              <div className="mb-6 p-3 rounded-md bg-destructive/10 text-destructive text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <div className="space-y-1">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Your name"
                    required
                  />
                </div>
              )}
              
              <div className="space-y-1">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="you@example.com"
                  required
                />
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  {mode === 'login' && (
                    <a href="#" className="text-xs text-primary hover:underline">
                      Forgot password?
                    </a>
                  )}
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Password"
                  required
                />
              </div>
              
              <Button
                type="submit"
                className="w-full mt-6"
                isLoading={isSubmitting}
              >
                {mode === 'login' ? 'Sign In' : 'Create Account'}
              </Button>
            </form>
            
            <div className="mt-6 text-center text-sm">
              {mode === 'login' ? (
                <p>
                  Don't have an account?{' '}
                  <button 
                    onClick={toggleMode}
                    className="text-primary hover:underline font-medium"
                  >
                    Sign up
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button 
                    onClick={toggleMode}
                    className="text-primary hover:underline font-medium"
                  >
                    Sign in
                  </button>
                </p>
              )}
            </div>
            
            <div className="mt-8 pt-6 border-t text-xs text-center text-muted-foreground">
              <p>
                For demo purposes, you can log in with:<br />
                Email: demo@example.com<br />
                Password: password
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Login;
