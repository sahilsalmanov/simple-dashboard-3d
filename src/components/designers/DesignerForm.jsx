import React from "react";
import { useDispatch } from "react-redux";
import { createDesigner } from "../../store/slices/designersSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { UserIcon, ClockIcon } from '@heroicons/react/24/outline';

const DesignerSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Full name is required")
    .min(3, "Full name must be at least 3 characters"),
  workingHours: Yup.string()
    .required("Working hours are required")
    .matches(
      /^(\d{1,2}(:\d{2})?\s*-\s*\d{1,2}(:\d{2})?)$/,
      "Please use format: 9-5 or 9:00-17:00"
    ),
});

const DesignerForm = ({ onClose }) => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    dispatch(createDesigner(values));
    resetForm();
    setSubmitting(false);
    onClose();
  };
 
  return (
    <div className="max-w-2xl mx-auto">
      <Formik
        initialValues={{ fullName: "", workingHours: "" }}
        validationSchema={DesignerSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center">
                  <UserIcon className="w-4 h-4 mr-2 text-gray-400" />
                  Full Name
                </div>
              </label>
              <Field
                name="fullName"
                type="text"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.fullName && touched.fullName
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                } shadow-sm focus:outline-none focus:ring-2 transition-all duration-200`}
                placeholder="John Doe"
              />
              <ErrorMessage name="fullName">
                {msg => <p className="mt-2 text-sm text-red-600">{msg}</p>}
              </ErrorMessage>
            </div>

            <div>
              <label htmlFor="workingHours" className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center">
                  <ClockIcon className="w-4 h-4 mr-2 text-gray-400" />
                  Working Hours
                </div>
              </label>
              <Field
                name="workingHours"
                type="text"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.workingHours && touched.workingHours
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                } shadow-sm focus:outline-none focus:ring-2 transition-all duration-200`}
                placeholder="9:00-17:00"
              />
              <ErrorMessage name="workingHours">
                {msg => <p className="mt-2 text-sm text-red-600">{msg}</p>}
              </ErrorMessage>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Saving...' : 'Save Designer'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DesignerForm;