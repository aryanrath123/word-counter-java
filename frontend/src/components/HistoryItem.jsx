import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

function HistoryItem({ stats, onClick }) {
  // Removed unused theme variable since it's not used in the component
  return (
    <div className="history-item" onClick={onClick}>
      <div className="history-item-content">
        <div className="history-stats">
          <span>{stats.wordCount} words</span>
          <span>•</span>
          <span>{stats.characterCount} chars</span>
        </div>
        <p className="history-preview">
          {stats.originalText?.substring(0, 60)}...
        </p>
      </div>
    </div>
  );
}

export default HistoryItem;