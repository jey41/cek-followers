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
      className="relative w-14 h-7 rounded-full bg-border-light border border-border-dark/30 transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 group"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Track background icons */}
      <Sun className="absolute left-1.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-amber-400 opacity-40 transition-opacity duration-300" />
      <Moon className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-indigo-300 opacity-40 transition-opacity duration-300" />
      
      {/* Sliding knob */}
      <span 
        className={`absolute top-[3px] left-[3px] w-5 h-5 rounded-full shadow-md flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] ${
          isDark 
            ? 'translate-x-7 bg-indigo-500' 
            : 'translate-x-0 bg-amber-400'
        }`}
      >
        {isDark ? (
          <Moon className="w-3 h-3 text-white" />
        ) : (
          <Sun className="w-3 h-3 text-white" />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;
