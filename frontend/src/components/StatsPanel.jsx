import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

function StatsPanel({ stats, text }) {
  const { theme } = useContext(ThemeContext);
  
  // Calculate keyword density (top 5 keywords)
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const wordCounts = {};
  
  words.forEach(word => {
    if (word.length > 3) { // Ignore short words
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    }
  });
  
  const sortedKeywords = Object.entries(wordCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="stats-panel">
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Words</h3>
          <p>{stats.wordCount}</p>
        </div>
        <div className="stat-card">
          <h3>Characters</h3>
          <p>{stats.characterCount}</p>
        </div>
        <div className="stat-card">
          <h3>Sentences</h3>
          <p>{stats.sentenceCount}</p>
        </div>
        <div className="stat-card">
          <h3>Reading Time</h3>
          <p>{stats.readingTime} min</p>
        </div>
      </div>
      
      <div className="keyword-density">
        <h3>Top Keywords</h3>
        <div className="keyword-list">
          {sortedKeywords.map(([word, count]) => (
            <div key={word} className="keyword-item">
              <span>{word}</span>
              <span>({count})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StatsPanel;