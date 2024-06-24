import React from "react";

export default function File({ file, isSelected, setSelected, bettermentShape, removeSelected }) {
  const className = isSelected ? 'selected image' : 'image';

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
    <div className={className} draggable={isSelected} onDragEnd={handleDrop}>
      <img onClick={setSelected} src={file} alt="idk, you uploaded this"/>
      {
        isSelected &&
          <div className="fileEditTools">
            <button onClick={removeSelected}>Deselect</button>
          </div>
      }
    </div>
  )
};
