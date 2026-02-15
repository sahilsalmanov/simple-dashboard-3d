import React, { useState } from "react";
import DesignerCard from "./DesignerCard";
import { UserGroupIcon } from '@heroicons/react/24/outline';

const DesignerList = ({ designers }) => {
  const [filter, setFilter] = useState('all'); 

  const filteredDesigners = filter === 'all' 
    ? designers 
    : designers.filter(designer => designer.isEmployed !== false); 

  if (!designers?.length) {
    return (
      <div className="text-center py-16 px-4">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
          <UserGroupIcon className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">No designers yet</h3>
        <p className="text-gray-500 mb-6">Get started by adding your first designer to the team.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold text-indigo-600">{filteredDesigners.length}</span> designers
          {filter === 'employed' && ' (employed)'}
        </p>
        
        <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              filter === 'all'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('employed')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              filter === 'employed'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Employed
          </button>
        </div>
      </div>
      
      {filteredDesigners.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDesigners.map((designer) => (
            <DesignerCard key={designer.id} designer={designer} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-gray-500">No employed designers found.</p>
          <button
            onClick={() => setFilter('all')}
            className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Show all designers
          </button>
        </div>
      )}
    </div>
  );
};

export default DesignerList;