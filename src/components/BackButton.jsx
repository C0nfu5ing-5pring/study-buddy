import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-3 text-sm text-gray-600 select-none">
      <button
        onClick={() => navigate(-1)}
        className="flex cursor-pointer items-center gap-1 px-2 py-1 rounded-md hover:bg-gray-200 transition-colors duration-150"
        aria-label="Go Back"
      >
        <ArrowLeft size={16} className="stroke-gray-600" />
        <span className="font-medium">Back</span>
      </button>

      <span className="text-gray-400 select-none">/</span>

      <button
        onClick={() => navigate("/")}
        className="flex cursor-pointer items-center gap-1 px-2 py-1 rounded-md hover:bg-gray-200 transition-colors duration-150"
        aria-label="Go Home"
      >
        <Home size={16} className="stroke-gray-600" />
        <span className="font-medium">Home</span>
      </button>
    </div>
  );
};

export default BackButton;
