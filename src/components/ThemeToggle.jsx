import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('ig_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('ig_theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className={`relative w-9.5 h-9.5 rounded-full flex items-center justify-center overflow-hidden transition-all duration-500 border focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2 active:scale-90 group cursor-pointer ${
        isDark
          ? 'bg-surface/40 hover:bg-surface/80 border-border-light/20 shadow-[0_0_10px_rgba(0,0,0,0.2)] hover:shadow-[0_0_20px_rgba(99,102,241,0.35)] hover:border-indigo-500/40'
          : 'bg-surface/40 hover:bg-surface/80 border-border-light shadow-sm hover:shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:border-amber-500/40'
      }`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Premium ambient gradient backdrop */}
      <span
        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
          isDark
            ? 'opacity-0 bg-gradient-to-tr from-amber-400/20 to-orange-500/10'
            : 'opacity-100 bg-gradient-to-tr from-amber-100/30 to-amber-200/20'
        }`}
      />
      <span
        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
          isDark
            ? 'opacity-100 bg-gradient-to-tr from-indigo-950/20 via-indigo-900/10 to-purple-950/20'
            : 'opacity-0'
        }`}
      />

      {/* Interactive Icons Container */}
      <div className="relative w-5 h-5 flex items-center justify-center z-10">
        {/* Sun Icon */}
        <Sun
          className={`absolute w-5 h-5 text-amber-500 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            isDark 
              ? 'opacity-0 rotate-[-120deg] scale-50 pointer-events-none' 
              : 'opacity-100 rotate-0 scale-100'
          } group-hover:animate-[spin_10s_linear_infinite]`}
        />
        
        {/* Moon Icon */}
        <Moon
          className={`absolute w-5 h-5 text-indigo-400 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            isDark 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 rotate-[120deg] scale-50 pointer-events-none'
          } group-hover:rotate-[-12deg]`}
        />
      </div>
    </button>
  );
};

export default ThemeToggle;
