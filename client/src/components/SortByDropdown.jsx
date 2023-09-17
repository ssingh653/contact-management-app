import React, { useState } from "react";

const SortByDropdown = ({ options, onSortChange }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    onSortChange(option);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <div className="relative z-10">
        <button
          type="button"
          onClick={toggleDropdown}
          className="group bg-white rounded-md shadow-sm inline-flex items-center w-full px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span>{selectedOption.label}</span>
          <svg
            className={`ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500 ${
              isDropdownOpen ? "transform rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 01.7.29l3 3a1 1 0 01-1.4 1.42L11 5.42V17a1 1 0 11-2 0V5.41L6.7 7.71a1 1 0 11-1.4-1.42l3-3A1 1 0 0110 3z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isDropdownOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleOptionChange(option)}
                className={`${
                  selectedOption.value === option.value
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-900"
                } group flex items-center w-full px-4 py-2 text-sm`}
                role="menuitem"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortByDropdown;
