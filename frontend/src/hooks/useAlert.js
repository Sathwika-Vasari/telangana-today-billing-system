import { useState, useCallback } from 'react';

const useAlert = () => {
  const [alerts, setAlerts] = useState([]);

  const addAlert = useCallback((message, type = 'info', duration = 5000) => {
    const id = Date.now();
    const alert = { id, message, type };
    setAlerts((prev) => [...prev, alert]);

    if (duration) {
      setTimeout(() => {
        removeAlert(id);
      }, duration);
    }

    return id;
  }, []);

  const removeAlert = useCallback((id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }, []);

  const success = useCallback((message, duration) => {
    addAlert(message, 'success', duration);
  }, [addAlert]);

  const error = useCallback((message, duration) => {
    addAlert(message, 'error', duration);
  }, [addAlert]);

  const warning = useCallback((message, duration) => {
    addAlert(message, 'warning', duration);
  }, [addAlert]);

  const info = useCallback((message, duration) => {
    addAlert(message, 'info', duration);
  }, [addAlert]);

  return {
    alerts,
    addAlert,
    removeAlert,
    success,
    error,
    warning,
    info,
  };
};

export default useAlert;
