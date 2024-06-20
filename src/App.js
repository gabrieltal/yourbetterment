import React, { useState } from "react";

import './App.css';
import File from './components/File';

export default function App() {
  const [files, setFiles] = useState([]);

  function handleChange(e) {
    const file = URL.createObjectURL(e.target.files[0]);
    setFiles([...files, file]);
    e.target.value = null;
  }

  return (
    <div>
      <main>
        <h1>Work in progress</h1>
        <input type="file" onChange={handleChange} />
        { 
          files.map ((fileObject, index) => {
            return <File key={index} file={fileObject} />;
          })
        }
      </main>
    </div>
  );
};