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
  
  export {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    Alert,
    AlertTitle,
    AlertDescription
  };