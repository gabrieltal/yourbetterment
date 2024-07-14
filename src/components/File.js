import React, { useEffect, useRef, useState } from "react";


export default function File({ file, isSelected, setSelected, bettermentShape, removeSelected }) {
  const [originalHeight, setOriginalHeight] = useState(0);
  const [originalWidth, setOriginalWidth] = useState(0);
  const [size, setSize] = useState(1);
  const fileRef = useRef(null);

  useEffect(() => {
    setOriginalHeight(fileRef.current.height);
    setOriginalWidth(fileRef.current.width);
  }, [fileRef.current]);

  function handleSizeChange(e) {
    fileRef.current.height = originalHeight * e.target.value;
    fileRef.current.width = originalWidth * e.target.value;
    setSize(e.target.value);
  }

  function handleDrop(e) {
    const fileCenterX = e.target.width / 2;
    const fileCenterY = e.target.height / 2;
    const mousePositionX = e.clientX;
    const mousePositionY = e.clientY;

    e.target.parentElement.style.left = mousePositionX - fileCenterX - bettermentShape.left + 'px';
    e.target.parentElement.style.top = mousePositionY - fileCenterY - bettermentShape.top + 'px';

    return false;
  }

  return (
    <div className={isSelected ? 'selected imageContainer' : 'imageContainer'} draggable={isSelected} onDragEnd={handleDrop}>
      <img onClick={setSelected} src={file} alt="idk, you uploaded this" ref={fileRef} />
      {
        isSelected &&
          <div className="displayFlex alignItemsCenter justifyContentBetween">
            <button onClick={removeSelected}>Deselect</button>

            <div className="ml-xs displayFlex">
              <label htmlFor="size">Size: </label>
              <input name="size" type="number" min="0.1" step="0.1" value={size} max="10" onChange={handleSizeChange} />
            </div>
          </div>
      }
    </div>
  )
};
