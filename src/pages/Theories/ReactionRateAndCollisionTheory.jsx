import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import VisualiseButton from "../../components/VisualiseButton";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const ReactionRateAndCollisionTheory = () => {
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
            Reaction Rate <br /> and Collision Theory
          </h1>

          <p className="text-neutral-600 leading-relaxed">
            The rate of a chemical reaction refers to how fast reactants are
            converted into products. Some reactions occur instantly, while
            others take minutes, hours, or even days. To understand why reaction
            rates differ, we use the concept of{" "}
            <strong className="text-neutral-800">collision theory</strong>.
          </p>

          <div>
            <h2 className="text-sm font-semibold text-neutral-500 uppercase mb-2">
              1. What is Reaction Rate
            </h2>
            <p className="text-sm text-neutral-600">
              Reaction rate is defined as the change in concentration of a
              reactant or product per unit time. It depends on how frequently
              reacting particles collide and how effective those collisions are.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-neutral-500 uppercase mb-2">
              2. Collision Theory
            </h2>
            <p className="text-sm text-neutral-600 mb-2">
              According to collision theory, a chemical reaction occurs only
              when particles collide with each other.
            </p>
            <p className="text-sm text-neutral-600 mb-1">
              However, not all collisions lead to a reaction.
            </p>
            <p className="text-sm font-medium text-neutral-700">
              Only effective collisions result in product formation.
            </p>
          </div>
        </div>

        {/* Right column */}
        <div ref={rightColRef} className="space-y-6">
          <div>
            <h2 className="text-sm font-semibold text-neutral-500 uppercase mb-2">
              3. Conditions for an Effective Collision
            </h2>
            <p className="text-sm text-neutral-600 mb-2">
              For a collision to be effective, two conditions must be satisfied:
            </p>
            <ul className="list-disc list-inside text-xs text-neutral-600 space-y-1">
              <li>
                Particles must collide with energy equal to or greater than the{" "}
                <strong className="text-neutral-800">activation energy</strong>
              </li>
              <li>Particles must collide with the correct orientation</li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-neutral-500 uppercase mb-2">
              4. Factors Affecting Reaction Rate
            </h2>
            <div className="space-y-3 text-sm text-neutral-600 leading-relaxed">
              <p>
                <strong className="text-neutral-800">Temperature:</strong>{" "}
                Increasing temperature increases the kinetic energy of
                particles, leading to more frequent and energetic collisions.
              </p>
              <p>
                <strong className="text-neutral-800">Concentration:</strong>{" "}
                Higher concentration means more particles in the same volume,
                increasing collision frequency.
              </p>
              <p>
                <strong className="text-neutral-800">Catalyst:</strong> A
                catalyst lowers the activation energy by providing an
                alternative reaction pathway, increasing the reaction rate
                without being consumed.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-neutral-500 uppercase mb-2">
              5. Key Idea
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Reaction rate increases when the number of effective collisions
              increases. Collision theory helps explain how different conditions
              affect how fast a reaction occurs.
            </p>
          </div>

          <div className="pt-2">
            <VisualiseButton
              onVisualise={() =>
                navigate(
                  "/chemistry/reaction-rate-and-collision-theory-practical"
                )
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReactionRateAndCollisionTheory;
