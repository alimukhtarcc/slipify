/**
 * Reusable Alert Component
 * Displays success, error, warning, and info messages
 */

import clsx from 'clsx';
import { ALERT_TYPES } from '../../domain/types';

const Alert = ({ 
  type = ALERT_TYPES.INFO, 
  message, 
  onClose, 
  className = '',
  children 
}) => {
  const baseStyles = "px-4 py-3 rounded border";
  
  const typeStyles = {
    [ALERT_TYPES.ERROR]: "bg-red-100 border-red-400 text-red-700",
    [ALERT_TYPES.SUCCESS]: "bg-green-100 border-green-400 text-green-700",
    [ALERT_TYPES.WARNING]: "bg-yellow-100 border-yellow-400 text-yellow-700",
    [ALERT_TYPES.INFO]: "bg-blue-100 border-blue-400 text-blue-700"
  };

  if (!message && !children) {
    return null;
  }

  return (
    <div className={clsx(baseStyles, typeStyles[type], className)}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          {message && <p>{message}</p>}
          {children}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 text-current opacity-70 hover:opacity-100 focus:outline-none"
            aria-label="Close alert"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
