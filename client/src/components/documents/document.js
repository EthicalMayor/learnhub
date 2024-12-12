import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import {
  Plus,
  FileText,
  Edit,
  Trash2,
  Users,
  Clock,
  MoreVertical
} from 'lucide-react';

// Provisional Custom Components
const Card = ({ children, className, ...props }) => (
  <div className={`border rounded-lg shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader = ({ children, className, ...props }) => (
  <div className={`p-4 border-b ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className, ...props }) => (
  <h2 className={`text-xl font-semibold ${className}`} {...props}>
    {children}
  </h2>
);

const CardContent = ({ children, className, ...props }) => (
  <div className={`p-4 ${className}`} {...props}>
    {children}
  </div>
);

const Button = ({ children, onClick, className, disabled, variant = 'primary', ...props }) => {
  const variantStyles = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    outline: 'border border-gray-300 bg-white hover:bg-gray-100',
    ghost: 'hover:bg-gray-100'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4 py-2 rounded-md transition-colors 
        ${variantStyles[variant]} 
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {React.Children.map(children, child => 
          React.cloneElement(child, { onClose: () => onOpenChange(false) })
        )}
      </div>
    </div>
  );
};

const DialogContent = ({ children, onClose }) => (
  <div className="p-6">
    {children}
    <button 
      onClick={onClose} 
      className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
    >
      ✕
    </button>
  </div>
);

const DialogHeader = ({ children }) => (
  <div className="border-b pb-4 mb-4">
    {children}
  </div>
);

const DialogTitle = ({ children }) => (
  <h2 className="text-xl font-semibold">{children}</h2>
);

const DialogDescription = ({ children }) => (
  <p className="text-gray-500 text-sm">{children}</p>
);

const DialogFooter = ({ children }) => (
  <div className="flex justify-end space-x-2 border-t pt-4 mt-4">
    {children}
  </div>
);

const Input = ({ value, onChange, className, ...props }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    className={`border rounded-md px-3 py-2 w-full ${className}`}
    {...props}
  />
);

const Label = ({ children, htmlFor, className }) => (
  <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 ${className}`}>
    {children}
  </label>
);

const Select = ({ value, onValueChange, children }) => {
  const handleChange = (e) => {
    onValueChange(e.target.value);
  };

  return (
    <select 
      value={value} 
      onChange={handleChange}
      className="border rounded-md px-3 py-2 w-full"
    >
      {children}
    </select>
  );
};

const SelectTrigger = ({ children }) => children;
const SelectValue = ({ placeholder }) => null;
const SelectContent = ({ children }) => children;
const SelectItem = ({ value, children }) => (
  <option value={value}>{children}</option>
);

const DropdownMenu = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      {React.Children.map(children, child => 
        React.cloneElement(child, { 
          onClick: () => setIsOpen(!isOpen),
          'aria-expanded': isOpen 
        })
      )}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
          {React.Children.map(
            children[1].props.children, 
            item => React.cloneElement(item, { 
              onClick: () => {
                item.props.onSelect?.();
                setIsOpen(false);
              }
            })
          )}
        </div>
      )}
    </div>
  );
};

const DropdownMenuTrigger = ({ children, ...props }) => children;
const DropdownMenuContent = ({ children }) => children;
const DropdownMenuItem = ({ children, onSelect, className, ...props }) => (
  <div 
    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${className}`} 
    onClick={onSelect}
    {...props}
  >
    {children}
  </div>
);

// Tooltip Placeholders
const TooltipProvider = ({ children }) => children;
const Tooltip = ({ children }) => children;
const TooltipTrigger = ({ children }) => children;
const TooltipContent = ({ children }) => null;

// Rest of the Document Management Component remains the same as in the previous implementation
const Document = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newDocument, setNewDocument] = useState({
    title: '',
    type: 'Study Notes'
  });

  const fetchDocuments = useCallback(async () => {
    try {
      const response = await axios.get('/api/documents');
      setDocuments(response.data);
    } catch (error) {
      console.error('Failed to fetch documents:', error);
    }
  }, []);

  const createDocument = async () => {
    try {
      const documentData = {
        title: newDocument.title,
        type: newDocument.type,
        id: `doc-${Date.now()}`,
        content: '',
        owner: 'current_user',
        collaborators: [],
        lastModified: new Date().toISOString(),
        permissions: {
          view: ['current_user'],
          edit: ['current_user']
        }
      };

      const response = await axios.post('/api/documents', documentData);
      setDocuments(prev => [...prev, response.data]);
      setIsCreateDialogOpen(false);
      setNewDocument({ title: '', type: 'Study Notes' });
    } catch (error) {
      console.error('Document creation failed:', error);
    }
  };

  const deleteDocument = async (id) => {
    try {
      await axios.delete(`/api/documents/${id}`);
      setDocuments(prev => prev.filter(doc => doc.id !== id));
    } catch (error) {
      console.error('Failed to delete document:', error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center">
              <FileText className="mr-2" /> Document Management
            </CardTitle>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="mr-2" /> Create Document
            </Button>
          </CardHeader>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map(doc => (
            <Card key={doc.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row justify-between items-center">
                <div className="flex items-center space-x-2">
                  <FileText className="text-blue-500" />
                  <h3 className="font-semibold">{doc.title}</h3>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem 
                      onSelect={() => setSelectedDocument(doc)}
                      className="flex items-center"
                    >
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onSelect={() => deleteDocument(doc.id)}
                      className="flex items-center text-red-500"
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm text-gray-500">
                  <div>
                    <Users className="mr-1 h-4 w-4 inline" /> 
                    {doc.collaborators.length} Collaborators
                  </div>
                  <div>
                    <Clock className="mr-1 h-4 w-4 inline" /> 
                    {new Date(doc.lastModified).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Document</DialogTitle>
              <DialogDescription>
                Fill in the details for your new document.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={newDocument.title}
                  onChange={(e) => setNewDocument(prev => ({
                    ...prev, 
                    title: e.target.value
                  }))}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select 
                  value={newDocument.type}
                  onValueChange={(value) => setNewDocument(prev => ({
                    ...prev, 
                    type: value
                  }))}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Study Notes">Study Notes</SelectItem>
                    <SelectItem value="Research">Research</SelectItem>
                    <SelectItem value="Presentation">Presentation</SelectItem>
                    <SelectItem value="Spreadsheet">Spreadsheet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsCreateDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={createDocument}
                disabled={!newDocument.title}
              >
                Create Document
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Document;