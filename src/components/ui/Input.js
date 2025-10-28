/**
 * Reusable Input Component
 * Handles form input with consistent styling and validation
 */

import clsx from 'clsx';

const Input = ({
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  label,
  required = false,
  disabled = false,
  error = null,
  className = '',
  ...props
}) => {
  const baseStyles = "w-full bg-neutral-100 rounded-md block min-w-0 grow p-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6";
  const errorStyles = "border border-red-400 focus:border-red-500";
  const disabledStyles = "opacity-50 cursor-not-allowed bg-gray-50";

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label 
          htmlFor={id || name} 
          className="block text-sm/6 font-medium text-neutral-500 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={id || name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={clsx(
          baseStyles,
          error && errorStyles,
          disabled && disabledStyles
        )}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
