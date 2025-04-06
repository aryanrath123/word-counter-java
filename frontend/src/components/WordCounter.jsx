import { useState, useContext } from 'react'; // Removed unused useEffect
import { countWords, getTextStats } from '../utils/api';
import { ThemeContext } from '../contexts/ThemeContext';
import StatsPanel from './StatsPanel';
import HistoryItem from './HistoryItem';
import '../styles/main.css';

function WordCounter() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [text, setText] = useState('');
  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('analyzer');

  const analyzeText = async () => {
    if (!text.trim()) return;
    
    setIsAnalyzing(true);
    try {
      const wordCount = await countWords(text);
      const textStats = await getTextStats(text);
      
      const newStats = {
        ...textStats,
        wordCount,
        readingTime: Math.ceil(wordCount / 200), // avg 200 wpm reading speed
        timestamp: new Date().toISOString()
      };
      
      setStats(newStats);
      setHistory(prev => [newStats, ...prev.slice(0, 4)]);
    } catch (error) {
      console.error("Analysis error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      analyzeText();
    }
  };

  return (
    <div className="word-counter-app">
      <header className="app-header">
        <div className="header-content">
          <h1>WordMetrics</h1>
          <button 
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
        
        <div className="tabs">
          <button 
            className={activeTab === 'analyzer' ? 'active' : ''}
            onClick={() => setActiveTab('analyzer')}
          >
            Text Analyzer
          </button>
          <button 
            className={activeTab === 'history' ? 'active' : ''}
            onClick={() => setActiveTab('history')}
          >
            History
          </button>
        </div>
      </header>

      <main className="app-main">
        {activeTab === 'analyzer' ? (
          <>
            <div className="text-editor-container">
              <div className="editor-header">
                <h2>Your Text</h2>
                <div className="real-time-stats">
                  <span>{text.length} chars</span>
                  <span>{text.trim() ? text.trim().split(/\s+/).length : 0} words</span>
                </div>
              </div>
              
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste or type your text here..."
                onKeyDown={handleKeyDown}
                autoFocus
              />
              
              <div className="action-buttons">
                <button 
                  onClick={analyzeText}
                  disabled={isAnalyzing || !text.trim()}
                  className="analyze-button"
                >
                  {isAnalyzing ? (
                    <>
                      <span className="spinner"></span>
                      Analyzing...
                    </>
                  ) : (
                    'Analyze Text (Ctrl+Enter)'
                  )}
                </button>
                
                <button 
                  onClick={() => setText('')}
                  disabled={!text}
                  className="clear-button"
                >
                  Clear
                </button>
              </div>
            </div>
            
            {stats && <StatsPanel stats={stats} text={text} />}
          </>
        ) : (
          <div className="history-container">
            <h2>Recent Analyses</h2>
            {history.length > 0 ? (
              <div className="history-list">
                {history.map((item, index) => (
                  <HistoryItem 
                    key={index} 
                    stats={item} 
                    onClick={() => {
                      setText(item.originalText || '');
                      setActiveTab('analyzer');
                    }}
                  />
                ))}
              </div>
            ) : (
              <p className="empty-history">No analysis history yet</p>
            )}
          </div>
        )}
      </main>
      
      <footer className="app-footer">
        <p>WordMetrics Pro - Advanced Text Analysis Tool</p>
      </footer>
    </div>
  );
}

export default WordCounter;