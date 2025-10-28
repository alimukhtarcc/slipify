/**
 * Reusable Form Field Component
 * Combines Input with consistent field layout
 */

import Input from './Input';

const FormField = ({
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
  return (
    <Input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      label={label}
      required={required}
      disabled={disabled}
      error={error}
      className={className}
      {...props}
    />
  );
};

export default FormField;
