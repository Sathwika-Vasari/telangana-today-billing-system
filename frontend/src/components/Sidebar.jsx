import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ userRole }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/advertisers', label: 'Advertisers', icon: '🏢' },
    { path: '/campaigns', label: 'Campaigns', icon: '📢' },
    { path: '/payments', label: 'Payments', icon: '💰' },
    { path: '/reports', label: 'Reports', icon: '📈' },
    { path: '/notifications', label: 'Notifications', icon: '🔔' },
  ];

  const adminItems = [
    { path: '/audit-logs', label: 'Audit Logs', icon: '📋' },
  ];

  return (
    <aside className="bg-gray-900 text-white w-64 min-h-screen p-4">
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive(item.path)
                ? 'bg-primary-600 text-white'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
        {userRole === 'admin' && (
          <div className="pt-4 border-t border-gray-700">
            <p className="text-xs font-semibold text-gray-400 uppercase mb-3">Admin</p>
            {adminItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
