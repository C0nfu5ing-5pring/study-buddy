const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white px-6 py-12">
      <h1 className="text-[120px] font-extrabold text-gray-300 select-none leading-none">
        404
      </h1>

      <h2 className="text-3xl font-semibold text-gray-900 mt-4">
        Well, this is awkward...
      </h2>

      <p className="max-w-md text-center text-gray-600 mt-3 leading-relaxed">
        You’ve reached a page that's gone missing faster than your motivation on
        a Monday morning. Maybe it's hiding behind the sofa cushions.
      </p>

      <button
        onClick={() => window.history.back()}
        className="mt-8 px-6 py-3 rounded-xl border text-white bg-black cursor-pointer active:scale-95 transition-all  focus:outline-none"
      >
        Let's Pretend This Never Happened
      </button>
    </div>
  );
};

export default NotFound;
