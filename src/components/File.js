import React, { useEffect, useRef, useState } from "react";


export default function File({ file, isSelected, setSelected, bettermentShape, removeSelected }) {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const fileRef = useRef(null);

  useEffect(() => {
    setHeight(fileRef.current.height);
    setWidth(fileRef.current.width);
  }, [fileRef.current]);

  function handleHeightChange(e) {
    fileRef.current.height = e.target.value;
    setHeight(e.target.value);
  }

  function handleWidthChange(e) {
    fileRef.current.width = e.target.value;
    setWidth(e.target.value);
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
    <div className={isSelected ? 'selected image' : 'image'} draggable={isSelected} onDragEnd={handleDrop}>
      <img onClick={setSelected} src={file} alt="idk, you uploaded this" ref={fileRef} />
      {
        isSelected &&
          <div className="displayFlex alignItemsCenter justifyContentBetween">
            <button onClick={removeSelected}>Deselect</button>
            <div className="ml-xs displayFlex">
              <label for="height">Height: </label>
              <input name="height" type="numeric" value={height} onChange={handleHeightChange} />
            </div>

            <div className="ml-xs displayFlex">
              <label for="width">Width: </label>
              <input name="width" type="numeric" value={width} onChange={handleWidthChange} />
            </div>
          </div>
      }
    </div>
  )
};
