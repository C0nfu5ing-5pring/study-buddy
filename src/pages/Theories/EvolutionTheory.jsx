import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import VisualiseButton from "../../components/VisualiseButton";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const EvolutionTheory = () => {
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

        <div ref={leftColRef} className="space-y-4 md:space-y-6">
          <h1 className="text-2xl md:text-3xl mt-10 font-semibold text-neutral-900 tracking-tight">
            Evolution & Natural Selection
          </h1>

          <p className="text-neutral-600 leading-relaxed text-sm md:text-base">
            Evolution is the gradual change in characteristics of a population
            over successive generations. These changes occur due to variations,
            competition for resources, and environmental pressures.
          </p>

          <div>
            <h2 className="text-xs md:text-sm font-semibold text-neutral-500 uppercase mb-1 md:mb-2">
              What is Evolution?
            </h2>
            <p className="text-neutral-600 text-xs md:text-sm">
              Evolution refers to cumulative changes in populations over long
              periods of time. It explains how simple life forms gradually gave
              rise to complex organisms.
            </p>
          </div>

          <div>
            <h2 className="text-xs md:text-sm font-semibold text-neutral-500 uppercase mb-1 md:mb-2">
              Natural Selection
            </h2>
            <p className="text-neutral-600 text-xs md:text-sm">
              Organisms with favorable traits are more likely to survive and
              reproduce in a given environment.
            </p>
            <p className="mt-1 md:mt-2 text-neutral-600 text-xs md:text-sm">
              Over generations, these traits become more common, while
              unfavorable traits disappear.
            </p>
          </div>
        </div>

        <div ref={rightColRef} className="space-y-4 md:space-y-6">
          <div>
            <h2 className="text-xs md:text-sm font-semibold text-neutral-500 uppercase mb-1 md:mb-2">
              Factors Affecting Evolution
            </h2>
            <ul className="list-disc list-inside text-xs md:text-sm text-neutral-600 space-y-1">
              <li>
                <strong className="text-neutral-800">Variation:</strong>{" "}
                Differences among individuals
              </li>
              <li>
                <strong className="text-neutral-800">Inheritance:</strong>{" "}
                Traits passed to offspring
              </li>
              <li>
                <strong className="text-neutral-800">Overproduction:</strong>{" "}
                More offspring than can survive
              </li>
              <li>
                <strong className="text-neutral-800">
                  Survival of the Fittest:
                </strong>{" "}
                Best adapted organisms survive
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xs md:text-sm font-semibold text-neutral-500 uppercase mb-1 md:mb-2">
              Example
            </h2>
            <p className="text-neutral-600 text-xs md:text-sm">
              In insect populations, individuals with colors that blend into
              their environment are less likely to be eaten. Over generations,
              camouflage-friendly traits become more common.
            </p>
          </div>

          <div className="pt-3 md:pt-4">
            <VisualiseButton
              onVisualise={() => navigate("/biology/evolution-practical")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvolutionTheory;
