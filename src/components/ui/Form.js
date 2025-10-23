/**
 * Reusable Form Component
 * Provides consistent form layout and behavior
 */

import { useState } from 'react';
import clsx from 'clsx';

const Form = ({
  children,
  onSubmit,
  className = '',
  loading = false,
  disabled = false,
  ...props
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (loading || disabled || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit?.(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx('flex flex-col gap-6', className)}
      {...props}
    >
      {children}
    </form>
  );
};

export default Form;
