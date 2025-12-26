import { useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import SimulationButton from "../components/SimulationButton";
import gsap from "gsap";

import chemist from "../assets/svg/chemist.svg";
import lab from "../assets/svg/lab.svg";
import chemLab from "../assets/svg/chem-lab.svg";

const Chemistry = () => {
  const navigate = useNavigate();

  const backBtnRef = useRef(null);
  const titleRef = useRef(null);

  const handleBackClick = () => {
    navigate("/");
  };

  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(backBtnRef.current, {
      x: -40,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
    }).from(
      titleRef.current,
      {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
      },
      "-=0.3"
    );
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-50 px-8 py-12 flex flex-col items-center overflow-hidden">
      <img
        src={chemist}
        alt=""
        className="pointer-events-none absolute left-[-4rem] top-40 w-[420px] opacity-25 rotate-[-8deg] hidden lg:block"
      />

      <img
        src={lab}
        alt=""
        className="pointer-events-none absolute right-[-6rem] top-24 w-[380px] opacity-25 rotate-[6deg] hidden lg:block"
      />

      <img
        src={chemLab}
        alt=""
        className="pointer-events-none absolute bottom-[-6rem] right-[20%] w-[520px] opacity-20 rotate-[-4deg] hidden xl:block"
      />

      <button
        ref={backBtnRef}
        onClick={handleBackClick}
        className="self-start flex items-center text-xl cursor-pointer text-gray-600 hover:text-gray-900 transition mb-10 z-10"
        aria-label="Back to home"
      >
        <ChevronLeft size={30} />
        Home
      </button>

      <h1
        ref={titleRef}
        className="text-6xl md:text-8xl text-center font-semibold tracking-tight mb-8 text-gray-900 z-10"
      >
        Chemistry <br /> Simulations
      </h1>

      <div className="flex flex-col gap-6 w-full max-w-md mt-10 z-10">
        <SimulationButton
          title="Reaction Rate & Collision Theory"
          description="Explore how reaction rates vary and the principles behind collisions at the molecular level."
          onClick={() =>
            navigate("/chemistry/reaction-rate-and-collision-theory")
          }
        />

        <SimulationButton
          title="Acid-Base Titration Simulator"
          description="Simulate titration experiments to understand acid-base neutralization and equivalence points."
          onClick={() => navigate("/chemistry/acid-base-titration-theory")}
        />

        <SimulationButton
          title="Electrolysis Simulator"
          description="Visualize the process of electrolysis and the chemical reactions occurring at the electrodes."
          onClick={() => navigate("/chemistry/electrolysis-of-water-theory")}
        />
      </div>
    </div>
  );
};

export default Chemistry;
