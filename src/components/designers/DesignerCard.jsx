import React from "react";
import { ClockIcon, UserIcon, CubeIcon } from '@heroicons/react/24/outline';

const DesignerCard = ({ designer }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-200 group">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
              {designer.fullName?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                {designer.fullName}
              </h3>
              <div className="flex items-center mt-1 text-sm text-gray-500">
                <UserIcon className="w-4 h-4 mr-1" />
                <span>Designer</span>
              </div>
            </div>
          </div>
          
          <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-sm font-medium rounded-full">
            {designer.isEmployed && "Employed"}
          </span>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center text-gray-600 mb-1">
              <ClockIcon className="w-4 h-4 mr-1" />
              <span className="text-xs font-medium">Working Hours</span>
            </div>
            <p className="text-sm font-semibold text-gray-900">{designer.workingHours}</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center text-gray-600 mb-1">
              <CubeIcon className="w-4 h-4 mr-1" />
              <span className="text-xs font-medium">Objects</span>
            </div>
            <p className="text-sm font-semibold text-gray-900">{designer.objectCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignerCard;