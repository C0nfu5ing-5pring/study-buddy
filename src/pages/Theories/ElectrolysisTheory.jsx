import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import VisualiseButton from "../../components/VisualiseButton";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const ElectrolysisTheory = () => {
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
      className="min-h-screen bg-neutral-50 px-4 py-6 flex justify-center items-start md:items-center"
      style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
    >
      <div className="relative w-full max-w-6xl bg-white rounded-xl border border-neutral-200 px-10 py-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        <button
          onClick={() => navigate(-1)}
          className="cursor-pointer absolute -top-10 left-0 flex items-center gap-1 text-neutral-500 hover:text-neutral-800 transition text-sm md:text-sm"
          aria-label="Go back"
          style={{
            zIndex: 10,
          }}
        >
          <ChevronLeft size={18} />
          Back
        </button>

        <div ref={leftColRef} className="space-y-6">
          <h1 className="text-3xl font-semibold text-neutral-900 tracking-tight">
            Electrolysis of Water
          </h1>

          <p className="text-neutral-600 leading-relaxed">
            Electrolysis of water is the process of breaking down water (
            <strong className="text-neutral-800">H₂O</strong>) into hydrogen (
            <strong className="text-neutral-800">H₂</strong>) and oxygen (
            <strong className="text-neutral-800">O₂</strong>) using electricity.
          </p>

          <div>
            <h2 className="text-sm font-semibold text-neutral-500 uppercase mb-2">
              Objective
            </h2>
            <ul className="list-disc list-inside text-sm text-neutral-600 space-y-1">
              <li>Understand electrochemical reactions</li>
              <li>Observe ion movement in an electric field</li>
              <li>Study reactions at electrodes</li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-neutral-500 uppercase mb-2">
              Apparatus
            </h2>
            <ul className="list-disc list-inside text-sm text-neutral-600 space-y-1">
              <li>Electrolytic tank</li>
              <li>Acidulated water</li>
              <li>Inert electrodes</li>
              <li>DC power supply</li>
            </ul>
          </div>
        </div>

        <div ref={rightColRef} className="space-y-6">
          <div>
            <h2 className="text-sm font-semibold text-neutral-500 uppercase mb-2">
              Principle
            </h2>
            <p className="text-sm text-neutral-600 mb-2">
              Water dissociates into ions when an electrolyte is added:
            </p>
            <div className="font-mono bg-neutral-100 px-4 py-2 rounded-md text-sm text-neutral-800">
              H₂O ⇌ H⁺ + OH⁻
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-neutral-500 uppercase mb-3">
              Working
            </h2>

            <p className="text-sm font-medium text-neutral-700 mb-1">
              Cathode (-)
            </p>
            <div className="font-mono bg-neutral-100 px-4 py-2 rounded-md text-sm mb-3">
              2H⁺ + 2e⁻ → H₂ ↑
            </div>

            <p className="text-sm font-medium text-neutral-700 mb-1">
              Anode (+)
            </p>
            <div className="font-mono bg-neutral-100 px-4 py-2 rounded-md text-sm">
              4OH⁻ → O₂ ↑ + 2H₂O + 4e⁻
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-neutral-500 uppercase mb-2">
              Observations
            </h2>
            <ul className="list-disc list-inside text-sm text-neutral-600 space-y-1">
              <li>Gas bubbles appear at both electrodes</li>
              <li>Hydrogen volume is double that of oxygen</li>
              <li>Bulb glows indicating current flow</li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-neutral-500 uppercase mb-2">
              Conclusion
            </h2>
            <p className="text-sm text-neutral-600">
              Electrolysis confirms the composition of water and demonstrates
              conversion of electrical energy into chemical energy.
            </p>
          </div>

          <div className="pt-2">
            <VisualiseButton
              onVisualise={() =>
                navigate("/chemistry/electrolysis-of-water-practical")
              }
            />
          </div>
        </div>

        <style jsx>{`
          @media (max-width: 767px) {
            button[aria-label="Go back"] {
              position: relative !important;
              top: auto !important;
              left: auto !important;
              margin-bottom: 1rem;
              display: inline-flex;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default ElectrolysisTheory;
