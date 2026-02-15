import React, { useState } from "react";

const sizeMap = { small: 0.5, normal: 1, large: 2 };

const Object3D = ({ obj, isSelected, hoveredObject, setHoveredObject, setSelectedObject, isCreating }) => {
  const [hovered, setHovered] = useState(false);
  const isHovered = hoveredObject === obj.id || hovered;

  return (
    <mesh
      position={obj.position}
      onClick={(e) => {
        e.stopPropagation();
        if (!isCreating) setSelectedObject(obj);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        setHoveredObject(obj.id);
      }}
      onPointerOut={() => {
        setHovered(false);
        setHoveredObject(null);
      }}
    >
      <boxGeometry args={[sizeMap[obj.size], sizeMap[obj.size], sizeMap[obj.size]]} />
      <meshStandardMaterial
        color={isSelected ? "#ff6b6b" : isHovered ? "#feca57" : obj.color}
        emissive={isSelected ? "#330000" : "#000000"}
        emissiveIntensity={isSelected ? 0.3 : 0}
      />
    </mesh>
  );
};

export default Object3D;
