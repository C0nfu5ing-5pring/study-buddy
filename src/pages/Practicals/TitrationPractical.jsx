import { useState, useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import BackButton from "../../components/BackButton";

const TitrationPractical = () => {
  const flaskVolume = 100; // mL
  const defaultAcidConc = 0.1; // M
  const defaultBaseConc = 0.1; // M

  const [acidConc, setAcidConc] = useState(defaultAcidConc);
  const [baseConc, setBaseConc] = useState(defaultBaseConc);
  const [baseAdded, setBaseAdded] = useState(0);
  const [ph, setPh] = useState(1);
  const [indicatorColor, setIndicatorColor] = useState("#dc2626"); // Tailwind red-600
  const [endpointReached, setEndpointReached] = useState(false);

  const acidMoles = useMemo(() => acidConc * (flaskVolume / 1000), [acidConc]);
  const equivalenceVolume = useMemo(
    () => (acidMoles * 1000) / baseConc,
    [acidMoles, baseConc]
  );

  const calculatePh = (baseVol) => {
    const baseMoles = baseConc * (baseVol / 1000);
    if (baseMoles < acidMoles) {
      const hConc = (acidMoles - baseMoles) / ((flaskVolume + baseVol) / 1000);
      return -Math.log10(hConc);
    } else if (Math.abs(baseMoles - acidMoles) < 1e-8) {
      return 7;
    } else {
      const ohConc = (baseMoles - acidMoles) / ((flaskVolume + baseVol) / 1000);
      const pOH = -Math.log10(ohConc);
      return 14 - pOH;
    }
  };

  useEffect(() => {
    const newPh = calculatePh(baseAdded);
    setPh(newPh);

    if (newPh < 8) {
      setIndicatorColor("#dc2626"); // red-600
    } else {
      setIndicatorColor("#db2777"); // pink-600
    }

    setEndpointReached(Math.abs(newPh - 7) < 0.3);
  }, [baseAdded, acidMoles, baseConc]);

  const addBase = () => {
    if (baseAdded < equivalenceVolume) {
      setBaseAdded((prev) => Math.min(prev + 1, equivalenceVolume));
    }
  };

  const reset = () => {
    setBaseAdded(0);
    setPh(1);
    setIndicatorColor("#dc2626");
    setEndpointReached(false);
  };

  const totalVolume = flaskVolume + baseAdded;
  const fillPercent = (totalVolume / (flaskVolume * 2)) * 100;

  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <div className="h-screen bg-gray-50 flex justify-center items-center p-4">
      <div
        ref={containerRef}
        className="flex flex-col md:flex-row w-full max-w-7xl bg-white rounded-3xl shadow-md p-6 md:p-8 h-[90vh]"
      >
        {/* Left pane */}
        <div className="flex flex-col w-full md:w-1/2 p-4 md:p-6 bg-gray-50 justify-center items-center">
          <div className="relative w-36 h-72 border border-gray-300 rounded-b-3xl overflow-hidden bg-gray-50 mb-6 md:mb-12">
            <div
              className="absolute bottom-0 w-full rounded-t transition-all duration-500 ease-in-out"
              style={{
                height: `${fillPercent}%`,
                backgroundColor: indicatorColor,
              }}
            />
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs font-semibold text-gray-700 bg-white px-3 rounded select-none shadow-sm">
              Total Volume: {totalVolume.toFixed(1)} mL
            </div>
          </div>

          <div className="max-w-sm w-full">
            <div className="relative h-6 rounded-full bg-gray-200 overflow-hidden flex items-center">
              <div
                className="absolute top-0 h-full w-1 bg-black rounded"
                style={{
                  left: `${(ph / 14) * 100}%`,
                  transform: "translateX(-50%)",
                  transition: "left 0.5s ease",
                }}
                aria-label={`Current pH: ${ph.toFixed(2)}`}
              />
              {[...Array(15)].map((_, i) => (
                <span
                  key={i}
                  className="relative text-xs font-semibold text-gray-600 w-[6.66%] text-center select-none"
                >
                  {i}
                </span>
              ))}
            </div>
            <p className="text-center mt-2 font-semibold text-gray-700">
              pH Scale
            </p>
          </div>
        </div>

        {/* Right pane */}
        <div className="flex flex-col w-full md:w-1/2 p-4 md:p-6 overflow-y-auto relative">
          <div className="absolute top-4 right-4">
            <BackButton />
          </div>

          <h1 className="text-3xl mt-10 md:mt-0 font-extrabold text-gray-900 tracking-tight mb-8 text-center md:text-left">
            Acid-Base Titration Simulator
          </h1>

          <div className="space-y-8 flex-grow">
            <div className="space-y-6">
              <label className="block">
                <span className="text-sm font-semibold text-gray-700 mb-1 block">
                  Acid Concentration (M)
                </span>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  max="1"
                  value={acidConc}
                  onChange={(e) =>
                    setAcidConc(
                      Math.max(
                        0.01,
                        Math.min(
                          1,
                          parseFloat(e.target.value) || defaultAcidConc
                        )
                      )
                    )
                  }
                  className="w-full border-b border-gray-300 focus:border-black text-lg py-2 px-0 outline-none"
                  placeholder="0.1"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-gray-700 mb-1 block">
                  Base Concentration (M)
                </span>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  max="1"
                  value={baseConc}
                  onChange={(e) =>
                    setBaseConc(
                      Math.max(
                        0.01,
                        Math.min(
                          1,
                          parseFloat(e.target.value) || defaultBaseConc
                        )
                      )
                    )
                  }
                  className="w-full border-b border-gray-300 focus:border-black text-lg py-2 px-0 outline-none"
                  placeholder="0.1"
                />
              </label>
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={addBase}
                disabled={baseAdded >= equivalenceVolume}
                className={`w-full mx-auto cursor-pointer active:scale-95 py-3 rounded-sm text-white font-semibold transition-all ${
                  baseAdded >= equivalenceVolume
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-black hover:bg-gray-800"
                }`}
              >
                Add 1 mL Base (NaOH)
              </button>
              <button
                onClick={reset}
                className="w-full mx-auto cursor-pointer active:scale-95 py-3 rounded-sm bg-black text-white font-semibold hover:bg-gray-800 transition-all"
              >
                Reset
              </button>
            </div>

            <div className="max-w-sm text-gray-700 text-base font-medium space-y-1 mt-6 mx-auto md:mx-0">
              <p>
                <strong>Base added:</strong> {baseAdded.toFixed(1)} mL /
                Equivalence at {equivalenceVolume.toFixed(1)} mL
              </p>
              <p>
                <strong>Current pH:</strong> {ph.toFixed(2)}
              </p>

              {endpointReached && (
                <div className="mt-4 p-4 rounded bg-green-100 text-green-800 font-semibold animate-pulse text-center">
                  Endpoint reached! 🎉
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitrationPractical;
