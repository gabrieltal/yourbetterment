import React, { useEffect, useRef, useState } from "react";

import './App.css';
import File from './components/File';

export default function App() {
  const [files, setFiles] = useState([]);
  const [selected, setSelected] = useState(null);
  const [bettermentShape, setBettermentShape] = useState({ top: null, left: null });
  const bettermentShapeRef = useRef(null);

  useEffect(() => {
    if (bettermentShapeRef.current !== null) {
      const rectangle = bettermentShapeRef.current.getBoundingClientRect();
      setBettermentShape({
        top: rectangle.top,
        left: rectangle.left,
      });
    }
  }, []);

  function handleChange(e) {
    const file = URL.createObjectURL(e.target.files[0]);
    setFiles([...files, file]);
    e.target.value = null;
  }

  return (
    <div className="mainContent">
      <header>
        <h1>Work in progress</h1>
        <input type="file" onChange={handleChange} />
      </header>
      <main>
        <div className="bettermentShape" ref={bettermentShapeRef}>
          {
            files.map ((fileObject, index) => {
              return (
                <File key={index}
                      file={fileObject}
                      isSelected={selected === fileObject}
                      setSelected={() => setSelected(fileObject)}
                      bettermentShape={bettermentShape} />
              );
            })
          }
        </div>
      </main>
    </div>
  );
};
