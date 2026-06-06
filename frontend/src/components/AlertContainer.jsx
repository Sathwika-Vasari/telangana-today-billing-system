import React, { useEffect } from 'react';

const AlertContainer = ({ alerts, onRemove }) => {
  return (
    <div className="fixed top-4 right-4 space-y-2 z-50">
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          alert={alert}
          onClose={() => onRemove(alert.id)}
        />
      ))}
    </div>
  );
};

const Alert = ({ alert, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = {
    success: 'bg-success-50 border-success-200',
    error: 'bg-danger-50 border-danger-200',
    warning: 'bg-warning-50 border-warning-200',
    info: 'bg-primary-50 border-primary-200',
  }[alert.type];

  const textColor = {
    success: 'text-success-800',
    error: 'text-danger-800',
    warning: 'text-warning-800',
    info: 'text-primary-800',
  }[alert.type];

  return (
    <div className={`${bgColor} border rounded-lg p-4 shadow-lg flex justify-between items-start`}>
      <p className={`${textColor} font-medium`}>{alert.message}</p>
      <button
        onClick={onClose}
        className={`${textColor} ml-4 font-bold hover:opacity-50`}
      >
        ✕
      </button>
    </div>
  );
};

export default AlertContainer;
