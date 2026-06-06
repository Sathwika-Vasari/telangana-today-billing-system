import React from 'react';

const Header = ({ user, onLogout }) => {
  return (
    <header className="bg-primary-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <span className="text-primary-600 font-bold text-lg">TT</span>
          </div>
          <h1 className="text-xl font-bold">Telangana Today - Billing</h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-sm opacity-90">Welcome</p>
            <p className="font-semibold">{user?.name || 'User'}</p>
          </div>
          <button
            onClick={onLogout}
            className="bg-white text-primary-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
