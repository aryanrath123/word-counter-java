import { useState } from 'react';
import WordCounter from './components/WordCounter';
import { ThemeProvider } from './contexts/ThemeContext';
import './styles/themes.css';

function App() {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeProvider value={{ theme, toggleTheme }}>
      <div className={`app ${theme}-theme`}>
        <WordCounter />
      </div>
    </ThemeProvider>
  );
}

export default App;