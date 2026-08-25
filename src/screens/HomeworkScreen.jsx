import React, { useState } from 'react';
import { CheckCircle2, Circle, Search, Filter, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';
import { homeworkList as initialHomework } from '../data/dummyData';
import { api } from '../services/api';

export const HomeworkScreen = () => {
  const [list, setList] = useState(initialHomework);
  const [filterSubject, setFilterSubject] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleComplete = async (id) => {
    // Optimistic UI update
    setList(prev => prev.map(item => {
      if (item.id === id) {
        const nextState = !item.completed;
        if (nextState) {
          try {
            confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
          } catch (e) {
            // fallback
          }
        }
        return { ...item, completed: nextState };
      }
      return item;
    }));

    // Trigger backend API if connected
    try {
      await api.toggleHomeworkStatus(id);
    } catch (e) {
      // ignore
    }
  };

  const filteredItems = list.filter(item => {
    const matchesSubject = filterSubject === 'All' || item.subject === filterSubject;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  return (
    <div className="homework-content">
      {/* Search & Subject Filter Bar */}
      <div className="search-filter-bar">
        <div className="form-input-with-icon" style={{ flex: 1 }}>
          <Search size={16} className="input-icon" />
          <input 
            type="text" 
            className="form-input"
            placeholder="Search assignments..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <select 
          value={filterSubject} 
          onChange={(e) => setFilterSubject(e.target.value)}
          className="form-select font-mono"
          style={{ width: 'auto', fontSize: '12px', fontWeight: 600 }}
        >
          <option value="All">All Subjects</option>
          <option value="English">English</option>
          <option value="G.Science">G.Science</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Social Science">Social Science</option>
        </select>
      </div>

      <div className="section-label" style={{ marginTop: '4px' }}>
        <span>ACTIVE ASSIGNMENTS ({filteredItems.length})</span>
      </div>

      {filteredItems.map((item) => (
        <div key={item.id} className="homework-card">
          <div className="homework-card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="subject-tag">
                {item.subject}
              </span>
              <span className="status-pill not-marked" style={{ padding: '2px 8px', fontSize: '10px' }}>
                {item.type}
              </span>
            </div>
            <span className="homework-date-text">{item.date}</span>
          </div>

          <h3 className="homework-title">{item.title}</h3>
          <p className="homework-desc">{item.description}</p>

          <div className="homework-footer">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BookOpen size={14} color="var(--slate)" />
              <span>{item.assignedBy} · {item.classSec}</span>
            </div>

            <button 
              onClick={() => toggleComplete(item.id)}
              className={`btn btn-sm ${item.completed ? 'btn-secondary' : 'btn-primary'}`}
              style={{
                color: item.completed ? 'var(--leaf)' : '#ffffff',
                borderColor: item.completed ? 'var(--leaf-dim)' : 'var(--ink)'
              }}
              title="Click to toggle completion status"
            >
              {item.completed ? (
                <>
                  <CheckCircle2 size={15} color="var(--leaf)" />
                  <span>COMPLETED</span>
                </>
              ) : (
                <>
                  <Circle size={15} />
                  <span>MARK DONE</span>
                </>
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
