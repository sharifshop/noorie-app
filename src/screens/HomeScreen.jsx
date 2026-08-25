import React from 'react';
import { 
  Check, 
  Clock, 
  Bell, 
  BookOpen, 
  FileText, 
  BarChart3, 
  Palmtree, 
  CalendarCheck, 
  FileCheck, 
  ClipboardList, 
  CreditCard, 
  Users 
} from 'lucide-react';
import { quickModules } from '../data/dummyData';

const iconMap = {
  Check,
  Clock,
  Bell,
  BookOpen,
  FileText,
  BarChart3,
  Palmtree,
  CalendarCheck,
  FileCheck,
  ClipboardList,
  CreditCard,
  Users
};

export const HomeScreen = ({ onNavigate, onOpenModal }) => {
  const handleModuleClick = (module) => {
    if (module.route) {
      onNavigate(module.route);
    } else if (module.modal) {
      onOpenModal(module.modal);
    }
  };

  return (
    <div className="home-screen-content">
      <h2 className="section-title">Quick Access Modules</h2>

      <div className="modules-grid">
        {quickModules.map((module) => {
          const IconComp = iconMap[module.icon] || FileText;
          return (
            <div 
              key={module.id} 
              className="module-card"
              onClick={() => handleModuleClick(module)}
            >
              <div 
                className="module-icon-box"
                style={{ backgroundColor: module.bg, color: module.iconColor }}
              >
                <IconComp size={24} />
                {module.badge && (
                  <span className="module-card-badge">{module.badge}</span>
                )}
              </div>
              <span className="module-card-title">{module.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
