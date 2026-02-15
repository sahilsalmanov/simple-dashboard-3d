import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDesigners } from "../store/slices/designersSlice";
import { fetchObjects } from "../store/slices/objectsSlice";
import DesignerList from "../components/designers/DesignerList";
import DesignerForm from "../components/designers/DesignerForm";
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

const DesignersPage = () => {
  const dispatch = useDispatch();
  const designers = useSelector((state) => state.designers.list);
  const objects = useSelector((state) => state.objects.list);

  const [showForm, setShowForm] = useState(false);

   useEffect(() => {
    dispatch(fetchDesigners());
    dispatch(fetchObjects());
  }, [dispatch]);

  const designerObjectCount = useMemo(() => {
    return designers.map((designer) => ({
      ...designer,
      objectCount: objects.filter(
        (obj) => obj.designer?.id === designer.id
      ).length,
    }));
  }, [designers, objects]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="px-6 py-8 sm:px-10 bg-gradient-to-r from-blue-600 to-indigo-600">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white">Designers</h1>
                <p className="mt-2 text-blue-100">Manage your design team members</p>
              </div>
              <button
                onClick={() => setShowForm(!showForm)}
                className={`inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 ${
                  showForm 
                    ? 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500' 
                    : 'bg-white hover:bg-gray-50 text-indigo-600 focus:ring-white'
                }`}
              >
                {showForm ? (
                  <>
                    <XMarkIcon className="w-5 h-5 mr-2" />
                    Cancel
                  </>
                ) : (
                  <>
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Add Designer
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Form Section */}
          {showForm && (
            <div className="border-b border-gray-200 bg-gray-50">
              <div className="px-6 py-6 sm:px-10">
                <DesignerForm onClose={() => setShowForm(false)} />
              </div>
            </div>
          )}

          {/* List Section */}
          <div className="px-6 py-8 sm:px-10">
            <DesignerList designers={designerObjectCount} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignersPage;