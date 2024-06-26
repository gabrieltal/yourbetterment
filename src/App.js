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
    setSelected(null);
    e.target.value = null;
  }

  return (
    <div className="mainContent">
      <header>
        <h1>Your betterment</h1>
        <input type="file" onChange={handleChange} />
      </header>
      <main ref={bettermentShapeRef}>
        <div className="bettermentShape">
          {
            files.map ((fileObject, index) => {
              return (
                <File key={index}
                      file={fileObject}
                      isSelected={selected === fileObject}
                      setSelected={() => setSelected(fileObject)}
                      bettermentShape={bettermentShape}
                      removeSelected={() => setSelected(null)} />
              );
            })
          }
        </div>
        <div className="bettermentShapeHelper shapeHelperOne"></div>
        <div className="bettermentShapeHelper shapeHelperTwo"></div>
      </main>
    </div>
  );
};
