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

 
// Dialog Components
const Dialog = ({ children, open = false, onOpenChange }) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
      onClick={() => onOpenChange?.(false)}
    >
      <div 
        className="relative"
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

const DialogContent = ({ children, className = "" }) => (
  <div className={`
    w-full max-w-lg bg-white rounded-lg shadow-lg
    animate-in fade-in-0 zoom-in-95
    p-6 relative
    max-h-[90vh] overflow-y-auto
    ${className}
  `}>
    {children}
  </div>
);

const DialogHeader = ({ className = "", children }) => (
  <div className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`}>
    {children}
  </div>
);

const DialogTitle = ({ className = "", children }) => (
  <h2 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>
    {children}
  </h2>
);

const DialogDescription = ({ className = "", children }) => (
  <p className={`text-sm text-gray-500 ${className}`}>
    {children}
  </p>
);

// Tooltip Components
const TooltipProvider = ({ children }) => (
  <div className="relative inline-block">
    {children}
  </div>
);

const TooltipTrigger = ({ asChild, children, ...props }) => {
  const Component = asChild ? 'div' : 'button';
  return (
    <Component 
      {...props}
      className={`inline-block ${props.className || ''}`}
    >
      {children}
    </Component>
  );
};

const TooltipContent = ({ children, className = "" }) => (
  <div className={`
    absolute z-50 px-3 py-2
    bg-gray-900 text-white
    rounded-md shadow-lg
    text-sm
    animate-in fade-in-0 zoom-in-95
    bottom-full mb-2 
    left-1/2 transform -translate-x-1/2
    ${className}
  `}>
    <div className="relative">
      {children}
      <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 
        border-4 border-transparent border-t-gray-900" />
    </div>
  </div>
);

// Badge Component
const Badge = ({ 
  children, 
  className = "", 
  variant = "default" 
}) => {
  const variants = {
    default: "bg-gray-100 text-gray-900 hover:bg-gray-200/80",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-100/80",
    destructive: "bg-red-100 text-red-900 hover:bg-red-100/80",
    outline: "text-gray-900 border border-gray-200 hover:bg-gray-100",
  };

  return (
    <div className={`
      inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold
      transition-colors focus:outline-none
      ${variants[variant]}
      ${className}
    `}>
      {children}
    </div>
  );
};
// Dropdown Menu Components
const DropdownMenu = ({ children }) => (
  <div className="relative inline-block text-left">
    {children}
  </div>
);

const DropdownMenuTrigger = ({ 
  children, 
  asChild = false,
  className = "",
  ...props 
}) => {
  const Component = asChild ? 'div' : 'button';
  return (
    <Component
      className={`inline-flex items-center justify-center ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

const DropdownMenuContent = ({ 
  children, 
  className = "",
  align = "center",
  ...props 
}) => {
  const alignmentStyles = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0"
  };

  return (
    <div
      className={`
        absolute z-50 mt-2 min-w-[8rem] overflow-hidden
        rounded-md border border-gray-200 bg-white p-1
        shadow-md animate-in fade-in-0 zoom-in-95
        dark:border-gray-800 dark:bg-gray-950
        ${alignmentStyles[align]}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

const DropdownMenuItem = ({ 
  children, 
  className = "",
  disabled = false,
  ...props 
}) => (
  <button
    className={`
      relative flex w-full cursor-pointer select-none items-center
      rounded-sm px-2 py-1.5 text-sm outline-none
      transition-colors
      focus:bg-gray-100 focus:text-gray-900
      disabled:pointer-events-none disabled:opacity-50
      dark:focus:bg-gray-800 dark:focus:text-gray-50
      ${className}
    `}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
);

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
  Tooltip,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
  Badge,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
};