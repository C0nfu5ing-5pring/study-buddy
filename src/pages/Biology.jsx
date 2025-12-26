import { useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import SimulationButton from "../components/SimulationButton";
import gsap from "gsap";

import biologist from "../assets/svg/biologist.svg";
import stem from "../assets/svg/stem.svg";
import researcher from "../assets/svg/researcher.svg";

const Biology = () => {
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
        src={biologist}
        alt=""
        className="pointer-events-none absolute left-[-7rem] top-36 w-[420px] opacity-25 rotate-[-6deg] hidden lg:block"
      />

      <img
        src={stem}
        alt=""
        className="pointer-events-none absolute right-[-6rem] top-24 w-[360px] opacity-25 rotate-[7deg] hidden lg:block"
      />

      <img
        src={researcher}
        alt=""
        className="pointer-events-none absolute bottom-[-9rem] left-[22%] w-[500px] opacity-20 rotate-[-4deg] hidden xl:block"
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
        Biology <br /> Simulations
      </h1>

      <div className="flex flex-col gap-6 w-full max-w-md mt-10 z-10">
        <SimulationButton
          title="Evolution Simulator"
          description="Visualize the process of natural selection and species adaptation over generations through interactive simulations."
          onClick={() => navigate("/biology/evolution-theory")}
        />
      </div>
    </div>
  );
};

export default Biology;
