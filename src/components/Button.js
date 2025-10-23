
import clsx from "clsx";

const Button = ({ label, onClick, type = "primary", disabled = false }) => {
  const baseStyles = "px-4 py-2 rounded-lg font-semibold text-sm transition-colors";
  
  const typeStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  const disabledStyles = "opacity-50 cursor-not-allowed";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(baseStyles, typeStyles[type], disabled && disabledStyles)}
    >
      {label}
    </button>
  );
};

export default Button;
