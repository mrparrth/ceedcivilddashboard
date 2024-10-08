import { useState } from 'react';
import EditableField from './EditableField';
import DrafterDetails from './MoreData/Drafter';
import EngineeringDetails from './MoreData/Engineering';
import MEPDetails from './MoreData/Mep';
import CivilDetails from './MoreData/Civil';
import data from './JsonData/Data.json';

const ProjectDetails = ({ project, handleCloseModal }) => {
  const [editableProject, setEditableProject] = useState(project);
  // const [isExpanded, setIsExpanded] = useState(false);
  const [nestedAccordion, setNestedAccordion] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [assignedOptions, setAssignedOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  // Handle input changes
  const handleInputChange = (key, value) => {
    setEditableProject((prev) => ({ ...prev, [key]: value }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (option) => {
    setAssignedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };


  // Handle submit button click
  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      console.log('Submitted Project Details:', editableProject);
      // Let’s say we are trying to save newDataRow
      let foundIndex = data.projects.findIndex(project => project.projectNumber == editableProject.projectNumber);
      if (foundIndex !== -1) data.projects[foundIndex] = editableProject;
      console.log(data);
      setLoading(false);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000); // Hide alert after 2 seconds

    }, 5000); // Simulate a 5-second loading time
  };



  // Toggle expand/collapse
  // const toggleExpand = () => {
  //   setIsExpanded(!isExpanded);
  // };

  // Toggle nested accordion
  const toggleNestedAccordion = (key) => {
    setNestedAccordion((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Check if the project exists
  if (!project) {
    return (
      <div className="container mt-4">
        <h2>Please wait some time... </h2>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8 lg:p-10 w-full sm:w-3/4 md:w-2/3 lg:w-3/4 h-[450px] sm:h-[550px] md:h-[600px] lg:h-[650px] overflow-y-auto relative">
        <button
          onClick={handleCloseModal}
          className="bg-red-400 p-2 absolute top-5 right-2 rounded-[8px] hover:bg-red-600 hover:shadow-lg transition-all duration-200"
        >
          <i className="text-4xl bi-x-lg text-white"></i>
        </button>

        <h1 className="font-bold mb-5 text-[25px]">Project Details</h1>
        <div className="relative overflow-x-none shadow-lg ">
          <table className="w-full text-sm text-left border-1 border-gray-200 text-gray-500 dark:text-gray-400 rounded-[8px]">
            <tbody>
              {[
                { label: 'Project Name', key: 'projectName' },
                { label: 'Project #', key: 'projectNumber', isEditable: false },
                { label: 'Invoice #', key: 'invoiceNumber', isEditable: false },
                {
                  label: 'Salesman',
                  key: 'salesMan',
                  isDropdown: true,
                  options: data.salesmen,
                },
                {
                  label: 'Description',
                  key: 'description',
                  isTextarea: true,
                },
                {
                  label: 'Overall Status',
                  key: 'overallProjectStatus',
                  isDropdown: true,
                  options: data.status,
                },
                {
                  label: 'State',
                  key: 'state',
                  isDropdown: true,
                  options: data.states,
                },
                {
                  label: 'Priority',
                  key: 'priority',
                  isDropdown: true,
                  options: data.priority,
                },

                { label: 'Project Files Folder', key: 'projectFilesFolder' },
                { label: 'Project Notes', key: 'projectNotes', isTextarea: true, },
                { label: 'Contract Link', key: 'contractLink' },

                {
                  label: 'depositPaid',
                  key: 'depositPaid',
                  isDropdown: true,
                  options: data.depositPaid,
                },
                { label: 'Estimated Budget', key: 'estimatedBudget' },
                { label: 'Initial Status', key: 'initialProjectStatus', isDropdown: true, options: data.innitialStatus },
                {
                  id: 'CurrentlyAssigned',
                  label: 'CurrentlyAssigned',
                  key: 'currentlyAssignedTo',
                  isDropdown: true,
                  options: data.currentlyAssigned,
                  isMultiple: true,
                },
                {
                  label: 'Client Project Name/Address',
                  key: 'clientProjectNameAddress',
                  isTextarea: true,
                },
              ].map((item, index) => (
                <tr
                  key={index}
                  className={`odd:bg-[#f3f4f6] odd:dark:bg-white-700 even:bg-[#f9fafb] even:dark:bg-white-400 border-2 dark:border-gray-100 hover:bg-[#e0e8ee] odd:hover:bg-[#ccd7df] even:hover:bg-[#d1d9df] cursor-pointer`}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-[15px] w-1/3"
                  >
                    {item.label}
                  </th>
                  <td className="w-2/3 px-4 py-2">
                    {item.isDropdown ? (
                      item.isMultiple ? (
                        <div className="relative">
                          <button
                            onClick={() => toggleNestedAccordion(item.key)}
                            className="bg-white border border-gray-300 rounded-md p-2 text-gray-700 text-[13px] w-full h-[30px] flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-gray-600"
                          >
                            {item.label}
                            <svg
                              className="w-4 h-4 ms-2 text-gray-500 dark:text-gray-300"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 10 6"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 4 4 4-4"
                              />
                            </svg>
                          </button>
                          {nestedAccordion[item.key] && (
                            <div className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg dark:bg-gray-700">
                              <ul className="p-2 space-y-1 text-sm text-gray-700 dark:text-gray-200">
                                {item.options.map((option) => (
                                  <li key={option}>
                                    <div className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600">
                                      <input
                                        id={`checkbox-${option}`}
                                        type="checkbox"
                                        checked={assignedOptions.includes(option)}
                                        onChange={() => handleCheckboxChange(option)}

                                        className="position-fix text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600"

                                      />
                                      <label
                                        htmlFor={`checkbox-${option}`}
                                        className="ms-2 text-[13px] font-medium text-gray-900 dark:text-gray-300"
                                      >
                                        {option}
                                      </label>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ) : (
                        <select
                          className="form-select border border-gray-300 rounded-md p-2 text-gray-700 text-[13px] w-full h-[36px] dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-blue-600"
                          value={editableProject[item.key]}
                          onChange={(e) => handleInputChange(item.key, e.target.value)}
                        >
                          <option value="{value}" disabled>Select...</option>
                          {item.options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      )
                    ) : item.isTextarea ? (
                      <textarea
                        value={editableProject[item.key]}
                        onChange={(e) => handleInputChange(item.key, e.target.value)}
                        className="border border-gray-300 rounded-md p-2 text-gray-700 text-[13px] w-full h-[50px] dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                      />
                    ) : (
                      <EditableField
                        value={editableProject[item.key]}
                        onChange={(value) => handleInputChange(item.key, value)}
                        isEditable={item.isEditable !== false}
                      />
                    )}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* SeeMore expand/collapse button */}
        <div className="mt-4 space-y-2 text-[15px]">
          {/* Drafter Details */}
          <button
            onClick={() => toggleNestedAccordion('DRAFTER')}
            className="w-full h-[40px] bg-green-500 text-white rounded-lg flex items-center justify-between px-4"
          >
            Drafter Details
            <svg
              className={`w-4 h-4 transform ${nestedAccordion['DRAFTER'] ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
          {nestedAccordion['DRAFTER'] && (
            <div className="p-4 bg-green-200 rounded-lg">
              <DrafterDetails drafter={editableProject.drafter} handleInputChange={handleInputChange} />
            </div>
          )}

          {/* Engineering Details */}
          <button
            onClick={() => toggleNestedAccordion('ENGINEERING')}
            className="w-full h-[40px] bg-yellow-500 text-white rounded-lg flex items-center justify-between px-4"
          >
            Engineering Details
            <svg
              className={`w-4 h-4 transform ${nestedAccordion['ENGINEERING'] ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
          {nestedAccordion['ENGINEERING'] && (
            <div className="p-4 bg-yellow-200 rounded-lg">
              <EngineeringDetails />
            </div>
          )}

          {/* MEP Details */}
          <button
            onClick={() => toggleNestedAccordion('MEP')}
            className="w-full h-[40px] bg-blue-500 text-white rounded-lg flex items-center justify-between px-4"
          >
            MEP Details
            <svg
              className={`w-4 h-4 transform ${nestedAccordion['MEP'] ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
          {nestedAccordion['MEP'] && (
            <div className="p-4 bg-blue-200 rounded-lg">
              <MEPDetails />
            </div>
          )}

          {/* Civil Details */}
          <button
            onClick={() => toggleNestedAccordion('CIVIL')}
            className="w-full h-[40px] bg-red-500 text-white rounded-lg flex items-center justify-between px-4"
          >
            Civil Details
            <svg
              className={`w-4 h-4 transform ${nestedAccordion['CIVIL'] ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
          {nestedAccordion['CIVIL'] && (
            <div className="p-4 bg-red-200 rounded-lg">
              <CivilDetails />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handleSubmit}
            className="w-[100px] h-[50px] text-[18px] bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 flex items-center justify-center"
          >
            


            {loading && (
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 mr-2 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.59c0 27.61-22.39 50-50 50S0 78.2 0 50.59C0 22.98 22.39.59 50 .59s50 22.39 50 50z"
                fill="currentColor"
              />
              <path
                d="M93.97 39.04c-2.51-8.72-7.52-16.55-14.15-22.1C73.78 7.39 65.09 3.68 55.68 3.08c-9.41-.6-18.53 1.68-26.22 6.58l4.66 6.47c6.29-4.06 13.57-6.14 21.05-5.57 7.48.56 14.47 3.76 20.05 8.9 5.58 5.13 9.54 11.89 11.44 19.38l7.31-2.41z"
                fill="#E5E7EB"
              />
            </svg>
          )}
          {loading ? 'Saving...' : 'Save'}
          </button>

        </div>

        {/* Success Alert */}
        
        {/* {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50">
            <div className="text-black  text-2xl">Saving Project...</div>
          </div>
        )} */}



        {showAlert && (
          <div className="fixed top-4 right-4 bg-green-500 text-white p-3 rounded-lg shadow-lg w-[250px] h-[50px] text-[18px] flex items-center justify-center">
            <i className="bi-check2 text-[25px] mr-2"></i>

            Project Save successfully!
          </div>

        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
