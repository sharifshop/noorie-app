import React, { useState } from 'react';
import { CheckCircle2, Circle, Search, Filter } from 'lucide-react';
import confetti from 'canvas-confetti';
import { homeworkList as initialHomework } from '../data/dummyData';

export const HomeworkScreen = () => {
  const [list, setList] = useState(initialHomework);
  const [filterSubject, setFilterSubject] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleComplete = (id) => {
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
  };

  const filteredItems = list.filter(item => {
    const matchesSubject = filterSubject === 'All' || item.subject === filterSubject;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  return (
    <div className="homework-content">
      {/* Search & Filter Bar */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input 
            type="text" 
            placeholder="Search homework..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              borderRadius: '20px',
              border: '1px solid #cbd5e1',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          />
        </div>

        <select 
          value={filterSubject} 
          onChange={(e) => setFilterSubject(e.target.value)}
          style={{
            padding: '8px 12px',
            borderRadius: '20px',
            border: '1px solid #cbd5e1',
            fontSize: '0.82rem',
            background: '#ffffff',
            fontWeight: '600',
            outline: 'none'
          }}
        >
          <option value="All">All Subjects</option>
          <option value="English">English</option>
          <option value="G.Science">G.Science</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Social Science">Social Science</option>
        </select>
      </div>

      {filteredItems.map((item) => (
        <div key={item.id} className="homework-card">
          <div className="homework-tags-row">
            <div className="tags-left">
              <span 
                className="subject-pill" 
                style={{ backgroundColor: item.subjectBg, color: item.subjectColor }}
              >
                {item.subject}
              </span>
              <span className="type-pill">{item.type}</span>
            </div>
            <span className="homework-date">{item.date}</span>
          </div>

          <h3 className="homework-title">{item.title}</h3>
          <p className="homework-desc">{item.description}</p>

          <div className="homework-teacher-footer">
            <div className="teacher-info">
              <span className="teacher-avatar-icon">🧑‍🏫</span>
              <span>Assigned by {item.assignedBy} • {item.classSec}</span>
            </div>

            <button 
              onClick={() => toggleComplete(item.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                color: item.completed ? '#10b981' : '#94a3b8',
                fontWeight: '700',
                fontSize: '0.8rem'
              }}
              title="Click to toggle submission status"
            >
              {item.completed ? (
                <>
                  <CheckCircle2 size={20} color="#10b981" /> Completed
                </>
              ) : (
                <>
                  <Circle size={20} color="#94a3b8" /> Mark Done
                </>
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
