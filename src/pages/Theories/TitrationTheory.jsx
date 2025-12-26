import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import VisualiseButton from "../../components/VisualiseButton";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const TitrationTheory = () => {
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
            Acid-Base Titration
          </h1>

          <p className="text-neutral-600 leading-relaxed">
            Acid-base titration is a laboratory technique used to determine the
            concentration of an unknown acid or base solution by reacting it
            with a solution of known concentration.
          </p>

          <div>
            <h2 className="text-sm font-semibold text-neutral-500 uppercase mb-2">
              1. What is Titration?
            </h2>
            <p className="text-sm text-neutral-600">
              Titration is a quantitative chemical analysis method in which a
              solution of known concentration (titrant) is added gradually to a
              solution of unknown concentration until the chemical reaction
              between them is complete.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-neutral-500 uppercase mb-2">
              2. Apparatus Used
            </h2>
            <ul className="list-disc list-inside text-xs text-neutral-600 space-y-1">
              <li>
                <strong>Burette:</strong> Used to add the base solution
                accurately.
              </li>
              <li>
                <strong>Pipette:</strong> Measures a fixed volume of acid.
              </li>
              <li>
                <strong>Conical Flask:</strong> Contains the acid and indicator.
              </li>
              <li>
                <strong>Indicator:</strong> Shows when the reaction is complete
                by changing colour.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-neutral-500 uppercase mb-2">
              3. Chemical Reaction
            </h2>
            <p className="text-sm text-neutral-600 mb-1">
              In a strong acid–strong base titration, neutralisation occurs.
            </p>
            <div className="bg-neutral-100 p-3 rounded font-mono text-center text-sm text-neutral-800">
              HCl (aq) + NaOH (aq) → NaCl (aq) + H₂O (l)
            </div>
            <p className="text-sm text-neutral-600 mt-2">
              Hydrogen ions (H⁺) from the acid react with hydroxide ions (OH⁻)
              from the base to form water.
            </p>
          </div>
        </div>

        <div ref={rightColRef} className="space-y-6">
          <div>
            <h2 className="text-sm font-semibold text-neutral-500 uppercase mb-2">
              4. Equivalence Point and End Point
            </h2>
            <p className="text-sm text-neutral-600 mb-1">
              <strong>Equivalence Point:</strong> The point at which the number
              of moles of acid equals the number of moles of base.
            </p>
            <p className="text-sm text-neutral-600 mb-2">
              <strong>End Point:</strong> The point at which the indicator
              changes colour.
            </p>
            <p className="text-sm font-medium text-neutral-700">
              In a good titration, the endpoint occurs very close to the
              equivalence point.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-neutral-500 uppercase mb-2">
              5. Role of Indicator
            </h2>
            <p className="text-sm text-neutral-600 mb-1">
              Phenolphthalein is commonly used as an indicator in acid–base
              titrations.
            </p>
            <ul className="list-disc list-inside text-xs text-neutral-600 space-y-1">
              <li>Colourless in acidic solution</li>
              <li>Pink in basic solution (pH &gt; 8.2)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-neutral-500 uppercase mb-2">
              6. Change in pH During Titration
            </h2>
            <p className="text-sm text-neutral-600">
              As the base is added slowly, the pH of the acidic solution
              increases gradually. Near the equivalence point, a small addition
              of base causes a sharp increase in pH.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-neutral-500 uppercase mb-2">
              7. Titration Formula
            </h2>
            <p className="text-sm text-neutral-600 mb-2">
              The concentration of the unknown solution is calculated using:
            </p>
            <div className="bg-neutral-100 p-3 rounded font-mono text-center text-sm text-neutral-800">
              M₁V₁ = M₂V₂
            </div>
            <p className="text-sm text-neutral-600 mt-2">
              where M is molarity and V is volume of acid and base respectively.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-neutral-500 uppercase mb-2">
              8. Common Errors in Titration
            </h2>
            <ul className="list-disc list-inside text-xs text-neutral-600 space-y-1">
              <li>Adding base too quickly and overshooting the endpoint</li>
              <li>Incorrect reading of the burette</li>
              <li>Using an unsuitable indicator</li>
            </ul>
          </div>

          <div className="pt-2">
            <VisualiseButton
              onVisualise={() =>
                navigate("/chemistry/acid-base-titration-practical")
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitrationTheory;
