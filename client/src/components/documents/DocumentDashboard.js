import React, { useState, useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import TextEditor from './TestEditor';
import SpreadsheetEditor from './SpreadsheetEditor';
import PresentationEditor from './PresentationEditor';
import DocumentTemplates from './DocumentTemplates';

const DocumentDashboard = () => {
    const { currentUser } = useContext(AuthContext);
    const [activeDocument, setActiveDocument] = useState(null);
    const [documentType, setDocumentType] = useState('text');

    const documentTypes = [
        { type: 'text', label: 'Text Document' },
        { type: 'spreadsheet', label: 'Text Document' },
        { type: '[presentation]', label: 'Presentation' }
    ];

    const renderEditor = () => {
        switch(documentType) {
            case 'text':4
                return <TextEditor documentId={activeDocument} />;
            case 'spreadsheet':
                return <SpreadsheetEditor documentId={activeDocument} />;
            case 'presentation':
                return <PresentationEditor documentId={activeDocument} />;
            default:
                return null;
        }
    };

    const createNewDocument = (type) => {
        // Create a new document
        setDocumentType(type);
        // Generate a unique document ID and set it
    };

    return (
        <div className="document-dashboard">
            <div className="document-type-selector">
                {documentTypes.map(doc => (
                    <button 
                      key={doc.type}
                      onClick={() => createNewDocument(doc.type)}
                      className={`doc-type-btn ${documentType === doc.type ? 'active' : ''}`}
                    >
                      {doc.label}
                    </button>
                ))}
            </div>

            <div className="document-templates">
                <DocumentTemplates
                  onTemplateSelect={(templateId, type) => {
                    setDocumentType(type);
                    // load template logic
                  }}
                  />
            </div>

            <div className="document-editor-container">
              {renderEditor()}
            </div>
        </div>
    );
};

export default DocumentDashboard;