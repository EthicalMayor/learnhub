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
    Input
  };

  