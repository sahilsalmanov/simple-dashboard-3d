import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { createObject, updateObjectThunk } from "../../store/slices/objectsSlice";


const ObjectSchema = Yup.object().shape({
  name: Yup.string().required("Object name is required").min(2, "At least 2 characters"),
  designerId: Yup.string().required("Select a designer"),
  color: Yup.string().required("Color required").matches(/^#[0-9A-F]{6}$/i, "Invalid color"),
  size: Yup.string().oneOf(["small","normal","large"], "Invalid size").required(),
});

const ObjectForm = ({ designers, selectedObject, setSelectedObject, isCreating, setIsCreating, handleCancel, setError }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      designerId: "",
      color: "#3b82f6",
      size: "normal",
    },
    validationSchema: ObjectSchema,
    onSubmit: (values, { resetForm }) => {
      const designer = designers.find(d => d.id === Number(values.designerId));
      if (!designer) {
        setError("Designer does not exist");
        return;
      }

      const payload = {
        name: values.name,
        designer,
        designerId: designer.id,
        color: values.color,
        size: values.size,
        position: selectedObject?.position || [0,0,0],
        createdAt: new Date().toISOString(),
      };

      if (isCreating) dispatch(createObject(payload));
      else dispatch(updateObjectThunk({ id: selectedObject.id, ...payload }));

      setIsCreating(false);
      setSelectedObject(null);
      resetForm();
      setError("");
    },
  });

  useEffect(() => {
    if (selectedObject && !isCreating) {
      formik.setValues({
        name: selectedObject.name || "",
        designerId: selectedObject.designerId?.toString() || selectedObject.designer?.id?.toString() || "",
        color: selectedObject.color || "#3b82f6",
        size: selectedObject.size || "normal",
      });
    } else if (isCreating) formik.resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedObject, isCreating]);

  return (
    <div className="absolute top-4 right-4 w-96 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
      <div className="px-6 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-t-lg">
        <h3 className="text-lg font-semibold text-white">{isCreating ? "Add New Object" : "Edit Object"}</h3>
        <p className="text-sm text-indigo-100 mt-1">{isCreating ? "Double-click on canvas to place" : "Select and move object in 3D space"}</p>
      </div>

      <form onSubmit={formik.handleSubmit} className="p-6 space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Object Name</label>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter object name"
          />
          {formik.touched.name && formik.errors.name && <p className="text-red-400 mt-1 text-sm">{formik.errors.name}</p>}
        </div>

        {/* Designer */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Attached Designer</label>
          <select
            name="designerId"
            value={formik.values.designerId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select a designer</option>
            {designers.map(d => <option key={d.id} value={d.id}>{d.fullName} ({d.workingHours})</option>)}
          </select>
          {formik.touched.designerId && formik.errors.designerId && <p className="text-red-400 mt-1 text-sm">{formik.errors.designerId}</p>}
        </div>

        {/* Color & Size */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Color</label>
            <input type="color" name="color" value={formik.values.color} onChange={formik.handleChange} className="w-full h-10 bg-gray-700 border border-gray-600 rounded-lg cursor-pointer"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Size</label>
            <select name="size" value={formik.values.size} onChange={formik.handleChange} className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="small">Small (0.5x)</option>
              <option value="normal">Normal (1x)</option>
              <option value="large">Large (2x)</option>
            </select>
          </div>
        </div>

        <div className="flex space-x-3 pt-4">
          <button type="button" onClick={handleCancel} className="flex-1 px-4 py-2.5 border border-gray-600 rounded-lg text-gray-300 font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500 transition-colors">Cancel</button>
          <button type="submit" className="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-all transform hover:scale-105">
            {isCreating ? 'Create Object' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ObjectForm;
