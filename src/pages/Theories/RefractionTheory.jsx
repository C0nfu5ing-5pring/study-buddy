import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import VisualiseButton from "../../components/VisualiseButton";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const RefractionTheory = () => {
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
            Refraction of Light <br /> Through a Glass Slab
          </h1>

          <p className="text-neutral-600 leading-relaxed">
            Refraction is the phenomenon of change in direction of light when it
            passes from one transparent medium to another due to a change in its
            speed. This experiment helps us understand how light behaves when it
            passes through a rectangular glass slab.
          </p>

          <div>
            <h2 className="text-sm font-semibold text-neutral-500 uppercase mb-2">
              1. What is Refraction of Light?
            </h2>
            <p className="text-sm text-neutral-600">
              Refraction of light is defined as the bending of light when it
              travels from one medium to another having different optical
              densities. The bending occurs because the speed of light changes
              in different media.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-neutral-500 uppercase mb-2">
              2. Refraction Through a Glass Slab
            </h2>
            <p className="text-sm text-neutral-600 mb-1">
              When a ray of light enters a glass slab from air, it bends towards
              the normal due to the higher refractive index of glass. When the
              ray emerges back into air, it bends away from the normal.
            </p>
            <p className="text-sm text-neutral-600">
              As a result, the emergent ray is parallel to the incident ray but
              is laterally displaced.
            </p>
          </div>
        </div>

        <div ref={rightColRef} className="space-y-6">
          <div>
            <h2 className="text-sm font-semibold text-neutral-500 uppercase mb-2">
              3. Important Angles Involved
            </h2>
            <ul className="list-disc list-inside text-xs text-neutral-600 space-y-1">
              <li>
                <strong className="text-neutral-800">
                  Angle of Incidence (i):
                </strong>{" "}
                Angle between the incident ray and the normal at the point of
                incidence.
              </li>
              <li>
                <strong className="text-neutral-800">
                  Angle of Refraction (r):
                </strong>{" "}
                Angle between the refracted ray and the normal inside the glass
                slab.
              </li>
              <li>
                <strong className="text-neutral-800">
                  Angle of Emergence (e):
                </strong>{" "}
                Angle between the emergent ray and the normal at the point of
                emergence.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-neutral-500 uppercase mb-2">
              4. Laws of Refraction (Snell’s Laws)
            </h2>
            <ul className="list-disc list-inside text-xs text-neutral-600 space-y-1">
              <li>
                The incident ray, refracted ray, and the normal at the point of
                incidence all lie in the same plane.
              </li>
              <li>
                For a given pair of media, the ratio of the sine of the angle of
                incidence to the sine of the angle of refraction is constant.
              </li>
            </ul>

            <p className="mt-3 font-medium text-neutral-700">
              This constant is called the refractive index of the medium.
            </p>

            <p className="mt-2 font-mono bg-neutral-100 inline-block px-3 py-1 rounded text-sm text-neutral-800">
              n = sin i / sin r
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-neutral-500 uppercase mb-2">
              5. Key Observations
            </h2>
            <ul className="list-disc list-inside text-xs text-neutral-600 space-y-1">
              <li>
                The angle of emergence is equal to the angle of incidence.
              </li>
              <li>
                The incident ray and emergent ray are parallel to each other.
              </li>
              <li>
                The refractive index of glass remains constant for a given
                wavelength of light.
              </li>
            </ul>
          </div>

          <div className="pt-2">
            <VisualiseButton
              onVisualise={() => navigate("/physics/refraction-practical")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefractionTheory;
