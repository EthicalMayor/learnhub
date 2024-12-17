import React, { useState, useEffect, useContext } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { db, storage } from '../../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { AuthContext } from '../../contexts/AuthContext';

const TextEditor = ({ documentId }) => {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('Untitled Document');
    const { currentUser } = useContext(AuthContext);

    // Quill modules and formats

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            ['link', 'image'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean']
        ],
        imageUpload: {
            url: async (file) => {
                // image upload to firebase
                const storageRef = ref(storage, `documents/${currentUser.uid}/${Date.now()}_${file.name}`);
                await uploadBytes(storageRef, file);
                return await getDownloadURL(storageRef);
            }
        }
    };


    const formats =[
        'header',
        'bold', 'italic', 'underline', 'strike',
        'list', 'bullet',
        'script',
        'indent',
        'link', 'image',
        'color', 'background',
        'font',
        'align'
    ];

    // load document on component mount
    useEffect(() => {
        const loadDocument = async () => {
            if (documentId && currentUser) {
                try {
                    const docRef = doc(db, 'users', currentUser.uid, 'documents', documentId);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setContent(data.content || '');
                        setTitle(data.title || 'Untitled Document');
                    }
                } catch (error) {
                    console.error("Error loading document:", error);
                }
            }
        };

        loadDocument();
    }, [documentId, currentUser]);

    // save document
    const saveDocument = async () => {
        if (!currentUser) return;

        try {
          const docRef = doc(db, 'users', currentUser.uid, 'documents', documentId || Date.now().toString());
          await setDoc(docRef, {
            content, 
            title,
            type: 'text',
            createdAt: documentId ? undefined : new Date(),
            lastModified: new Date()
          }, { merge: true });

          alert('Document saved successfully!');
        } catch (error) {
            console.error("Error saving document:", error);
            alert('Failed to save document');
        }
    };

    return (
        <div className="text-editor-container p-4 bg-white shadow-lg rounded-lg">
            <input 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-2xl font-bold mb-4 p-2 border-b-2 border-gray-200"
                placeholder="Document Title"
            />

            <ReactQuill
              value={content}
              onChange={setContent}
              modules={modules}
              formats={formats}
              theme="snow"
              className="h-96"
              placeholder="Start writing your document..."
            />

            <div className="flex justify-end mt-4">
                <button 
                  onClick={saveDocument}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                >
                 Save Document
                </button>
            </div>
        </div>
    );
};

export default TextEditor;