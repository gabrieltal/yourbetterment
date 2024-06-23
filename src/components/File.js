import React from "react";

export default function File({ file, isSelected, setSelected, bettermentShape }) {
  const className = isSelected ? 'selected image' : 'image';

  function handleDrop(e) {
    const fileCenterX = e.target.width / 2;
    const fileCenterY = e.target.height / 2;

    // e.client(X, Y) = get mouse position
    // fileCenter(X, Y) = get X, Y coordinates of the center of the image
    // bettermentShape(top, left) = get top left corner of the drop center (e.g. the betterment logo shape)
    // e.target.style (left, top) = writers for the file's position
    e.target.style.left = e.clientX - fileCenterX - bettermentShape.left + 'px';
    e.target.style.top = e.clientY - fileCenterY - bettermentShape.top + 'px';
    return false;
  }

  return (<img src={file} alt="idk, you uploaded this" className={className} onClick={setSelected} draggable={isSelected} onDragEnd={handleDrop} />);
};
