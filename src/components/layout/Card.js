/**
 * Reusable Card Component
 * Provides consistent card styling and layout
 */

import clsx from 'clsx';

const Card = ({
  children,
  className = '',
  padding = 'p-8',
  shadow = 'shadow-sm',
  rounded = 'rounded-xl',
  background = 'bg-white',
  ...props
}) => {
  const baseStyles = clsx(
    background,
    padding,
    shadow,
    rounded
  );

  return (
    <div className={clsx(baseStyles, className)} {...props}>
      {children}
    </div>
  );
};

export default Card;
