import { useState, useEffect } from "react";
import BackButton from "../../components/BackButton";

const ElectrolysisDiagram = () => {
  const [isOn, setIsOn] = useState(false);
  const [anodeFill, setAnodeFill] = useState(0);
  const [cathodeFill, setCathodeFill] = useState(0);
  const [poppingBubbles, setPoppingBubbles] = useState([]);

  useEffect(() => {
    if (!isOn) {
      setAnodeFill(0);
      setCathodeFill(0);
      setPoppingBubbles([]);
      return;
    }
    const interval = setInterval(() => {
      setAnodeFill((prev) => Math.min(prev + 0.5, 100));
      setCathodeFill((prev) => Math.min(prev + 0.8, 100));
    }, 100);

    return () => clearInterval(interval);
  }, [isOn]);

  useEffect(() => {
    if (!isOn) return;

    const popInterval = setInterval(() => {
      setPoppingBubbles((prev) => [
        ...prev,
        { id: Date.now(), side: Math.random() > 0.5 ? "anode" : "cathode" },
      ]);
      setTimeout(() => {
        setPoppingBubbles((prev) => prev.slice(1));
      }, 500);
    }, 1000);

    return () => clearInterval(popInterval);
  }, [isOn]);

  return (
    <>
      <div className="fixed top-4 left-4 z-50">
        <BackButton />
      </div>

      <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col items-center px-6 py-10">
        <h1 className="mb-8 text-2xl font-semibold select-none text-center max-w-full">
          Electrolysis Diagram
        </h1>

        <div
          className="relative bg-white rounded-xl shadow-xl border"
          style={{
            width: "620px",
            height: "760px",
            maxWidth: "100%",
            // on small screens, width and height scale down
          }}
        >
          {/* BATTERY */}
          <p className="absolute top-2 left-1/2 -translate-x-1/2 text-xs font-semibold select-none">
            BATTERY
          </p>
          <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center">
            <div className="w-28 h-12 rounded-l-full bg-blue-600 flex items-center justify-center text-white font-bold">
              +
            </div>
            <div className="w-28 h-12 rounded-r-full bg-red-600 flex items-center justify-center text-white font-bold">
              -
            </div>
          </div>

          <div
            className={`absolute top-[78px] left-[296px] h-[90px] w-[4px] ${
              isOn ? "bg-blue-600" : "bg-gray-400"
            }`}
          />
          <div
            className={`absolute top-[78px] left-[320px] h-[90px] w-[4px] ${
              isOn ? "bg-red-600" : "bg-gray-400"
            }`}
          />

          <div className="absolute top-[60px] left-[420px] w-14 h-14 rounded-full flex items-center justify-center">
            <div
              className={`w-10 h-10 rounded-full border-2 ${
                isOn
                  ? "bg-yellow-400 border-yellow-500 shadow-lg shadow-yellow-400"
                  : "bg-gray-300 border-gray-400"
              }`}
            />
          </div>

          <div className="absolute top-[170px] left-1/2 -translate-x-1/2 w-[460px] h-[460px] max-w-full max-h-full">
            <div className="absolute inset-0 border-4 border-gray-300 rounded-b-3xl rounded-t-xl" />

            <div className="absolute bottom-0 left-0 right-0 h-[280px] bg-gradient-to-t from-cyan-500 to-cyan-300 rounded-b-3xl" />

            <div className="absolute left-[120px] top-6 w-6 h-[390px] bg-blue-700 rounded">
              <span className="absolute -left-20 top-1/2 -translate-y-1/2 text-xs font-semibold select-none">
                ANODE (+)
              </span>
            </div>
            <div className="absolute right-[120px] top-6 w-6 h-[390px] bg-red-700 rounded">
              <span className="absolute -right-24 top-1/2 -translate-y-1/2 text-xs font-semibold select-none">
                CATHODE (-)
              </span>
            </div>

            <div className="absolute left-[110px] top-0 w-20 h-14 bg-blue-300 bg-opacity-40 rounded-t-lg border-2 border-blue-700 flex flex-col items-center text-xs font-semibold text-blue-900 overflow-hidden">
              <span className="mb-1 select-none">O₂ Collection</span>
              <div
                className="w-full bg-blue-600 rounded h-full origin-bottom transition-transform"
                style={{ transform: `scaleY(${anodeFill / 100})` }}
              />
            </div>
            <div className="absolute right-[110px] top-0 w-20 h-14 bg-red-300 bg-opacity-40 rounded-t-lg border-2 border-red-700 flex flex-col items-center text-xs font-semibold text-red-900 overflow-hidden">
              <span className="mb-1 select-none">H₂ Collection</span>
              <div
                className="w-full bg-red-600 rounded h-full origin-bottom transition-transform"
                style={{ transform: `scaleY(${cathodeFill / 100})` }}
              />
            </div>

            {/* Ion bubbles */}
            {isOn && (
              <>
                {[...Array(10)].map((_, i) => (
                  <div
                    key={`anion-${i}`}
                    className="absolute w-4 h-4 rounded-full bg-green-600 text-white text-[10px] flex items-center justify-center select-none"
                    style={{ left: 80 + (i % 4) * 18, bottom: 40 + i * 18 }}
                  >
                    -
                  </div>
                ))}

                {[...Array(4)].map((_, i) => (
                  <div
                    key={`anion-oh-${i}`}
                    className="absolute w-4 h-4 rounded-full bg-green-600 text-white text-[10px] flex items-center justify-center select-none"
                    style={{ left: 80 + (i % 4) * 18, bottom: 40 + i * 18 }}
                  >
                    OH-
                  </div>
                ))}

                {[...Array(10)].map((_, i) => (
                  <div
                    key={`cation-${i}`}
                    className="absolute w-4 h-4 rounded-full bg-blue-800 text-white text-[10px] flex items-center justify-center select-none"
                    style={{ right: 80 + (i % 4) * 18, bottom: 40 + i * 18 }}
                  >
                    +
                  </div>
                ))}

                {[...Array(8)].map((_, i) => (
                  <div
                    key={`cation-h-${i}`}
                    className="absolute w-4 h-4 rounded-full bg-blue-800 text-white text-[10px] flex items-center justify-center select-none"
                    style={{ right: 80 + (i % 4) * 18, bottom: 40 + i * 18 }}
                  >
                    H+
                  </div>
                ))}

                {[...Array(6)].map((_, i) => (
                  <div
                    key={`o2-bubble-${i}`}
                    className="absolute rounded-full bg-white opacity-70 select-none"
                    style={{
                      width: 8,
                      height: 8,
                      left: 120 + (i % 3) * 15 + Math.sin(i) * 4,
                      bottom: 80 + i * 20,
                      animation: `riseUp 4s linear infinite`,
                      animationDelay: `${i * 0.7}s`,
                    }}
                  />
                ))}

                {[...Array(6)].map((_, i) => (
                  <div
                    key={`h2-bubble-${i}`}
                    className="absolute rounded-full bg-white opacity-70 select-none"
                    style={{
                      width: 8,
                      height: 8,
                      right: 120 + (i % 3) * 15 + Math.cos(i) * 4,
                      bottom: 80 + i * 20,
                      animation: `riseUp 3.5s linear infinite`,
                      animationDelay: `${i * 0.6}s`,
                    }}
                  />
                ))}
              </>
            )}

            {poppingBubbles.map(({ id, side }) => {
              const isAnode = side === "anode";
              return (
                <div
                  key={id}
                  className={`absolute rounded-full opacity-100 select-none`}
                  style={{
                    width: 12,
                    height: 12,
                    left: isAnode ? 120 : "auto",
                    right: isAnode ? "auto" : 120,
                    bottom: 160,
                    backgroundColor: isAnode ? "#3b82f6" : "#ef4444",
                    animation: "pop 0.5s ease forwards",
                    pointerEvents: "none",
                  }}
                />
              );
            })}
          </div>

          <p className="mt-6 text-center text-sm font-semibold select-none max-w-full">
            ELECTROLYTIC SOLUTION
          </p>

          <div
            onClick={() => setIsOn(!isOn)}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer px-4 py-2 rounded-full border border-gray-300 bg-white flex items-center justify-center max-w-[620px] select-none transition-colors duration-200"
            aria-label="Toggle Power"
          >
            <div
              className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${
                isOn ? "bg-gray-800" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${
                  isOn ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </div>
            <span
              className={`ml-3 font-medium text-sm ${
                isOn ? "text-gray-900" : "text-gray-600"
              }`}
            >
              {isOn ? "Power ON" : "Power OFF"}
            </span>
          </div>
        </div>

        {/* Styles for animation */}
        <style>{`
          @keyframes riseUp {
            0% {
              transform: translateY(0);
              opacity: 0.7;
            }
            100% {
              transform: translateY(-30px);
              opacity: 0;
            }
          }

          @keyframes pop {
            0% {
              transform: scale(0.8);
              opacity: 1;
            }
            100% {
              transform: scale(1.2);
              opacity: 0;
            }
          }

          /* Responsive tweaks for small screens */
          @media (max-width: 640px) {
            div[style*="width: 620px"] {
              width: 100% !important;
              height: auto !important;
              max-width: 100% !important;
              aspect-ratio: 620 / 760;
              min-height: 400px;
            }

            .absolute.top-$begin:math:display$170px$end:math:display$.left-1\/2 {
              width: 90% !important;
              height: auto !important;
              max-height: 90vh;
              left: 50% !important;
              transform: translateX(-50%) !important;
            }

            .absolute.top-$begin:math:display$60px$end:math:display$.left-$begin:math:display$420px$end:math:display$ {
              left: auto !important;
              right: 10px !important;
              top: 10px !important;
              width: 40px !important;
              height: 40px !important;
            }

            .absolute.top-$begin:math:display$78px$end:math:display$.left-$begin:math:display$296px$end:math:display$,
            .absolute.top-$begin:math:display$78px$end:math:display$.left-$begin:math:display$320px$end:math:display$ {
              left: auto !important;
              right: 50% !important;
              top: 60px !important;
              height: 60px !important;
              width: 3px !important;
            }

            .absolute.top-$begin:math:display$60px$end:math:display$.left-$begin:math:display$420px$end:math:display$ > div {
              width: 30px !important;
              height: 30px !important;
            }

            .absolute.left-$begin:math:display$120px$end:math:display$,
            .absolute.right-$begin:math:display$120px$end:math:display$ {
              left: 10px !important;
              right: 10px !important;
              width: 12px !important;
              height: 180px !important;
            }

            .absolute.left-$begin:math:display$110px$end:math:display$.top-0,
            .absolute.right-$begin:math:display$110px$end:math:display$.top-0 {
              width: 12% !important;
              height: 40px !important;
              left: 10px !important;
              right: 10px !important;
              top: 10px !important;
            }

            .absolute.bottom-10.left-1\/2 {
              bottom: 20px !important;
              left: 50% !important;
              transform: translateX(-50%) !important;
              max-width: 90% !important;
              padding-left: 8px !important;
              padding-right: 8px !important;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default ElectrolysisDiagram;
