const VisualiseButton = ({ onVisualise }) => {
  return (
    <div className="pt-4 flex justify-start">
      <button
        onClick={onVisualise}
        className="bg-black cursor-pointer text-white text-sm font-normal px-4 py-2 rounded hover:bg-gray-900 active:scale-95 focus:outline-none transition"
      >
        Visualise Experiment
      </button>
    </div>
  );
};

export default VisualiseButton;
