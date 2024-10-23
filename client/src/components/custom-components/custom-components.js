// Card Components
const Card = ({ children, className = "" }) => (
    <div className={`rounded-lg border bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );
  
  const CardHeader = ({ children, className = "" }) => (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
      {children}
    </div>
  );
  
  const CardTitle = ({ children, className = "" }) => (
    <h3 className={`text-xl font-semibold leading-none tracking-tight ${className}`}>
      {children}
    </h3>
  );
  
  const CardContent = ({ children, className = "" }) => (
    <div className={`p-6 pt-0 ${className}`}>
      {children}
    </div>
  );
  
  // Alert Components
  const Alert = ({ children, className = "" }) => (
    <div
      role="alert"
      className={`relative rounded-lg border p-4 ${className}`}
    >
      {children}
    </div>
  );
  
  const AlertTitle = ({ children, className = "" }) => (
    <h5 className={`mb-1 font-medium leading-none tracking-tight ${className}`}>
      {children}
    </h5>
  );
  
  const AlertDescription = ({ children, className = "" }) => (
    <div className={`text-sm ${className}`}>
      {children}
    </div>
  );
  // Button Component
const Button = ({
    children,
    className = "",
    variant = "default",
    size = "default",
    disabled = false,
    onClick,
    ...props
  }) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    
    const variants = {
      default: "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700",
      outline: "border border-gray-200 bg-white hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800",
      ghost: "hover:bg-gray-100 dark:hover:bg-gray-800",
    };
  
    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
    };
  
    return (
      <button
        className={`
          ${baseStyles}
          ${variants[variant]}
          ${sizes[size]}
          ${className}
        `}
        disabled={disabled}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  };
  
  // Modal Component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
        <button className="absolute top-4 right-4 text-gray-600" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

// Tooltip Component
const Tooltip = ({ children, text }) => {
  return (
    <div className="relative inline-block">
      {children}
      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 p-2 bg-gray-800 text-white text-sm rounded opacity-0 transition-opacity duration-200 ease-in-out">
        {text}
      </div>
    </div>
  );
};

  // Input Component
  const Input = ({
    className = "",
    type = "text",
    disabled = false,
    placeholder,
    ...props
  }) => {
    return (
      <input
        type={type}
        className={`
          flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm
          placeholder:text-gray-500 
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
          disabled:cursor-not-allowed disabled:opacity-50
          dark:border-gray-800 dark:bg-gray-950 dark:placeholder:text-gray-400
          ${className}
        `}
        disabled={disabled}
        placeholder={placeholder}
        {...props}
      />
    );
  };

  
  export {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    Alert,
    AlertTitle,
    AlertDescription,
    Button,
    Input,
    Modal,
    Tooltip
  };

  