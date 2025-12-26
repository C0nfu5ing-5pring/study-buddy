import React, { forwardRef } from "react";

const SimulationButton = forwardRef(
  ({ title, description, onClick, icon }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        className="w-full py-5 px-6 text-left border cursor-pointer border-gray-300 rounded-lg text-gray-800 bg-white hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-gray-300 flex items-start gap-4"
      >
        {icon && <div className="mt-1 text-green-600">{icon}</div>}

        <div>
          <div className="font-semibold text-lg">{title}</div>
          {description && (
            <p className="text-sm text-gray-500 mt-1 leading-snug">
              {description}
            </p>
          )}
        </div>
      </button>
    );
  }
);

export default SimulationButton;
