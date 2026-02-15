import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchObjects } from "../store/slices/objectsSlice";
import { fetchDesigners } from "../store/slices/designersSlice";

import EditorCanvas from "../components/editor/EditorCanvas";
import ObjectForm from "../components/editor/ObjectForm"; 

const EditorPage = () => {
  const dispatch = useDispatch();
  const designers = useSelector(state => state.designers.list);
  const objects = useSelector(state => state.objects.list);

  const [selectedObject, setSelectedObject] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");

  const canvasRef = useRef();

  useEffect(() => {
    dispatch(fetchObjects());
    dispatch(fetchDesigners());
  }, [dispatch]);

  const handleDoubleClick = () => {
    if (designers.length === 0) {
      setError("Please add a designer first");
      setTimeout(() => setError(""), 3000);
      return;
    }
    setIsCreating(true);
    setSelectedObject(null);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setSelectedObject(null);
    setError("");
  };

  return (
    <div className="relative w-full h-[calc(100vh-64px)] bg-gray-900 overflow-hidden">
      {error && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg">
          {error}
        </div>
      )}

      <EditorCanvas
        canvasRef={canvasRef}
        objects={objects}
        designers={designers}
        selectedObject={selectedObject}
        setSelectedObject={setSelectedObject}
        isCreating={isCreating}
        setIsCreating={setIsCreating}
        handleDoubleClick={handleDoubleClick}
      />

      {(isCreating || selectedObject) && (
        <ObjectForm
          designers={designers}
          selectedObject={selectedObject}
          setSelectedObject={setSelectedObject}
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          handleCancel={handleCancel}
          setError={setError}
        />
      )}
    </div>
  );
};

export default EditorPage;
