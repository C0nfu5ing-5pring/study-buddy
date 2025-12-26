import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import VisualiseButton from "../../components/VisualiseButton";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const PendulumTheory = () => {
  const navigate = useNavigate();

  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(containerRef.current, { opacity: 0, duration: 0.6 })
      .from(leftColRef.current, { y: 30, opacity: 0, duration: 0.6 }, "-=0.4")
      .from(rightColRef.current, { y: 30, opacity: 0, duration: 0.6 }, "-=0.5");
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-neutral-50 px-6 py-12 flex justify-center items-center"
    >
      <div className="relative w-full max-w-6xl bg-white rounded-xl border border-neutral-200 px-6 md:px-10 py-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 md:-top-10 md:left-0 flex items-center gap-1 text-neutral-500 hover:text-neutral-800 transition text-sm cursor-pointer z-10"
          aria-label="Go back"
        >
          <ChevronLeft size={18} />
          Back
        </button>

        <div ref={leftColRef} className="space-y-6">
          <h1 className="text-3xl mt-10 font-semibold text-neutral-900 tracking-tight">
            Simple Pendulum
          </h1>

          <p className="text-neutral-600 leading-relaxed">
            A <strong className="text-neutral-800">simple pendulum</strong> is a
            basic system used to study oscillatory motion. It consists of a
            small heavy bob suspended from a fixed point by a light,
            inextensible string.
          </p>

          <div>
            <h2 className="text-sm font-semibold text-neutral-500 uppercase mb-2">
              Definition
            </h2>
            <ul className="list-disc list-inside text-sm text-neutral-600 space-y-1">
              <li>A point mass (bob)</li>
              <li>A light, inextensible string</li>
              <li>Frictionless suspension point</li>
            </ul>
            <p className="text-sm text-neutral-600 mt-2">
              Real systems closely approximate this ideal model.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-neutral-500 uppercase mb-2">
              Oscillatory Motion
            </h2>
            <p className="text-sm text-neutral-600">
              When displaced and released, the pendulum performs oscillatory
              motion. One complete oscillation is movement from one extreme
              position to the other and back.
            </p>
          </div>
        </div>

        <div ref={rightColRef} className="space-y-6">
          <div>
            <h2 className="text-sm font-semibold text-neutral-500 uppercase mb-2">
              Time Period
            </h2>
            <p className="text-sm text-neutral-600 mb-2">
              The time period (T) is the time taken to complete one oscillation.
            </p>

            <div className="font-mono bg-neutral-100 px-4 py-2 rounded-md text-sm text-center">
              T = 2π √(L / g)
            </div>

            <ul className="list-disc list-inside text-sm text-neutral-600 mt-2 space-y-1">
              <li>
                <strong>L</strong> = length of pendulum
              </li>
              <li>
                <strong>g</strong> = acceleration due to gravity
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-neutral-500 uppercase mb-2">
              Factors Affecting Time Period
            </h2>
            <ul className="list-disc list-inside text-sm text-neutral-600 space-y-1">
              <li>Increases with length</li>
              <li>Decreases with higher gravity</li>
              <li>Independent of mass</li>
              <li>Independent of amplitude (for small angles)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-neutral-500 uppercase mb-2">
              Applications
            </h2>
            <ul className="list-disc list-inside text-sm text-neutral-600 space-y-1">
              <li>Measuring acceleration due to gravity</li>
              <li>Time-keeping (clocks)</li>
              <li>Studying oscillatory motion</li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-neutral-500 uppercase mb-2">
              Key Takeaway
            </h2>
            <p className="text-sm text-neutral-600">
              The simple pendulum shows how periodic motion depends on length
              and gravity, making it a foundational concept in physics.
            </p>
          </div>

          <div className="pt-4">
            <VisualiseButton
              onVisualise={() => navigate("/physics/pendulum-practical")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendulumTheory;
