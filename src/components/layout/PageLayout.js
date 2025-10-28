/**
 * Reusable Page Layout Component
 * Provides consistent page structure and styling
 */

import clsx from 'clsx';

const PageLayout = ({
  children,
  className = '',
  background = 'bg-neutral-100',
  minHeight = 'min-h-screen',
  centered = true,
  ...props
}) => {
  const baseStyles = clsx(
    background,
    minHeight,
    'flex flex-col',
    centered && 'justify-center items-center'
  );

  return (
    <div className={clsx(baseStyles, className)} {...props}>
      {children}
    </div>
  );
};

export default PageLayout;
