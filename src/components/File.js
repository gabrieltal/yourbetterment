import React, { useState } from "react";

export default function File({ file, isSelected, setSelected}) {
  const className = isSelected ? 'selected' : '';
  return (<img src={file} className={className} onClick={setSelected} />);
};
