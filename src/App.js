import React, { useEffect, useRef, useState } from "react";

import './App.css';
import File from './components/File';

export default function App() {
  const [files, setFiles] = useState([]);
  const [selected, setSelected] = useState(null);
  const [bettermentShape, setBettermentShape] = useState({ top: null, left: null });
  const bettermentShapeRef = useRef(null);

  useEffect(() => {
    const rectangle = bettermentShapeRef.current.getBoundingClientRect();
    setBettermentShape({
      top: rectangle.top,
      left: rectangle.left,
    });
  }, [bettermentShapeRef.current]);

  function handleFileUpload(e) {
    const file = URL.createObjectURL(e.target.files[0]);
    setFiles([...files, file]);
    setSelected(null);
    e.target.value = null;
  }

  return (
    <div className="displayFlex alignItemsCenter flexColumn p-1 maxHeight">
      <header className="mb-2">
        <h1>Your betterment</h1>
      </header>
      <main className="displayFlex alignItemsCenter flexColumn mb-2">
        <div className="bettermentShapeContainer">
          {selected && <div className="backgroundModalGrey" onClick={() => setSelected(null)}></div>}
          <div className={selected ? 'bettermentShape overflowVisible' : 'bettermentShape'} ref={bettermentShapeRef}>
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
          <div className={selected ? 'bettermentShapeHelper shapeHelperLeft overflowVisible' : 'bettermentShapeHelper shapeHelperLeft' }></div>
          <div className={selected ? 'bettermentShapeHelper shapeHelperRight overflowVisible' : 'bettermentShapeHelper shapeHelperRight' }></div>
        </div>

        <input className="displayFlex m-auto" type="file" onChange={handleFileUpload} />
      </main>
    </div>
  );
};
