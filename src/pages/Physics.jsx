import { useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import SimulationButton from "../components/SimulationButton";
import gsap from "gsap";

import discover from "../assets/svg/discovery.svg";
import formula from "../assets/svg/formula.svg";
import formula2 from "../assets/svg/formula-2.svg";

const Physics = () => {
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
        src={discover}
        alt=""
        className="pointer-events-none absolute right-[-9rem] top-16 w-[440px] opacity-25 rotate-[8deg] hidden lg:block"
      />

      <img
        src={formula}
        alt=""
        className="pointer-events-none absolute left-[-6rem] top-[55%] w-[360px] opacity-20 rotate-[-10deg] hidden lg:block"
      />

      <img
        src={formula2}
        alt=""
        className="pointer-events-none absolute bottom-[-8rem] right-[30%] w-[520px] opacity-20 rotate-[4deg] hidden xl:block"
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
        Physics <br /> Simulations
      </h1>

      <div className="flex flex-col gap-6 w-full max-w-md mt-10 z-10">
        <SimulationButton
          title="Simple Pendulum Experiment"
          description="Explore oscillatory motion, time period, and the effect of length and gravity on a pendulum."
          onClick={() => navigate("/physics/pendulum-theory")}
        />

        <SimulationButton
          title="Ohm's Law Simulator"
          description="Understand the relationship between voltage, current, and resistance using interactive circuits."
          onClick={() => navigate("/physics/ohms-law-theory")}
        />

        <SimulationButton
          title="Refraction Simulator"
          description="Visualize how light bends when passing through different media and understand Snell’s Law."
          onClick={() => navigate("/physics/refraction-theory")}
        />
      </div>
    </div>
  );
};

export default Physics;
