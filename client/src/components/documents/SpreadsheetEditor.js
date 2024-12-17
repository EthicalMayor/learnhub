import React, { useState, useEffect, useContext } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { db, storage } from '../../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { AuthContext } from '../../contexts/AuthContext';
import * as XLSX from 'xlsx';

const SpreadsheetEditor = ({ documentId }) => {
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'Name', field: 'name', editable: true },
    { headerName: 'Value', field: 'value', editable: true },
    { headerName: 'Category', field: 'category', editable: true }
  ]);
  const [title, setTitle] = useState('Untitled Spreadsheet');
  const { currentUser } = useContext(AuthContext);

  // Load document on component mount
  useEffect(() => {
    const loadDocument = async () => {
      if (documentId && currentUser) {
        try {
          const docRef = doc(db, 'users', currentUser.uid, 'documents', documentId);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const data = docSnap.data();
            setRowData(JSON.parse(data.content || '[]'));
            setTitle(data.title || 'Untitled Spreadsheet');
          }
        } catch (error) {
          console.error("Error loading spreadsheet:", error);
        }
      }
    };

    loadDocument();
  }, [documentId, currentUser]);

  // Save spreadsheet
  const saveSpreadsheet = async () => {
    if (!currentUser) return;

    try {
      const docRef = doc(db, 'users', currentUser.uid, 'documents', documentId || Date.now().toString());
      await setDoc(docRef, {
        content: JSON.stringify(rowData),
        title,
        type: 'spreadsheet',
        createdAt: documentId ? undefined : new Date(),
        lastModified: new Date()
      }, { merge: true });

      alert('Spreadsheet saved successfully!');
    } catch (error) {
      console.error("Error saving spreadsheet:", error);
      alert('Failed to save spreadsheet');
    }
  };

  // Add new row
  const addRow = () => {
    setRowData([...rowData, { name: '', value: '', category: '' }]);
  };

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rowData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, title);
    XLSX.writeFile(workbook, `${title}.xlsx`);
  };

  // Import from Excel
  const importFromExcel = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setRowData(data);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="spreadsheet-editor-container p-4 bg-white shadow-lg rounded-lg">
      <input 
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-2xl font-bold mb-4 p-2 border-b-2 border-gray-200"
        placeholder="Spreadsheet Title"
      />

      <div className="flex space-x-2 mb-4">
        <button 
          onClick={addRow}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
        >
          Add Row
        </button>
        <button 
          onClick={exportToExcel}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Export to Excel
        </button>
        <input 
          type="file" 
          accept=".xlsx, .xls"
          onChange={importFromExcel}
          className="hidden"
          id="excel-upload"
        />
        <label 
          htmlFor="excel-upload"
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-300 cursor-pointer"
        >
          Import Excel
        </label>
      </div>
      
      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          onGridReady={(params) => params.api.sizeColumnsToFit()}
          onCellValueChanged={(params) => setRowData([...params.api.getDataAsCsv()])}
          pagination={true}
          paginationPageSize={10}
        />
      </div>

      <div className="flex justify-end mt-4">
        <button 
          onClick={saveSpreadsheet}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Save Spreadsheet
        </button>
      </div>
    </div>
  );
};

export default SpreadsheetEditor;