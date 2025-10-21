
import clsx from "clsx";

const Button = ({ label, onClick, type = "primary" }) => {
  const baseStyles = "px-4 py-2 rounded-lg font-semibold text-sm transition-colors";
  
  const typeStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      onClick={onClick}
      className={clsx(baseStyles, typeStyles[type])}
    >
      {label}
    </button>
  );
};

export default Button;
