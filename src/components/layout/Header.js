/**
 * Reusable Header Component
 * Provides consistent header layout with logo and title
 */

import clsx from 'clsx';

const Header = ({
  logo,
  title,
  subtitle,
  description,
  additionalDescription,
  className = '',
  logoClassName = '',
  titleClassName = '',
  subtitleClassName = '',
  descriptionClassName = '',
  additionalDescriptionClassName = '',
  ...props
}) => {
  return (
    <div className={clsx('text-center', className)} {...props}>
      {logo && (
        <div className="flex justify-center items-center gap-2 mb-4">
          <img src={logo} alt="Logo" className={logoClassName} />
          {title && (
            <h1 className={clsx('text-3xl', titleClassName)}>
              {title}
            </h1>
          )}
        </div>
      )}
      
      {subtitle && (
        <p className={clsx('text-xl mt-3', subtitleClassName)}>
          {subtitle}
        </p>
      )}
      
      {description && (
        <p className={clsx('text-xl mt-3 font-medium', descriptionClassName)}>
          {description}
        </p>
      )}
      
      {additionalDescription && (
        <p className={clsx('mt-3', additionalDescriptionClassName)}>
          {additionalDescription}
        </p>
      )}
    </div>
  );
};

export default Header;
