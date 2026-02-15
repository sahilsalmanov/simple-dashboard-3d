import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Grid, OrbitControls, TransformControls } from "@react-three/drei";
import Object3D from "./Object3D";
import { useDispatch } from "react-redux";
import { updateObjectThunk } from "../../store/slices/objectsSlice";

const sizeMap = { small: 0.5, normal: 1, large: 2 };

const EditorCanvas = ({
  objects,
  selectedObject,
  setSelectedObject,
  isCreating,
  handleDoubleClick,
  canvasRef,
}) => {
  const dispatch = useDispatch();
  const selectedMeshRef = useRef();
  const [hoveredObject, setHoveredObject] = useState(null);

  const handlePositionChange = () => {
    if (selectedMeshRef.current && selectedObject) {
      const pos = selectedMeshRef.current.position;
      dispatch(
        updateObjectThunk({
          ...selectedObject,
          position: [pos.x, pos.y, pos.z],
        })
      );
    }
  };

  return (
    <div className="w-full h-full">
      <Canvas
        ref={canvasRef}
        camera={{ position: [5, 5, 5], fov: 50 }}
        onDoubleClick={handleDoubleClick}
        className="outline-none"
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} />
        <pointLight position={[0, 5, 0]} intensity={0.5} />

        {/* Grid */}
        <Grid
          args={[20, 20]}
          cellSize={1}
          cellThickness={0.5}
          cellColor="#4b5563"
          sectionSize={5}
          sectionThickness={1}
          sectionColor="#9ca3af"
          fadeDistance={30}
          fadeStrength={1}
        />

        <OrbitControls makeDefault minDistance={3} maxDistance={20} enableDamping dampingFactor={0.05} />

        {objects.map((obj) => {
          const isSelected = selectedObject?.id === obj.id && !isCreating;

          if (isSelected) {
            return (
              <TransformControls
                key={obj.id}
                object={selectedMeshRef}
                mode="translate"
                size={0.8}
                translationSnap={0.5}
                onMouseUp={handlePositionChange}
              >
                <mesh
                  ref={selectedMeshRef}
                  position={obj.position}
                  onClick={(e) => e.stopPropagation()}
                >
                  <boxGeometry args={[sizeMap[obj.size], sizeMap[obj.size], sizeMap[obj.size]]} />
                  <meshStandardMaterial color="#ff6b6b" />
                </mesh>
              </TransformControls>
            );
          }

          return (
            <Object3D
              key={obj.id}
              obj={obj}
              isSelected={false}
              hoveredObject={hoveredObject}
              setHoveredObject={setHoveredObject}
              setSelectedObject={setSelectedObject}
              isCreating={isCreating}
            />
          );
        })}
      </Canvas>
    </div>
  );
};

export default EditorCanvas;
