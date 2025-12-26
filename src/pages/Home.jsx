import { useNavigate } from "react-router-dom";
import { FlaskConical, Leaf, Atom } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import topography from "../assets/svg/topography.svg";

const Home = () => {
  const navigate = useNavigate();

  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef([]);

  const subjects = [
    {
      title: "Biology",
      icon: <Leaf size={120} strokeWidth={2} />,
      path: "/biology",
    },
    {
      title: "Chemistry",
      icon: <FlaskConical size={120} strokeWidth={2} />,
      path: "/chemistry",
    },
    {
      title: "Physics",
      icon: <Atom size={120} strokeWidth={2} />,
      path: "/physics",
    },
  ];

  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(titleRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power2.out",
    })
      .from(
        subtitleRef.current,
        {
          opacity: 0,
          y: 16,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .from(
        cardsRef.current,
        {
          opacity: 0,
          y: 24,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
        },
        "-=0.2"
      );
  }, []);

  return (
    <div className="relative overflow-hidden px-4 sm:px-6 md:px-10 py-20 sm:py-28 text-neutral-800">
      <img
        src={topography}
        alt=""
        className="pointer-events-none fixed inset-0 w-full h-full object-cover opacity-20 -z-10 hidden lg:block"
      />

      <h1
        ref={titleRef}
        className="text-[5rem] sm:text-7xl md:text-8xl text-center font-semibold tracking-tight mb-4 leading-tight"
      >
        Study Buddy
      </h1>

      <p
        ref={subtitleRef}
        className="text-neutral-500 max-w-xl sm:max-w-2xl mx-auto text-center text-base sm:text-lg my-8 sm:my-10 leading-relaxed px-2"
      >
        Interactive simulations for Biology, Chemistry, and Physics. Created to
        help you understand concepts visually and step-by-step. Instead of just
        memorizing theory, you can interact with simulations, see
        cause-and-effect in action, and actually understand what's happening
        behind the formulas.
      </p>

      <div className="flex justify-center gap-1 sm:gap-7 flex-wrap max-w-[900px] mx-auto">
        {subjects.map((item, index) => (
          <button
            key={item.title}
            ref={(el) => (cardsRef.current[index] = el)}
            onClick={() => navigate(item.path)}
            onMouseEnter={(e) =>
              gsap.to(e.currentTarget, {
                y: -6,
                duration: 0.25,
                ease: "power2.out",
              })
            }
            onMouseLeave={(e) =>
              gsap.to(e.currentTarget, {
                y: 0,
                duration: 0.25,
                ease: "power2.out",
              })
            }
            className="w-[14rem] sm:w-60 h-60 mt-10 mb-5 cursor-pointer flex flex-col items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-700 transition-transform"
          >
            <div className="text-neutral-600">{item.icon}</div>

            <p className="mt-10 uppercase text-lg sm:text-xl font-bold tracking-wide">
              {item.title}
            </p>
          </button>
        ))}
      </div>

      <p className="mt-10 text-center text-sm sm:text-base text-neutral-400 max-w-md mx-auto px-2">
        Tip: Start with Physics simulations if you like learning through motion
        and visuals.
      </p>

      <footer className="w-full py-4  text-center text-neutral-600 text-sm">
        &copy; {new Date().getFullYear()}{" "}
        <a targer="_blank" href="https://c0nfu5ing-5pring.github.io/Shish/">
          Shish Frutwala
        </a>
        . All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
