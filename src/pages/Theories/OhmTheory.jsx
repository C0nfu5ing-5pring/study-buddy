import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import VisualiseButton from "../../components/VisualiseButton";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const OhmTheory = () => {
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
      className="h-screen bg-neutral-50 px-6 py-6 flex justify-center items-center"
    >
      <div className="relative w-full max-w-6xl bg-white rounded-xl border border-neutral-200 px-6 md:px-10 py-6 md:py-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 md:-top-10 left-4 md:left-0 cursor-pointer flex items-center gap-1 text-neutral-500 hover:text-neutral-800 transition text-sm z-10"
          aria-label="Go back"
        >
          <ChevronLeft size={18} />
          Back
        </button>

        {/* Left Column */}
        <div ref={leftColRef} className="space-y-4 md:space-y-6">
          <h1 className="text-2xl mt-10 md:text-3xl font-semibold text-neutral-900 tracking-tight">
            Ohm's Law
          </h1>

          <p className="text-neutral-600 leading-relaxed text-sm md:text-base">
            Ohm's Law is a fundamental principle in electronics and physics that
            defines the relationship between voltage (
            <strong className="text-neutral-800">V</strong>), current (
            <strong className="text-neutral-800">I</strong>), and resistance (
            <strong className="text-neutral-800">R</strong>) in an electrical
            circuit.
          </p>

          <div>
            <h2 className="text-xs md:text-sm font-semibold text-neutral-500 uppercase mb-2">
              1. What is Ohm's Law?
            </h2>
            <p className="text-xs md:text-sm text-neutral-600">
              Ohm's Law states that the current flowing through a conductor
              between two points is directly proportional to the voltage across
              the two points and inversely proportional to the resistance
              between them.
            </p>
            <p className="mt-3 font-semibold text-neutral-700 text-xs md:text-sm">
              Mathematically:
            </p>
            <p className="text-xl font-bold my-2 text-center text-neutral-900">
              V = I × R
            </p>
            <p className="text-center text-xs italic text-neutral-500">
              Where:
            </p>
            <ul className="list-disc list-inside max-w-md mx-auto text-xs md:text-sm text-neutral-600">
              <li>
                <strong>V</strong> = Voltage (Volts)
              </li>
              <li>
                <strong>I</strong> = Current (Amperes)
              </li>
              <li>
                <strong>R</strong> = Resistance (Ohms, Ω)
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div ref={rightColRef} className="space-y-4 md:space-y-6">
          <div>
            <h2 className="text-xs md:text-sm font-semibold text-neutral-500 uppercase mb-2">
              2. Understanding the Relationship
            </h2>
            <p className="text-xs md:text-sm text-neutral-600 leading-relaxed">
              - Increasing the voltage increases the current, provided the
              resistance remains constant.
              <br />
              - Increasing the resistance decreases the current, if voltage is
              constant.
              <br />- This relationship helps design and analyze electrical
              circuits effectively.
            </p>
          </div>

          <div>
            <h2 className="text-xs md:text-sm font-semibold text-neutral-500 uppercase mb-2">
              3. Practical Applications
            </h2>
            <p className="text-xs md:text-sm text-neutral-600 leading-relaxed">
              Ohm's Law is essential in designing circuits, selecting components
              like resistors, and troubleshooting electrical problems. It also
              forms the basis for understanding more complex electronics
              concepts.
            </p>
          </div>

          <div className="pt-2">
            <VisualiseButton
              onVisualise={() => navigate("/physics/ohms-law-practical")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OhmTheory;
